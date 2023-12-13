<template>
    <div>
      <BButton class="m-3" variant="primary">Ajouter facture</BButton>
      <DomainFacturesFilter :clients="clients" :cas="cas" @emitFilter="emitFilter"></DomainFacturesFilter>
      <DomainFacturesTable :factures="factures" :cas="cas" :clients="clients"/>
      <!-- <DomainAddFacture :factures="factures" :clients="clients" :clientOptions="clientOptions" :cas="cas" @addFacture="addFacture"></DomainAddFacture> -->
    </div>
</template>

<script setup lang="ts">

// local refproperties
  const filter = ref()

  // stated properties
  const factures = useFactures()
  const cas = useCas()
  const clients = useClients()

  // nuxt hook
  onMounted(() => {
    getFactures()
    getCas()
    getClients()
  })


    // methods
    const emitFilter = (emitFilter:any) => {
        console.log("emited filter:", emitFilter)
        filter.value = emitFilter
      }

</script>