<template>
  <main class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="flex flex-row md:flex-nowrap w-full md:w-2/3 px-5 md:px-0">
      <div class="hidden md:block w-1/2">
        <img
          class="bg-cover bg-no-repeat bg-center h-full w-full"
          alt="image-login"
          src="/image-login.svg"
        />
      </div>
      <div class="card w-full md:w-1/2">
        <div class="card-body">
          <h2 class="text-2xl font-semibold text-center mb-8">Login</h2>
          <Form @submit="login">
            <div class="mb-4">
              <input-field
                id="email"
                type="email"
                name="email"
                v-model:value="user.email"
                label="Email Address"
                placeholder="Enter your email"
                :rules="emailValidation"
                required
              />
            </div>
            <div class="mb-4">
              <input-field
                id="password"
                type="password"
                name="password"
                v-model:value="user.password"
                label="Password"
                placeholder="Enter your password"
                required
              />
            </div>
            <div class="flex items-center justify-between">
              <label for="remember" class="flex items-center">
                <input type="checkbox" id="remember" class="mr-2" />
                <span class="text-gray-700 text-sm">Remember me</span>
              </label>
            </div>
            <button type="submit" class="w-full btn-primary">
              Login
              <span
                class="i-material-symbols-arrow-right-alt-rounded ml-3 text-2xl"
              ></span>
            </button>
            <div class="text-center mt-2">
              <NuxtLink to="/register"
                >Do not have an account yet? Click here to
                <span class="text-blue-400">Register</span>!</NuxtLink
              >
            </div>
          </Form>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { storeToRefs } from "pinia"
import * as yup from "yup"

const { authenticateUser } = useAuthStore(),
  { authenticated } = storeToRefs(useAuthStore()),
  router = useRouter(),
  user = ref({
    email: "admin@simpleapp.com",
    password: "123456789",
  })

const emailValidation = yup.string().required().email()

const login = async () => {
  const res = await authenticateUser(user.value)

  if (authenticated.value) {
    router.push("/")
  }
}
</script>
