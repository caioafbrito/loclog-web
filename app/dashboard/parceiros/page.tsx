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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Users, 
  Plus, 
  Search, 
  MoreHorizontal, 
  UserPlus,
  Handshake,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Check,
  X,
  Eye,
  MessageSquare,
  ArrowRightLeft
} from "lucide-react"

// Mock data para parceiros
const mockPartners = [
  {
    id: "1",
    name: "LocFestas SP",
    email: "contato@locfestassp.com.br",
    phone: "(11) 99999-1111",
    city: "São Paulo - SP",
    status: "active",
    connectionDate: "2024-01-01",
    totalOrders: 15,
    asProvider: 8,
    asDeliverer: 7,
    balance: 2500.00
  },
  {
    id: "2",
    name: "Eventos & Cia",
    email: "contato@eventosecia.com.br",
    phone: "(11) 99999-2222",
    city: "Guarulhos - SP",
    status: "active",
    connectionDate: "2024-02-15",
    totalOrders: 10,
    asProvider: 6,
    asDeliverer: 4,
    balance: -1200.00
  },
  {
    id: "3",
    name: "Aluga Tudo",
    email: "contato@alugatudo.com.br",
    phone: "(11) 99999-3333",
    city: "Osasco - SP",
    status: "pending",
    connectionDate: null,
    totalOrders: 0,
    asProvider: 0,
    asDeliverer: 0,
    balance: 0
  }
]

// Mock data para pedidos compartilhados
const mockSharedOrders = [
  {
    id: "1",
    orderId: "PED-2024-0050",
    partner: "LocFestas SP",
    role: "provider",
    customer: "Maria Silva",
    date: "2024-01-20",
    value: 850.00,
    commission: 127.50,
    status: "completed"
  },
  {
    id: "2",
    orderId: "PED-2024-0048",
    partner: "Eventos & Cia",
    role: "deliverer",
    customer: "João Santos",
    date: "2024-01-18",
    value: 1200.00,
    commission: 180.00,
    status: "in_progress"
  },
  {
    id: "3",
    orderId: "PED-2024-0045",
    partner: "LocFestas SP",
    role: "deliverer",
    customer: "Ana Oliveira",
    date: "2024-01-15",
    value: 650.00,
    commission: 97.50,
    status: "completed"
  }
]

// Mock data para solicitações pendentes
const mockRequests = [
  {
    id: "1",
    partner: "Aluga Tudo",
    email: "contato@alugatudo.com.br",
    city: "Osasco - SP",
    requestDate: "2024-01-18",
    type: "received"
  }
]

export default function ParceirosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isInviteOpen, setIsInviteOpen] = useState(false)

  const filteredPartners = mockPartners.filter(partner =>
    partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partner.city.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const activePartners = mockPartners.filter(p => p.status === "active")
  const totalBalance = activePartners.reduce((acc, p) => acc + p.balance, 0)
  const totalOrders = activePartners.reduce((acc, p) => acc + p.totalOrders, 0)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Ativo</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pendente</Badge>
      case "inactive":
        return <Badge variant="outline">Inativo</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "provider":
        return <Badge className="bg-[#905BF4]/10 text-[#905BF4]">Provedor</Badge>
      case "deliverer":
        return <Badge className="bg-[#4E2BCC]/10 text-[#4E2BCC]">Entregador</Badge>
      default:
        return <Badge variant="outline">{role}</Badge>
    }
  }

  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Concluído</Badge>
      case "in_progress":
        return <Badge className="bg-blue-100 text-blue-800">Em Andamento</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F032D]">Programa de Parceiros</h1>
          <p className="text-muted-foreground">
            Gerencie suas conexões e pedidos compartilhados
          </p>
        </div>
        <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#905BF4] hover:bg-[#4E2BCC]">
              <UserPlus className="mr-2 h-4 w-4" />
              Convidar Parceiro
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Convidar Novo Parceiro</DialogTitle>
              <DialogDescription>
                Envie um convite para outro locador se conectar com você
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="partnerEmail">E-mail do Parceiro</Label>
                <Input id="partnerEmail" type="email" placeholder="contato@empresa.com.br" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Mensagem (opcional)</Label>
                <Input id="message" placeholder="Olá! Gostaria de estabelecer uma parceria..." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsInviteOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-[#905BF4] hover:bg-[#4E2BCC]" onClick={() => setIsInviteOpen(false)}>
                Enviar Convite
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Parceiros Ativos</CardTitle>
            <Handshake className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#0F032D]">{activePartners.length}</div>
            <p className="text-xs text-muted-foreground">Conexões estabelecidas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pedidos Compartilhados</CardTitle>
            <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#0F032D]">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">Total de parcerias</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
            {totalBalance >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalBalance >= 0 ? "text-green-600" : "text-red-600"}`}>
              {totalBalance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </div>
            <p className="text-xs text-muted-foreground">
              {totalBalance >= 0 ? "A receber" : "A pagar"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Solicitações</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#905BF4]">{mockRequests.length}</div>
            <p className="text-xs text-muted-foreground">Pendentes de aprovação</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="partners" className="space-y-4">
        <TabsList className="bg-[#EFEFEF]">
          <TabsTrigger value="partners">Meus Parceiros</TabsTrigger>
          <TabsTrigger value="orders">Pedidos Compartilhados</TabsTrigger>
          <TabsTrigger value="requests">
            Solicitações
            {mockRequests.length > 0 && (
              <Badge className="ml-2 bg-[#905BF4]">{mockRequests.length}</Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="partners">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <CardTitle>Parceiros Conectados</CardTitle>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar parceiro..."
                    className="pl-8 w-[250px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Parceiro</TableHead>
                    <TableHead>Cidade</TableHead>
                    <TableHead className="text-center">Como Provedor</TableHead>
                    <TableHead className="text-center">Como Entregador</TableHead>
                    <TableHead className="text-right">Saldo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPartners.map((partner) => (
                    <TableRow key={partner.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-[#905BF4] text-white">
                              {partner.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <span className="font-medium">{partner.name}</span>
                            <span className="block text-xs text-muted-foreground">{partner.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{partner.city}</TableCell>
                      <TableCell className="text-center">{partner.asProvider}</TableCell>
                      <TableCell className="text-center">{partner.asDeliverer}</TableCell>
                      <TableCell className="text-right">
                        <span className={`font-medium ${partner.balance >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {partner.balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </span>
                      </TableCell>
                      <TableCell>{getStatusBadge(partner.status)}</TableCell>
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
                              Ver Perfil
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Enviar Mensagem
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <DollarSign className="mr-2 h-4 w-4" />
                              Ver Extrato
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
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Pedidos em Parceria</CardTitle>
              <CardDescription>Histórico de pedidos compartilhados com seus parceiros</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pedido</TableHead>
                    <TableHead>Parceiro</TableHead>
                    <TableHead>Seu Papel</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead className="text-right">Comissão</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockSharedOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium text-[#905BF4]">{order.orderId}</TableCell>
                      <TableCell>{order.partner}</TableCell>
                      <TableCell>{getRoleBadge(order.role)}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{new Date(order.date).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell className="text-right">
                        {order.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </TableCell>
                      <TableCell className="text-right font-medium text-green-600">
                        {order.commission.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </TableCell>
                      <TableCell>{getOrderStatusBadge(order.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <CardTitle>Solicitações de Parceria</CardTitle>
              <CardDescription>Convites recebidos e enviados</CardDescription>
            </CardHeader>
            <CardContent>
              {mockRequests.length > 0 ? (
                <div className="space-y-4">
                  {mockRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback className="bg-[#905BF4] text-white">
                            {request.partner.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{request.partner}</p>
                          <p className="text-sm text-muted-foreground">{request.email}</p>
                          <p className="text-xs text-muted-foreground">{request.city}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground mr-4">
                          Solicitado em {new Date(request.requestDate).toLocaleDateString('pt-BR')}
                        </span>
                        <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                          <X className="h-4 w-4" />
                        </Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <Check className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Handshake className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-[#0F032D]">Nenhuma Solicitação</h3>
                  <p className="text-muted-foreground">Você não tem solicitações pendentes no momento.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
