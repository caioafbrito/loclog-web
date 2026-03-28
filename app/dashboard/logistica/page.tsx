"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { 
  Truck, 
  Calendar as CalendarIcon,
  MapPin,
  Phone,
  Clock,
  CheckCircle,
  Package,
  Navigation,
  User,
  DollarSign,
  AlertCircle,
  Play,
  Square,
  Plus,
  Route
} from "lucide-react"

// Mock data para entregas do dia
const mockDeliveries = [
  {
    id: "1",
    orderId: "PED-2024-0045",
    customer: "Maria Silva",
    phone: "(11) 99999-1234",
    address: "Rua das Flores, 123 - Jardim Paulista",
    city: "São Paulo - SP",
    type: "entrega",
    scheduledTime: "08:00",
    status: "pendente",
    items: 45,
    paymentStatus: "pago",
    driver: "João Motorista"
  },
  {
    id: "2",
    orderId: "PED-2024-0044",
    customer: "Carlos Oliveira",
    phone: "(11) 99999-5678",
    address: "Av. Brasil, 500 - Centro",
    city: "São Paulo - SP",
    type: "entrega",
    scheduledTime: "10:00",
    status: "em_rota",
    items: 120,
    paymentStatus: "pendente",
    driver: "João Motorista"
  },
  {
    id: "3",
    orderId: "PED-2024-0040",
    customer: "Ana Santos",
    phone: "(11) 99999-9012",
    address: "Rua Augusta, 200 - Consolação",
    city: "São Paulo - SP",
    type: "retirada",
    scheduledTime: "14:00",
    status: "pendente",
    items: 80,
    paymentStatus: "pago",
    driver: "Pedro Entregador"
  },
  {
    id: "4",
    orderId: "PED-2024-0038",
    customer: "Roberto Lima",
    phone: "(11) 99999-3456",
    address: "Rua Oscar Freire, 800 - Pinheiros",
    city: "São Paulo - SP",
    type: "retirada",
    scheduledTime: "16:00",
    status: "concluido",
    items: 60,
    paymentStatus: "pago",
    driver: "João Motorista"
  }
]

const drivers = ["João Motorista", "Pedro Entregador", "Carlos Silva"]

export default function LogisticaPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedDriver, setSelectedDriver] = useState("all")
  const [selectedDelivery, setSelectedDelivery] = useState<typeof mockDeliveries[0] | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const filteredDeliveries = mockDeliveries.filter(delivery => {
    if (selectedDriver === "all") return true
    return delivery.driver === selectedDriver
  })

  const stats = {
    total: mockDeliveries.length,
    pending: mockDeliveries.filter(d => d.status === "pendente").length,
    inRoute: mockDeliveries.filter(d => d.status === "em_rota").length,
    completed: mockDeliveries.filter(d => d.status === "concluido").length,
    deliveries: mockDeliveries.filter(d => d.type === "entrega").length,
    pickups: mockDeliveries.filter(d => d.type === "retirada").length
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pendente":
        return <Badge className="bg-yellow-100 text-yellow-800">Pendente</Badge>
      case "em_rota":
        return <Badge className="bg-blue-100 text-blue-800">Em Rota</Badge>
      case "concluido":
        return <Badge className="bg-green-100 text-green-800">Concluído</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "entrega":
        return <Badge className="bg-[#905BF4]/10 text-[#905BF4]">Entrega</Badge>
      case "retirada":
        return <Badge className="bg-[#4E2BCC]/10 text-[#4E2BCC]">Retirada</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case "pago":
        return <Badge className="bg-green-100 text-green-800">Pago</Badge>
      case "pendente":
        return <Badge variant="destructive">Pendente</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const openInMaps = (address: string) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`
    window.open(url, '_blank')
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F032D]">Logística</h1>
          <p className="text-muted-foreground">
            Gerencie entregas e retiradas do dia
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button className="bg-[#905BF4] hover:bg-[#4E2BCC]" asChild>
            <Link href="/dashboard/logistica/nova-rota">
              <Plus className="mr-2 h-4 w-4" />
              Nova Rota
            </Link>
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[180px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "dd/MM/yyyy", { locale: ptBR }) : "Selecione"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Select value={selectedDriver} onValueChange={setSelectedDriver}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Motorista" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Motoristas</SelectItem>
              {drivers.map(driver => (
                <SelectItem key={driver} value={driver}>{driver}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#0F032D]">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Entregas</CardTitle>
            <Package className="h-4 w-4 text-[#905BF4]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#905BF4]">{stats.deliveries}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Retiradas</CardTitle>
            <Package className="h-4 w-4 text-[#4E2BCC]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#4E2BCC]">{stats.pickups}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Em Rota</CardTitle>
            <Navigation className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.inRoute}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Concluídos</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          </CardContent>
        </Card>
      </div>

      {/* Deliveries List */}
      <Card>
        <CardHeader>
          <CardTitle>Roteiro do Dia</CardTitle>
          <CardDescription>
            {selectedDate && format(selectedDate, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Horário</TableHead>
                <TableHead>Pedido</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Endereço</TableHead>
                <TableHead>Itens</TableHead>
                <TableHead>Pagamento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDeliveries.map((delivery) => (
                <TableRow key={delivery.id} className={delivery.status === "concluido" ? "opacity-60" : ""}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{delivery.scheduledTime}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-[#905BF4]">{delivery.orderId}</TableCell>
                  <TableCell>{getTypeBadge(delivery.type)}</TableCell>
                  <TableCell>
                    <div>
                      <span className="font-medium">{delivery.customer}</span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {delivery.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[200px]">
                      <span className="text-sm">{delivery.address}</span>
                      <span className="block text-xs text-muted-foreground">{delivery.city}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{delivery.items}</TableCell>
                  <TableCell>{getPaymentBadge(delivery.paymentStatus)}</TableCell>
                  <TableCell>{getStatusBadge(delivery.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => openInMaps(`${delivery.address}, ${delivery.city}`)}
                      >
                        <Navigation className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setSelectedDelivery(delivery)
                          setIsDetailsOpen(true)
                        }}
                      >
                        Detalhes
                      </Button>
                      {delivery.status === "pendente" && (
                        <Button size="sm" className="bg-[#905BF4] hover:bg-[#4E2BCC]">
                          <Play className="h-4 w-4" />
                        </Button>
                      )}
                      {delivery.status === "em_rota" && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Delivery Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Detalhes da {selectedDelivery?.type === "entrega" ? "Entrega" : "Retirada"}</DialogTitle>
            <DialogDescription>
              Pedido {selectedDelivery?.orderId}
            </DialogDescription>
          </DialogHeader>
          {selectedDelivery && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                {getTypeBadge(selectedDelivery.type)}
                {getStatusBadge(selectedDelivery.status)}
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">{selectedDelivery.customer}</p>
                    <p className="text-sm text-muted-foreground">{selectedDelivery.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">{selectedDelivery.address}</p>
                    <p className="text-sm text-muted-foreground">{selectedDelivery.city}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Horário Agendado</p>
                    <p className="text-sm text-muted-foreground">{selectedDelivery.scheduledTime}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">{selectedDelivery.items} itens</p>
                    <p className="text-sm text-muted-foreground">A serem {selectedDelivery.type === "entrega" ? "entregues" : "retirados"}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Status do Pagamento</p>
                    <div className="mt-1">{getPaymentBadge(selectedDelivery.paymentStatus)}</div>
                  </div>
                </div>
              </div>

              {selectedDelivery.paymentStatus === "pendente" && (
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-2 text-yellow-800">
                    <AlertCircle className="h-5 w-5" />
                    <span className="font-medium">Pagamento Pendente</span>
                  </div>
                  <p className="text-sm text-yellow-700 mt-1">
                    Lembre-se de coletar o pagamento no momento da {selectedDelivery.type}.
                  </p>
                </div>
              )}
            </div>
          )}
          <DialogFooter className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => selectedDelivery && openInMaps(`${selectedDelivery.address}, ${selectedDelivery.city}`)}
            >
              <Navigation className="mr-2 h-4 w-4" />
              Abrir no Maps
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => selectedDelivery && window.open(`tel:${selectedDelivery.phone}`, '_self')}
            >
              <Phone className="mr-2 h-4 w-4" />
              Ligar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
