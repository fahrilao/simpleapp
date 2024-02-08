import mitt from "mitt"

export default defineNuxtPlugin(() => {
  const emitter = mitt()

  return {
    provide: {
      events: {
        $on: emitter.on,
        $emit: emitter.emit,
      },
    },
  }
})
