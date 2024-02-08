import mitt from "mitt"

export default defineNuxtPlugin((nuxtApp: any) => {
  return {
    provide: {
      showAlert: (
        message: string,
        type: "success" | "error" | "info" | "warning"
      ) => {
        nuxtApp.$events.$emit("alert-show", { message, type })
      },
    },
  }
})
