<template>
  <div>
    <DomainFacture
      :facture="facture"
      :factures="factures" 
      :clients="clients"
      :cas="cas">
    </DomainFacture>
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
    getFacture(id)
    getFactures()
    getCas()
    getClients()
  })

</script>
