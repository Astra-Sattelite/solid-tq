type ToggleSwitchProps = {
  checked: boolean
  onChange: () => void
  onClick: () => void
  className?: string
}

export default function ToggleSwitch(props: ToggleSwitchProps) {
  return (
    <label class={`cursor-pointer select-none ${props.className}`}>
      <input type="checkbox" class="sr-only " checked={props.checked} on:change={props.onChange} on:click={props.onClick}/>
      <div
        data-checked={props.checked.toString()}
        class="
          relative shrink-0 w-[36px] h-6 border
          rounded-2xl bg-white data-[checked=true]:bg-t-green
          transition-all before:w-4 before:h-4 before:rounded-full 
          before:transition-transform before:bg-secondary before:absolute 
          before:left-[2px] before:top-[3px] before:translate-x-[1px] 
          data-[checked=true]:before:translate-x-[15px] 
          data-[checked=true]:before:bg-p-green
          before:shadow-bx-checkbox"
      />
    </label>
  )
}
