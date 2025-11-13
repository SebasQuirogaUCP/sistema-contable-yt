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
import { Plus, Edit, Trash2, FileText } from "lucide-react"
import { TransactionForm } from "./TransactionForm"
import { useTransactionStore } from "@/store/transactionStore"

export function TransactionTable() {
  const transactions = useTransactionStore((state) => state.transactions)
  const addTransaction = useTransactionStore((state) => state.addTransaction)
  const updateTransaction = useTransactionStore((state) => state.updateTransaction)
  const deleteTransaction = useTransactionStore((state) => state.deleteTransaction)
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
      updateTransaction(editingTransaction.id, transaction)
      setEditingTransaction(undefined)
    } else {
      addTransaction(transaction)
    }
    setFormOpen(false)
  }

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar esta transacción?")) {
      deleteTransaction(id)
    }
  }

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <div className="space-y-6 p-4 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
            Datos
          </h2>
          <p className="text-muted-foreground text-lg">
            Gestiona todas tus transacciones financieras
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingTransaction(undefined)
            setFormOpen(true)
          }}
          className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          size="lg"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nueva Transacción
        </Button>
      </div>

      <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100/50 dark:from-slate-800 dark:to-slate-900/50 border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                Transacciones
              </CardTitle>
              <CardDescription className="text-base mt-1">
                {transactions.length} transacción(es) registrada(s)
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {sortedTransactions.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <div className="mx-auto w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                <FileText className="h-12 w-12 text-slate-400" />
              </div>
              <p className="text-xl font-semibold mb-2">No hay transacciones registradas</p>
              <p className="text-sm">
                Haz clic en "Nueva Transacción" para comenzar
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                    <TableHead className="font-semibold">Fecha</TableHead>
                    <TableHead className="font-semibold">Tipo</TableHead>
                    <TableHead className="font-semibold">Categoría</TableHead>
                    <TableHead className="font-semibold">Descripción</TableHead>
                    <TableHead className="text-right font-semibold">Monto</TableHead>
                    <TableHead className="font-semibold">Método de Pago</TableHead>
                    <TableHead className="font-semibold">Referencia</TableHead>
                    <TableHead className="text-right font-semibold">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedTransactions.map((transaction) => (
                    <TableRow 
                      key={transaction.id}
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors duration-150 border-b border-slate-100 dark:border-slate-800"
                    >
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span className="text-sm">
                            {new Date(transaction.date).toLocaleDateString("es-ES", {
                              day: "2-digit",
                              month: "short",
                            })}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(transaction.date).getFullYear()}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${
                            transaction.type === "income"
                              ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 dark:from-green-900/30 dark:to-emerald-900/30 dark:text-green-300 border border-green-200 dark:border-green-800"
                              : "bg-gradient-to-r from-red-100 to-rose-100 text-red-800 dark:from-red-900/30 dark:to-rose-900/30 dark:text-red-300 border border-red-200 dark:border-red-800"
                          }`}
                        >
                          {transaction.type === "income" ? "Ingreso" : "Gasto"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-sm">{transaction.category}</span>
                      </TableCell>
                      <TableCell className="max-w-[200px]">
                        <div className="truncate font-medium" title={transaction.description}>
                          {transaction.description}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={`font-bold text-base ${
                            transaction.type === "income"
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {transaction.type === "income" ? "+" : "-"}
                          ${transaction.amount.toLocaleString("es-ES", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {transaction.paymentMethod}
                        </span>
                      </TableCell>
                      <TableCell className="max-w-[150px]">
                        <div className="truncate text-sm text-muted-foreground">
                          {transaction.reference || (
                            <span className="text-slate-300 dark:text-slate-700">-</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(transaction)}
                            className="h-8 w-8 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(transaction.id)}
                            className="h-8 w-8 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
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
