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
        @ok.prevent="preventOk"
        @cancel="cancel">
          <BCard v-if="ligne" :title="'Ligne : '+ligne.numFacLigne">
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
  const emit = defineEmits(['addLigne'])

  // local ref

  // methods
  const isLigneValide = () :boolean => {
      // const valid = Boolean(facture.value.date && facture.value.num && facture.value.client && facture.value.ca)
      // return valid
      return false
  }

  const preventOk = () => {
    if(isLigneValide()) {
      props.modalShowLigne.show = false
      submit()
    }
  }
  const submit = () => {
    // emit('addLigne', props.ligne)
  }
  const cancel = () => {
    //reset ligne
  }
  
</script>
