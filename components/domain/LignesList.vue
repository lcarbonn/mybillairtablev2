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
    <DomainModalLigne v-if="selectedLigne" :ligne="selectedLigne" :modalShowLigne="modalShowLigne" :maxNumLigne="maxNumLigne" @submitLigne="submitLigne"></DomainModalLigne>
    <BModal v-model="modal" title="Supprimer Ligne" @ok="confirmDelete"> Vraiment ? </BModal>
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
  const modal = ref(false)
  const id4Delete = ref()

  // methods
  const updateLigne = (ligne:ILigne) => {
    // duplicate ligne to avoid state modification
    selectedLigne.value = Object.create(ligne) as ILigne
    modalShowLigne.value.show = !modalShowLigne.value.show
  }
  const deleteLigne = (ligneId:string) => {
    id4Delete.value = ligneId
    modal.value = !modal.value
  }
  const confirmDelete = () => {
    if(id4Delete.value) deleteStateLigne(id4Delete.value)
    id4Delete.value = null
  }

  const submitLigne = () => {
    updateStateLigne(selectedLigne.value)
  }

  const maxNumLigne = computed(() => {
    if(props.lignes) return getMaxNumLigne(props.lignes)
    else return 0
  })

</script>
