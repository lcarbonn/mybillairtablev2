<template>
  <div>
    <BTable
      striped
      hover
      stacked="md"
      :items="factures"></BTable>

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
