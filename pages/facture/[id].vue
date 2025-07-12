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
      :lignes="lignes" :idFac="facture.numFac">
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
    getStateFacture(id).then((facture) => {
      getStateLignes(facture.numFac)  
    })
    getStateFactures()
    getStateCas()
    getStateClients()
  })

  // watch lignes update and refresh the facture for update totals
  watch(lignes, (newLignes) => {
      if(newLignes) {
        getStateFacture(id)
            }
      }
      // { immediate: true }
    )

  // methods
  const updateFacture = () => {
    updateStateFacture(facture.value).then((newFacture) => {
      getStateLignes(newFacture.numFac)
    })
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
