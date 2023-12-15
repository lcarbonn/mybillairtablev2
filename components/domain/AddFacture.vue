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
        @ok="submit"
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

  // local ref
  const facture = ref(new Facture())

  // methods
  const handleOk = () => {
      // Trigger submit handler
      //this.handleSubmit()
      return true
  }
  const submit = () => {

  }
  const cancel = () => {
    
  }

  
</script>
