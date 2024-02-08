<template>
  <div>
    <NuxtLayout name="custome">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Form User</h3>
        </div>
        <div class="card-body">
          <Form :validationSchema="userFormValidation" @submit="onSubmit">
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
            <button
              type="submit"
              class="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-700 text-white font-semibold mt-5 flex justify-center items-center"
            >
              Submit
            </button>
          </Form>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>
<script setup>
import * as yup from "yup"
const config = useRuntimeConfig(),
  baseUrl = config.public.baseUrl,
  token = useCookie("token").value,
  route = useRoute(),
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
  userID = route.params.id,
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

const { $showAlert } = useNuxtApp()

if (route.params.id !== "new") {
  const { data, error } = await useFetch(`${baseUrl}/users/${userID}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (error.value || !data.value) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page Not Found",
    })
  }
  const user = data.value
  userDetail.value.first_name = user.first_name
  userDetail.value.last_name = user.last_name
  userDetail.value.gender = user.gender
  userDetail.value.email = user.email
}

const addNewUser = async (data) => {
    const { error } = await useFetch(`${baseUrl}/users`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    })

    return error.value
  },
  updateUser = async (id, data) => {
    const { error } = await useFetch(`${baseUrl}/users/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    })

    return error.value
  },
  onSubmit = async () => {
    if (userID !== "new") {
      const error = await updateUser(userID, userDetail.value)
      if (!error) {
        router.push("/users")
        return $showAlert("Success add new data", "success")
      }
      $showAlert("Email already used!", "error")
      console.log(error)
    } else {
      const error = await addNewUser(userDetail.value)
      if (!error) {
        router.push("/users")
        return $showAlert("Success update data", "success")
      }
      $showAlert("Email already used!", "error")
      console.log(error)
    }
  }
</script>
