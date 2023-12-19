<template>
  <div>
    <DomainFacture v-if="facture"
      :facture="facture"
      :factures="factures" 
      :clients="clients"
      :cas="cas"
      @updateFacture="updateFacture"
      @deleteFacture="deleteFacture"
      @resetFacture="resetFacture">
    </DomainFacture>
    <div v-else><BSpinner/></div>
    <DomainLignesList v-if="facture && lignes"
      :lignes="lignes" :idFac="facture.id">
    </DomainLignesList>
    <div v-else><BSpinner/></div>
  </div>
</template>

<script setup lang="ts">

    // const
    const id:string = useRoute().params.id as string

  // stated properties
  const facture = useFacture()
  const factures = useFactures()
  const cas = useCas()
  const clients = useClients()
  const lignes = useLignes()

  // nuxt hook
  onMounted(() => {
    getStateFacture(id)
    getStateFactures()
    getStateCas()
    getStateClients()
  })

  watch(facture, (newFacture) => {
    getStateLignes(newFacture.numFac)
  })

  // methods
  const updateFacture = () => {
    updateStateFacture(facture.value)
  }
  const deleteFacture = () => {
    deleteStateFacture(facture.value)
    navigateTo('/')
  }
  const resetFacture = () => {
    getStateFacture(id)
    messageToSnack("Facture reset")
  }

</script>
