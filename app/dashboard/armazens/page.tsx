"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { 
  Warehouse, 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  MapPin,
  Package,
  Boxes,
  TrendingUp,
  BarChart3
} from "lucide-react"

// Mock data para armazéns
const mockWarehouses = [
  {
    id: "1",
    name: "Galpão Principal",
    code: "GP-001",
    address: "Rua das Indústrias, 500 - Distrito Industrial",
    city: "São Paulo",
    state: "SP",
    cep: "01234-567",
    capacity: 5000,
    usedCapacity: 3850,
    totalProducts: 156,
    totalItems: 2450,
    inventoryValue: 485000.00,
    status: "active",
    responsible: "João Silva"
  },
  {
    id: "2",
    name: "Galpão Têxtil",
    code: "GT-001",
    address: "Av. dos Tecidos, 200 - Centro",
    city: "São Paulo",
    state: "SP",
    cep: "01234-890",
    capacity: 2000,
    usedCapacity: 1200,
    totalProducts: 45,
    totalItems: 1800,
    inventoryValue: 125000.00,
    status: "active",
    responsible: "Maria Santos"
  },
  {
    id: "3",
    name: "Galpão Móveis",
    code: "GM-001",
    address: "Rua dos Móveis, 100 - Barra Funda",
    city: "São Paulo",
    state: "SP",
    cep: "01234-456",
    capacity: 8000,
    usedCapacity: 6400,
    totalProducts: 89,
    totalItems: 950,
    inventoryValue: 320000.00,
    status: "active",
    responsible: "Carlos Oliveira"
  }
]

export default function ArmazensPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isNewWarehouseOpen, setIsNewWarehouseOpen] = useState(false)

  const filteredWarehouses = mockWarehouses.filter(warehouse =>
    warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    warehouse.code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalStats = {
    totalWarehouses: mockWarehouses.length,
    totalCapacity: mockWarehouses.reduce((acc, w) => acc + w.capacity, 0),
    totalUsed: mockWarehouses.reduce((acc, w) => acc + w.usedCapacity, 0),
    totalValue: mockWarehouses.reduce((acc, w) => acc + w.inventoryValue, 0),
    totalItems: mockWarehouses.reduce((acc, w) => acc + w.totalItems, 0)
  }

  const getCapacityColor = (used: number, total: number) => {
    const percentage = (used / total) * 100
    if (percentage >= 90) return "bg-red-500"
    if (percentage >= 70) return "bg-orange-500"
    return "bg-[#905BF4]"
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F032D]">Armazéns</h1>
          <p className="text-muted-foreground">
            Gerencie os locais de armazenamento do seu inventário
          </p>
        </div>
        <Dialog open={isNewWarehouseOpen} onOpenChange={setIsNewWarehouseOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#905BF4] hover:bg-[#4E2BCC]">
              <Plus className="mr-2 h-4 w-4" />
              Novo Armazém
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Armazém</DialogTitle>
              <DialogDescription>
                Cadastre um novo local de armazenamento
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Armazém</Label>
                  <Input id="name" placeholder="Ex: Galpão Norte" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">Código</Label>
                  <Input id="code" placeholder="Ex: GN-001" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input id="address" placeholder="Rua, número, bairro" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input id="city" placeholder="São Paulo" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">Estado</Label>
                  <Input id="state" placeholder="SP" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cep">CEP</Label>
                  <Input id="cep" placeholder="00000-000" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacidade (m²)</Label>
                  <Input id="capacity" type="number" placeholder="1000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="responsible">Responsável</Label>
                  <Input id="responsible" placeholder="Nome do responsável" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Observações</Label>
                <Textarea id="notes" placeholder="Informações adicionais sobre o armazém..." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewWarehouseOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-[#905BF4] hover:bg-[#4E2BCC]" onClick={() => setIsNewWarehouseOpen(false)}>
                Salvar Armazém
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total de Armazéns</CardTitle>
            <Warehouse className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#0F032D]">{totalStats.totalWarehouses}</div>
            <p className="text-xs text-muted-foreground">Locais cadastrados</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Capacidade Total</CardTitle>
            <Boxes className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#0F032D]">
              {totalStats.totalCapacity.toLocaleString('pt-BR')} m²
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((totalStats.totalUsed / totalStats.totalCapacity) * 100)}% utilizado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Itens Armazenados</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#0F032D]">
              {totalStats.totalItems.toLocaleString('pt-BR')}
            </div>
            <p className="text-xs text-muted-foreground">Unidades totais</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#905BF4]">
              {totalStats.totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </div>
            <p className="text-xs text-muted-foreground">Em inventário</p>
          </CardContent>
        </Card>
      </div>

      {/* Warehouses Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredWarehouses.map((warehouse) => {
          const capacityPercentage = Math.round((warehouse.usedCapacity / warehouse.capacity) * 100)
          return (
            <Card key={warehouse.id} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-[#905BF4] to-[#4E2BCC] text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{warehouse.name}</CardTitle>
                    <CardDescription className="text-white/80">{warehouse.code}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver Inventário
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Relatórios
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>{warehouse.address}, {warehouse.city} - {warehouse.state}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Capacidade Utilizada</span>
                      <span className="font-medium">{capacityPercentage}%</span>
                    </div>
                    <Progress value={capacityPercentage} className={getCapacityColor(warehouse.usedCapacity, warehouse.capacity)} />
                    <p className="text-xs text-muted-foreground">
                      {warehouse.usedCapacity.toLocaleString('pt-BR')} / {warehouse.capacity.toLocaleString('pt-BR')} m²
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                    <div>
                      <p className="text-xs text-muted-foreground">Produtos</p>
                      <p className="text-lg font-semibold text-[#0F032D]">{warehouse.totalProducts}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Itens</p>
                      <p className="text-lg font-semibold text-[#0F032D]">{warehouse.totalItems.toLocaleString('pt-BR')}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">Valor do Inventário</p>
                    <p className="text-lg font-bold text-[#905BF4]">
                      {warehouse.inventoryValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </p>
                  </div>

                  <div className="pt-2 border-t text-sm">
                    <span className="text-muted-foreground">Responsável: </span>
                    <span className="font-medium">{warehouse.responsible}</span>
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
