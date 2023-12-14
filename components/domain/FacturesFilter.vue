<template>
  <div>
    <BRow>
      <BCol lg="4" class="my-1">
        <BForm-group
          label="Année CA"
          label-for="filter-ca"
        >
        <BInput-group size="sm">
              <BForm-select
                id="filter-ca"
                v-model="filterCA"
                :options="casOptions"
              >
              <template #first>
                <BForm-select-option :value="null">-- Choisir une année de CA --</BForm-select-option>
              </template>
            </BForm-select>
              <BInput-group-append>
                <BButton :disabled="!filterCA" @click="filterCA = null"><X/></BButton>
              </BInput-group-append>
            </BInput-group>
        </BForm-group>
      </BCol>
      <BCol lg="4" class="my-1">
        <BForm-group
          label="Client"
          label-for="filter-client"
        >
        <BInput-group size="sm">
              <BForm-select
                id="filter-client"
                v-model="filterClient"
                :options="clientsOptions"
              >
              <template #first>
                <BForm-select-option :value="null">-- Choisir un client --</BForm-select-option>
              </template>
            </BForm-select>
              <BInput-group-append>
                <b-button :disabled="!filterClient" @click="filterClient = null"><X/></b-button>
              </BInput-group-append>
            </BInput-group>
        </BForm-group>
      </BCol>
      <BCol lg="4" class="my-1">
        <BForm-group
          label="Commentaire"
          label-for="filter-input"
        >
          <BInput-group size="sm">
            <BForm-input
              id="filter-input"
              v-model="filterSearch"
              type="search"
              placeholder="Chercher..."
            ></BForm-input>
            <BInput-group-append>
              <BButton :disabled="!filterSearch" @click="filterSearch = null"><X/></BButton>
            </BInput-group-append>
          </BInput-group>
        </BForm-group>
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
  const filterCA = ref()
  const filterClient = ref()
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
    filter.value.client = newValue
    emitFilter()
  })

  // emit the filter query
  const emitFilter = () => {
    emit('emitFilter')
  }
</script>
