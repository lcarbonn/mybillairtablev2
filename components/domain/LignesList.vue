<template>
  <div>
    <BTable
      striped
      hover
      stacked="md"
      :items="lignes"
    >
      <template #cell(id)="data">
        <BButton @click="updateLigne(data.item as ILigne)" size="sm"><Pen/></BButton>
        <BButton @click="deleteLigne(data.value as string)" size="sm"><Trash/></BButton>
      </template>
    </BTable>
    <DomainModalLigne :ligne="selectedLigne" :modalShowLigne="modalShowLigne"></DomainModalLigne>
  </div>
</template>

<script setup lang="ts">

  // icons
  import Pen from '~icons/bi/pen'
  import Trash from '~icons/bi/trash'

  // props
  const props = defineProps({
    lignes: {
        type: Array<ILigne>,
        default: undefined
    }
  })

  // local refs
  const selectedLigne = ref()
  const modalShowLigne = ref(new ModalShow())

  // methods
  const updateLigne = (ligne:ILigne) => {
    selectedLigne.value = ligne
    modalShowLigne.value.show = !modalShowLigne.value.show
  }
  const deleteLigne = (ligneId:string) => {

}
</script>
