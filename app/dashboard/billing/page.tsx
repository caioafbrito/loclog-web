"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Receipt,
  Download,
  CreditCard,
  CheckCircle2,
  Clock,
  AlertCircle,
  Calendar,
  FileText,
  ExternalLink,
} from "lucide-react"

const invoices = [
  {
    id: "INV-2026-012",
    date: "01/12/2026",
    dueDate: "05/12/2026",
    description: "Plano Pro - Dezembro 2026",
    amount: "R$ 449,00",
    status: "paid",
    paidAt: "02/12/2026",
  },
  {
    id: "INV-2026-011",
    date: "01/11/2026",
    dueDate: "05/11/2026",
    description: "Plano Pro - Novembro 2026",
    amount: "R$ 449,00",
    status: "paid",
    paidAt: "03/11/2026",
  },
  {
    id: "INV-2026-010",
    date: "01/10/2026",
    dueDate: "05/10/2026",
    description: "Plano Pro - Outubro 2026 + Pacote Contábil",
    amount: "R$ 598,00",
    status: "paid",
    paidAt: "01/10/2026",
  },
  {
    id: "INV-2026-009",
    date: "01/09/2026",
    dueDate: "05/09/2026",
    description: "Plano Pro - Setembro 2026",
    amount: "R$ 449,00",
    status: "paid",
    paidAt: "04/09/2026",
  },
]

const currentPlan = {
  name: "Pro",
  price: "R$ 449,00",
  period: "mensal",
  renewalDate: "01/01/2027",
  addons: [
    { name: "Pacote Contábil", price: "R$ 149,00" },
  ],
}

const statusConfig = {
  paid: { label: "Pago", icon: CheckCircle2, color: "bg-green-100 text-green-700" },
  pending: { label: "Pendente", icon: Clock, color: "bg-yellow-100 text-yellow-700" },
  overdue: { label: "Atrasado", icon: AlertCircle, color: "bg-red-100 text-red-700" },
}

export default function BillingPage() {
  const [selectedInvoice, setSelectedInvoice] = useState<typeof invoices[0] | null>(null)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#0F032D]">Faturas do Sistema</h1>
        <p className="text-[#0F032D]/60">Gerencie suas faturas e pagamentos do LocLog</p>
      </div>

      {/* Plano Atual */}
      <Card className="border-none bg-gradient-to-r from-[#905BF4] to-[#4E2BCC] text-white shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-white/70">Plano Atual</p>
              <h2 className="mt-1 text-3xl font-bold">Plano {currentPlan.name}</h2>
              <p className="mt-2 text-white/80">
                {currentPlan.price}/{currentPlan.period}
              </p>
              {currentPlan.addons.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {currentPlan.addons.map((addon, i) => (
                    <Badge key={i} className="bg-white/20 text-white">
                      {addon.name}: {addon.price}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-col items-start gap-3 md:items-end">
              <div className="flex items-center gap-2 text-white/80">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Próxima cobrança: {currentPlan.renewalDate}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" className="bg-white text-[#905BF4] hover:bg-white/90">
                  Alterar Plano
                </Button>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  Gerenciar Adicionais
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Método de Pagamento */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#0F032D]">
            <CreditCard className="h-5 w-5" />
            Método de Pagamento
          </CardTitle>
          <CardDescription>Cartão cadastrado para cobranças automáticas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border border-[#EFEFEF] p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#0F032D]">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-medium text-[#0F032D]">Mastercard terminando em 4521</p>
                <p className="text-sm text-[#0F032D]/60">Expira em 12/2028</p>
              </div>
            </div>
            <Button variant="outline">Alterar</Button>
          </div>
        </CardContent>
      </Card>

      {/* Histórico de Faturas */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#0F032D]">
            <Receipt className="h-5 w-5" />
            Histórico de Faturas
          </CardTitle>
          <CardDescription>Todas as faturas do seu plano</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fatura</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => {
                const status = statusConfig[invoice.status as keyof typeof statusConfig]
                return (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{invoice.description}</TableCell>
                    <TableCell className="font-semibold">{invoice.amount}</TableCell>
                    <TableCell>
                      <Badge className={status.color}>
                        <status.icon className="mr-1 h-3 w-3" />
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedInvoice(invoice)}
                            >
                              <FileText className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Detalhes da Fatura</DialogTitle>
                              <DialogDescription>Fatura {invoice.id}</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-[#0F032D]/60">Data de Emissão</p>
                                  <p className="font-medium">{invoice.date}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-[#0F032D]/60">Data de Vencimento</p>
                                  <p className="font-medium">{invoice.dueDate}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-[#0F032D]/60">Valor</p>
                                  <p className="font-medium">{invoice.amount}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-[#0F032D]/60">Status</p>
                                  <Badge className={status.color}>{status.label}</Badge>
                                </div>
                              </div>
                              <div>
                                <p className="text-sm text-[#0F032D]/60">Descrição</p>
                                <p className="font-medium">{invoice.description}</p>
                              </div>
                              {invoice.paidAt && (
                                <div>
                                  <p className="text-sm text-[#0F032D]/60">Pago em</p>
                                  <p className="font-medium">{invoice.paidAt}</p>
                                </div>
                              )}
                              <div className="flex gap-2 pt-4">
                                <Button className="flex-1 bg-[#905BF4] hover:bg-[#4E2BCC]">
                                  <Download className="mr-2 h-4 w-4" />
                                  Baixar PDF
                                </Button>
                                <Button variant="outline" className="flex-1">
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  Ver Online
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
