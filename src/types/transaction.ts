export type TransactionType = "income" | "expense"

export interface Transaction {
  id: string
  date: string
  type: TransactionType
  category: string
  description: string
  amount: number
  paymentMethod: string
  reference?: string
  notes?: string
}

export const transactionCategories = {
  income: [
    "Ventas",
    "Servicios",
    "Alquiler",
    "Intereses",
    "Otros Ingresos",
  ],
  expense: [
    "Inventario",
    "Salarios",
    "Alquiler Local",
    "Servicios Públicos",
    "Marketing",
    "Mantenimiento",
    "Impuestos",
    "Seguros",
    "Transporte",
    "Suministros",
    "Otros Gastos",
  ],
}

export const paymentMethods = [
  "Efectivo",
  "Tarjeta de Débito",
  "Tarjeta de Crédito",
  "Transferencia",
  "Cheque",
  "Otro",
]

