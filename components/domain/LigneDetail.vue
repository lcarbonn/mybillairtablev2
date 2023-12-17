<template>
  <div>
    <p hidden>id : {{ligne.id}}</p>
    <BContainer fluid>
      <BRow>
        <BCol lg="6" class="my-1">
          <BFormGroup
            label="Numéro Ligne"
            label-for="ligne"
            label-cols-sm="3"
            label-size="sm"
            label-align-sm="left"
            class="mb-0"
          >
            <BInputGroup size="sm">
              <BFormInput id="ligne" v-model="numLigne" type="number" placeholder="Ligne" :state="ligneState"></BFormInput>
            </BInputGroup>
          </BFormGroup>
        </BCol>
        <BCol lg="6" class="my-1">
          <BFormGroup
            label="Libellé"
            label-for="libelle"
            label-cols-sm="3"
            label-size="sm"
            label-align-sm="left"
            class="mb-0"
          >
            <BInputGroup size="sm">
              <BFormInput id="libelle" v-model="ligne.libelle" trim placeholder="Libellé"></BFormInput>
            </BInputGroup>
          </BFormGroup>
        </BCol>
        <BCol lg="6" class="my-1">
          <BFormGroup
            label="PU HT"
            label-for="puHT"
            label-cols-sm="3"
            label-size="sm"
            label-align-sm="left"
            class="mb-0"
          >
            <BInputGroup size="sm">
              <BFormInput id="puHT" v-model="ligne.puHT" :number=true type="number" placeholder="PU HT" :state="puhtState"></BFormInput>
            </BInputGroup>
          </BFormGroup>
        </BCol>
        <BCol lg="6" class="my-1">
          <BFormGroup
            label="Type PU"
            label-for="puH"
            label-cols-sm="3"
            label-size="sm"
            label-align-sm="left"
            class="mb-0"
          >
            <BInputGroup size="sm">
              <BForm-select id="puH" v-model="ligne.typePU" :options="typePUs" :state="typePUState">
              </BForm-select>
            </BInputGroup>

          </BFormGroup>
        </BCol>
      </BRow>
    </BContainer>
  </div>
</template>

<script setup lang="ts">

  // props
  const props = defineProps({
    ligne: {
      type: Ligne,
      default: null
    },
    maxNumLigne: {
      type: Number,
      default: 0
    }
  })

  // local const
  const typePUs = [
      { value: "undefined", text: 'Choisir une option', disabled: true },
      { value: "heure", text: 'Heure' },
      { value: "forfait", text: 'Forfait' },
      { value: "jour", text: 'Jour' }
    ]

  // local refs
  const ligneState = ref(false)
  const numLigne = ref(props.ligne.ligne)

  // form state functions
  const puhtState = computed(() => {
    return (props.ligne.puHT != null && props.ligne.puHT >= 0) ? true:false
  })
  const typePUState = computed(() => {
    return (props.ligne.typePU != null && props.ligne.typePU != "undefined") ? true:false
  })

  // watch local refs udpates
  watch(numLigne, (newValue) => {
    if(newValue) {
    }
  })

</script>
