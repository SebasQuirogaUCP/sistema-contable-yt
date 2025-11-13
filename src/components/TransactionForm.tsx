import type { Transaction, TransactionType } from "@/types/transaction";
import { paymentMethods, transactionCategories } from "@/types/transaction";
import { Receipt } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface TransactionFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (transaction: Omit<Transaction, "id">) => void;
}

export function TransactionForm({
  open,
  onOpenChange,
  onSubmit,
}: TransactionFormProps) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    type: "gasto",
    category: "",
    description: "",
    amount: 0,
    paymentMethod: paymentMethods[0],
    reference: "",
    notes: "",
  } as Omit<Transaction, "id">);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    onSubmit(formData);
    setFormData({
      date: new Date().toISOString().split("T")[0],
      type: "gasto",
      category: "",
      description: "",
      amount: 0,
      paymentMethod: paymentMethods[0],
      reference: "",
      notes: "",
    });
    onOpenChange(false);
  };

  const categories =
    formData.type === "ingreso"
      ? transactionCategories.ingreso
      : transactionCategories.gasto;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[95vh] overflow-y-auto border border-slate-200 bg-white p-3">
        <DialogHeader className="pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <Receipt className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-slate-900">
                Nueva Transacción
              </DialogTitle>
              <DialogDescription className="text-sm mt-1 text-slate-600">
                Agrega una nueva transacción a tu registro"
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 px-6 pb-6 pt-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label
                htmlFor="date"
                className="text-sm font-semibold text-slate-700"
              >
                Fecha
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
                className="h-10 border border-slate-200 bg-white text-slate-900 focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="type"
                className="text-sm font-semibold text-slate-700"
              >
                Tipo
              </Label>
              <select
                id="type"
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white text-slate-900 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 transition-colors"
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
                <option value="ingreso">Ingreso</option>
                <option value="gasto">Gasto</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="category"
              className="text-sm font-semibold text-slate-700"
            >
              Categoría
            </Label>
            <select
              id="category"
              className="flex h-10 w-full rounded-md border border-slate-200 bg-white text-slate-900 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 transition-colors"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              required
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-sm font-semibold text-slate-700"
            >
              Descripción
            </Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Ej: Compra de inventario"
              required
              className="h-10 border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-primary transition-colors"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label
                htmlFor="amount"
                className="text-sm font-semibold text-slate-700"
              >
                Monto
              </Label>
              <Input
                id="amount"
                type="number"
                defaultValue={formData.amount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    amount: parseFloat(e.target.value) || 0,
                  })
                }
                required
                className="h-10 border border-slate-200 bg-white text-slate-900 focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="paymentMethod"
                className="text-sm font-semibold text-slate-700"
              >
                Método de Pago
              </Label>
              <select
                id="paymentMethod"
                className="flex h-10 w-full rounded-md border border-slate-200 bg-white text-slate-900 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 transition-colors"
                value={formData.paymentMethod}
                onChange={(e) =>
                  setFormData({ ...formData, paymentMethod: e.target.value })
                }
                required
              >
                {paymentMethods.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="reference"
              className="text-sm font-semibold text-slate-700"
            >
              Referencia (Opcional)
            </Label>
            <Input
              id="reference"
              value={formData.reference}
              onChange={(e) =>
                setFormData({ ...formData, reference: e.target.value })
              }
              placeholder="Ej: Factura #123, Recibo #456"
              className="h-10 border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-primary transition-colors"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="notes"
              className="text-sm font-semibold text-slate-700"
            >
              Notas (Opcional)
            </Label>
            <textarea
              id="notes"
              className="flex min-h-[100px] w-full rounded-md border border-slate-200 bg-white text-slate-900 px-3 py-2 text-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 transition-colors resize-none"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              placeholder="Notas adicionales sobre esta transacción"
            />
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="px-6 h-10 font-medium border border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="px-6 h-10 font-medium bg-primary hover:bg-primary/90 text-white"
            >
              Agregar Transacción
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
