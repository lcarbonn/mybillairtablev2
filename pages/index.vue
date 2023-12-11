<template>
    <div>
      <span>INDEX</span>
    <div v-for="facture in factures"
            :key="facture">
            <p>{{ facture }}</p>
            </div>
    </div>
</template>

<script setup lang="ts">

const factures = useFactures()

onMounted(() => {
  getFactures()
})

</script>