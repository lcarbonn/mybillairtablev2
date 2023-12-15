<template>
  <div>
      <BCard v-if="facture" :title="'Facture : '+facture.numFac">
        <BCard-text>
          <DomainFactureDetail :facture.sync="facture" :factures="factures" :clients="clients" :cas="cas"></DomainFactureDetail>
        </BCard-text>
        <!-- <b-button @click="updateFacture()" size="sm" v-b-tooltip.hover title="Enregistrer"><b-icon icon="save"/></b-button>
        <b-button @click="deleteFacture()" size="sm" v-b-tooltip.hover title="Supprimer"><b-icon icon="trash"/></b-button>
        <b-button @click="resetFacture()" size="sm" v-b-tooltip.hover title="Annuler"><b-icon icon="arrow-counterclockwise"/></b-button> -->
      </BCard>
  </div>
</template>

<script setup lang="ts">

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

// import { BIcon, BIconSave, BIconArrowCounterclockwise, BIconTrash } from 'bootstrap-vue'

// export default {
//   name: 'FactureComp',
//   components: {
//     BIcon,
//     BIconArrowCounterclockwise,
//     BIconSave,
//     BIconTrash
//   },

//   props: {
//     facture:null,
//     factures:null,
//     clients:null,
//     clientOptions:null,
//     cas:null
//   },
//   data: () => ({
//     facture:null
//   }),
//   watch: {
//     // to copy facture for mutation constraints
//     facture(newFacture, oldFacture) {
//       if (!this.facture && newFacture) {
//         this.facture = JSON.parse(JSON.stringify(newFacture))
//       }
//     }
//   },
//   methods: {
//     checkFormValidity() {
//       const valid = (this.facture.date !=null &&
//        this.facture.num !=null &&
//         this.facture.client !=null &&
//          this.facture.ca !=null)
//       return valid
//     },    
//     updateFacture() {
//       if(this.checkFormValidity()) {
//         this.$emit("updateFacture", this.facture)
//       }
//     },
//     deleteFacture() {
//       if(confirm("Vraiment ?")) this.$emit("deleteFacture", this.facture)
//     },
//     resetFacture() {
//       // reset to props
//       this.facture = JSON.parse(JSON.stringify(this.facture))
//     }
//   }
// }
</script>
