<template>
  <div>
    <NuxtLayout name="custome">
      <div class="card">
        <div class="card-header">
          <span class="card-title">Data Users</span>
        </div>
        <div class="card-body pt-0">
          <NuxtLink
            href="/users/new"
            class="bg-blue-500 inline-block px-3 py-2 rounded-md bg-blue-500 hover:bg-blue-700 text-white font-semibold mb-2 text-sm"
          >
            Add New User
          </NuxtLink>
          <div class="max-w-full">
            <div class="overflow-x-auto">
              <table class="border table-auto overflow-x-scroll w-full">
                <thead>
                  <tr class="bg-gray-200">
                    <th class="py-2 px-4">No</th>
                    <th class="py-2 px-4">Name</th>
                    <th class="py-2 px-4">Gender</th>
                    <th class="py-2 px-4">Email</th>
                    <th class="py-2 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Example data, replace with your actual data -->
                  <tr
                    class="hover:bg-gray-100"
                    v-for="(user, index) in userData"
                    :key="index"
                  >
                    <td class="py-2 px-4 text-center">{{ index + 1 }}</td>
                    <td class="py-2 px-4">
                      {{ user.first_name }} {{ user.last_name }}
                    </td>
                    <td class="py-2 px-4 text-center">{{ user.gender }}</td>
                    <td class="py-2 px-4 text-center">{{ user.email }}</td>
                    <td class="py-2 px-4 text-center">
                      <div class="flex gap-1 justify-center">
                        <button
                          @click="() => editData(user.id)"
                          type="button"
                          class="inline-block px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-700 text-white font-semibold flex justify-center items-center"
                        >
                          <span class="i-tabler-edit"></span>
                        </button>
                        <button
                          @click="() => deleteData(user.id)"
                          type="button"
                          class="inline-block px-4 py-2 rounded-md bg-red-500 hover:bg-red-700 text-white font-semibold flex justify-center items-center"
                        >
                          <span class="i-tabler-trash"></span>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="flex justify-end mt-4">
            <nav
              class="flex items-center gap-2 flex-wrap"
              aria-label="Pagination"
            >
              <a
                href="#"
                class="py-2 px-4 border rounded-md"
                :class="
                  index == paginationData.currentPage
                    ? 'text-white bg-blue-500'
                    : 'text-blue-500 hover:bg-blue-100'
                "
                v-for="index in paginationData.totalPage"
                key="index"
                @click="() => loadData(index)"
              >
                {{ index }}
              </a>
              <span>Total {{ paginationData.totalPage }} Page</span>
            </nav>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
const config = useRuntimeConfig(),
  baseUrl = config.public.baseUrl,
  token = useCookie("token").value,
  router = useRouter(),
  page = ref(1),
  isPending = ref(false),
  userData = ref([]),
  { $showAlert } = useNuxtApp(),
  paginationData = ref({
    currentPage: 1,
    lastPage: 1,
    totalPage: 1,
  }),
  loadData = async (page) => {
    const { data } = await useFetch(`${baseUrl}/users`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
      },
    })

    if (!data.value) return false

    const { data: users, meta } = data.value

    userData.value = users
    paginationData.value = {
      currentPage: meta.current_page,
      lastPage: meta.last_page,
      totalPage: meta.current_page + (meta.last_page - 1),
    }
  },
  editData = (id) => {
    router.push(`/users/${id}`)
  },
  deleteData = async (id) => {
    if (confirm("Are you sure you want to delete") == true) {
      const { error } = await useFetch(`${baseUrl}/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (error.value) {
        console.log("Error: " + error)
        $showAlert("Something went wrong", "error")
      } else {
        loadData(1)
        $showAlert("Success delete the data", "success")
      }
    }
  }

loadData(page.value)
</script>
