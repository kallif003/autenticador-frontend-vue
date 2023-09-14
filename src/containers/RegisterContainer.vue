<template>
  <Loading v-if="showLoading" />

  <Register
    :eyeIconOne="eyeIconOne"
    :eyeIconTwo="eyeIconTwo"
    :showButton="showButton"
    :apiResponse="apiResponse"
    :statusCode="statusCode"
    :getPasswordOne="getPasswordOne"
    :getPasswordTwo="getPasswordTwo"
    :showPassord="showPassord"
    :updatedPassword="updatedPassword"
  />
</template>

<script lang="ts" setup>
import { updatePasswordApi } from "@/api/updatePassword";
import Register from "@/components/Register.vue";
import { onMounted } from "vue";
import { ref, reactive, watch } from "vue";
import Loading from "@/components/Loading.vue";
import { Message } from "@/utils/enum";
import { resolveDirective } from "vue";

let showButton = ref(false);
let showLoading = ref(false);
let eyeIconOne = ref(false);
let eyeIconTwo = ref(false);
let apiResponse = ref("");
let statusCode = ref(0);
let userId = ref("");
let service = ref("");
let password = reactive({
  passwordOne: "",
  passwordTwo: "",
});

const getUserId = () => {
  let url = window.location.href;

  let urlParts = url.split("/");

  userId.value = urlParts.pop() as string;
  service.value = urlParts.pop() as string;
};

onMounted(() => {
  getUserId();
});

const updatedPassword = async () => {
  showLoading.value = true;

  const res: any = await updatePasswordApi(
    password.passwordTwo,
    userId.value,
    service.value
  );

  console.log(res);

  handleApiResponse(res?.status);

  redirect(res?.data);

  showLoading.value = false;
};

const handleApiResponse = (status: number) => {
  statusCode.value = status;

  if (status == 200) apiResponse.value = Message.SUCESS;
  else apiResponse.value = Message.ERROR;

  showButton.value = false;
};

const redirect = (data: string) => {
  window.location.href = data;
};

const showPassord = (id: string) => {
  id == "#pass1"
    ? (eyeIconOne.value = !eyeIconOne.value)
    : (eyeIconTwo.value = !eyeIconTwo.value);

  let input = document.querySelector(id);

  if (input?.getAttribute("type") == "password") {
    input.setAttribute("type", "text");
  } else {
    input?.setAttribute("type", "password");
  }
};

const getPasswordOne = (value: string) => {
  password.passwordOne = value;
};

const getPasswordTwo = (value: string) => {
  password.passwordTwo = value;
};

watch(password, () => {
  if (
    password.passwordOne == password.passwordTwo &&
    password.passwordOne != "" &&
    password.passwordTwo != ""
  )
    showButton.value = true;
  else showButton.value = false;
});
</script>
