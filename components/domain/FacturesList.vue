<template>
  <div>
    <!-- <DomainFacturesFilter :clients="clients" :clientOptions="clientOptions" :cas="cas"
                          @emitFilter="emitFilter" ></DomainFacturesFilter>
    <DomainCopyFacture :facture="selectedFacture" @copyFacture="copyFacture"></DomainCopyFacture> -->
    <!-- <DomainFacturesTable :factures="factures" :clients="clients" :cas="cas" :filterShadow="filterShadow"
                          @showCopyFacture="showCopyFacture"
                          @deleteFacture="deleteFacture"></DomainFacturesTable> -->
    <div v-for="facture in factures"
      :key="facture.id">
      <p>{{ facture.numFac }}</p>
    </div>

  </div>
</template>

<script setup lang="ts">

    // props
    const props = defineProps({
        factures: {
            type: Array<IFacture>,
            default: undefined
        },
    })

</script>
