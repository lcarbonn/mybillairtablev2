<template>
  <BNavbar toggleable="lg" variant="primary" sticky='top' v-b-color-mode="'dark'">
    <BNavbarBrand>
      <BLink @click="goHome" class="navbar-brand">
      <BAvatar rounded
                  src="/icon.png"></BAvatar> My Bill Airtable
                </BLink>
    </BNavbarBrand>
    <BNavbarToggle target="nav-collapse" />
    <BCollapse id="nav-collapse" isNav="true">
      <BNavbarNav class="ms-auto mb-2 mb-lg-0">
        <!-- <BNavItem v-if="isConnected"><em v-if="userEmail">{{userEmail}} <Person/></em></BNavItem>
        <BNavItem v-if="isConnected">Sign Out</BNavItem> -->
        <BNavItemDropdown right v-b-color-mode="'light'">
          <template #button-content>
            <em v-if="!userEmail"><Person/></em>
            <em v-else>{{userEmail}} <Person/></em>
          </template>
          <BDropdownItem v-if="isConnected" @click="signOut()">Sign Out</BDropdownItem>
          <!-- <BDropdownItem v-else href="/login">Login</BDropdownItem> -->
        </BNavItemDropdown>
      </BNavbarNav>
    </BCollapse>
  </BNavbar>
</template>

<script setup lang="ts">

  // icons
  import Person from '~icons/bi/person'
  import {vBColorMode} from 'bootstrap-vue-next'
  
  // global states
  const firebaseUser = useFirebaseUser()

  // computed properties
  const isConnected = computed(() => {
    return !!firebaseUser.value?.uid
  })
  const userEmail = computed(() => {
    return firebaseUser.value?.email
  })

  // methods
  const goHome = async () => {
    await navigateTo('/')
  }

  const signOut = () => {
    signOutUser().then(async () => {
      //await navigateTo('/login')
    })
  }

</script>

<style scoped>
.nodecoLink {
  text-decoration: none !important;
}
</style>
