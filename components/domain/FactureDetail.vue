<template>
  <div>
    <p hidden>{{facture.numFac}}</p>
    <BContainer fluid>
      <BRow>
        <BCol lg="6" class="my-1">
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
        </BCol>
        <BCol lg="6" class="my-1">
          <BFormGroup
            label="Numéro Facture"
            label-for="num"
            label-cols-sm="3"
            label-size="sm"
            label-align-sm="left"
            class="mb-0"
          >
          <BInputGroup size="sm">
              <BFormInput id="num" v-model="numForm" type="number" :state="numState" placeholder="Saisir un chiffre"></BFormInput>
            </BInputGroup>
          </BFormGroup>
        </BCol>
        <BCol lg="6" class="my-1">
          <BFormGroup
            label="Commentaire"
            label-for="comment"
            label-cols-sm="3"
            label-size="sm"
            label-align-sm="left"
            class="mb-0"
          >
            <BInputGroup size="sm">
              <BFormInput id="comment" v-model="facture.comment" trim placeholder="Saisir un commentaire"></BFormInput>
            </BInputGroup>
          </BFormGroup>
        </BCol>
        <BCol lg="6" class="my-1">
          <BFormGroup
            label="Client"
            label-for="client"
            label-cols-sm="3"
            label-size="sm"
            label-align-sm="left"
            class="mb-0"
          >
            <BInputGroup size="sm">
              <BFormSelect id="client" v-model="clientForm" :options="clientsOptions" :state="clientState">
                <template #first>
                <BFormSelectOption :value="null" disabled>-- Choisir un client --</BFormSelectOption>
              </template>
              </BFormSelect>
            </BInputGroup>
          </BFormGroup>
        </BCol>
        <BCol lg="6" class="my-1">
          <BFormGroup
            label="Délai Réglement"
            label-for="dr"
            label-cols-sm="3"
            label-size="sm"
            label-align-sm="left"
            class="mb-0"
          >
            <BInputGroup size="sm" append="jrs">
              <BFormInput id="dr" v-model="facture.paymentDelay" readonly class="text-right"></BFormInput>
            </BInputGroup>
          </BFormGroup>
        </BCol>
        <BCol lg="6" class="my-1">
          <BFormGroup
            label="CA réel"
            label-for="ca"
            label-cols-sm="3"
            label-size="sm"
            label-align-sm="left"
            class="mb-0"
          >
            <BInputGroup size="sm">
              <BFormSelect id="ca" v-model="facture.ca" :options="casOptions" :state="caState">
                <template #first>
                  <BFormSelectOption :value="null" disabled>-- Choisir un CA --</BFormSelectOption>
                </template>
              </BFormSelect>
            </BInputGroup>
          </BFormGroup>
        </BCol>
        <BCol lg="6" class="my-1">
          <BFormGroup
            label="Taux TVA"
            label-for="tva"
            label-cols-sm="3"
            label-size="sm"
            label-align-sm="left"
            class="mb-0"
          >
            <BInputGroup size="sm">
              <BFormSelect id="tva" v-model="facture.tva" :options="tvaOptions" placeholder="Choisir un taux"></BFormSelect>
            </BInputGroup>
          </BFormGroup>
        </BCol>
        <BCol lg="6" class="my-1">
          <BFormGroup
            label="Statut"
            label-for="statut"
            label-cols-sm="3"
            label-size="sm"
            label-align-sm="left"
            class="mb-0"
          >
            <BInputGroup size="sm">
              <BFormSelect id="statut" v-model="facture.statut" :options="statusOptions" :state="payState">
                <template #first>
                  <BFormSelectOption :value="undefined" disabled>-- Choisir un status --</BFormSelectOption>
                </template>
              </BFormSelect>
              <template #append>
                  <b-button :disabled="!facture.statut" @click="facture.statut = undefined"><X/></b-button>
              </template>
            </BInputGroup>
          </BFormGroup>
        </BCol>
        <BCol lg="6" class="my-1">
          <BFormGroup
            label="Date Paiement"
            label-for="paydate"
            label-cols-sm="3"
            label-size="sm"
            label-align-sm="left"
            class="mb-0"
          >
            <BInputGroup size="sm">
              <VueDatePicker id="paydate"
                v-model="facture.payDate" 
                auto-apply 
                :enable-time-picker="false" 
                :state="payState"
                placeholder="Choisir une date"
                format="dd/MM/yyyy"
                locale="fr-FR"
                text-input></VueDatePicker>
            </BInputGroup>
          </BFormGroup>
        </BCol>
        <BCol lg="6" class="my-1">
          <BFormGroup
            label="Bon de commande"
            label-for="bdc"
            label-cols-sm="3"
            label-size="sm"
            label-align-sm="left"
            class="mb-0"
          >
            <BInputGroup size="sm">
              <BFormInput id="bdc" v-model="facture.bdc" trim placeholder="Bon de commande"></BFormInput>
            </BInputGroup>
          </BFormGroup>
        </BCol>
        <BCol lg="6" class="my-1">
          <BFormGroup
            label="Total HT"
            label-for="tht"
            label-cols-sm="3"
            label-size="sm"
            label-align-sm="left"
            class="mb-0"
          >
        <BInputGroup size="sm" append="€">
              <BFormInput id="tht" v-model="facture.totalHT" readonly class="text-right"></BFormInput>
            </BInputGroup>
          </BFormGroup>
        </BCol>
        <BCol lg="6" class="my-1">
          <BFormGroup
            label="Total TTC"
            label-for="tttc"
            label-cols-sm="3"
            label-size="sm"
            label-align-sm="left"
            class="mb-0"
          >
            <BInputGroup size="sm" append="€">
              <BFormInput id="tttc" v-model="facture.totalTTC" readonly class="text-right"></BFormInput>
            </BInputGroup>
          </BFormGroup>
        </BCol>
      </BRow>
    </BContainer>
  </div>
</template>

<script setup lang="ts">

  // import datepicker vue component
  import VueDatePicker from '@vuepic/vue-datepicker'
  import '@vuepic/vue-datepicker/dist/main.css'

  // icons
  import X from '~icons/bi/x'

  // props
  const props = defineProps({
      facture: {
          type: Facture,
          default: null
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

  // local refs
  const dateForm = ref(props.facture.date)
  const numForm = ref(props.facture.num)
  const clientForm = ref(props.facture.client)
  
  watch(() => props.facture, (newFacture) => {
    dateForm.value = newFacture.date
    numForm.value = newFacture.num
    clientForm.value = newFacture.client
  })

  // watch local refs udpates
  watch(dateForm, (newValue) => {
    if(newValue) {
      setFactureNums(props.facture, newValue)
      numForm.value = getMaxNum(props.factures, props.facture)
      if(props.facture && casOptions.value) {
        setFactureCA(props.facture, casOptions.value)
      }
    }
  })
  watch(numForm, (newValue) => {
    if(newValue) {
      setFactureNums(props.facture, undefined, newValue)
    }
    numForm.value = props.facture.num
  })
  watch(clientForm, (newValue) => {
    props.facture.client = newValue
    if(newValue) {
      if(props.clients) props.facture.paymentDelay = getPaymentDelay(props.clients, newValue)
      if(props.facture && casOptions.value) {
        setFactureCA(props.facture, casOptions.value)
      }
    }
  })

  // form state functions
  const dateState = computed(() => {
    return props.facture.date != null ? true:false
  })
  const numState = computed(() => {
    return props.facture.num != null ? true:false
  })
  const clientState = computed(() => {
    return props.facture.client != null ? true:false
  })
  const caState = computed(() => {
    return props.facture.ca != null ? true:false
  })
  const payState = computed(() => {
    return ((props.facture.statut == "Payée" && props.facture.payDate == null) || 
    (props.facture.payDate != null && props.facture.statut != "Payée")) ? false:true
  })

  // computed properties for select components
  const casOptions = computed(() => {
    if(props.cas) return getCasOptions(props.cas)
  })
  const clientsOptions = computed(() => {
    if(props.clients) return getClientsOptions(props.clients)
  })

</script>
