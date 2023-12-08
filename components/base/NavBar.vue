<template>
  <BNavbar toggleable="lg" variant="primary" sticky='top' v-b-color-mode="'dark'">
    <BNavbarBrand>
      <BLink @click="goHome" class="navbar-brand">
      <BAvatar rounded
                  src="/icon.png"></BAvatar> My Bill Airtable
                </BLink>
    </BNavbarBrand>
    <BNavbarToggle target="nav-collapse" />
    <BCollapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em v-if="!userEmail"><Person/></em>
            <em v-if="userEmail">{{userEmail}} <Person/></em>
          </template>
          <b-dropdown-item v-show="isConnected" @click="signOut()">Sign Out</b-dropdown-item>
          <b-dropdown-item
                       v-show="!isConnected"
                       href="/login">Login</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
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
    return !firebaseUser.value?.isAnonymous
  })
  const userEmail = computed(() => {
    return firebaseUser.value?.email
  })

  // methods
  const goHome = async () => {
    textsearch.value = null
    currentTheme.value = ""
    resetCards()
    await navigateTo('/')
  }

  const signOut = () => {
    signOutUser().then(async () => {
      await navigateTo('/')
    })
  }

</script>

<style scoped>
.nodecoLink {
  text-decoration: none !important;
}
</style>
