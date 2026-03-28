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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
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
  Route,
  Boxes,
  ClipboardCheck,
  ArrowRight,
  Info,
} from "lucide-react"

// Simular parâmetro de logística interna (viria do store de configurações)
const LOGISTICA_INTERNA_ATIVA = true

// Status disponíveis baseados na configuração
const STATUS_ENTREGA = LOGISTICA_INTERNA_ATIVA 
  ? ["a_separar", "separado", "em_rota_entrega", "entregue"]
  : ["em_rota_entrega", "entregue"]

const STATUS_RETIRADA = LOGISTICA_INTERNA_ATIVA
  ? ["em_rota_retirada", "retirado", "a_conferir", "conferido"]
  : ["em_rota_retirada", "retirado", "concluido"]

// Definição dos status e suas propriedades
const STATUS_CONFIG: Record<string, { label: string; color: string; bgColor: string; icon: React.ElementType }> = {
  // Entrega
  a_separar: { label: "A Separar", color: "text-amber-800", bgColor: "bg-amber-100", icon: Boxes },
  separado: { label: "Separado", color: "text-orange-800", bgColor: "bg-orange-100", icon: Package },
  em_rota_entrega: { label: "Saiu p/ Entrega", color: "text-blue-800", bgColor: "bg-blue-100", icon: Truck },
  entregue: { label: "Entregue", color: "text-purple-800", bgColor: "bg-purple-100", icon: CheckCircle },
  // Retirada
  em_rota_retirada: { label: "Saiu p/ Retirada", color: "text-blue-800", bgColor: "bg-blue-100", icon: Truck },
  retirado: { label: "Retirado", color: "text-purple-800", bgColor: "bg-purple-100", icon: CheckCircle },
  a_conferir: { label: "A Conferir", color: "text-amber-800", bgColor: "bg-amber-100", icon: ClipboardCheck },
  conferido: { label: "Conferido", color: "text-green-800", bgColor: "bg-green-100", icon: CheckCircle },
  concluido: { label: "Concluído", color: "text-green-800", bgColor: "bg-green-100", icon: CheckCircle },
}

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
    status: LOGISTICA_INTERNA_ATIVA ? "a_separar" : "em_rota_entrega",
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
    status: "em_rota_entrega",
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
    status: "em_rota_retirada",
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
    status: LOGISTICA_INTERNA_ATIVA ? "conferido" : "concluido",
    items: 60,
    paymentStatus: "pago",
    driver: "João Motorista"
  },
  {
    id: "5",
    orderId: "PED-2024-0042",
    customer: "Fernanda Costa",
    phone: "(11) 99999-7890",
    address: "Rua Haddock Lobo, 350 - Cerqueira César",
    city: "São Paulo - SP",
    type: "retirada",
    scheduledTime: "17:00",
    status: LOGISTICA_INTERNA_ATIVA ? "a_conferir" : "concluido",
    items: 35,
    paymentStatus: "pago",
    driver: "Pedro Entregador"
  }
]

const drivers = ["João Motorista", "Pedro Entregador", "Carlos Silva"]

export default function LogisticaPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedDriver, setSelectedDriver] = useState("all")
  const [selectedDelivery, setSelectedDelivery] = useState<typeof mockDeliveries[0] | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [deliveries, setDeliveries] = useState(mockDeliveries)
  const [activeTab, setActiveTab] = useState("todos")

  const filteredDeliveries = deliveries.filter(delivery => {
    if (selectedDriver !== "all" && delivery.driver !== selectedDriver) return false
    
    switch (activeTab) {
      case "entregas":
        return delivery.type === "entrega"
      case "retiradas":
        return delivery.type === "retirada"
      case "separacao":
        return delivery.status === "a_separar" || delivery.status === "separado"
      case "conferencia":
        return delivery.status === "a_conferir"
      default:
        return true
    }
  })
  
  // Função para obter o próximo status
  const getProximoStatus = (tipo: string, statusAtual: string): string | null => {
    const statusList = tipo === "entrega" ? STATUS_ENTREGA : STATUS_RETIRADA
    const indexAtual = statusList.indexOf(statusAtual)
    if (indexAtual === -1 || indexAtual === statusList.length - 1) return null
    return statusList[indexAtual + 1]
  }

  const handleAvancarStatus = (id: string) => {
    setDeliveries(prev => prev.map(d => {
      if (d.id !== id) return d
      const proximoStatus = getProximoStatus(d.type, d.status)
      if (!proximoStatus) return d
      return { ...d, status: proximoStatus }
    }))
  }

  const stats = {
    total: deliveries.length,
    aSeparar: deliveries.filter(d => d.status === "a_separar").length,
    separados: deliveries.filter(d => d.status === "separado").length,
    emRota: deliveries.filter(d => d.status === "em_rota_entrega" || d.status === "em_rota_retirada").length,
    entregues: deliveries.filter(d => d.status === "entregue").length,
    retirados: deliveries.filter(d => d.status === "retirado").length,
    aConferir: deliveries.filter(d => d.status === "a_conferir").length,
    concluidos: deliveries.filter(d => d.status === "conferido" || d.status === "concluido").length,
  }

  const getStatusBadge = (status: string) => {
    const config = STATUS_CONFIG[status]
    if (!config) return <Badge variant="outline">{status}</Badge>
    const Icon = config.icon
    return (
      <Badge className={`${config.bgColor} ${config.color} gap-1`}>
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    )
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

  // Botão de ação baseado no status atual
  const renderActionButton = (delivery: typeof mockDeliveries[0]) => {
    const proximoStatus = getProximoStatus(delivery.type, delivery.status)
    if (!proximoStatus) return null

    const proximoConfig = STATUS_CONFIG[proximoStatus]
    const Icon = proximoConfig?.icon || CheckCircle

    // Determinar cor e texto do botão
    let buttonClass = "bg-[#905BF4] hover:bg-[#4E2BCC]"
    let buttonText = proximoConfig?.label || "Avançar"

    // Status que o motorista marca (durante a rota)
    if (proximoStatus === "entregue" || proximoStatus === "retirado") {
      buttonClass = "bg-green-600 hover:bg-green-700"
      buttonText = delivery.type === "entrega" ? "Marcar Entregue" : "Marcar Retirado"
    }

    // Status de conferência/conclusão
    if (proximoStatus === "conferido" || proximoStatus === "concluido") {
      buttonClass = "bg-[#0F032D] hover:bg-[#0F032D]/80"
      buttonText = "Finalizar"
    }

    return (
      <Button 
        size="sm" 
        className={`h-7 text-xs ${buttonClass}`}
        onClick={() => handleAvancarStatus(delivery.id)}
      >
        <Icon className="h-3 w-3 mr-1" />
        {buttonText}
      </Button>
    )
  }

  return (
    <TooltipProvider>
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

        {/* Info Logística Interna */}
        {LOGISTICA_INTERNA_ATIVA && (
          <div className="rounded-lg bg-[#905BF4]/10 border border-[#905BF4]/20 p-3 flex items-center gap-3">
            <Info className="h-5 w-5 text-[#905BF4] shrink-0" />
            <p className="text-sm text-[#0F032D]">
              <span className="font-medium">Logística Interna Ativa:</span> Controle de separação e conferência habilitado. 
              <Link href="/dashboard/configuracoes" className="text-[#905BF4] hover:underline ml-1">
                Ver configurações
              </Link>
            </p>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-medium">Total</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0F032D]">{stats.total}</div>
            </CardContent>
          </Card>
          {LOGISTICA_INTERNA_ATIVA && (
            <>
              <Card className="border-amber-200 bg-amber-50">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xs font-medium text-amber-800">A Separar</CardTitle>
                  <Boxes className="h-4 w-4 text-amber-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-700">{stats.aSeparar}</div>
                </CardContent>
              </Card>
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xs font-medium text-orange-800">Separados</CardTitle>
                  <Package className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-700">{stats.separados}</div>
                </CardContent>
              </Card>
            </>
          )}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-medium text-blue-800">Em Rota</CardTitle>
              <Navigation className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700">{stats.emRota}</div>
            </CardContent>
          </Card>
          <Card className="border-purple-200 bg-purple-50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-medium text-purple-800">Entregues</CardTitle>
              <CheckCircle className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700">{stats.entregues}</div>
            </CardContent>
          </Card>
          <Card className="border-purple-200 bg-purple-50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-medium text-purple-800">Retirados</CardTitle>
              <CheckCircle className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700">{stats.retirados}</div>
            </CardContent>
          </Card>
          {LOGISTICA_INTERNA_ATIVA && (
            <Card className="border-amber-200 bg-amber-50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-medium text-amber-800">A Conferir</CardTitle>
                <ClipboardCheck className="h-4 w-4 text-amber-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-700">{stats.aConferir}</div>
              </CardContent>
            </Card>
          )}
          <Card className="border-green-200 bg-green-50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-medium text-green-800">Concluídos</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">{stats.concluidos}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs de Filtro */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="entregas">Entregas</TabsTrigger>
            <TabsTrigger value="retiradas">Retiradas</TabsTrigger>
            {LOGISTICA_INTERNA_ATIVA && (
              <>
                <TabsTrigger value="separacao" className="gap-1">
                  <Boxes className="h-4 w-4" />
                  Separação
                  {stats.aSeparar > 0 && (
                    <Badge className="ml-1 bg-amber-500 text-white text-[10px] px-1.5">{stats.aSeparar}</Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="conferencia" className="gap-1">
                  <ClipboardCheck className="h-4 w-4" />
                  Conferência
                  {stats.aConferir > 0 && (
                    <Badge className="ml-1 bg-amber-500 text-white text-[10px] px-1.5">{stats.aConferir}</Badge>
                  )}
                </TabsTrigger>
              </>
            )}
          </TabsList>
        </Tabs>

        {/* Deliveries List */}
        <Card>
          <CardHeader>
            <CardTitle>Roteiro do Dia</CardTitle>
            <CardDescription>
              {selectedDate && format(selectedDate, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table className="min-w-[900px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">Horário</TableHead>
                  <TableHead className="w-24">Pedido</TableHead>
                  <TableHead className="w-20">Tipo</TableHead>
                  <TableHead className="w-32">Cliente</TableHead>
                  <TableHead className="w-48">Endereço</TableHead>
                  <TableHead className="w-16 text-center">Itens</TableHead>
                  <TableHead className="w-24">Pagamento</TableHead>
                  <TableHead className="w-28">Status</TableHead>
                  <TableHead className="w-40">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDeliveries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                      Nenhum item encontrado para este filtro.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDeliveries.map((delivery) => {
                    const isFinalizado = delivery.status === "conferido" || delivery.status === "concluido"
                    return (
                      <TableRow key={delivery.id} className={isFinalizado ? "opacity-60 bg-green-50/50" : ""}>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground shrink-0" />
                            <span className="text-sm font-medium">{delivery.scheduledTime}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-[#905BF4] text-sm">{delivery.orderId}</TableCell>
                        <TableCell>{getTypeBadge(delivery.type)}</TableCell>
                        <TableCell>
                          <div className="max-w-[120px]">
                            <span className="font-medium text-sm truncate block">{delivery.customer}</span>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Phone className="h-3 w-3 shrink-0" />
                              <span className="truncate">{delivery.phone}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-[180px]">
                            <span className="text-sm truncate block">{delivery.address}</span>
                            <span className="text-xs text-muted-foreground truncate block">{delivery.city}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center text-sm">{delivery.items}</TableCell>
                        <TableCell>{getPaymentBadge(delivery.paymentStatus)}</TableCell>
                        <TableCell>{getStatusBadge(delivery.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-1 flex-wrap">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  size="icon" 
                                  variant="outline"
                                  className="h-7 w-7"
                                  onClick={() => openInMaps(`${delivery.address}, ${delivery.city}`)}
                                >
                                  <Navigation className="h-3 w-3" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Abrir no Maps</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  size="icon" 
                                  variant="outline"
                                  className="h-7 w-7"
                                  onClick={() => {
                                    setSelectedDelivery(delivery)
                                    setIsDetailsOpen(true)
                                  }}
                                >
                                  <AlertCircle className="h-3 w-3" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Ver detalhes</TooltipContent>
                            </Tooltip>
                            {renderActionButton(delivery)}
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
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
                
                {/* Fluxo de Status */}
                <div className="rounded-lg bg-[#EFEFEF] p-3">
                  <h4 className="text-sm font-medium text-[#0F032D] mb-2">Fluxo de Status</h4>
                  <div className="flex items-center flex-wrap gap-1">
                    {(selectedDelivery.type === "entrega" ? STATUS_ENTREGA : STATUS_RETIRADA).map((status, index, arr) => {
                      const config = STATUS_CONFIG[status]
                      const isAtual = selectedDelivery.status === status
                      const isPast = arr.indexOf(selectedDelivery.status) > index
                      return (
                        <div key={status} className="flex items-center">
                          <Badge 
                            className={`text-[10px] ${isAtual ? config.bgColor + ' ' + config.color : isPast ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}
                          >
                            {config.label}
                          </Badge>
                          {index < arr.length - 1 && (
                            <ArrowRight className="h-3 w-3 mx-1 text-muted-foreground" />
                          )}
                        </div>
                      )
                    })}
                  </div>
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
    </TooltipProvider>
  )
}
