<template>
  <div>
      <BModal
      v-model="modalCopyFacture.show"
      id="modal-copy"
      :title="title"
      centered
      header-bg-variant="info"
      size="lg"
      cancel-title="Annuler"
      ok-title="Copier"
      @ok.prevent="preventOk"
      @cancel="cancel">
        <BCard>
          <BCardText>
            <BFormGroup
              label="Date Facture"
              label-for="datepicker"
              label-cols-sm="3"
              label-size="sm"
              label-align-sm="left"
              class="mb-0"
            >
              <BInputGroup size="sm">
                <VueDatePicker id="datepicker"
                v-model="dateForm" 
                auto-apply 
                :enable-time-picker="false" 
                :state="dateState"
                placeholder="Choisir une date"
                format="dd/MM/yyyy"
                locale="fr-FR"
                text-input></VueDatePicker>
              </BInputGroup>
            </BFormGroup>
          </BCardText>
        </BCard>
      </BModal>
  </div>
</template>

<script setup lang="ts">

  // import datepicker vue component
  import VueDatePicker from '@vuepic/vue-datepicker'
  import '@vuepic/vue-datepicker/dist/main.css'

  // props
  const props = defineProps({
    modalCopyFacture: {
        type: ModalShow,
        default: new ModalShow()
    },

    facture: {
        type: Facture,
        default: null
    },
  })

  // emits declaration
  const emit = defineEmits(['copyFacture'])

  // local refs
  const dateForm = ref()

  // computed properties
  const title = computed(() => {
    if(props.facture) return "Dupliquer Facture " + props.facture.numFac + ' ' + props.facture.comment
      else return "Dupliquer Facture"
  })
  const dateState = computed(() => {
    return dateForm.value != null ? true:false
  })

  const preventOk = () => {
    if(dateForm.value) {
      props.modalCopyFacture.show = false
      submit()
    }
  }
  const submit = () => {
    emit('copyFacture', dateForm.value)
  }
  const cancel = () => {
    dateForm.value = undefined
  }

</script>
