<template>
  <div>
      <BModal
        v-model="modalAddFacture.show"
        id="modal-facture"
        title="Ajouter Facture"
        centered
        header-bg-variant="info"
        size="lg"
        cancel-title="Annuler"
        ok-title="Ajouter"
        @ok.prevent="preventOk"
        @cancel="cancel">
          <BCard v-if="facture" :title="'Facture : '+facture.numFac">
            <BCardText>
              <DomainFactureDetail :facture="facture" :factures="factures" :clients="clients" :cas="cas"></DomainFactureDetail>
            </BCardText>
          </BCard>
      </BModal>
  </div>
</template>

<script setup lang="ts">

  // props
  const props = defineProps({
      modalAddFacture: {
          type: ModalShow,
          default: new ModalShow()
      },
      factures: {
          type: Array<IFacture>,
          default: undefined
      },
      clients: {
          type: Array<IClient>,
          default: undefined
      },
      cas: {
          type: Array<ICa>,
          default: undefined
      },
  })

  // emits declaration
  const emit = defineEmits(['addFacture'])

  // local ref
  const facture = ref(new Facture())

  // methods
  const isFactureValide = () => {
      const valid = Boolean(facture.value.date && facture.value.num && facture.value.client && facture.value.ca)
      return valid
  }

  const preventOk = () => {
    if(isFactureValide()) {
      props.modalAddFacture.show = false
      submit()
    }
  }
  const submit = () => {
    emit('addFacture', facture.value)
  }
  const cancel = () => {
    facture.value = new Facture()
  }
  
</script>
