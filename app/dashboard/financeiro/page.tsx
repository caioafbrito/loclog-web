"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  CreditCard,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  Receipt,
  ArrowUpRight,
  ArrowDownLeft,
  Eye,
  Send,
  FileDown,
  QrCode,
  Smartphone,
  Banknote,
} from "lucide-react"

// Dados mock
const invoices = [
  {
    id: "#F-001",
    orderId: "#4521",
    client: "Empresa Festa Feliz",
    amount: "R$ 2.350,00",
    status: "pending",
    dueDate: "10/12/2026",
    createdAt: "05/12/2026",
    paymentMethod: null,
  },
  {
    id: "#F-002",
    orderId: "#4520",
    client: "Maria Santos",
    amount: "R$ 1.125,00",
    status: "paid",
    dueDate: "08/12/2026",
    createdAt: "04/12/2026",
    paymentMethod: "pix",
    paidAt: "04/12/2026",
  },
  {
    id: "#F-003",
    orderId: "#4519",
    client: "Buffet Sabor & Arte",
    amount: "R$ 5.200,00",
    status: "partial",
    dueDate: "06/12/2026",
    createdAt: "03/12/2026",
    paidAmount: "R$ 2.600,00",
    paymentMethod: "card",
  },
  {
    id: "#F-004",
    orderId: "#4518",
    client: "João Silva",
    amount: "R$ 525,00",
    status: "paid",
    dueDate: "05/12/2026",
    createdAt: "02/12/2026",
    paymentMethod: "cash",
    paidAt: "02/12/2026",
  },
  {
    id: "#F-005",
    orderId: "#4517",
    client: "Festa Kids",
    amount: "R$ 1.110,00",
    status: "cancelled",
    dueDate: "04/12/2026",
    createdAt: "01/12/2026",
    cancelledAt: "01/12/2026",
  },
  {
    id: "#F-006",
    orderId: "#4516",
    client: "Carlos Lima",
    amount: "R$ 780,00",
    status: "overdue",
    dueDate: "28/11/2026",
    createdAt: "25/11/2026",
  },
]

const transactions = [
  { id: 1, type: "income", description: "Pagamento #F-002", amount: "R$ 1.125,00", date: "04/12/2026", method: "PIX" },
  { id: 2, type: "income", description: "Pagamento parcial #F-003", amount: "R$ 2.600,00", date: "03/12/2026", method: "Cartão" },
  { id: 3, type: "income", description: "Pagamento #F-004", amount: "R$ 525,00", date: "02/12/2026", method: "Dinheiro" },
  { id: 4, type: "expense", description: "Combustível", amount: "R$ 350,00", date: "01/12/2026", category: "Logística" },
  { id: 5, type: "expense", description: "Manutenção equipamentos", amount: "R$ 890,00", date: "30/11/2026", category: "Manutenção" },
]

const statusConfig = {
  pending: { label: "Pendente", icon: Clock, color: "bg-yellow-100 text-yellow-700" },
  paid: { label: "Pago", icon: CheckCircle2, color: "bg-green-100 text-green-700" },
  partial: { label: "Parcial", icon: Clock, color: "bg-orange-100 text-orange-700" },
  overdue: { label: "Vencido", icon: XCircle, color: "bg-red-100 text-red-700" },
  cancelled: { label: "Cancelado", icon: XCircle, color: "bg-gray-100 text-gray-700" },
}

const paymentMethodConfig = {
  pix: { label: "PIX", icon: QrCode },
  card: { label: "Cartão", icon: CreditCard },
  cash: { label: "Dinheiro", icon: Banknote },
  boleto: { label: "Boleto", icon: Receipt },
  machine: { label: "Maquininha", icon: Smartphone },
}

export default function FinanceiroPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inv.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || inv.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const totalReceivable = invoices
    .filter(i => i.status === "pending" || i.status === "partial" || i.status === "overdue")
    .reduce((acc, i) => acc + parseFloat(i.amount.replace(/[^\d,]/g, "").replace(",", ".")), 0)

  const totalReceived = invoices
    .filter(i => i.status === "paid")
    .reduce((acc, i) => acc + parseFloat(i.amount.replace(/[^\d,]/g, "").replace(",", ".")), 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F032D]">Financeiro</h1>
          <p className="text-[#0F032D]/60">Gerencie faturas, cobranças e fluxo de caixa</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-[#905BF4] text-[#905BF4]" asChild>
            <Link href="/dashboard/financeiro/despesas">
              <Plus className="mr-2 h-4 w-4" />
              Nova Despesa
            </Link>
          </Button>
          <Button className="bg-[#905BF4] text-white hover:bg-[#4E2BCC]" asChild>
            <Link href="/dashboard/financeiro/cobranca">
              <CreditCard className="mr-2 h-4 w-4" />
              Cobrar
            </Link>
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-md">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[#0F032D]/60">Faturamento do Mês</p>
                <p className="mt-1 text-2xl font-bold text-[#0F032D]">R$ 12.450,00</p>
                <div className="mt-1 flex items-center gap-1 text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm">+15% vs mês anterior</span>
                </div>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#905BF4]/10">
                <DollarSign className="h-5 w-5 text-[#905BF4]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[#0F032D]/60">A Receber</p>
                <p className="mt-1 text-2xl font-bold text-[#0F032D]">R$ {totalReceivable.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
                <p className="mt-1 text-sm text-[#0F032D]/60">{invoices.filter(i => i.status === "pending").length} faturas pendentes</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[#0F032D]/60">Recebido</p>
                <p className="mt-1 text-2xl font-bold text-[#0F032D]">R$ {totalReceived.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
                <p className="mt-1 text-sm text-[#0F032D]/60">{invoices.filter(i => i.status === "paid").length} faturas pagas</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[#0F032D]/60">Vencido</p>
                <p className="mt-1 text-2xl font-bold text-red-600">R$ 780,00</p>
                <p className="mt-1 text-sm text-[#0F032D]/60">{invoices.filter(i => i.status === "overdue").length} faturas vencidas</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="invoices" className="space-y-4">
        <TabsList>
          <TabsTrigger value="invoices">Faturas</TabsTrigger>
          <TabsTrigger value="transactions">Movimentações</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="space-y-4">
          {/* Filters */}
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0F032D]/40" />
                  <Input
                    placeholder="Buscar por ID ou cliente..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full sm:w-48">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filtrar por status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    {Object.entries(statusConfig).map(([key, config]) => (
                      <SelectItem key={key} value={key}>{config.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Invoices List */}
          <div className="space-y-4">
            {filteredInvoices.map((invoice) => {
              const status = statusConfig[invoice.status as keyof typeof statusConfig]
              const paymentMethod = invoice.paymentMethod ? paymentMethodConfig[invoice.paymentMethod as keyof typeof paymentMethodConfig] : null
              return (
                <Card key={invoice.id} className="border-none shadow-md">
                  <CardContent className="p-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${status.color}`}>
                          <status.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-bold text-[#0F032D]">{invoice.id}</span>
                            <Badge className={status.color}>{status.label}</Badge>
                            {paymentMethod && (
                              <Badge variant="outline" className="border-[#D0D0D8]">
                                <paymentMethod.icon className="mr-1 h-3 w-3" />
                                {paymentMethod.label}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-[#0F032D]/70">{invoice.client}</p>
                          <p className="text-xs text-[#0F032D]/50">Pedido: {invoice.orderId} | Vence em: {invoice.dueDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-xl font-bold text-[#0F032D]">{invoice.amount}</p>
                          {invoice.status === "partial" && (
                            <p className="text-sm text-green-600">Pago: {invoice.paidAmount}</p>
                          )}
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Ver Detalhes
                            </DropdownMenuItem>
                            {(invoice.status === "pending" || invoice.status === "partial" || invoice.status === "overdue") && (
                              <>
                                <DropdownMenuItem>
                                  <QrCode className="mr-2 h-4 w-4" />
                                  Gerar PIX
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Receipt className="mr-2 h-4 w-4" />
                                  Gerar Boleto
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Send className="mr-2 h-4 w-4" />
                                  Enviar Cobrança
                                </DropdownMenuItem>
                              </>
                            )}
                            <DropdownMenuItem>
                              <FileDown className="mr-2 h-4 w-4" />
                              Baixar Recibo
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Últimas Movimentações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between rounded-lg border border-[#EFEFEF] p-4">
                    <div className="flex items-center gap-4">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        tx.type === "income" ? "bg-green-100" : "bg-red-100"
                      }`}>
                        {tx.type === "income" ? (
                          <ArrowDownLeft className="h-5 w-5 text-green-600" />
                        ) : (
                          <ArrowUpRight className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-[#0F032D]">{tx.description}</p>
                        <p className="text-sm text-[#0F032D]/60">{tx.date} {tx.method && `• ${tx.method}`} {tx.category && `• ${tx.category}`}</p>
                      </div>
                    </div>
                    <p className={`text-lg font-bold ${tx.type === "income" ? "text-green-600" : "text-red-600"}`}>
                      {tx.type === "income" ? "+" : "-"}{tx.amount}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
