<template>
  <div>
    <!-- <DomainFacturesFilter :clients="clients" :clientOptions="clientOptions" :cas="cas"
                          @emitFilter="emitFilter" ></DomainFacturesFilter>
    <DomainCopyFacture :facture="selectedFacture" @copyFacture="copyFacture"></DomainCopyFacture> -->
    <!-- <DomainFacturesTable :factures="factures" :clients="clients" :cas="cas" :filterShadow="filterShadow"
                          @showCopyFacture="showCopyFacture"
                          @deleteFacture="deleteFacture"></DomainFacturesTable> -->
    <DomainFacturesTable :factures="factures" :cas="cas"/>

  </div>
</template>

<script setup lang="ts">

    // props
    const props = defineProps({
        factures: {
            type: Array<IFacture>,
            default: undefined
        },
        cas: {
            type: Array<ICa>,
            default: undefined
        },
    })

</script>
