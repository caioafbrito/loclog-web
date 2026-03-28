"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { 
  Package, 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  ImageIcon,
  DollarSign,
  Tag,
  Boxes,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from "lucide-react"

// Mock data para produtos do inventário
const mockProducts = [
  {
    id: "1",
    code: "MR-001",
    name: "Mesa Redonda 1.20m",
    category: "Mesas",
    description: "Mesa redonda com tampo em MDF, ideal para 8 pessoas",
    costPrice: 350.00,
    rentalPrice: 45.00,
    salePrice: 450.00,
    stockControl: true,
    totalQuantity: 50,
    availableQuantity: 42,
    reservedQuantity: 8,
    minStock: 10,
    status: "active",
    image: null,
    warehouse: "Galpão Principal"
  },
  {
    id: "2",
    code: "CR-001",
    name: "Cadeira Tiffany Cristal",
    category: "Cadeiras",
    description: "Cadeira Tiffany transparente com assento almofadado branco",
    costPrice: 180.00,
    rentalPrice: 18.00,
    salePrice: 250.00,
    stockControl: true,
    totalQuantity: 200,
    availableQuantity: 156,
    reservedQuantity: 44,
    minStock: 50,
    status: "active",
    image: null,
    warehouse: "Galpão Principal"
  },
  {
    id: "3",
    code: "TL-001",
    name: "Toalha Adamascada Branca",
    category: "Toalhas",
    description: "Toalha adamascada branca para mesa redonda 1.20m",
    costPrice: 45.00,
    rentalPrice: 12.00,
    salePrice: 65.00,
    stockControl: true,
    totalQuantity: 100,
    availableQuantity: 78,
    reservedQuantity: 22,
    minStock: 20,
    status: "active",
    image: null,
    warehouse: "Galpão Têxtil"
  },
  {
    id: "4",
    code: "DC-001",
    name: "Decoração Centro de Mesa",
    category: "Decoração",
    description: "Arranjo floral artificial para centro de mesa",
    costPrice: 80.00,
    rentalPrice: 25.00,
    salePrice: 120.00,
    stockControl: true,
    totalQuantity: 30,
    availableQuantity: 8,
    reservedQuantity: 22,
    minStock: 15,
    status: "low_stock",
    image: null,
    warehouse: "Galpão Principal"
  },
  {
    id: "5",
    code: "IL-001",
    name: "Iluminação LED Warm",
    category: "Iluminação",
    description: "Kit de iluminação LED tom quente 10m",
    costPrice: 150.00,
    rentalPrice: 35.00,
    salePrice: 200.00,
    stockControl: true,
    totalQuantity: 25,
    availableQuantity: 20,
    reservedQuantity: 5,
    minStock: 8,
    status: "active",
    image: null,
    warehouse: "Galpão Principal"
  }
]

const categories = [
  "Mesas",
  "Cadeiras",
  "Toalhas",
  "Decoração",
  "Iluminação",
  "Tendas",
  "Louças",
  "Talheres",
  "Copos",
  "Buffet",
  "Som e Áudio",
  "Outros"
]

export default function InventarioPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isNewProductOpen, setIsNewProductOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<typeof mockProducts[0] | null>(null)

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const stats = {
    totalProducts: mockProducts.length,
    totalValue: mockProducts.reduce((acc, p) => acc + (p.costPrice * p.totalQuantity), 0),
    lowStock: mockProducts.filter(p => p.status === "low_stock").length,
    totalItems: mockProducts.reduce((acc, p) => acc + p.totalQuantity, 0)
  }

  const getStatusBadge = (status: string, available: number, min: number) => {
    if (available <= min) {
      return <Badge variant="destructive" className="bg-red-100 text-red-800">Estoque Baixo</Badge>
    }
    return <Badge className="bg-green-100 text-green-800">Disponível</Badge>
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F032D]">Inventário</h1>
          <p className="text-muted-foreground">
            Gerencie todos os produtos disponíveis para aluguel
          </p>
        </div>
        <Dialog open={isNewProductOpen} onOpenChange={setIsNewProductOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#905BF4] hover:bg-[#4E2BCC]">
              <Plus className="mr-2 h-4 w-4" />
              Novo Produto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Produto</DialogTitle>
              <DialogDescription>
                Cadastre um novo item no inventário de aluguel
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Código</Label>
                  <Input id="code" placeholder="Ex: MR-002" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Produto</Label>
                <Input id="name" placeholder="Ex: Mesa Redonda 1.50m" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea id="description" placeholder="Descreva as características do produto..." />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="costPrice">Preço de Custo</Label>
                  <Input id="costPrice" type="number" step="0.01" placeholder="0,00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rentalPrice">Preço de Aluguel</Label>
                  <Input id="rentalPrice" type="number" step="0.01" placeholder="0,00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salePrice">Preço de Venda</Label>
                  <Input id="salePrice" type="number" step="0.01" placeholder="0,00" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="warehouse">Armazém</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="principal">Galpão Principal</SelectItem>
                      <SelectItem value="textil">Galpão Têxtil</SelectItem>
                      <SelectItem value="moveis">Galpão Móveis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantidade Inicial</Label>
                  <Input id="quantity" type="number" placeholder="0" />
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label>Controle de Estoque</Label>
                  <p className="text-sm text-muted-foreground">
                    Habilitar monitoramento de quantidade disponível
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minStock">Estoque Mínimo (Alerta)</Label>
                <Input id="minStock" type="number" placeholder="10" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewProductOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-[#905BF4] hover:bg-[#4E2BCC]" onClick={() => setIsNewProductOpen(false)}>
                Salvar Produto
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total de Produtos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#0F032D]">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground">Cadastrados no sistema</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Itens em Estoque</CardTitle>
            <Boxes className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#0F032D]">{stats.totalItems}</div>
            <p className="text-xs text-muted-foreground">Unidades totais</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Valor do Inventário</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#0F032D]">
              {stats.totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </div>
            <p className="text-xs text-muted-foreground">Baseado no custo</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Estoque Baixo</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{stats.lowStock}</div>
            <p className="text-xs text-muted-foreground">Produtos em alerta</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle>Produtos do Inventário</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar produto..."
                  className="pl-8 w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Categorias</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead className="text-right">Aluguel</TableHead>
                <TableHead className="text-center">Total</TableHead>
                <TableHead className="text-center">Disponível</TableHead>
                <TableHead className="text-center">Reservado</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Armazém</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.code}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-md bg-[#EFEFEF] flex items-center justify-center">
                        <ImageIcon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.category}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium text-[#905BF4]">
                    {product.rentalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </TableCell>
                  <TableCell className="text-center">{product.totalQuantity}</TableCell>
                  <TableCell className="text-center text-green-600 font-medium">
                    {product.availableQuantity}
                  </TableCell>
                  <TableCell className="text-center text-orange-600">
                    {product.reservedQuantity}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(product.status, product.availableQuantity, product.minStock)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {product.warehouse}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver Detalhes
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
