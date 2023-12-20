<template>
  <div class="d-flex flex-column justify-content-between min-vh-100">
    <div>
      <BaseNavBar></BaseNavBar>
      <BaseLoginForm 
        :form="signinForm" 
        @submit="signIn"
        v-if="!firebaseUser"></BaseLoginForm>
      <BContainer v-if="firebaseUser">
        <NuxtPage />
      </BContainer>
    </div>
    <div class="d-flex flex-column justify-content-end">
      <BaseFooter :appVersion="version"></BaseFooter>
      <BaseSnackbar></BaseSnackbar>
    </div>
  </div>
</template>
<script setup lang="ts">

  // imports
  import { name, version } from '~/package.json';

  // local refs for signin form
  const signinForm = ref({ email: "", password: "" });
  // state rfs
  const firebaseUser = useFirebaseUser();
  
  // nuxt cycle hooks
  onMounted(() => {
    console.log("starting app : "+name + ", appVersion:" +version)
  })

  // signIn method
  const signIn = () => {
      signInUser(signinForm.value.email, signinForm.value.password)
      .then((credentials) => {
          // console.log("signIn user=", credentials)
      })
  }


</script>