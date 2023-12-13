<template>
    <div>
      <BButton class="m-3" variant="primary">Ajouter facture</BButton>
      <DomainFacturesFilter :clients="clients" :cas="cas" @emitFilter="emitFilter"></DomainFacturesFilter>
      <DomainFacturesTable :factures="filteredFactures" :cas="cas" :clients="clients"/>
      <!-- <DomainAddFacture :factures="factures" :clients="clients" :clientOptions="clientOptions" :cas="cas" @addFacture="addFacture"></DomainAddFacture> -->
    </div>
</template>

<script setup lang="ts">

  // stated properties
  const factures = useFactures()
  const cas = useCas()
  const clients = useClients()
  const filter = useFilter()
  const filteredFactures = ref()

  // nuxt hook
  onMounted(() => {
    getFactures()
    getCas()
    getClients()
  })

  // nuxt cycle hook
  watch(factures, async(newFactures, oldFactures) => {
    if(newFactures) {
      filteredFactures.value = newFactures
        }
  }
  // { immediate: true }
)


    // methods
    const emitFilter = () => {
        console.log("emited filter:", filter.value)
        filteredFactures.value = filterFunction(factures.value, cas.value, filter.value)
      }

</script>