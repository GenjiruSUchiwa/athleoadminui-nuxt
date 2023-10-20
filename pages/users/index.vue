<script setup lang="ts">
import {MagnifyingGlassIcon} from '@heroicons/vue/20/solid'
import {
  FlexRender,
  getCoreRowModel, getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useVueTable
} from "@tanstack/vue-table";
import {h} from 'vue'
import NameCell from "@/components/NameCell.vue";
import EmailCell from "@/components/EmailCell.vue";
import DateCell from "@/components/DateCell.vue";
import BadgeCell from "@/components/BadgeCell.vue";
import {EditButton} from "#components";
import {Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions} from '@headlessui/vue'
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/vue/20/solid'

export type Person = {
  name: string,
  date: string,
  email: string,
  approved: boolean,
  verified: boolean,
  image: string
};

const columns = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({row}: any) => (h(NameCell, {
      name: row.original.name,
      image: row.original.image
    }))
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({row}: any) => (h(EmailCell, {
      email: row.original.email,
    }))
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({row}: any) => (h(DateCell, {
      date: row.original.date,
    }))
  },
  {
    accessorKey: 'verified',
    header: 'Verified',
    cell: ({row}: any) => (h(BadgeCell, {
      data: row.original.verified,
    }))
  },
  {
    accessorKey: 'approved',
    header: 'Approved',
    cell: ({row}: any) => (h(BadgeCell, {
      data: row.original.approved,
    }))
  },
  {
    accessorKey: 'edit',
    header: '',
    cell: ({row}: any) => (h(EditButton, {
      data: row.original.approved,
    })),
    enableSorting: false
  },
]
const users = ref(makeData(500))
const INITIAL_PAGE_INDEX = 0;
const goToPageNumber = ref(INITIAL_PAGE_INDEX + 1);
const table = useVueTable({
  data: users.value,
  columns: columns,
  state: {
    get sorting() {
      return sorting.value
    },
    get globalFilter() {
      return filter.value
    },
  },
  onSortingChange: updaterOrValue => {
    console.log(sorting.value)
    sorting.value =
        typeof updaterOrValue === 'function'
            ? updaterOrValue(sorting.value)
            : updaterOrValue
  },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  debugTable: true,
  initialState: {
    pagination: {
      pageSize: 10
    }
  }
})

const pageSizes = [
  {id: 10, name: '10'},
  {id: 15, name: '15'},
  {id: 20, name: '20'},
]

const pageSize = ref(pageSizes[0])
const sorting = ref<SortingState>([])
const filter = ref('')
const currentPage = computed(() => {
  return table.getState().pagination.pageIndex + 1
})

const totalPages = computed(() => {
  return table.getFilteredRowModel().rows.length
})

function handleGoToPage(e) {
  const page = e.target.value ? Number(e.target.value) - 1 : 0;
  goToPageNumber.value = page + 1;
  table.setPageIndex(page);
}

function handlePageSizeChange(size: Number) {
  table.setPageSize(Number(size));
}

watch(pageSize, (value) => {
  handlePageSizeChange(value.id)
})

</script>

<template>
  <div class="px-4">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-4xl font-bold leading-6 text-gray-900">Users</h1>
        <p class="mt-2 text-sm text-gray-700">A list of all the users in your account including their name, title, email
          and role.</p>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button type="button"
                class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Add user
        </button>
      </div>
    </div>

    <div class="mt-10 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="mb-4 flex justify-between items-center">
            <div class="w-full max-w-lg lg:max-w-xs">
              <label for="search" class="sr-only">Search</label>
              <div class="relative">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" aria-hidden="true"/>
                </div>
                <input id="search" name="search"
                       v-model="filter"
                       class="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                       placeholder="Search" type="search"/>
              </div>
            </div>
            <Listbox as="div" class="flex items-center gap-5" v-model="pageSize">
              <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">Show</ListboxLabel>
              <div class="relative mt-2">
                <ListboxButton
                    class="relative w-full flex-1  cursor-default rounded-md bg-white py-1.5 pl-3 pr-12 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  <span class="block truncate">{{ pageSize.name }}</span>
                  <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true"/>
        </span>
                </ListboxButton>

                <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                            leave-to-class="opacity-0">
                  <ListboxOptions
                      class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    <ListboxOption as="template" v-for="person in pageSizes" :key="person.id" :value="person"
                                   v-slot="{ active, selected }">
                      <li :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                        <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{
                            person.name
                          }}</span>

                        <span v-if="selected"
                              :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                <CheckIcon class="h-5 w-5" aria-hidden="true"/>
              </span>
                      </li>
                    </ListboxOption>
                  </ListboxOptions>
                </transition>
              </div>
            </Listbox>
          </div>
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">

              <tr>
                <th
                    v-for="(header, headerIdx) in table.getFlatHeaders()"
                    @click="header.column.getToggleSortingHandler()?.($event)"
                    :key="header.id"
                    scope="col"
                    :class="[
                   (header.column.getCanSort() ? 'cursor-pointer select-none' :''),
                    (headerIdx === 0 ? 'py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6': 'px-3 py-3.5 text-left text-sm font-semibold text-gray-900')
               ]"
                >
                  <FlexRender
                      :render="header.column.columnDef.header"
                      :props="header.getContext()"
                  />
                </th>
              </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
              <template v-if="table.getRowModel().rows.length > 0">
                <tr v-for="(row, rowIdx) in table.getRowModel().rows" :key="row.id" :class="rowIdx % 2 === 0 ? undefined : 'bg-gray-50'">
                  <td v-for="cell in row.getVisibleCells()" :key="cell.id">
                    <FlexRender
                        :render="cell.column.columnDef.cell"
                        :props="cell.getContext()"
                    />
                  </td>
                </tr>
              </template>

              <template v-else>
                <tr class="p-4">
                  <td colspan="6" class="p-4">
                    <div class="text-center">
                      <h3 class="mt-2 text-sm font-semibold text-gray-900">No data</h3>
                      <p class="mt-1 text-sm text-gray-500">We don't have any result for your query.</p>
                    </div>
                  </td>
                </tr>
              </template>
              </tbody>
            </table>
          </div>
          <nav class="flex items-center justify-between border-t border-gray-200 py-3 mt-5" aria-label="Pagination">
            <div class="hidden sm:block">
              <p class="text-sm text-gray-700">
                Showing
                {{ ' ' }}
                <span class="font-medium">
                  {{ currentPage }}
                </span>
                {{ ' ' }}
                to
                {{ ' ' }}
                <span class="font-medium">{{ table.getPageCount() }}</span>
                {{ ' ' }}
                of
                {{ ' ' }}
                <span class="font-medium">{{ totalPages }}</span>
                {{ ' ' }}
                results
              </p>
            </div>
            <div class="flex flex-1 justify-between sm:justify-end">
              <button
                  class="relative ml-3 inline-flex items-center
                  rounded-md bg-white px-3 py-2 text-sm font-semibold
                  text-gray-900 ring-1 ring-inset ring-gray-300
                  hover:bg-gray-50 focus-visible:outline-offset-0
                  disabled:cursor-not-allowed
                  disabled:opacity-50"
                  @click="() => table.previousPage()"
                  :disabled="!table.getCanPreviousPage()"
              >

                Previous
              </button>
              <button
                  @click="() => table.nextPage()"
                  :disabled="!table.getCanNextPage()"
                  class="relative ml-3 inline-flex items-center
                  rounded-md bg-white px-3 py-2 text-sm font-semibold
                  text-gray-900 ring-1 ring-inset ring-gray-300
                  hover:bg-gray-50 focus-visible:outline-offset-0
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  "
              >
                Next
              </button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>