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
          <h2 class="text-2xl font-semibold text-center mb-8">Register</h2>
          <Form :validationSchema="userFormValidation" @submit="register">
            <div class="row">
              <InputField
                label="First Name"
                id="first_name"
                name="first_name"
                v-model:value="userDetail.first_name"
                placeholder="Enter your first name"
              />
              <InputField
                label="Last Name"
                id="last_name"
                name="last_name"
                v-model:value="userDetail.last_name"
                placeholder="Enter your last name"
              />
            </div>
            <div class="row">
              <SelectField
                label="Gender"
                id="gender"
                name="gender"
                v-model:value="userDetail.gender"
                :options="genderOptions"
              />
              <InputField
                label="Email"
                id="email"
                name="email"
                v-model:value="userDetail.email"
                placeholder="Enter your email address"
              />
            </div>
            <div class="row">
              <InputField
                label="Password"
                id="password"
                type="password"
                name="password"
                v-model:value="userDetail.password"
                placeholder="Enter your password"
              />
              <InputField
                label="Re-Password"
                id="repassword"
                type="password"
                name="repassword"
                v-model:value="userDetail.repassword"
                placeholder="Re Enter your password"
              />
            </div>
            <button type="submit" class="w-full btn-primary">
              Register
              <span
                class="i-material-symbols-arrow-right-alt-rounded ml-3 text-2xl"
              ></span>
            </button>
            <div class="text-center mt-2">
              <NuxtLink to="/login"
                >Have an account? Click here to
                <span class="text-blue-400">Login</span>!</NuxtLink
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

const { registerUser } = useAuthStore(),
  { authenticated } = storeToRefs(useAuthStore()),
  router = useRouter(),
  genderOptions = [
    {
      label: "MALE",
      value: "MALE",
    },
    {
      label: "FEMALE",
      value: "FEMALE",
    },
  ],
  userDetail = ref({
    first_name: "",
    last_name: "",
    gender: genderOptions[0].value,
    email: "",
    password: "",
    repassword: "",
  }),
  userFormValidation = yup.object({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required(),
    repassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password"), null], "Passwords do not match"),
  })

const register = async () => {
  const res = await registerUser(userDetail.value)
  if (authenticated.value) {
    console.log(authenticated.valuer)

    router.push("/")
  }
}
</script>
