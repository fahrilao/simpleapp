<template>
  <NuxtPage />
  <Alert
    :success="alertRef.alertType === 'success'"
    :error="alertRef.alertType === 'error'"
    @close="onClockAlert"
    :isShow="alertRef.isAlertShown"
  >
    <span>{{ alertRef.alertMessage }}</span>
  </Alert>
</template>

<script setup>
const { $events } = useNuxtApp()

const alertRef = ref({
  isAlertShown: false,
  alertType: "",
  alertMessage: "",
})

const onClockAlert = () => {
  alertRef.value.isAlertShown = false
}

$events.$on("alert-show", (alert) => {
  alertRef.value.isAlertShown = true
  alertRef.value.alertType = alert.type
  alertRef.value.alertMessage = alert.message

  setTimeout(() => {
    alertRef.value.isAlertShown = false
  }, 3000)
})
</script>
