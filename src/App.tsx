import { createQuery } from '@tanstack/solid-query';
import { createSignal, Show } from 'solid-js';
import { fetchUsers } from './api/apiClient';
import { PaginateBy, User } from './types';
import Pagination from './components/Pagination';
import Card from './components/Card';
import UpdateData from './components/UpdateData';

function App() {
  const [paginateBy, setPaginateBy] = createSignal<PaginateBy>(4);
  const [page, setPage] = createSignal(0);

  const query = createQuery({ 
    queryKey: () => ['users', paginateBy(), page()],
    queryFn: () => fetchUsers(page() * paginateBy(), paginateBy()),
    refetchInterval: 600000 // 10m
  });

  const PAGINATEBY_OPTIONS: Set<PaginateBy> = new Set([4, 8, 12])

  return (
    <div class='w-screen min-h-screen bg-p-white text-p-darkblue flex justify-center items-center flex-col p-4 md:p-10'>
      <Show 
        when={!query.isLoading} 
        fallback={
          <div class="flex bg-p-white items-center flex-col justify-center gap-4">
            <div class="loader"></div>
            <p>Loading...</p>
          </div>
        }
      >
        <UpdateData />
        <h1 class="text-2xl font-bold mb-4">Current page:{page() + 1} Users per page:{paginateBy()}</h1>
        <div class="flex flex-row gap-2">
          {[...PAGINATEBY_OPTIONS].map(v => 
            <div 
              class={`
                rounded-lg flex items-center 
                justify-center p-2 mb-2 cursor-pointer
                ${v === paginateBy() ? "bg-t-green" : "bg-white"}
              `}
              on:click={() => {
                const maxPage = Math.ceil((query?.data?.total || 0 ) / v) - 1
                setPaginateBy(v)
                setPage(page() > maxPage ? maxPage : page())
              }}
            >
              {v}
            </div>
          )}
        </div>

        <Pagination 
          page={page} 
          setPage={setPage}
          maxPage={Math.ceil((query?.data?.total || 0) / paginateBy()) - 1}
        />

        <div class="flex flex-row gap-2 flex-wrap max-w-[338px] md:max-w-[668px] xl:max-w-[1006px] 2xl:max-w-[1344px]">
          {query.data?.result.map((user: User) => 
            <Card user={user} />
          )}
        </div>
      </Show>
    </div>
  );
}

export default App
