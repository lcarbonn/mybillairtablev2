<template>
  <span>{{ version }}</span>
  <!-- <div class="d-flex flex-column justify-content-between min-vh-100">
    <div>
      <BaseNavBar  @filter-cards="filterCards" @search-cards="searchCards"></BaseNavBar>
      <BContainer fluid>
        <NuxtPage />
      </BContainer>
    </div>
    <div class="d-flex flex-column justify-content-end">
      <BaseFooter :appVersion="version"></BaseFooter>
      <BaseSnackbar></BaseSnackbar>
    </div>
  </div> -->
</template>
<script setup lang="ts">

  // imports
  import { name, version } from '~/package.json';

  // nuxt cycle hooks
  onMounted(() => {
    console.log("starting app : "+name + ", appVersion:" +version)
  })

</script>