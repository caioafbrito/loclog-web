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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Truck,
  CheckCircle2,
  XCircle,
  Eye,
  Edit,
  FileText,
  CreditCard,
  Package,
  AlertCircle,
  Download,
  Send,
} from "lucide-react"

// Dados mock
const initialOrders = [
  {
    id: "PED-4521",
    client: "Empresa Festa Feliz",
    phone: "(11) 99999-1234",
    address: "Rua das Flores, 123 - São Paulo, SP",
    items: [
      { name: "Cadeiras", qty: 50, price: 35 },
      { name: "Mesas", qty: 10, price: 85 },
      { name: "Toalhas", qty: 10, price: 15 },
    ],
    total: "R$ 2.350,00",
    status: "waiting",
    paymentStatus: "pending",
    deliveryDate: "05/12/2026",
    deliveryTime: "08:00",
    pickupDate: "06/12/2026",
    pickupTime: "20:00",
    deliveryPerson: "Carlos",
  },
  {
    id: "PED-4520",
    client: "Maria Santos",
    phone: "(11) 97777-9012",
    address: "Rua Augusta, 500 - São Paulo, SP",
    items: [
      { name: "Cadeiras", qty: 20, price: 35 },
      { name: "Mesas", qty: 5, price: 85 },
    ],
    total: "R$ 1.125,00",
    status: "delivered",
    paymentStatus: "paid",
    deliveryDate: "04/12/2026",
    deliveryTime: "09:00",
    pickupDate: "04/12/2026",
    pickupTime: "18:00",
    deliveryPerson: "João",
  },
  {
    id: "PED-4519",
    client: "Buffet Sabor & Arte",
    phone: "(11) 96666-3456",
    address: "Rua dos Eventos, 789 - São Paulo, SP",
    items: [
      { name: "Cadeiras", qty: 100, price: 35 },
      { name: "Mesas", qty: 20, price: 85 },
    ],
    total: "R$ 5.200,00",
    status: "in_progress",
    paymentStatus: "partial",
    deliveryDate: "03/12/2026",
    deliveryTime: "07:00",
    pickupDate: "05/12/2026",
    pickupTime: "22:00",
    deliveryPerson: "Pedro",
  },
  {
    id: "PED-4518",
    client: "João Silva",
    phone: "(11) 98888-5678",
    address: "Av. Paulista, 1000 - São Paulo, SP",
    items: [
      { name: "Cadeiras", qty: 15, price: 35 },
    ],
    total: "R$ 525,00",
    status: "completed",
    paymentStatus: "paid",
    deliveryDate: "02/12/2026",
    deliveryTime: "10:00",
    pickupDate: "02/12/2026",
    pickupTime: "16:00",
    deliveryPerson: "Carlos",
  },
  {
    id: "PED-4517",
    client: "Festa Kids",
    phone: "(11) 94444-1234",
    address: "Rua Infantil, 50 - São Paulo, SP",
    items: [
      { name: "Cadeiras Infantis", qty: 30, price: 25 },
      { name: "Mesas Infantis", qty: 6, price: 60 },
    ],
    total: "R$ 1.110,00",
    status: "cancelled",
    paymentStatus: "refunded",
    deliveryDate: "01/12/2026",
    deliveryTime: "14:00",
    pickupDate: "01/12/2026",
    pickupTime: "20:00",
    deliveryPerson: null,
  },
]

const statusConfig = {
  waiting: { label: "Aguardando Retirada", icon: Clock, color: "bg-yellow-100 text-yellow-700", iconColor: "text-yellow-600" },
  in_progress: { label: "Em Andamento", icon: Truck, color: "bg-blue-100 text-blue-700", iconColor: "text-blue-600" },
  delivered: { label: "Entregue", icon: CheckCircle2, color: "bg-green-100 text-green-700", iconColor: "text-green-600" },
  completed: { label: "Concluído", icon: CheckCircle2, color: "bg-[#905BF4]/10 text-[#905BF4]", iconColor: "text-[#905BF4]" },
  cancelled: { label: "Cancelado", icon: XCircle, color: "bg-red-100 text-red-700", iconColor: "text-red-600" },
}

const paymentStatusConfig = {
  pending: { label: "Pendente", color: "bg-yellow-100 text-yellow-700" },
  partial: { label: "Parcial", color: "bg-orange-100 text-orange-700" },
  paid: { label: "Pago", color: "bg-green-100 text-green-700" },
  refunded: { label: "Estornado", color: "bg-gray-100 text-gray-700" },
}

const statusOptions = [
  { value: "waiting", label: "Aguardando Retirada" },
  { value: "in_progress", label: "Em Andamento" },
  { value: "delivered", label: "Entregue" },
  { value: "completed", label: "Concluído" },
]

export default function PedidosPage() {
  const [orders, setOrders] = useState(initialOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  
  // Dialog states
  const [cancelDialog, setCancelDialog] = useState<{ open: boolean; orderId: string | null }>({ open: false, orderId: null })
  const [statusDialog, setStatusDialog] = useState<{ open: boolean; orderId: string | null; currentStatus: string }>({ open: false, orderId: null, currentStatus: "" })
  const [chargeDialog, setChargeDialog] = useState<{ open: boolean; orderId: string | null }>({ open: false, orderId: null })
  const [documentDialog, setDocumentDialog] = useState<{ open: boolean; orderId: string | null }>({ open: false, orderId: null })
  const [viewDialog, setViewDialog] = useState<{ open: boolean; order: typeof initialOrders[0] | null }>({ open: false, order: null })
  
  const [newStatus, setNewStatus] = useState("")

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || order.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const ordersByStatus = {
    all: orders,
    waiting: orders.filter(o => o.status === "waiting"),
    in_progress: orders.filter(o => o.status === "in_progress"),
    delivered: orders.filter(o => o.status === "delivered"),
    completed: orders.filter(o => o.status === "completed"),
    cancelled: orders.filter(o => o.status === "cancelled"),
  }

  // Handlers
  const handleCancelOrder = () => {
    if (cancelDialog.orderId) {
      setOrders(orders.map(o => 
        o.id === cancelDialog.orderId 
          ? { ...o, status: "cancelled", paymentStatus: "refunded" }
          : o
      ))
      setCancelDialog({ open: false, orderId: null })
    }
  }

  const handleUpdateStatus = () => {
    if (statusDialog.orderId && newStatus) {
      setOrders(orders.map(o => 
        o.id === statusDialog.orderId 
          ? { ...o, status: newStatus }
          : o
      ))
      setStatusDialog({ open: false, orderId: null, currentStatus: "" })
      setNewStatus("")
    }
  }

  const handleGeneratePDF = (type: "pedido" | "entrega" | "contrato") => {
    // Simular geração de PDF
    alert(`PDF de ${type} gerado com sucesso! O download iniciará automaticamente.`)
    setDocumentDialog({ open: false, orderId: null })
  }

  const handleCharge = (method: "pix" | "boleto" | "cartao") => {
    // Simular cobrança
    alert(`Cobrança via ${method.toUpperCase()} enviada com sucesso!`)
    setChargeDialog({ open: false, orderId: null })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F032D]">Pedidos</h1>
          <p className="text-[#0F032D]/60">Gerencie todos os pedidos da sua locadora</p>
        </div>
        <Button className="bg-[#905BF4] text-white hover:bg-[#4E2BCC]" asChild>
          <Link href="/dashboard/pedidos/novo">
            <Plus className="mr-2 h-4 w-4" />
            Novo Pedido
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {Object.entries(statusConfig).map(([key, config]) => {
          const count = ordersByStatus[key as keyof typeof ordersByStatus]?.length || 0
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

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const status = statusConfig[order.status as keyof typeof statusConfig]
          const payment = paymentStatusConfig[order.paymentStatus as keyof typeof paymentStatusConfig]
          return (
            <Card key={order.id} className="border-none shadow-md transition-shadow hover:shadow-lg">
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row">
                  {/* Order Info */}
                  <div className="flex-1 p-4">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${status.color}`}>
                          <status.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-lg font-bold text-[#0F032D]">{order.id}</span>
                            <Badge className={status.color}>{status.label}</Badge>
                            <Badge className={payment.color}>{payment.label}</Badge>
                          </div>
                          <p className="font-medium text-[#0F032D]">{order.client}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#0F032D]">{order.total}</p>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      <div className="flex items-center gap-2 text-sm text-[#0F032D]/70">
                        <Phone className="h-4 w-4 shrink-0" />
                        {order.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#0F032D]/70">
                        <MapPin className="h-4 w-4 shrink-0" />
                        <span className="truncate">{order.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#0F032D]/70">
                        <Calendar className="h-4 w-4 shrink-0" />
                        Entrega: {order.deliveryDate} às {order.deliveryTime}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#0F032D]/70">
                        <Calendar className="h-4 w-4 shrink-0" />
                        Retirada: {order.pickupDate} às {order.pickupTime}
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm font-medium text-[#0F032D]/70">Itens:</p>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {order.items.map((item, i) => (
                          <Badge key={i} variant="outline" className="border-[#D0D0D8]">
                            {item.qty}x {item.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2 border-t border-[#EFEFEF] bg-[#EFEFEF]/50 p-4 lg:w-48 lg:flex-col lg:justify-center lg:border-l lg:border-t-0">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 lg:w-full"
                      onClick={() => setViewDialog({ open: true, order })}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Ver
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="outline" className="flex-1 lg:w-full">
                          <MoreVertical className="mr-2 h-4 w-4" />
                          Ações
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/pedidos/novo?edit=${order.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setDocumentDialog({ open: true, orderId: order.id })}>
                          <FileText className="mr-2 h-4 w-4" />
                          Emitir Documento
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setChargeDialog({ open: true, orderId: order.id })}>
                          <CreditCard className="mr-2 h-4 w-4" />
                          Cobrar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          setStatusDialog({ open: true, orderId: order.id, currentStatus: order.status })
                          setNewStatus(order.status)
                        }}>
                          <Truck className="mr-2 h-4 w-4" />
                          Atualizar Status
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => setCancelDialog({ open: true, orderId: order.id })}
                          disabled={order.status === "cancelled" || order.status === "completed"}
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Cancelar
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

      {/* Cancel Dialog */}
      <AlertDialog open={cancelDialog.open} onOpenChange={(open) => setCancelDialog({ open, orderId: open ? cancelDialog.orderId : null })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancelar Pedido</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja cancelar o pedido {cancelDialog.orderId}? 
              Esta ação não pode ser desfeita e o pagamento será estornado se já tiver sido realizado.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Não, manter pedido</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700"
              onClick={handleCancelOrder}
            >
              Sim, cancelar pedido
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Status Dialog */}
      <Dialog open={statusDialog.open} onOpenChange={(open) => setStatusDialog({ open, orderId: open ? statusDialog.orderId : null, currentStatus: open ? statusDialog.currentStatus : "" })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Atualizar Status</DialogTitle>
            <DialogDescription>
              Altere o status logístico do pedido {statusDialog.orderId}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Novo Status</Label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar status..." />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setStatusDialog({ open: false, orderId: null, currentStatus: "" })}>
              Cancelar
            </Button>
            <Button className="bg-[#905BF4] hover:bg-[#4E2BCC]" onClick={handleUpdateStatus}>
              Atualizar Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Charge Dialog */}
      <Dialog open={chargeDialog.open} onOpenChange={(open) => setChargeDialog({ open, orderId: open ? chargeDialog.orderId : null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cobrar Cliente</DialogTitle>
            <DialogDescription>
              Escolha o método de cobrança para o pedido {chargeDialog.orderId}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-4">
            <Button variant="outline" className="justify-start" onClick={() => handleCharge("pix")}>
              <CreditCard className="mr-2 h-4 w-4" />
              PIX - Enviar QR Code
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => handleCharge("boleto")}>
              <FileText className="mr-2 h-4 w-4" />
              Boleto Bancário
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => handleCharge("cartao")}>
              <CreditCard className="mr-2 h-4 w-4" />
              Link de Pagamento (Cartão)
            </Button>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setChargeDialog({ open: false, orderId: null })}>
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Document Dialog */}
      <Dialog open={documentDialog.open} onOpenChange={(open) => setDocumentDialog({ open, orderId: open ? documentDialog.orderId : null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Emitir Documento</DialogTitle>
            <DialogDescription>
              Escolha o tipo de documento para o pedido {documentDialog.orderId}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-4">
            <Button variant="outline" className="justify-start" onClick={() => handleGeneratePDF("pedido")}>
              <Download className="mr-2 h-4 w-4" />
              PDF do Pedido
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => handleGeneratePDF("entrega")}>
              <Truck className="mr-2 h-4 w-4" />
              Comprovante de Entrega
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => handleGeneratePDF("contrato")}>
              <FileText className="mr-2 h-4 w-4" />
              Contrato de Locação
            </Button>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDocumentDialog({ open: false, orderId: null })}>
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={viewDialog.open} onOpenChange={(open) => setViewDialog({ open, order: open ? viewDialog.order : null })}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Pedido {viewDialog.order?.id}</DialogTitle>
          </DialogHeader>
          {viewDialog.order && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-[#0F032D]/60">Cliente</p>
                  <p className="font-medium">{viewDialog.order.client}</p>
                </div>
                <div>
                  <p className="text-sm text-[#0F032D]/60">Telefone</p>
                  <p className="font-medium">{viewDialog.order.phone}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-[#0F032D]/60">Endereço</p>
                  <p className="font-medium">{viewDialog.order.address}</p>
                </div>
                <div>
                  <p className="text-sm text-[#0F032D]/60">Entrega</p>
                  <p className="font-medium">{viewDialog.order.deliveryDate} às {viewDialog.order.deliveryTime}</p>
                </div>
                <div>
                  <p className="text-sm text-[#0F032D]/60">Retirada</p>
                  <p className="font-medium">{viewDialog.order.pickupDate} às {viewDialog.order.pickupTime}</p>
                </div>
              </div>
              
              <div>
                <p className="mb-2 text-sm text-[#0F032D]/60">Itens do Pedido</p>
                <div className="rounded-lg border border-[#EFEFEF]">
                  {viewDialog.order.items.map((item, i) => (
                    <div key={i} className="flex justify-between border-b border-[#EFEFEF] p-3 last:border-0">
                      <span>{item.qty}x {item.name}</span>
                      <span className="font-medium">R$ {(item.qty * item.price).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between bg-[#EFEFEF] p-3 font-bold">
                    <span>Total</span>
                    <span>{viewDialog.order.total}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialog({ open: false, order: null })}>
              Fechar
            </Button>
            <Button className="bg-[#905BF4] hover:bg-[#4E2BCC]" asChild>
              <Link href={`/dashboard/pedidos/novo?edit=${viewDialog.order?.id}`}>
                <Edit className="mr-2 h-4 w-4" />
                Editar Pedido
              </Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
