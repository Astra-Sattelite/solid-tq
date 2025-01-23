import { useQueryClient } from "@tanstack/solid-query"

export default function UpdateData() {
  const queryClient = useQueryClient()

  return (
    <div class="bg-white active:bg-white hover:bg-secondary border cursor-pointer px-4 py-2 rounded-lg" on:click={() => queryClient.invalidateQueries(['users'])}>
      Refresh
    </div>
  )
}
