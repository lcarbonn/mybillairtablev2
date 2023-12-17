<template>
    <div>
      <BButton class="m-3" variant="primary" @click="showAddFacture">Ajouter facture</BButton>
      <DomainFacturesFilter :clients="clients" :cas="cas" @emit-filter="emitFilter"></DomainFacturesFilter>
      <DomainFacturesTable :factures="filteredFactures" :cas="cas" :clients="clients" @delete-facture="deleteFacture"/>
      <DomainAddFacture :modalAddFacture="modalAddFacture" :factures="factures" :clients="clients" :cas="cas" @add-facture="addFacture"></DomainAddFacture>
      <BModal v-model="modal" title="Supprimer Facture" @ok="confirmDelete"> Vraiment ? </BModal>
    </div>
</template>

<script setup lang="ts">
import type { Facture } from '#imports';

  // local refs
  const modal = ref(false)
  const id4Delete = ref()

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

  const deleteFacture = (id:string) => {
    id4Delete.value = id
    modal.value = !modal.value
  }
  const confirmDelete = () => {
    console.log("delete facture :", id4Delete.value)
    deleteStateFacture(id4Delete.value)
  }
</script>