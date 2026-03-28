"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  Package,
  Users,
  Database,
  Zap,
  ArrowUpRight,
  AlertTriangle,
  TrendingUp,
  Calendar,
} from "lucide-react"
import Link from "next/link"

const usageMetrics = [
  {
    name: "Reservas do Mês",
    current: 127,
    limit: 500,
    unit: "reservas",
    icon: Package,
    color: "bg-[#905BF4]",
    warning: false,
  },
  {
    name: "Usuários Ativos",
    current: 3,
    limit: 5,
    unit: "usuários",
    icon: Users,
    color: "bg-[#4E2BCC]",
    warning: false,
  },
  {
    name: "Armazenamento",
    current: 2.3,
    limit: 10,
    unit: "GB",
    icon: Database,
    color: "bg-green-600",
    warning: false,
  },
  {
    name: "Requisições API",
    current: 8543,
    limit: 50000,
    unit: "req/mês",
    icon: Zap,
    color: "bg-blue-600",
    warning: false,
  },
]

const usageHistory = [
  { month: "Dez/26", reservas: 127, usuarios: 3, storage: 2.3 },
  { month: "Nov/26", reservas: 142, usuarios: 3, storage: 2.1 },
  { month: "Out/26", reservas: 156, usuarios: 4, storage: 1.9 },
  { month: "Set/26", reservas: 134, usuarios: 3, storage: 1.7 },
  { month: "Ago/26", reservas: 118, usuarios: 3, storage: 1.5 },
  { month: "Jul/26", reservas: 98, usuarios: 2, storage: 1.2 },
]

const recommendations = [
  {
    type: "info",
    title: "Uso equilibrado",
    description: "Seu uso está dentro dos limites do plano Pro. Continue assim!",
  },
  {
    type: "tip",
    title: "Dica de otimização",
    description: "Você pode ativar a compressão de imagens para economizar espaço de armazenamento.",
  },
]

export default function UsagePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F032D]">Uso do Sistema</h1>
          <p className="text-[#0F032D]/60">Monitore o consumo de recursos do seu plano</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-[#905BF4]/10 text-[#905BF4]">
            <Calendar className="mr-1 h-3 w-3" />
            Período: Dezembro 2026
          </Badge>
        </div>
      </div>

      {/* Métricas de Uso */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {usageMetrics.map((metric, index) => {
          const percentage = (metric.current / metric.limit) * 100
          const isWarning = percentage >= 80
          
          return (
            <Card key={index} className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${metric.color}`}>
                    <metric.icon className="h-5 w-5 text-white" />
                  </div>
                  {isWarning && (
                    <Badge variant="outline" className="border-yellow-500 text-yellow-600">
                      <AlertTriangle className="mr-1 h-3 w-3" />
                      80%+
                    </Badge>
                  )}
                </div>
                <div className="mt-4">
                  <p className="text-sm text-[#0F032D]/60">{metric.name}</p>
                  <p className="mt-1 text-2xl font-bold text-[#0F032D]">
                    {metric.current.toLocaleString()} <span className="text-sm font-normal text-[#0F032D]/60">/ {metric.limit.toLocaleString()} {metric.unit}</span>
                  </p>
                </div>
                <div className="mt-4">
                  <Progress
                    value={percentage}
                    className={`h-2 ${isWarning ? "[&>div]:bg-yellow-500" : "[&>div]:bg-[#905BF4]"}`}
                  />
                  <p className="mt-2 text-xs text-[#0F032D]/60">
                    {percentage.toFixed(1)}% utilizado
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Grid Principal */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Histórico de Uso */}
        <Card className="border-none shadow-md lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#0F032D]">
              <TrendingUp className="h-5 w-5" />
              Histórico de Uso
            </CardTitle>
            <CardDescription>Evolução do consumo nos últimos meses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Tabela simplificada */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#EFEFEF]">
                      <th className="pb-3 text-left font-medium text-[#0F032D]/60">Mês</th>
                      <th className="pb-3 text-right font-medium text-[#0F032D]/60">Reservas</th>
                      <th className="pb-3 text-right font-medium text-[#0F032D]/60">Usuários</th>
                      <th className="pb-3 text-right font-medium text-[#0F032D]/60">Armazenamento</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usageHistory.map((item, index) => (
                      <tr key={index} className="border-b border-[#EFEFEF] last:border-0">
                        <td className="py-3 font-medium text-[#0F032D]">{item.month}</td>
                        <td className="py-3 text-right text-[#0F032D]">{item.reservas}</td>
                        <td className="py-3 text-right text-[#0F032D]">{item.usuarios}</td>
                        <td className="py-3 text-right text-[#0F032D]">{item.storage} GB</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recomendações e Ações */}
        <div className="space-y-6">
          {/* Recomendações */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-[#0F032D]">Recomendações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendations.map((rec, index) => (
                <div
                  key={index}
                  className={`rounded-lg p-4 ${
                    rec.type === "info" ? "bg-green-50" : "bg-blue-50"
                  }`}
                >
                  <p className={`font-medium ${
                    rec.type === "info" ? "text-green-700" : "text-blue-700"
                  }`}>
                    {rec.title}
                  </p>
                  <p className={`mt-1 text-sm ${
                    rec.type === "info" ? "text-green-600" : "text-blue-600"
                  }`}>
                    {rec.description}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Ações Rápidas */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-[#0F032D]">Precisa de mais?</CardTitle>
              <CardDescription>Aumente os limites do seu plano</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-[#905BF4] hover:bg-[#4E2BCC]" asChild>
                <Link href="/dashboard/planos">
                  Fazer Upgrade
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/dashboard/billing">
                  Ver Faturas
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
