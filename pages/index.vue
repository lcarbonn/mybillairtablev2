<template>
    <div>
      <BButton class="m-3" variant="primary" @click="showAddFacture">Ajouter facture</BButton>
      <DomainFacturesFilter :clients="clients" :cas="cas" @emit-filter="emitFilter"></DomainFacturesFilter>
      <DomainFacturesTable :factures="filteredFactures" :cas="cas" :clients="clients" @delete-facture="deleteFacture" @copy-facture="showCopyFacture"/>
      <DomainAddFacture :modalAddFacture="modalAddFacture" :factures="factures" :clients="clients" :cas="cas" @add-facture="addFacture"></DomainAddFacture>
      <DomainCopyFacture :modalCopyFacture="modalCopyFacture" :facture="selectedFacture" @copy-facture="copyFacture"></DomainCopyFacture>

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
    console.log("add facture :", facture)
    createStateFacture(facture)
  }

  const deleteFacture = (id:string) => {
    id4Delete.value = id
    modal.value = !modal.value
  }
  const confirmDelete = () => {
    deleteStateFacture(id4Delete.value)
  }
  const showCopyFacture = (facture:IFacture) => {
    selectedFacture.value = facture
    modalCopyFacture.value.show = !modalCopyFacture.value.show
  }
  const copyFacture = (dateForm:Date) => {
    const newFacture = duplicateFacture(dateForm, selectedFacture.value, factures.value, getCasOptions(cas.value))
    console.log("copy facture :", newFacture)
    createStateFacture(newFacture)
  }

</script>