import { useTransactionStore } from "@/store/transactionStore";
import type { Transaction } from "@/types/transaction";
import { FileText, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { TransactionForm } from "./TransactionForm";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export function TransactionTable() {
  const transactions = useTransactionStore((state) => state.transactions);
  const addTransaction = useTransactionStore((state) => state.addTransaction);
  const deleteTransaction = useTransactionStore(
    (state) => state.deleteTransaction
  );
  const [formOpen, setFormOpen] = useState(false);

  const handleSubmit = (transaction: Omit<Transaction, "id">) => {
    addTransaction(transaction);
    setFormOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar esta transacción?")) {
      deleteTransaction(id);
    }
  };

  const sortedTransactions = useMemo(() => {
    return [...transactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [transactions]);

  return (
    <div className="space-y-6 p-4 lg:p-8">
      <Card className="border border-slate-200 bg-white">
        <CardHeader className="pb-4 border-b border-slate-100">
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
            <Button
              onClick={() => {
                setFormOpen(true);
              }}
              size="icon"
              className="h-10 w-10 bg-primary hover:bg-primary/90 text-white rounded-lg"
              title="Nueva transacción"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {sortedTransactions.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              <div className="mx-auto w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <FileText className="h-12 w-12 text-slate-400" />
              </div>
              <p className="text-xl font-semibold mb-2">
                No hay transacciones registradas
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-b border-slate-100">
                    <TableHead className="font-semibold text-slate-900">
                      Fecha
                    </TableHead>
                    <TableHead className="font-semibold text-slate-900">
                      Tipo
                    </TableHead>
                    <TableHead className="font-semibold text-slate-900">
                      Categoría
                    </TableHead>
                    <TableHead className="font-semibold text-slate-900">
                      Descripción
                    </TableHead>
                    <TableHead className="text-right font-semibold text-slate-900">
                      Monto
                    </TableHead>
                    <TableHead className="font-semibold text-slate-900">
                      Método de Pago
                    </TableHead>
                    <TableHead className="font-semibold text-slate-900">
                      Referencia
                    </TableHead>
                    <TableHead className="text-right font-semibold text-slate-900">
                      Acciones
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {sortedTransactions.map((transaction) => (
                    <TableRow
                      key={transaction.id}
                      className="hover:bg-slate-50 transition-colors duration-150 border-b border-slate-100"
                    >
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span className="text-sm text-slate-900">
                            {new Date(transaction.date).toLocaleDateString(
                              "es-ES",
                              {
                                day: "2-digit",
                                month: "short",
                              }
                            )}
                          </span>
                          <span className="text-xs text-slate-600">
                            {new Date(transaction.date).getFullYear()}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border ${
                            transaction.type === "ingreso"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-red-50 text-red-700 border-red-200"
                          }`}
                        >
                          {transaction.type?.toUpperCase()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-sm text-slate-900">
                          {transaction.category}
                        </span>
                      </TableCell>
                      <TableCell className="max-w-[200px]">
                        <div
                          className="truncate font-medium text-slate-900"
                          title={transaction.description}
                        >
                          {transaction.description}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={`font-bold text-base ${
                            transaction.type === "ingreso"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {transaction.type === "ingreso" ? "+" : "-"}$
                          {transaction.amount.toLocaleString("es-ES", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-slate-600">
                          {transaction.paymentMethod}
                        </span>
                      </TableCell>
                      <TableCell className="max-w-[150px]">
                        <div className="truncate text-sm text-slate-600">
                          {transaction.reference || (
                            <span className="text-slate-300">-</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(transaction.id)}
                            className="h-8 w-8 hover:bg-red-50 hover:text-red-600 transition-colors"
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
          setFormOpen(open);
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
