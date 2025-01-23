import { Accessor, Setter } from "solid-js"
import ArrowDownIcon from "./icons/ArrowDown"

type PaginationProps = {
  page: Accessor<number>
  setPage: Setter<number>
  maxPage: number
}

export default function Pagination(props: PaginationProps) {
  const { setPage, page } = props

  return (
    <div class="flex flex-row gap-2 items-center justify-center mb-4 select-none">
      <div 
        on:click={() => {
          const newPage = (page() - 1) > 0 ? page() - 1 : 0
          setPage(newPage)
        }}
        class="bg-white border rounded-full flex items-center justify-center size-6 rotate-90 cursor-pointer"
      >
        <ArrowDownIcon />
      </div>
        <div 
          class="cursor-pointer"
          on:click={() => setPage(0)}
        >
          first page
        </div>

        {page() + 1}

        <div
          class="cursor-pointer" 
          on:click={() => setPage(props.maxPage)}
        >
          last page
        </div>
      <div
        class="bg-white border rounded-full flex items-center justify-center size-6 -rotate-90 cursor-pointer"
        on:click={() => {
          const newPage = (page() + 1) <= props.maxPage ? page() + 1 : props.maxPage
          setPage(newPage)
        }}
      >
        <ArrowDownIcon />
      </div>
    </div>
  )
}
