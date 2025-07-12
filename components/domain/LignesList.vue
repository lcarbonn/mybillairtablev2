<template>
  <div>
    <BButton class="m-3" @click="addNewLigne">Ajouter ligne</BButton>
    <BTable
      striped
      hover
      stacked="md"
      :items="lignes"
      :fields="(fields as TableField[])"
    >
      <template #cell(id)="data">
        <BButton @click="updateLigne(data.item as ILigne)" size="sm"><Pen/></BButton>
        <BButton @click="deleteLigne(data.value as string)" size="sm"><Trash/></BButton>
        <BButton @click="copyLigne(data.item as ILigne)" size="sm"><Copy/></BButton>
      </template>
    </BTable>
    <LazyDomainModalLigne v-if="selectedLigne" :ligne="selectedLigne" :modalShowLigne="modalShowLigne" :maxNumLigne="maxNumLigne" @submitLigne="submitLigne"></LazyDomainModalLigne>
    <BModal v-model="modal" title="Supprimer Ligne" @ok="confirmDelete"> Vraiment ? </BModal>
  </div>
</template>

<script setup lang="ts">

  // icons
  import type { TableField } from 'bootstrap-vue-next';
  import Pen from '~icons/bi/pen'
  import Trash from '~icons/bi/trash'
  import Copy from '~icons/bi/copy'
  // props
  const props = defineProps({
    lignes: {
        type: Array<ILigne>,
        default: undefined
    },
    idFac: {
      type:String,
      default: undefined
    }
  })

    // const fields
    const fields = [
      {
        key: 'numFacLigne',
        label: 'Num Fac Ligne',
        sortable: true
        },
      {
        key: 'ligne',
        label: 'Ligne',
      },
      {
        key: 'libelle',
        label: 'Libellé',
      },
      {
        key: 'puHT',
        label: 'Pu HT',
      },
      {
        key: 'typePU',
        label: 'Type PU',
      },
      {
        key: 'quantite',
        label: 'Quantité',
      },
      {
        key: 'totalHT',
        label: 'Total HT',
      },
      {
        key: 'id',
        label: 'Actions'
      }
    ]

  // local refs
  const selectedLigne = ref()
  const modalShowLigne = ref(new ModalShow())
  const modal = ref(false)
  const id4Delete = ref()
  const isNewLigne = ref(false)

  // computed properties
  const maxNumLigne = computed(() => {
    if(props.lignes) return getMaxNumLigne(props.lignes)
    else return 0
  })

  // methods
  // ask modal for updating ligne
  const updateLigne = (ligne:ILigne) => {
    // duplicate ligne to avoid state modification
    selectedLigne.value = Object.create(ligne) as ILigne
    modalShowLigne.value.show = !modalShowLigne.value.show
    isNewLigne.value = false
  }
  // ask before delete
  const deleteLigne = (ligneId:string) => {
    id4Delete.value = ligneId
    modal.value = !modal.value
  }
  // confirmation received for delete
  const confirmDelete = () => {
    if(id4Delete.value) deleteStateLigne(id4Delete.value)
    id4Delete.value = null
  }

  // ask modal for add ligne
  const addNewLigne = () => {
    const ligne = new Ligne()
    if(props.idFac)ligne.numFac = props.idFac
    selectedLigne.value = ligne
    modalShowLigne.value.show = !modalShowLigne.value.show
    isNewLigne.value = true
  }

  // confirmation received and save or update the ligne detail after modal
  const submitLigne = () => {
    if(!isNewLigne.value) updateStateLigne(selectedLigne.value)
    else  createStateLigne(selectedLigne.value)
  }

  // copy ligne and show ligne modal for detail
  const copyLigne = (ligne:ILigne) => {
    const newLine = new Ligne()
    newLine.numFac = ligne.numFac
    newLine.ligne = Number(maxNumLigne.value)
    newLine.libelle = "DUPLICATE " + ligne.libelle
    newLine.puHT = ligne.puHT
    newLine.typePU = ligne.typePU
    createStateLigne(newLine).then((createdLigne) => {
      selectedLigne.value = createdLigne
      isNewLigne.value = false
      modalShowLigne.value.show = !modalShowLigne.value.show
    })
  } 

</script>
