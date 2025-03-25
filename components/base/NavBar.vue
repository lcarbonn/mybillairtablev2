<template>
  <BNavbar toggleable="lg" variant="primary" sticky='top' v-b-color-mode="'dark'">
    <BNavbarBrand to="/">
        <BAvatar rounded src="/icon.png"></BAvatar>
      </BNavbarBrand>
    <BNavbarNav><BNavItem :href="'https://airtable.com/' + baseId" target="_blank">{{baseName}}</BNavItem></BNavbarNav>
    <BNavbarToggle target="nav-collapse" />
    <BCollapse id="nav-collapse" isNav>
      <BNavbarNav class="ms-auto mb-2 mb-lg-0">
        <BNavItemDropdown v-if="isConnected" right v-b-color-mode="'light'">
          <template #button-content>
            <em>{{userEmail}}<Person/></em>
          </template>
          <BDropdownItem  @click="signOut()">Sign Out</BDropdownItem>
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
  // const config = useRuntimeConfig()

  // computed properties
  const isConnected = computed(() => {
    return !!firebaseUser.value?.uid
  })
  const userEmail = computed(() => {
    return firebaseUser.value?.email
  })
  const baseId = computed(() => {
    return import.meta.env.VITE_AIRTABLE_BASE_ID
  })
  const baseName = computed(() => {
    return import.meta.env.VITE_AIRTABLE_BASE_NAME
  })

  // methods
  const signOut = () => {
    signOutUser().then(() => {
      useFirebaseUser().value = null
    })
  }

</script>

<style scoped>
.nodecoLink {
  text-decoration: none !important;
}
</style>
