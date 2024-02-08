interface UserPayloadInterface {
  email: string
  password: string
}

interface UserInterface {
  first_name: string
  last_name: string
  email: string
  gender: string
  password: string
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authenticated: false,
    loading: false,
  }),
  actions: {
    async authenticateUser({ email, password }: UserPayloadInterface) {
      const { $showAlert } = useNuxtApp()
      const config = useRuntimeConfig()
      const baseUrl = config.public.baseUrl as string

      const { data, pending, error }: any = await useFetch(`${baseUrl}/login`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: {
          email,
          password,
        },
      })
      this.loading = pending
      if (error.value) {
        $showAlert("Invalid user credentials!", "error")
      }

      if (data.value) {
        const token = useCookie("token")
        token.value = data?.value?.token
        this.authenticated = true
      }

      return data
    },
    async registerUser({
      first_name,
      last_name,
      email,
      gender,
      password,
    }: UserInterface) {
      const { $showAlert } = useNuxtApp()
      const config = useRuntimeConfig()
      const baseUrl = config.public.baseUrl as string

      const { data, pending, error }: any = await useFetch(
        `${baseUrl}/register`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: {
            first_name,
            last_name,
            email,
            gender,
            password,
          },
        }
      )
      this.loading = pending
      if (error.value) {
        $showAlert("User already taken!", "error")
      }

      if (data.value) {
        const token = useCookie("token")
        token.value = data?.value?.token
        this.authenticated = true
      }

      return data
    },
    logUserOut() {
      const token = useCookie("token")
      this.authenticated = false
      token.value = null
    },
  },
})
