import { createSignal } from 'solid-js';
import { createMutation, useQueryClient } from '@tanstack/solid-query';
import { updateUser } from '../api/apiClient';
import { User } from '../types';
import { randomNumber } from '../utils';

import FaceIcon from './icons/Face';
import BellIcon from './icons/Bell';
import PenIcon from './icons/Pen';
import NoticeIcon from './icons/Notice';
import TelegramIcon from './icons/Telegram';
import ToggleSwitch from './ToggleSwitch';
import ArrowDownIcon from './icons/ArrowDown';
// import { Skeleton } from "~/components/ui/skeleton"


type CardProps = {
  user: User
}

type CardConfig = {
  [k:string]: {
    tbgColor: string
    mbgColor: string
    fill: string
    text: string
    textColor: string
  }
}

const CARD_CONFIG: CardConfig = {
  write: {
    tbgColor: 'bg-t-green',
    mbgColor: 'bg-p-green',
    fill: '#0CCA1F',
    text: 'Печатаю',
    textColor: 'text-p-green'
  },
  wait: {
    tbgColor: 'bg-t-darkblue',
    mbgColor: 'bg-p-darkblue',
    textColor: 'text-p-darkblue',
    fill: '#11253E',
    text: 'Ожидаю сообщений',
  },
  test: {
    tbgColor: 'bg-t-orange',
    mbgColor: 'bg-p-orange',
    textColor: 'text-p-orange',
    fill: '#CA8A0C',
    text: 'Тестовый'
  },
  offline: {
    tbgColor: 'bg-t-blue',
    mbgColor: 'bg-p-blue',
    textColor: 'text-p-blue',
    fill: '#3751DB',
    text: 'Подключите канал'
  },
}

export default function Card(props: CardProps) {
  const [username, setUsername] = createSignal(props.user.username);
  const [checked, setChecked] = createSignal(false)
  const queryClient = useQueryClient()
  const updateUserMutation = createMutation({ 
    mutationFn: (updatedUser: User) => updateUser(updatedUser),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  function handleChange (e: Event & {currentTarget: HTMLInputElement, target: HTMLInputElement}) {
    setUsername(e.target.value)
    updateUserMutation.mutate({
      ...props.user,  
      username: username(),
    })
  }

  const ccfg = CARD_CONFIG[props.user.status]

  const bellRandom = Math.random() > 0.5

  const MOCK_STATS = [
    {text: "Сообщений", stat: randomNumber(1337)},
    {text: "Отработано", stat: randomNumber(337)},
    {text: "Эффективность", stat: randomNumber(100) + "%"}
  ]

  return (
    <div class="rounded-2xl p-5 bg-white flex flex-col gap-[14px] max-w-[330px] skeleton">
      <div class="flex flex-row gap-[10px] items-center">
        <div class={`${ccfg.tbgColor} rounded-lg size-[30px] flex items-center justify-center`}>
          <FaceIcon fill={ccfg.fill}/>
        </div>
        <p 
          class={`${ccfg.textColor} text-small font-semibold skeleton skeleton-text`}
        >
          {ccfg.text}
        </p>
      </div>

      <div class="flex flex-row text-p-darkblue gap-[14px]">
        <input class="
            cursor-pointer text-mid
            rounded-xl font-semibold
            bg-white max-w-[246px]
            text-ellipsis
          " 
          value={username()} 
          on:change={(e) => handleChange(e)} 
        />

        <div class={`
            flex justify-center items-center size-[30px] 
            rounded-full border ml-auto
            ${bellRandom ? "bg-t-green border-t-green" : 'bg-transparent border-secondary'}
          `}
        >
          <BellIcon fill={bellRandom ? "#0CCA1F" : "#8695A7"} />
        </div>
      </div>

      <div class="flex flex-row gap-[22px]">
        {MOCK_STATS.map((ms, i) => 
          <>
            {i % 2 !== 0 && <div class="h-full w-[1px] bg-secondary flex-shrink-0"/>}
            <div 
              class={`
                overflow-hidden
                flex flex-col gap-[6px]
                ${(i + 1) === MOCK_STATS.length ? "flex-shrink-2" : "flex-shrink-0"}
              `}
            >
              <p class="overflow-hidden text-ellipsis whitespace-nowrap text-small">{ms.text}</p>
              <p class="overflow-hidden text-ellipsis whitespace-nowrap text-mid font-semibold">{ms.stat}</p>
            </div>
            {i % 2 !== 0 && <div class="h-full w-[1px] bg-secondary flex-shrink-0" />}
          </>
        )}
      </div>

      <div
        class="
          bg-p-darkblue py-[14px] px-4 gap-[6px] 
          flex items-center justify-center
          text-mid text-bold text-white rounded-[10px]
          cursor-pointer
        "
      >
        <PenIcon />
        Настройка бота
      </div>

      <div class="flex flex-row gap-1 text-small items-center text-secondary cursor-pointer w-min">
        КАНАЛЫ
        <NoticeIcon />
      </div>

      <div
        class="
          py-[14px] px-4 gap-[6px] 
          flex items-center
          text-mid text-bold text-black rounded-[10px]
          cursor-pointer bg-[#F0F4FA]
        "
      >
        <div>
          <TelegramIcon />
        </div>
        Telegram
        <p class="text-small mt-[2px] text-secondary whitespace-nowrap overflow-hidden text-ellipsis">@{username()}</p>

        <div class="ml-auto">
          <ToggleSwitch checked={checked()} onClick={() => setChecked(!checked())} onChange={() => {}} />
        </div>
      </div>

      <div class="flex flex-row text-secondary gap-1 items-center justify-center cursor-pointer">
        Детали
        <ArrowDownIcon />
      </div>
    </div>
  )
}
