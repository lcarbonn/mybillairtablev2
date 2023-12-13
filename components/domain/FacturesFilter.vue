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
  const filter = ref()
  const filterCA = ref()
  const filterSearch = ref()

  // computed properties
  const casOptions = computed(() => {
    return genCaOptions()
  })

  // watch local refs udpates
  watch(filterCA, (newValue, oldValue) => {
    console.log("ca filter:"+newValue)
    filter.value = newValue? new String(newValue).toString():null
    emitFilter()
  })
  watch(filterSearch, (newValue, oldValue) => {
    console.log("search filter:"+newValue)
    filter.value = newValue
    emitFilter()
  })

  // methods
  const genCaOptions = () => {
        const opts:any[] = []
        const options = new Map()
        if(props.cas) props.cas.forEach(ca => {
          options.set(ca.year, ca.year)
        })
        options.forEach((value, key) => {
          opts.push({ value: key, text: value })
        })
        return opts
      }

  // emit the filter query
  const emitFilter = () => {
    emit('emitFilter', filter.value)
  }
</script>
