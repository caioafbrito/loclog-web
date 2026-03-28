"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Phone,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  Edit,
  FileText,
  MessageCircle,
  Package,
  FileDown,
  Send,
  Copy,
} from "lucide-react"

// Dados mock
const quotations = [
  {
    id: "#Q-198",
    client: "João Silva",
    phone: "(11) 98888-5678",
    type: "pf",
    items: [
      { name: "Cadeiras", qty: 10, price: 35 },
    ],
    total: "R$ 350,00",
    status: "sent",
    sentVia: "whatsapp",
    createdAt: "03/12/2026",
    validUntil: "10/12/2026",
    eventDate: "15/12/2026",
  },
  {
    id: "#Q-197",
    client: "Empresa Celebra",
    phone: "(11) 99123-4567",
    type: "pj",
    items: [
      { name: "Cadeiras", qty: 80, price: 35 },
      { name: "Mesas", qty: 16, price: 85 },
      { name: "Toalhas", qty: 16, price: 15 },
    ],
    total: "R$ 4.400,00",
    status: "accepted",
    sentVia: "pdf",
    createdAt: "02/12/2026",
    validUntil: "09/12/2026",
    eventDate: "20/12/2026",
  },
  {
    id: "#Q-196",
    client: "Ana Costa",
    phone: "(11) 97777-8888",
    type: "pf",
    items: [
      { name: "Cadeiras", qty: 30, price: 35 },
      { name: "Mesas", qty: 6, price: 85 },
    ],
    total: "R$ 1.560,00",
    status: "draft",
    sentVia: null,
    createdAt: "01/12/2026",
    validUntil: "08/12/2026",
    eventDate: "18/12/2026",
  },
  {
    id: "#Q-195",
    client: "Buffet Premium",
    phone: "(11) 96666-5555",
    type: "pj",
    items: [
      { name: "Cadeiras", qty: 150, price: 35 },
      { name: "Mesas", qty: 30, price: 85 },
    ],
    total: "R$ 7.800,00",
    status: "rejected",
    sentVia: "pdf",
    createdAt: "28/11/2026",
    validUntil: "05/12/2026",
    eventDate: "12/12/2026",
  },
  {
    id: "#Q-194",
    client: "Pedro Mendes",
    phone: "(11) 95555-4444",
    type: "pf",
    items: [
      { name: "Cadeiras", qty: 25, price: 35 },
      { name: "Mesas", qty: 5, price: 85 },
    ],
    total: "R$ 1.300,00",
    status: "expired",
    sentVia: "whatsapp",
    createdAt: "20/11/2026",
    validUntil: "27/11/2026",
    eventDate: "30/11/2026",
  },
]

const statusConfig = {
  draft: { label: "Rascunho", icon: Clock, color: "bg-gray-100 text-gray-700" },
  sent: { label: "Enviado", icon: Send, color: "bg-blue-100 text-blue-700" },
  accepted: { label: "Aceito", icon: CheckCircle2, color: "bg-green-100 text-green-700" },
  rejected: { label: "Rejeitado", icon: XCircle, color: "bg-red-100 text-red-700" },
  expired: { label: "Expirado", icon: Clock, color: "bg-orange-100 text-orange-700" },
}

const sentViaConfig = {
  whatsapp: { label: "WhatsApp", icon: MessageCircle },
  pdf: { label: "PDF", icon: FileText },
}

export default function OrcamentosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredQuotations = quotations.filter(q => {
    const matchesSearch = q.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         q.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || q.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const quotationsByStatus = {
    all: quotations,
    draft: quotations.filter(q => q.status === "draft"),
    sent: quotations.filter(q => q.status === "sent"),
    accepted: quotations.filter(q => q.status === "accepted"),
    rejected: quotations.filter(q => q.status === "rejected"),
    expired: quotations.filter(q => q.status === "expired"),
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F032D]">Orçamentos</h1>
          <p className="text-[#0F032D]/60">Crie e gerencie orçamentos para seus clientes</p>
        </div>
        <Button className="bg-[#905BF4] text-white hover:bg-[#4E2BCC]" asChild>
          <Link href="/dashboard/orcamentos/novo">
            <Plus className="mr-2 h-4 w-4" />
            Novo Orçamento
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {Object.entries(statusConfig).map(([key, config]) => {
          const count = quotationsByStatus[key as keyof typeof quotationsByStatus]?.length || 0
          return (
            <Card key={key} className="border-none shadow-md">
              <CardContent className="flex items-center gap-3 p-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${config.color}`}>
                  <config.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#0F032D]">{count}</p>
                  <p className="text-xs text-[#0F032D]/60">{config.label}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

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
              <SelectTrigger className="w-full sm:w-56">
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

      {/* Quotations List */}
      <div className="space-y-4">
        {filteredQuotations.map((quotation) => {
          const status = statusConfig[quotation.status as keyof typeof statusConfig]
          const sentVia = quotation.sentVia ? sentViaConfig[quotation.sentVia as keyof typeof sentViaConfig] : null
          return (
            <Card key={quotation.id} className="border-none shadow-md transition-shadow hover:shadow-lg">
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row">
                  {/* Quotation Info */}
                  <div className="flex-1 p-4">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${status.color}`}>
                          <status.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-lg font-bold text-[#0F032D]">{quotation.id}</span>
                            <Badge className={status.color}>{status.label}</Badge>
                            {sentVia && (
                              <Badge variant="outline" className="border-[#D0D0D8]">
                                <sentVia.icon className="mr-1 h-3 w-3" />
                                {sentVia.label}
                              </Badge>
                            )}
                          </div>
                          <p className="font-medium text-[#0F032D]">{quotation.client}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#0F032D]">{quotation.total}</p>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      <div className="flex items-center gap-2 text-sm text-[#0F032D]/70">
                        <Phone className="h-4 w-4" />
                        {quotation.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#0F032D]/70">
                        <Calendar className="h-4 w-4" />
                        Criado: {quotation.createdAt}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#0F032D]/70">
                        <Clock className="h-4 w-4" />
                        Valido até: {quotation.validUntil}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#0F032D]/70">
                        <Calendar className="h-4 w-4" />
                        Evento: {quotation.eventDate}
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm font-medium text-[#0F032D]/70">Itens:</p>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {quotation.items.map((item, i) => (
                          <Badge key={i} variant="outline" className="border-[#D0D0D8]">
                            {item.qty}x {item.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2 border-t border-[#EFEFEF] bg-[#EFEFEF]/50 p-4 lg:w-56 lg:flex-col lg:justify-center lg:border-l lg:border-t-0">
                    {quotation.status === "accepted" && (
                      <Button size="sm" className="flex-1 bg-[#905BF4] text-white hover:bg-[#4E2BCC] lg:w-full">
                        <Package className="mr-2 h-4 w-4" />
                        Converter em Pedido
                      </Button>
                    )}
                    {quotation.status === "draft" && (
                      <Button size="sm" className="flex-1 bg-[#905BF4] text-white hover:bg-[#4E2BCC] lg:w-full">
                        <Send className="mr-2 h-4 w-4" />
                        Enviar
                      </Button>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="outline" className="flex-1 lg:w-full">
                          <MoreVertical className="mr-2 h-4 w-4" />
                          Ações
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <FileDown className="mr-2 h-4 w-4" />
                          Baixar PDF
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Gerar Texto (WhatsApp)
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <XCircle className="mr-2 h-4 w-4" />
                          Excluir
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
    </div>
  )
}
