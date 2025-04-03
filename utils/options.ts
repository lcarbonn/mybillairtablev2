/**
 * Type for Input Select Options
 */
export type IOption = {
    value:string
    text:string
}

/**
 * Type for Input Select Options
 */
export type IOptions = {
    label:string
    options:IOption[]
}

/**
 * Status select options constants
 */
export const statusOptions  = [
    { value: "A Vérifier", text: 'A Vérifier' },
    { value: "A Envoyer", text: 'A Envoyer' },
    { value: "Envoyée", text: 'Envoyée' },
    { value: "Payée", text: 'Payée' },
    { value: "Offert", text: 'Offert' },
    { value: "Avoir", text: 'Avoir' },
]

/**
 * TVA select options constants
 */
export const tvaOptions = [
    { value: 0.2, text: "20%", default:true },
    { value: 0, text: "0%" }
]
