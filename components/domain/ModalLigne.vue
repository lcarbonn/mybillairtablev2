<template>
  <div>
      <BModal
        v-model="modalShowLigne.show"
        id="modal-ligne"
        title="Information Ligne"
        centered
        header-bg-variant="info"
        size="lg"
        cancel-title="Annuler"
        ok-title="Ok"
        @ok.prevent="preventOk">
          <BCard v-if="ligne" :title="ligneTitle">
            <BCardText>
              <DomainLigneDetail v-if="ligne" :ligne="ligne" :maxNumLigne="maxNumLigne"></DomainLigneDetail>
            </BCardText>
          </BCard>
      </BModal>
  </div>
</template>

<script setup lang="ts">

  // props
  const props = defineProps({
    modalShowLigne: {
      type: ModalShow,
      default: new ModalShow()
    },
    ligne: {
        type: Ligne,
        default: undefined
    },
    maxNumLigne:Number
  })

  // emits declaration
  const emit = defineEmits(['submitLigne'])

  const ligneTitle = computed(() => {
    let title = 'Ligne : '
    if(props.ligne?.numFacLigne) title += props.ligne.numFacLigne
    return title
  })


  // methods
  const preventOk = () => {
    props.modalShowLigne.show = false
    submit()
  }
  const submit = () => {
    emit('submitLigne')
  }
  
</script>
