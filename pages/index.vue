<template>
    <div>
      <BButton class="m-3" variant="primary">Ajouter facture</BButton>
      <DomainFacturesList :factures="factures" :cas="cas"></DomainFacturesList>
      <!-- <DomainAddFacture :factures="factures" :clients="clients" :clientOptions="clientOptions" :cas="cas" @addFacture="addFacture"></DomainAddFacture> -->
    </div>
</template>

<script setup lang="ts">

const factures = useFactures()
const cas = useCas()

onMounted(() => {
  getFactures()
  getCas()
})

</script>