export default defineNuxtRouteMiddleware(async (to) => {
  const { authenticated } = storeToRefs(useAuthStore())
  const { getUserInfo } = useUserStore()
  const token = useCookie("token")

  if (token.value) {
    authenticated.value = true
    try {
      await getUserInfo(token.value)
    } catch (e: unknown) {
      if (e instanceof Error) {
        authenticated.value = false
        token.value = null
      }
    }
  }

  if (token.value && (to?.name === "login" || to?.name === "register")) {
    return navigateTo("/")
  }

  if (!token.value && to?.name !== "login" && to?.name !== "register") {
    abortNavigation()
    return navigateTo("/login")
  }
})
