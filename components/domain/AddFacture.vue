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
        v-modal="handleOk"
        @ok="submit"
        @cancel="cancel">
          <BCard v-if="facture" :title="'Facture : '+facture.numFac">
            <BCardText>
              <DomainFactureDetail :facture.sync="facture" :factures="factures" :clients="clients" :clientOptions="clientOptions" :cas="cas"></DomainFactureDetail>
            </BCardText>
          </BCard>
      </BModal>
  </div>
</template>

<script setup lang="ts">

  // props
  const props = defineProps({
      modalAddFacture: Object,
      factures: {
          type: Array<IFacture>,
          default: undefined
      },
      clients: {
            type: Array<IClient>,
            default: undefined
        },
  })

  // local ref
  const facture = ref()

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
