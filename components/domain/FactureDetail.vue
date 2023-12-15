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
              <BFormDatepicker id="datepicker" v-model="dateForm" placeholder="Choisir une date" :state="dateState"></BFormDatepicker>
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
              <BInputGroup-append>
                  <b-button :disabled="!facture.statut" @click="facture.statut = undefined"><X/></b-button>
              </BInputGroup-append>
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
              <BFormDatepicker size="sm" id="paydate" v-model="facture.payDate" :state="payState" placeholder="Choisir une date"></BFormDatepicker>
              <BInputGroup-append>
                  <b-button :disabled="!facture.payDate" @click="facture.payDate = undefined"><X/></b-button>
              </BInputGroup-append>

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

  const dateState = computed(() => {
    return props.facture.date != null ? true:false
  })
  const numState = computed(() => {
    return (props.facture.num != null && props.facture.num != "")  ? true:false
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

  const dateForm = computed(() => {
    return props.facture.date
  })
  const clientForm = computed(() => {
    return props.facture.client
  })
  const numForm = computed(() => {
    return props.facture.num
  })

  const casOptions = computed(() => {
    if(props.cas) return getCasOptions(props.cas)
  })
  const clientsOptions = computed(() => {
    if(props.clients) return getClientsOptions(props.clients)
  })

</script>
