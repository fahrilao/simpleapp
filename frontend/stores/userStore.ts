interface UserInfo {
  id: number
  email: string
  first_name: string
  last_name: string
  gender: string
}

export const useUserStore = defineStore("user", {
  state: (): { user: UserInfo | null } => ({
    user: null,
  }),
  actions: {
    async getUserInfo(token: string) {
      const { $showAlert } = useNuxtApp()
      const config = useRuntimeConfig()
      const baseUrl = config.public.baseUrl as string
      const { data, error }: any = await useFetch(`${baseUrl}/me`, {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (error.value) throw new Error("404")

      this.user = data?.value
      return data
    },
    setUserInfo(user: UserInfo) {
      this.user = user
    },
  },
})
