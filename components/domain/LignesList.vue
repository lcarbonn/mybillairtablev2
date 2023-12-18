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
    // duplicate ligne to avoid state modification
    selectedLigne.value = Object.create(ligne) as ILigne
    modalShowLigne.value.show = !modalShowLigne.value.show
  }
  const deleteLigne = (ligneId:string) => {
    deleteStateLigne(ligneId)
  }

  const submitLigne = () => {
    updateStateLigne(selectedLigne.value)
  }

  const maxNumLigne = computed(() => {
    if(props.lignes) return getMaxNumLigne(props.lignes)
    else return 0
  })

</script>
