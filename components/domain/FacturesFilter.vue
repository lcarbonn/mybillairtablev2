<template>
  <div>
    <BRow>
      <BCol lg="4" class="my-1">
        <BFormGroup
          label="Année CA"
          label-for="filter-ca"
        >
        <BInputGroup size="sm">
              <BFormSelect
                id="filter-ca"
                v-model="filterCA"
                :options="casOptions"
              >
              <template #first>
                <BFormSelectOption :value="null" disabled>-- Choisir une année de CA --</BFormSelectOption>
              </template>
            </BFormSelect>
              <BInputGroupAppend>
                <BButton :disabled="!filterCA" @click="filterCA = null" ><X/></BButton>
              </BInputGroupAppend>
            </BInputGroup>
        </BFormGroup>
      </BCol>
      <BCol lg="4" class="my-1">
        <BFormGroup
          label="Client"
          label-for="filter-client"
        >
        <BInputGroup size="sm">
              <BFormSelect
                id="filter-client"
                v-model="filterClient"
                :options="clientsOptions"
              >
              <template #first>
                <BFormSelectOption :value="null" disabled>-- Choisir un client --</BFormSelectOption>
              </template>
            </BFormSelect>
              <BInputGroupAppend>
                <BButton :disabled="!filterClient" @click="filterClient = null" ><X/></BButton>
              </BInputGroupAppend>
            </BInputGroup>
        </BFormGroup>
      </BCol>
      <BCol lg="4" class="my-1">
        <BFormGroup
          label="Statut"
          label-for="filter-status"
        >
        <BInputGroup size="sm">
              <BFormSelect
                id="filter-status"
                v-model="filterStatus"
                :options="statusOptions"
              >
              <template #first>
                <BFormSelectOption :value="null" disabled>-- Choisir un statut --</BFormSelectOption>
              </template>
            </BFormSelect>
              <BInputGroupAppend>
                <BButton :disabled="!filterStatus" @click="filterStatus = null" ><X/></BButton>
              </BInputGroupAppend>
            </BInputGroup>
        </BFormGroup>
      </BCol>
      <BCol lg="4" class="my-1">
        <BFormGroup
          label="Année Facture"
          label-for="filter-date"
        >
        <BInputGroup size="sm">
              <BFormSelect
                id="filter-date"
                v-model="filterDate"
                :options="casOptions"
              >
              <template #first>
                <BFormSelectOption :value="null">-- Choisir une année --</BFormSelectOption>
              </template>
            </BFormSelect>
              <BInputGroupAppend>
                <BButton :disabled="!filterDate" @click="filterDate = null" ><X/></BButton>
              </BInputGroupAppend>
            </BInputGroup>
        </BFormGroup>
      </BCol>
      <BCol lg="4" class="my-1">
        <BFormGroup
          label="Commentaire"
          label-for="filter-input"
        >
          <BInputGroup size="sm">
            <BFormInput
              id="filter-input"
              v-model="filterSearch"
              type="search"
              placeholder="Chercher..."
            ></BFormInput>
            <BInputGroupAppend>
              <BButton :disabled="!filterSearch" @click="filterSearch = null" ><X/></BButton>
            </BInputGroupAppend>
          </BInputGroup>
        </BFormGroup>
      </BCol>
      <BCol lg="4" class="my-1">
        <BFormGroup
          label="Filtre"
          label-for="filter">
        <BButton id="filter" size="sm" :disabled="!filter" @click="resetAllFilter" >Effacer tous les filtres</BButton>
      </BFormGroup>
      </BCol>
    </BRow>
  </div>
</template>

<script setup lang="ts">

  // icons
  import X from '~icons/bi/x'

  // props
  const props = defineProps({
      cas: {
          type: Array<ICa>,
          default: undefined
      },
      clients: {
            type: Array<IClient>,
            default: undefined
        },
  })

  // emits declaration
  const emit = defineEmits(['emitFilter'])

  // local ref properties
  const filterCA = ref(null)
  const filterClient = ref(null)
  const filterStatus = ref(null)
  const filterDate = ref(null)
  const filterSearch = ref()

  // state managed properties
  const filter = useFilter()

  // computed properties
  const casOptions = computed(() => {
    if(props.cas) return getCaYearsOptions(props.cas)
  })
  const clientsOptions = computed(() => {
    if(props.clients) return getClientsOptions(props.clients)
  })

  // watch local refs udpates
  watch(filterCA, (newValue, oldValue) => {
    prepEmit(newValue, "ca", "ca filter:")
  })
  watch(filterSearch, (newValue, oldValue) => {
    prepEmit(newValue, "search", "search filter:")
  })
  watch(filterClient, (newValue, oldValue) => {
    prepEmit(newValue, "client", "client filter:")
  })
  watch(filterStatus, (newValue, oldValue) => {
    prepEmit(newValue, "statut", "status filter:")

  })
  watch(filterDate, (newValue, oldValue) => {
    prepEmit(newValue, "date", "date filter:")
  })

  const prepEmit= (newValue:any, filterName:string, log?:string) => {
    if(log) console.log(log,":",newValue)
    switch (filterName) {
      case "ca":
        filter.value.ca = newValue? new String(newValue).toString():undefined
        break;
      case "client":
      filter.value.client = newValue? newValue:undefined
      break;
      case "statut":
      filter.value.statut = newValue? newValue:undefined
      break;
      case "search":
      filter.value.search = newValue? newValue:undefined
      break;
      case "date":
      filter.value.date = newValue? new Number(newValue).valueOf() :undefined
      break;
    
      default:
        break;
    }
    emitFilter()
  }
  // emit the filter query
  const emitFilter = () => {
    emit('emitFilter')
  }
  // reset the filters
  const resetAllFilter = () => {
    filterCA.value = null
    filterDate.value = null
    filterClient.value = null
    filterSearch.value = null
    filterStatus.value = null
  }

</script>
