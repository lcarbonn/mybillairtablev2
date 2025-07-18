<template>
  <div>
    <BRow>
      <BCol lg="4" class="my-1">
        <BPagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              size="sm"></BPagination>
      </BCol>
      <BCol lg="4" class="my-1">
        <span>Total HT : {{ totalHT }}€</span>
      </BCol>
    </BRow>    

    <BTable
      striped
      hover
      stacked="md"
      :fields="(fields as TableField[])"
      :items="factures"
      :current-page="currentPage"
      :per-page="perPage"
      :busy="isBusy">
      <template #cell(id)="data">
        <BButton @click="navigateTo('/facture/'+data.value)" size="sm" tilte="Détail"><Pen/></BButton>
        <BButton class="mx-1" @click="deleteFacture(data.item as IFacture)" size="sm" ><Trash/></BButton>
        <BButton @click="copyFacture(data.item as IFacture)" size="sm"><Copy/></BButton>
      </template>
      <template #table-busy>
        <div class="text-center text-danger my-2">
          <BSpinner class="align-middle" />
          <strong>Loading...</strong>
        </div>
      </template>
    </BTable>
  </div>
</template>

<script setup lang="ts">
import type { TableField } from 'bootstrap-vue-next';

  // icons
  import Pen from '~icons/bi/pen'
  import Trash from '~icons/bi/trash'
  import Copy from '~icons/bi/copy'

  // props
  const props = defineProps({
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

  // emits declaration
  const emit = defineEmits(['deleteFacture', 'copyFacture'])

  // const fields
  const fields = [
      {
        key: 'numFac',
        label: 'Num Fac',
        sortable: true
        },
      {
        key: 'comment',
        label: 'Commentaire',
        },
      {
        key: 'client',
        label: 'Nom client',
        sortable: true,
        // formatter: (value: any, key: any, item: any) => {
        //   return getClientName(value)
        // },
        // filterByFormatted: true
      },
      {
        key: 'statut',
        sortable: true,
      },
      {
        key:'totalHT',
        formatter: (value:string) => {
          return value + "€"
        },
      },
      {
        key:'totalTTC',
        formatter: (value:string) => {
          return value + "€"
        },
      },
      {
        key: 'date',
        label: 'Date',
        formatter: (value: any, key: any, item: any) => {
          return getFormatedDate(value, item)
        },
        sortable: true
        },
      {
        key:'ca',
        formatter: (value: any, key: any, item: any) => {
          return getCaName(value)
        },
        sortable: true,
        sortByFormatted:true,
        filterByFormatted: true
      },
      {
        key: 'id',
        label: 'Actions'
        }
    ]

    // local ref
    const perPage = 10
    const currentPage =ref(1)
    const totalRows = ref()
    const totalHT = ref()
    const isBusy = ref(true)
    
    // nuxt cycle hook
    watch(() => props.factures, async(newFactures) => {
      if(newFactures) {
              totalRows.value = newFactures.length
              totalHT.value = sumTotalHT(newFactures)
              isBusy.value = false
            }
      }
      // { immediate: true }
    )

    /**
     * Get the date in locale and change color if facture is ovedue date
     * @param date - The date
     * @param item - The facture
     */
    const getFormatedDate = (date:any, item:any) : string => {
      const today = new Date()
      const dateFacture = new Date(date)
      // check overdue date for displaying line in danger
      if(item.paymentDelay && item.date && item.statut!="Avoir") {
        let dueDate = new Date(item.date);
        dueDate.setDate(dueDate.getDate() + item.paymentDelay);
        if(today > dueDate && !item.payDate) {
          item._rowVariant =  "danger"
        }
      }
      return dateFacture.toLocaleDateString()
    }
    
    /**
     * Get the CA name
     * @param value - the CA id
     */
    const getCaName = (value:string) :string => {
      if(!props.cas) return ""
      let date = ""
      props.cas.forEach(ca => {
        if(ca.id == value) {
          date = ca.date
        }
      })
      return date
    }

    /**
     * Get the client name
     * @param value - the Client id
     */
    const getClientName = (value:string):string => {
      if(!props.clients) return ""
      let name = ""
      props.clients.forEach(client => {
        if(client.id == value) {
          name = client.name
        }
      })
      return name
    }

    const sumTotalHT = (factures:IFacture[]) : string => {
      let sum = 0
      factures.forEach(facture => {
        sum = sum + Number(facture.totalHT)
      });
      return sum.toLocaleString()
    }

    const deleteFacture = (facture:IFacture) => {
      emit('deleteFacture', facture)
    }

    const copyFacture = (facture:IFacture) => {
      emit('copyFacture', facture)
    } 
</script>
