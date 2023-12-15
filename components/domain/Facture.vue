<template>
  <div>
      <BCard v-if="facture" :title="'Facture : '+facture.numFac">
        <BCard-text>
          <DomainFactureDetail :facture.sync="facture" :factures="factures" :clients="clients" :cas="cas"></DomainFactureDetail>
        </BCard-text>
        <b-button @click="updateFacture" size="sm" v-b-tooltip.hover title="Enregistrer"><Save/></b-button>
        <b-button @click="deleteFacture" size="sm" v-b-tooltip.hover title="Supprimer"><Trash/></b-button>
        <b-button @click="resetFacture" size="sm" v-b-tooltip.hover title="Annuler"><Reset/></b-button>
      </BCard>
  </div>
</template>

<script setup lang="ts">

  // icons
  import Save from '~icons/bi/save'
  import Trash from '~icons/bi/trash'
  import Reset from '~icons/bi/arrow-counterclockwise'

  // props
  const props = defineProps({
    facture: {
        type: Facture,
        default: undefined
    },
    factures: {
        type: Array<IFacture>,
        default: undefined
    },
    cas: {
        type: Array<ICa>,
        default: undefined
    },
    clients: {
          type: Array<IClient>,
          default: undefined
    }
  })

  // emits declaration
  const emit = defineEmits(['updateFacture', 'deleteFacture', 'resetFacture'])

  // methods
  const updateFacture = () => {
    emit('updateFacture')
  }
  const deleteFacture = () => {
    emit('deleteFacture')
  }
  const resetFacture = () => {
    emit('resetFacture')
  }

</script>
