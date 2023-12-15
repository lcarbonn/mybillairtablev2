<template>
  <div>
      <BCard v-if="facture" :title="'Facture : '+facture.numFac">
        <BCard-text>
          <DomainFactureDetail :facture="facture" :factures="factures" :clients="clients" :cas="cas"></DomainFactureDetail>
        </BCard-text>
        <b-button class="mx-1" @click="updateFacture" size="sm"><Save/></b-button>
        <b-button class="mx-1" @click="deleteFacture" size="sm" ><Trash/></b-button>
        <b-button class="mx-1" @click="resetFacture" size="sm" ><Reset/></b-button>
      </BCard>
      <BModal v-model="modal" title="Supprimer Facture" @ok="confirmDelete"> Vraiment ? </BModal>
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

  // local refs
  const modal = ref(false)

  // methods
  const updateFacture = () => {
    emit('updateFacture')
  }
  const deleteFacture = () => {
    modal.value = !modal.value
  }
  const confirmDelete = () => {
    emit('deleteFacture')
  }
  const resetFacture = () => {
    emit('resetFacture')
  }

</script>
