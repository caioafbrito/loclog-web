"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { 
  Boxes, 
  Calendar as CalendarIcon,
  Search,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  Filter
} from "lucide-react"

// Mock data para movimentações de estoque
const mockStockMovements = [
  {
    id: "1",
    date: new Date("2024-01-15"),
    type: "saida",
    product: "Mesa Redonda 1.20m",
    productCode: "MR-001",
    quantity: 8,
    reason: "Pedido #1234",
    warehouse: "Galpão Principal",
    user: "Sistema"
  },
  {
    id: "2",
    date: new Date("2024-01-15"),
    type: "entrada",
    product: "Cadeira Tiffany Cristal",
    productCode: "CR-001",
    quantity: 20,
    reason: "Devolução Pedido #1230",
    warehouse: "Galpão Principal",
    user: "Sistema"
  },
  {
    id: "3",
    date: new Date("2024-01-14"),
    type: "saida",
    product: "Toalha Adamascada Branca",
    productCode: "TL-001",
    quantity: 22,
    reason: "Pedido #1232",
    warehouse: "Galpão Têxtil",
    user: "Sistema"
  },
  {
    id: "4",
    date: new Date("2024-01-14"),
    type: "ajuste",
    product: "Decoração Centro de Mesa",
    productCode: "DC-001",
    quantity: -2,
    reason: "Quebra/Avaria",
    warehouse: "Galpão Principal",
    user: "João Silva"
  },
  {
    id: "5",
    date: new Date("2024-01-13"),
    type: "entrada",
    product: "Mesa Redonda 1.20m",
    productCode: "MR-001",
    quantity: 10,
    reason: "Compra NF #456",
    warehouse: "Galpão Principal",
    user: "Maria Santos"
  }
]

// Mock data para disponibilidade por data
const mockAvailability = [
  {
    date: "2024-01-20",
    product: "Mesa Redonda 1.20m",
    productCode: "MR-001",
    total: 50,
    reserved: 15,
    available: 35
  },
  {
    date: "2024-01-20",
    product: "Cadeira Tiffany Cristal",
    productCode: "CR-001",
    total: 200,
    reserved: 80,
    available: 120
  },
  {
    date: "2024-01-21",
    product: "Mesa Redonda 1.20m",
    productCode: "MR-001",
    total: 50,
    reserved: 25,
    available: 25
  },
  {
    date: "2024-01-21",
    product: "Cadeira Tiffany Cristal",
    productCode: "CR-001",
    total: 200,
    reserved: 120,
    available: 80
  }
]

// Mock data para alertas de estoque
const mockAlerts = [
  {
    id: "1",
    product: "Decoração Centro de Mesa",
    productCode: "DC-001",
    current: 8,
    minimum: 15,
    warehouse: "Galpão Principal",
    severity: "critical"
  },
  {
    id: "2",
    product: "Toalha Adamascada Branca",
    productCode: "TL-001",
    current: 78,
    minimum: 60,
    warehouse: "Galpão Têxtil",
    severity: "warning"
  }
]

export default function EstoquePage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedWarehouse, setSelectedWarehouse] = useState("all")

  const stats = {
    totalMovements: mockStockMovements.length,
    entries: mockStockMovements.filter(m => m.type === "entrada").length,
    exits: mockStockMovements.filter(m => m.type === "saida").length,
    alerts: mockAlerts.length
  }

  const getMovementBadge = (type: string) => {
    switch (type) {
      case "entrada":
        return <Badge className="bg-green-100 text-green-800">Entrada</Badge>
      case "saida":
        return <Badge className="bg-blue-100 text-blue-800">Saída</Badge>
      case "ajuste":
        return <Badge className="bg-orange-100 text-orange-800">Ajuste</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  const getAlertBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge variant="destructive">Crítico</Badge>
      case "warning":
        return <Badge className="bg-orange-100 text-orange-800">Atenção</Badge>
      default:
        return <Badge variant="outline">{severity}</Badge>
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F032D]">Controle de Estoque</h1>
          <p className="text-muted-foreground">
            Monitore disponibilidade e movimentações do estoque
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Movimentações Hoje</CardTitle>
            <Boxes className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#0F032D]">{stats.totalMovements}</div>
            <p className="text-xs text-muted-foreground">Registros no dia</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Entradas</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.entries}</div>
            <p className="text-xs text-muted-foreground">Devoluções e compras</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Saídas</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.exits}</div>
            <p className="text-xs text-muted-foreground">Pedidos e reservas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Alertas Ativos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{stats.alerts}</div>
            <p className="text-xs text-muted-foreground">Produtos em alerta</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="movements" className="space-y-4">
        <TabsList className="bg-[#EFEFEF]">
          <TabsTrigger value="movements">Movimentações</TabsTrigger>
          <TabsTrigger value="availability">Disponibilidade</TabsTrigger>
          <TabsTrigger value="alerts">Alertas</TabsTrigger>
          <TabsTrigger value="planning">Planejamento</TabsTrigger>
        </TabsList>

        <TabsContent value="movements">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <CardTitle>Movimentações de Estoque</CardTitle>
                <div className="flex gap-2">
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
                  <Select value={selectedWarehouse} onValueChange={setSelectedWarehouse}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Armazém" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os Armazéns</SelectItem>
                      <SelectItem value="principal">Galpão Principal</SelectItem>
                      <SelectItem value="textil">Galpão Têxtil</SelectItem>
                      <SelectItem value="moveis">Galpão Móveis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Produto</TableHead>
                    <TableHead className="text-center">Quantidade</TableHead>
                    <TableHead>Motivo</TableHead>
                    <TableHead>Armazém</TableHead>
                    <TableHead>Usuário</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockStockMovements.map((movement) => (
                    <TableRow key={movement.id}>
                      <TableCell className="text-sm">
                        {format(movement.date, "dd/MM/yyyy", { locale: ptBR })}
                      </TableCell>
                      <TableCell>{getMovementBadge(movement.type)}</TableCell>
                      <TableCell>
                        <div>
                          <span className="font-medium">{movement.product}</span>
                          <span className="block text-xs text-muted-foreground">{movement.productCode}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className={`font-medium ${
                          movement.type === "entrada" ? "text-green-600" : 
                          movement.type === "saida" ? "text-blue-600" : 
                          movement.quantity < 0 ? "text-red-600" : "text-green-600"
                        }`}>
                          {movement.type === "entrada" ? "+" : movement.type === "saida" ? "-" : ""}
                          {Math.abs(movement.quantity)}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm">{movement.reason}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{movement.warehouse}</TableCell>
                      <TableCell className="text-sm">{movement.user}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="availability">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>Disponibilidade por Data</CardTitle>
                  <CardDescription>Verifique a disponibilidade de produtos para uma data específica</CardDescription>
                </div>
                <div className="flex gap-2">
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
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Buscar produto..."
                      className="pl-8 w-[200px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Produto</TableHead>
                    <TableHead className="text-center">Total</TableHead>
                    <TableHead className="text-center">Reservado</TableHead>
                    <TableHead className="text-center">Disponível</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAvailability.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{format(new Date(item.date), "dd/MM/yyyy", { locale: ptBR })}</TableCell>
                      <TableCell>
                        <div>
                          <span className="font-medium">{item.product}</span>
                          <span className="block text-xs text-muted-foreground">{item.productCode}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">{item.total}</TableCell>
                      <TableCell className="text-center text-orange-600">{item.reserved}</TableCell>
                      <TableCell className="text-center text-green-600 font-medium">{item.available}</TableCell>
                      <TableCell>
                        {item.available > 0 ? (
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Disponível
                          </Badge>
                        ) : (
                          <Badge variant="destructive">Indisponível</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>Alertas de Estoque</CardTitle>
              <CardDescription>Produtos que estão abaixo do estoque mínimo configurado</CardDescription>
            </CardHeader>
            <CardContent>
              {mockAlerts.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Severidade</TableHead>
                      <TableHead>Produto</TableHead>
                      <TableHead className="text-center">Estoque Atual</TableHead>
                      <TableHead className="text-center">Estoque Mínimo</TableHead>
                      <TableHead>Armazém</TableHead>
                      <TableHead>Ação</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockAlerts.map((alert) => (
                      <TableRow key={alert.id}>
                        <TableCell>{getAlertBadge(alert.severity)}</TableCell>
                        <TableCell>
                          <div>
                            <span className="font-medium">{alert.product}</span>
                            <span className="block text-xs text-muted-foreground">{alert.productCode}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className={alert.current < alert.minimum ? "text-red-600 font-bold" : ""}>
                            {alert.current}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">{alert.minimum}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{alert.warehouse}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            Solicitar Compra
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-lg font-medium text-[#0F032D]">Nenhum Alerta Ativo</h3>
                  <p className="text-muted-foreground">Todos os produtos estão com estoque adequado.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="planning">
          <Card>
            <CardHeader>
              <CardTitle>Planejamento de Estoque</CardTitle>
              <CardDescription>Visualize a previsão de estoque para os próximos dias</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-[#0F032D]">Em Desenvolvimento</h3>
                <p className="text-muted-foreground mb-4">
                  O módulo de planejamento de estoque estará disponível em breve.
                </p>
                <p className="text-sm text-muted-foreground">
                  Você poderá visualizar projeções de demanda, sugestões de compra e análise de sazonalidade.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
