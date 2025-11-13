import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import type { Transaction, TransactionType } from "@/types/transaction"
import { transactionCategories, paymentMethods } from "@/types/transaction"
import { Receipt } from "lucide-react"

interface TransactionFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (transaction: Omit<Transaction, "id">) => void
  transaction?: Transaction
}

export function TransactionForm({
  open,
  onOpenChange,
  onSubmit,
  transaction,
}: TransactionFormProps) {
  const [formData, setFormData] = useState({
    date: transaction?.date || new Date().toISOString().split("T")[0],
    type: (transaction?.type || "expense") as TransactionType,
    category: transaction?.category || "",
    description: transaction?.description || "",
    amount: transaction?.amount || 0,
    paymentMethod: transaction?.paymentMethod || paymentMethods[0],
    reference: transaction?.reference || "",
    notes: transaction?.notes || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({
      date: new Date().toISOString().split("T")[0],
      type: "expense",
      category: "",
      description: "",
      amount: 0,
      paymentMethod: paymentMethods[0],
      reference: "",
      notes: "",
    })
    onOpenChange(false)
  }

  const categories =
    formData.type === "income"
      ? transactionCategories.income
      : transactionCategories.expense

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[95vh] overflow-y-auto border-0 shadow-2xl bg-white/98 backdrop-blur-xl">
        <DialogHeader className="pb-6 border-b border-slate-200/50 bg-gradient-to-r from-slate-50/80 to-slate-100/80 -m-6 mb-6 p-8 rounded-t-2xl">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/30">
              <Receipt className="h-6 w-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-3xl font-bold text-slate-900">
                {transaction ? "Editar Transacción" : "Nueva Transacción"}
              </DialogTitle>
              <DialogDescription className="text-base mt-2 text-slate-600">
                {transaction
                  ? "Modifica los datos de la transacción"
                  : "Agrega una nueva transacción a tu registro"}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 px-8 pb-8 pt-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <Label htmlFor="date" className="text-sm font-semibold text-slate-700">Fecha</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
                className="h-12 border-2 border-slate-300 bg-white text-slate-900 focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="type" className="text-sm font-semibold text-slate-700">Tipo</Label>
              <select
                id="type"
                className="flex h-12 w-full rounded-lg border-2 border-slate-300 bg-white text-slate-900 px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-primary transition-colors"
                value={formData.type}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    type: e.target.value as TransactionType,
                    category: "",
                  })
                }
                required
              >
                <option value="income" className="bg-white">Ingreso</option>
                <option value="expense" className="bg-white">Gasto</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="category" className="text-sm font-semibold text-slate-700">Categoría</Label>
            <select
              id="category"
              className="flex h-12 w-full rounded-lg border-2 border-slate-300 bg-white text-slate-900 px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-primary transition-colors"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              required
            >
              <option value="" className="bg-white">Selecciona una categoría</option>
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-white">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <Label htmlFor="description" className="text-sm font-semibold text-slate-700">Descripción</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Ej: Compra de inventario"
              required
              className="h-12 border-2 border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-primary transition-colors"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <Label htmlFor="amount" className="text-sm font-semibold text-slate-700">Monto</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    amount: parseFloat(e.target.value) || 0,
                  })
                }
                required
                className="h-12 border-2 border-slate-300 bg-white text-slate-900 focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="paymentMethod" className="text-sm font-semibold text-slate-700">Método de Pago</Label>
              <select
                id="paymentMethod"
                className="flex h-12 w-full rounded-lg border-2 border-slate-300 bg-white text-slate-900 px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-primary transition-colors"
                value={formData.paymentMethod}
                onChange={(e) =>
                  setFormData({ ...formData, paymentMethod: e.target.value })
                }
                required
              >
                {paymentMethods.map((method) => (
                  <option key={method} value={method} className="bg-white">
                    {method}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="reference" className="text-sm font-semibold text-slate-700">Referencia (Opcional)</Label>
            <Input
              id="reference"
              value={formData.reference}
              onChange={(e) =>
                setFormData({ ...formData, reference: e.target.value })
              }
              placeholder="Ej: Factura #123, Recibo #456"
              className="h-12 border-2 border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-primary transition-colors"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="notes" className="text-sm font-semibold text-slate-700">Notas (Opcional)</Label>
            <textarea
              id="notes"
              className="flex min-h-[120px] w-full rounded-lg border-2 border-slate-300 bg-white text-slate-900 px-4 py-3 text-sm ring-offset-background placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-primary transition-colors resize-none"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              placeholder="Notas adicionales sobre esta transacción"
            />
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-slate-200/50">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="px-8 h-12 font-semibold border-2 border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400"
            >
              Cancelar
            </Button>
            <Button 
              type="submit"
              className="px-8 h-12 font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
            >
              {transaction ? "Guardar Cambios" : "Agregar Transacción"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
