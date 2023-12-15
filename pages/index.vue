<template>
    <div>
      <BButton class="m-3" variant="primary" @click="showAddFacture">Ajouter facture</BButton>
      <DomainFacturesFilter :clients="clients" :cas="cas" @emit-filter="emitFilter"></DomainFacturesFilter>
      <DomainFacturesTable :factures="filteredFactures" :cas="cas" :clients="clients"/>
      <DomainAddFacture :modalAddFacture="modalAddFacture" :factures="factures" :clients="clients" :cas="cas" @add-facture="addFacture"></DomainAddFacture>
    </div>
</template>

<script setup lang="ts">
import type { Facture } from '#imports';


  // stated properties
  const factures = useFactures()
  const cas = useCas()
  const clients = useClients()
  const filter = useFilter()
  const filteredFactures = ref()
  const modalAddFacture = ref(new ModalShow())

  // nuxt hook
  onMounted(() => {
    getStateFactures()
    getStateCas()
    getStateClients()
  })

  // nuxt cycle hook
  watch(factures, async(newFactures) => {
    if(newFactures) {
      filteredFactures.value = newFactures
        }
    }
    // { immediate: true }
  )

  // methods
  const emitFilter = () => {
    filteredFactures.value = filterFunction(factures.value, filter.value)
  }
  const showAddFacture = () => {
    modalAddFacture.value.show = !modalAddFacture.value.show
  }
  const addFacture = (facture:IFacture) => {
    console.log("add facture :", facture)
    createStateFacture(facture)
  }


</script>