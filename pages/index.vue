<template>
    <div>
      <BButton class="m-3" variant="primary" @click="showAddFacture">Ajouter facture</BButton>
      <DomainFacturesFilter :clients="clients" :cas="cas" @emit-filter="emitFilter"></DomainFacturesFilter>
      <DomainFacturesTable :factures="filteredFactures" :cas="cas" :clients="clients" @delete-facture="deleteFacture" @copy-facture="showCopyFacture"/>
      <LazyDomainAddFacture :modalAddFacture="modalAddFacture" :factures="factures" :clients="clients" :cas="cas" @add-facture="addFacture"></LazyDomainAddFacture>
      <LazyDomainCopyFacture :modalCopyFacture="modalCopyFacture" :facture="selectedFacture" @copy-facture="copyFacture"></LazyDomainCopyFacture>

      <BModal v-model="modal" title="Supprimer Facture" @ok="confirmDelete"> Vraiment ? </BModal>
    </div>
</template>

<script setup lang="ts">
import { Facture, type IFacture } from '#imports';

  // local refs
  const modal = ref(false)
  const facture4Delete = ref()

  // stated properties
  const factures = useFactures()
  const cas = useCas()
  const clients = useClients()
  const filter = useFilter()
  const filteredFactures = ref()
  const modalAddFacture = ref(new ModalShow())
  const selectedFacture = ref(new Facture())
  const modalCopyFacture = ref(new ModalShow())    

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
  // filter the factures based on received filter
  const emitFilter = () => {
    filteredFactures.value = filterFunction(factures.value, filter.value)
  }
  // show the modal for adding an nex facture
  const showAddFacture = () => {
    modalAddFacture.value.show = !modalAddFacture.value.show
  }
  // after ok on modal
  const addFacture = (facture:IFacture) => {
    createStateFacture(facture).then((newFacture) => {
      factures.value.unshift(newFacture)
    })
  }
  // ask for modal before delete
  const deleteFacture = (facture:IFacture) => {
    facture4Delete.value = facture
    modal.value = !modal.value
  }
  // confirm delete received
  const confirmDelete = () => {
    if(facture4Delete.value) deleteStateFacture(facture4Delete.value)
    facture4Delete.value = null
  }
  // ask for date before copy facture
  const showCopyFacture = (facture:IFacture) => {
    selectedFacture.value = facture
    modalCopyFacture.value.show = !modalCopyFacture.value.show
  }
  // date & confirmation recieved for copy
  const copyFacture = (dateForm:Date) => {
    const oldFacture = selectedFacture.value
    const newFacture = duplicateFacture(dateForm, oldFacture, factures.value, getCasOptions(cas.value))
    copyStateFacture(newFacture, oldFacture)
  }

</script>