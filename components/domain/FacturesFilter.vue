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
              <BInputGroup-append>
                <BButton :disabled="!filterCA" @click="filterCA = null"><X/></BButton>
              </BInputGroup-append>
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
              <BInputGroup-append>
                <b-button :disabled="!filterClient" @click="filterClient = null"><X/></b-button>
              </BInputGroup-append>
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
              <BInputGroup-append>
                <b-button :disabled="!filterStatus" @click="filterStatus = null"><X/></b-button>
              </BInputGroup-append>
            </BInputGroup>
        </BFormGroup>
      </BCol>      
      <BCol lg="4" class="my-1">
        <BFormGroup
          label="Commentaire"
          label-for="filter-input"
        >
          <BInputGroup size="sm">
            <BForm-input
              id="filter-input"
              v-model="filterSearch"
              type="search"
              placeholder="Chercher..."
            ></BForm-input>
            <BInputGroup-append>
              <BButton :disabled="!filterSearch" @click="filterSearch = null"><X/></BButton>
            </BInputGroup-append>
          </BInputGroup>
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
  const filterSearch = ref()

  // state managed properties
  const filter = useFilter()

  // computed properties
  const casOptions = computed(() => {
    if(props.cas) return getCasOptions(props.cas)
  })
  const clientsOptions = computed(() => {
    if(props.clients) return getClientsOptions(props.clients)
  })

  // watch local refs udpates
  watch(filterCA, (newValue, oldValue) => {
    console.log("ca filter:"+newValue)
    filter.value.ca = newValue? new String(newValue).toString():undefined
    emitFilter()
  })
  watch(filterSearch, (newValue, oldValue) => {
    console.log("search filter:"+newValue)
    filter.value.search = newValue
    emitFilter()
  })
  watch(filterClient, (newValue, oldValue) => {
    console.log("client filter:"+newValue)
    filter.value.client = newValue?newValue:undefined
    emitFilter()
  })
  watch(filterStatus, (newValue, oldValue) => {
    console.log("status filter:"+newValue)
    filter.value.statut = newValue?newValue:undefined
    emitFilter()
  })

  // emit the filter query
  const emitFilter = () => {
    emit('emitFilter')
  }
</script>
