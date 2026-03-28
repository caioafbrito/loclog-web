"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Package,
  Calculator,
  CreditCard,
  Users,
  HandshakeIcon,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Plus,
  FileText,
  Truck,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
} from "lucide-react"

// Dados mock para demonstração
const kpis = [
  {
    title: "Pedidos",
    value: "12",
    change: "+3",
    trend: "up",
    description: "este mês",
    icon: Package,
    color: "bg-[#905BF4]",
  },
  {
    title: "Orçamentos",
    value: "4",
    change: "+1",
    trend: "up",
    description: "pendentes",
    icon: Calculator,
    color: "bg-[#4E2BCC]",
  },
  {
    title: "Recebíveis",
    value: "R$ 8.750",
    change: "+R$ 2.350",
    trend: "up",
    description: "a receber",
    icon: CreditCard,
    color: "bg-green-600",
  },
  {
    title: "Parceiros Ativos",
    value: "6",
    change: "+2",
    trend: "up",
    description: "na rede",
    icon: HandshakeIcon,
    color: "bg-[#0F032D]",
  },
]

const recentOrders = [
  {
    id: "PED-4521",
    client: "Empresa Festa Feliz",
    items: "50 cadeiras, 10 mesas",
    status: "waiting",
    statusLabel: "Aguardando Retirada",
    value: "R$ 2.350,00",
    date: "05/12/2026",
  },
  {
    id: "PED-4520",
    client: "Maria Santos",
    items: "20 cadeiras, 5 mesas, 10 toalhas",
    status: "delivered",
    statusLabel: "Entregue",
    value: "R$ 890,00",
    date: "04/12/2026",
  },
  {
    id: "PED-4519",
    client: "Buffet Sabor & Arte",
    items: "100 cadeiras, 20 mesas",
    status: "in_progress",
    statusLabel: "Em Andamento",
    value: "R$ 4.200,00",
    date: "03/12/2026",
  },
  {
    id: "PED-4518",
    client: "João Silva",
    items: "15 cadeiras",
    status: "completed",
    statusLabel: "Concluído",
    value: "R$ 350,00",
    date: "02/12/2026",
  },
]

const quickActions = [
  { name: "Novo Pedido", href: "/dashboard/pedidos/novo", icon: Package, color: "bg-[#905BF4]" },
  { name: "Novo Orçamento", href: "/dashboard/orcamentos/novo", icon: Calculator, color: "bg-[#4E2BCC]" },
  { name: "Emitir Documento", href: "/dashboard/contabil/novo", icon: FileText, color: "bg-[#0F032D]" },
  { name: "Cobrar", href: "/dashboard/financeiro/cobranca", icon: CreditCard, color: "bg-green-600" },
]

const statusConfig = {
  waiting: { icon: Clock, color: "text-yellow-600 bg-yellow-100" },
  in_progress: { icon: Truck, color: "text-blue-600 bg-blue-100" },
  delivered: { icon: CheckCircle2, color: "text-green-600 bg-green-100" },
  completed: { icon: CheckCircle2, color: "text-[#905BF4] bg-[#905BF4]/10" },
  cancelled: { icon: XCircle, color: "text-red-600 bg-red-100" },
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Alert Banner - Notificação de Pedido */}
      <div className="flex items-center justify-between rounded-lg bg-[#905BF4] p-4 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
            <AlertCircle className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold">Pedido Novo do Locador Matheus</p>
            <p className="text-sm text-white/80">Clique para ver os detalhes</p>
          </div>
        </div>
        <Button variant="secondary" size="sm" className="bg-white text-[#905BF4] hover:bg-white/90" asChild>
          <Link href="/dashboard/pedidos/novo-parceiro">
            Ver Pedido
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, index) => (
          <Card key={index} className="border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-[#0F032D]/60">{kpi.title}</p>
                  <p className="mt-1 text-3xl font-bold text-[#0F032D]">{kpi.value}</p>
                  <div className="mt-1 flex items-center gap-1">
                    {kpi.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                    <span className={`text-sm ${kpi.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {kpi.change}
                    </span>
                    <span className="text-sm text-[#0F032D]/60">{kpi.description}</span>
                  </div>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${kpi.color}`}>
                  <kpi.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickActions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            className="h-auto flex-col gap-3 border-2 border-dashed border-[#D0D0D8] bg-white py-6 text-[#0F032D] hover:border-[#905BF4] hover:bg-[#905BF4]/5"
            asChild
          >
            <Link href={action.href}>
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${action.color}`}>
                <action.icon className="h-6 w-6 text-white" />
              </div>
              <span className="font-medium">{action.name}</span>
            </Link>
          </Button>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Pedidos Recentes */}
        <Card className="border-none shadow-md lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-lg text-[#0F032D]">Pedidos Recentes</CardTitle>
              <CardDescription>Últimos pedidos da sua locadora</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-[#905BF4]" asChild>
              <Link href="/dashboard/pedidos">
                Ver todos
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order, index) => {
                const status = statusConfig[order.status as keyof typeof statusConfig]
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-[#EFEFEF] bg-white p-4 transition-colors hover:border-[#905BF4]/30 hover:bg-[#EFEFEF]/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${status.color}`}>
                        <status.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[#0F032D]">{order.id}</span>
                          <span className="text-[#0F032D]">- {order.client}</span>
                        </div>
                        <p className="text-sm text-[#0F032D]/60">{order.items}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-[#0F032D]">{order.value}</p>
                      <p className="text-sm text-[#0F032D]/60">{order.date}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Atalhos e Resumo */}
        <div className="space-y-6">
          {/* Orçamento Recente */}
          <Card className="border-none shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-[#0F032D]">Último Orçamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg bg-[#EFEFEF] p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="bg-[#905BF4]/10 text-[#905BF4]">#Q-198</Badge>
                    <p className="mt-2 font-semibold text-[#0F032D]">João Silva (PF)</p>
                    <p className="text-sm text-[#0F032D]/60">Enviado por WhatsApp</p>
                  </div>
                  <p className="text-lg font-bold text-[#0F032D]">R$ 350,00</p>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" className="flex-1 bg-[#905BF4] text-white hover:bg-[#4E2BCC]">
                    Converter em Pedido
                  </Button>
                  <Button size="sm" variant="outline" className="border-[#D0D0D8]">
                    Ver
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Parceiros Próximos */}
          <Card className="border-none shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg text-[#0F032D]">Parceiros Ativos</CardTitle>
              <Button variant="ghost" size="sm" className="text-[#905BF4]" asChild>
                <Link href="/dashboard/parceiros">
                  Ver todos
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {["Locadora São Paulo", "Mesas & Cia", "Festa Total"].map((partner, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-lg bg-[#EFEFEF] p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#905BF4]/10">
                      <Users className="h-5 w-5 text-[#905BF4]" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-[#0F032D]">{partner}</p>
                      <p className="text-xs text-[#0F032D]/60">Disponível para entrega</p>
                    </div>
                    <Badge className="bg-green-100 text-green-700">Online</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resumo Financeiro Rápido */}
          <Card className="border-none bg-gradient-to-br from-[#905BF4] to-[#4E2BCC] text-white shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-white">Resumo do Mês</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Faturamento</span>
                  <span className="font-bold">R$ 12.450,00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Pendente</span>
                  <span className="font-bold">R$ 3.200,00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Recebido</span>
                  <span className="font-bold">R$ 9.250,00</span>
                </div>
              </div>
              <Button
                size="sm"
                className="mt-4 w-full bg-white text-[#905BF4] hover:bg-white/90"
                asChild
              >
                <Link href="/dashboard/financeiro">
                  Ver Relatório Completo
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
