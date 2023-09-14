<template>
  <Register
    :eyeIconOne="eyeIconOne"
    :eyeIconTwo="eyeIconTwo"
    :showButton="showButton"
    :getPasswordOne="getPasswordOne"
    :getPasswordTwo="getPasswordTwo"
    :showPassord="showPassord"
  />
</template>

<script lang="ts" setup>
import Register from "@/components/Register.vue";
import { ref, reactive, watch } from "vue";

let showButton = ref(false);
let eyeIconOne = ref(false);
let eyeIconTwo = ref(false);
let password = reactive({
  passwordOne: "",
  passwordTwo: "",
});

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
