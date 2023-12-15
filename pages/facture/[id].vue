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
    <span v-else>Non such bill</span>
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

  // nuxt hook
  onMounted(() => {
    getStateFacture(id)
    getStateFactures()
    getStateCas()
    getStateClients()
  })

  // methods
  const updateFacture = () => {
    updateStateFacture(facture.value)
  }
  const deleteFacture = () => {
    deleteStateFacture(facture.value.id)
    navigateTo('/')
  }
  const resetFacture = () => {
    getStateFacture(id)
    messageToSnack("Facture reset")
  }

</script>
