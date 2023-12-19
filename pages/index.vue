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
import { Facture } from '#imports';

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
  const emitFilter = () => {
    filteredFactures.value = filterFunction(factures.value, filter.value)
  }
  const showAddFacture = () => {
    modalAddFacture.value.show = !modalAddFacture.value.show
  }
  const addFacture = (facture:IFacture) => {
    createStateFacture(facture)
  }

  const deleteFacture = (id:string) => {
    id4Delete.value = id
    modal.value = !modal.value
  }
  const confirmDelete = () => {
    if(id4Delete.value) deleteStateFacture(id4Delete.value)
    id4Delete.value = null
  }
  const showCopyFacture = (facture:IFacture) => {
    selectedFacture.value = facture
    modalCopyFacture.value.show = !modalCopyFacture.value.show
  }
  const copyFacture = (dateForm:Date) => {
    const newFacture = duplicateFacture(dateForm, selectedFacture.value, factures.value, getCasOptions(cas.value))
    createStateFacture(newFacture)
  }

</script>