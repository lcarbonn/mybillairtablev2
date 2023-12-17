<template>
  <div>
    <BTable
      striped
      hover
      stacked="md"
      :items="lignes"
    >
      <template #cell(id)="data">
        <BButton @click="updateLigne(data.value)" size="sm"><Pen/></BButton>
        <BButton @click="deleteLigne(data.value)" size="sm"><Trash/></BButton>
      </template>
    </BTable>
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

  // methods
  const updateLigne = (ligneId:any) => {

  }
  const deleteLigne = (ligneId:any) => {

}
</script>
