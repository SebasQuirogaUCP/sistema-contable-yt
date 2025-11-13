import { useState } from "react"
import { Button } from "./ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import type { Transaction } from "@/types/transaction"
import { Plus, Edit, Trash2 } from "lucide-react"
import { TransactionForm } from "./TransactionForm"

interface TransactionTableProps {
  transactions: Transaction[]
  onAdd: (transaction: Omit<Transaction, "id">) => void
  onUpdate: (id: string, transaction: Omit<Transaction, "id">) => void
  onDelete: (id: string) => void
}

export function TransactionTable({
  transactions,
  onAdd,
  onUpdate,
  onDelete,
}: TransactionTableProps) {
  const [formOpen, setFormOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<
    Transaction | undefined
  >(undefined)

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction)
    setFormOpen(true)
  }

  const handleSubmit = (transaction: Omit<Transaction, "id">) => {
    if (editingTransaction) {
      onUpdate(editingTransaction.id, transaction)
      setEditingTransaction(undefined)
    } else {
      onAdd(transaction)
    }
    setFormOpen(false)
  }

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar esta transacción?")) {
      onDelete(id)
    }
  }

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Datos</h2>
          <p className="text-muted-foreground">
            Gestiona todas tus transacciones financieras
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingTransaction(undefined)
            setFormOpen(true)
          }}
          className="w-full sm:w-auto"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nueva Transacción
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transacciones</CardTitle>
          <CardDescription>
            {transactions.length} transacción(es) registrada(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sortedTransactions.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg mb-2">No hay transacciones registradas</p>
              <p className="text-sm">
                Haz clic en "Nueva Transacción" para comenzar
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead className="text-right">Monto</TableHead>
                    <TableHead>Método de Pago</TableHead>
                    <TableHead>Referencia</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        {new Date(transaction.date).toLocaleDateString("es-ES")}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                            transaction.type === "income"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          }`}
                        >
                          {transaction.type === "income" ? "Ingreso" : "Gasto"}
                        </span>
                      </TableCell>
                      <TableCell>{transaction.category}</TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {transaction.description}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        <span
                          className={
                            transaction.type === "income"
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {transaction.type === "income" ? "+" : "-"}
                          ${transaction.amount.toLocaleString("es-ES", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </TableCell>
                      <TableCell>{transaction.paymentMethod}</TableCell>
                      <TableCell className="max-w-[150px] truncate">
                        {transaction.reference || "-"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(transaction)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(transaction.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <TransactionForm
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open)
          if (!open) setEditingTransaction(undefined)
        }}
        onSubmit={handleSubmit}
        transaction={editingTransaction}
      />
    </div>
  )
}

