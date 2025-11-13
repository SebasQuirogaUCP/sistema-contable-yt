export type TransactionType = "ingreso" | "gasto";

export interface Transaction {
  id: string;
  date: string;
  type: TransactionType;
  category: string;
  description: string;
  amount: number;
  paymentMethod: string;
  reference?: string;
  notes?: string;
}

export const transactionCategories = {
  ingreso: ["Ventas", "Servicios", "Alquiler", "Intereses", "Otros Ingresos"],
  gasto: [
    "Inventario",
    "Salarios",
    "Alquiler Local",
    "Servicios Públicos",
    "Impuestos",
    "Otros Gastos",
  ],
};

export const paymentMethods = [
  "Efectivo",
  "Tarjeta de Débito",
  "Tarjeta de Crédito",
  "Transferencia",
  "Otro",
];
