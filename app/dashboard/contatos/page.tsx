"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Phone,
  Mail,
  MapPin,
  Edit,
  Trash2,
  FileText,
  Users,
  Building2,
  User,
  Save,
  History,
} from "lucide-react"

// Dados mock
const initialContacts = [
  {
    id: 1,
    name: "Empresa Festa Feliz",
    type: "pj",
    email: "contato@festafeliz.com.br",
    phone: "(11) 99999-1234",
    address: "Rua das Flores, 123 - São Paulo, SP",
    totalOrders: 15,
    totalSpent: "R$ 25.400,00",
    status: "cliente",
  },
  {
    id: 2,
    name: "João Silva",
    type: "pf",
    email: "joao.silva@email.com",
    phone: "(11) 98888-5678",
    address: "Av. Paulista, 1000 - São Paulo, SP",
    totalOrders: 3,
    totalSpent: "R$ 1.050,00",
    status: "cliente",
  },
  {
    id: 3,
    name: "Maria Santos",
    type: "pf",
    email: "maria.santos@email.com",
    phone: "(11) 97777-9012",
    address: "Rua Augusta, 500 - São Paulo, SP",
    totalOrders: 8,
    totalSpent: "R$ 4.200,00",
    status: "cliente",
  },
  {
    id: 4,
    name: "Buffet Sabor & Arte",
    type: "pj",
    email: "eventos@saborearte.com.br",
    phone: "(11) 96666-3456",
    address: "Rua dos Eventos, 789 - São Paulo, SP",
    totalOrders: 22,
    totalSpent: "R$ 45.800,00",
    status: "cliente",
  },
  {
    id: 5,
    name: "Carlos Oliveira",
    type: "pf",
    email: "carlos.oliveira@email.com",
    phone: "(11) 95555-7890",
    address: "Rua Consolação, 200 - São Paulo, SP",
    totalOrders: 0,
    totalSpent: "R$ 0,00",
    status: "lead",
  },
]

const typeConfig = {
  pf: { label: "Pessoa Física", icon: User, color: "bg-blue-100 text-blue-700" },
  pj: { label: "Pessoa Jurídica", icon: Building2, color: "bg-purple-100 text-purple-700" },
}

const statusConfig = {
  cliente: { label: "Cliente", color: "bg-green-100 text-green-700" },
  lead: { label: "Lead", color: "bg-yellow-100 text-yellow-700" },
}

const emptyFormData = {
  name: "",
  type: "pf",
  email: "",
  phone: "",
  address: "",
}

export default function ContatosPage() {
  const [contacts, setContacts] = useState(initialContacts)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  
  // Dialog states
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editDialog, setEditDialog] = useState<{ open: boolean; contact: typeof initialContacts[0] | null }>({ open: false, contact: null })
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; contactId: number | null }>({ open: false, contactId: null })
  const [historyDialog, setHistoryDialog] = useState<{ open: boolean; contact: typeof initialContacts[0] | null }>({ open: false, contact: null })
  
  const [formData, setFormData] = useState(emptyFormData)
  const [saving, setSaving] = useState(false)

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || contact.type === filterType
    return matchesSearch && matchesType
  })

  // Handlers
  const handleCreateContact = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const newContact = {
      id: Math.max(...contacts.map(c => c.id)) + 1,
      ...formData,
      totalOrders: 0,
      totalSpent: "R$ 0,00",
      status: "lead" as const,
    }
    
    setContacts([newContact, ...contacts])
    setFormData(emptyFormData)
    setIsDialogOpen(false)
    setSaving(false)
  }

  const handleEditContact = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    await new Promise(resolve => setTimeout(resolve, 500))
    
    if (editDialog.contact) {
      setContacts(contacts.map(c => 
        c.id === editDialog.contact?.id 
          ? { ...c, ...formData }
          : c
      ))
    }
    
    setFormData(emptyFormData)
    setEditDialog({ open: false, contact: null })
    setSaving(false)
  }

  const handleDeleteContact = () => {
    if (deleteDialog.contactId) {
      setContacts(contacts.filter(c => c.id !== deleteDialog.contactId))
      setDeleteDialog({ open: false, contactId: null })
    }
  }

  const openEditDialog = (contact: typeof initialContacts[0]) => {
    setFormData({
      name: contact.name,
      type: contact.type,
      email: contact.email,
      phone: contact.phone,
      address: contact.address,
    })
    setEditDialog({ open: true, contact })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F032D]">Contatos</h1>
          <p className="text-[#0F032D]/60">Gerencie todos os seus clientes e contatos</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open)
          if (!open) setFormData(emptyFormData)
        }}>
          <DialogTrigger asChild>
            <Button className="bg-[#905BF4] text-white hover:bg-[#4E2BCC]">
              <Plus className="mr-2 h-4 w-4" />
              Novo Contato
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Novo Contato</DialogTitle>
              <DialogDescription>Preencha os dados do novo contato</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateContact} className="space-y-4">
              <div className="space-y-2">
                <Label>Tipo de Pessoa</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pf">Pessoa Física</SelectItem>
                    <SelectItem value="pj">Pessoa Jurídica</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Nome *</Label>
                <Input 
                  id="name"
                  placeholder="Nome completo ou razão social" 
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail *</Label>
                <Input 
                  id="email"
                  type="email" 
                  placeholder="email@exemplo.com" 
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone *</Label>
                <Input 
                  id="phone"
                  type="tel" 
                  placeholder="(11) 99999-9999" 
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input 
                  id="address"
                  placeholder="Endereço completo" 
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                />
              </div>
              <DialogFooter className="gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-[#905BF4] text-white hover:bg-[#4E2BCC]" disabled={saving}>
                  <Save className="mr-2 h-4 w-4" />
                  {saving ? "Salvando..." : "Salvar"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-none shadow-md">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#905BF4]/10">
              <Users className="h-6 w-6 text-[#905BF4]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0F032D]">{contacts.length}</p>
              <p className="text-sm text-[#0F032D]/60">Total de Contatos</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0F032D]">{contacts.filter(c => c.status === "cliente").length}</p>
              <p className="text-sm text-[#0F032D]/60">Clientes</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100">
              <Users className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0F032D]">{contacts.filter(c => c.status === "lead").length}</p>
              <p className="text-sm text-[#0F032D]/60">Leads</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-none shadow-md">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0F032D]/40" />
              <Input
                placeholder="Buscar por nome ou e-mail..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="pf">Pessoa Física</SelectItem>
                <SelectItem value="pj">Pessoa Jurídica</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Contacts List */}
      <div className="space-y-4">
        {filteredContacts.map((contact) => {
          const type = typeConfig[contact.type as keyof typeof typeConfig]
          const status = statusConfig[contact.status as keyof typeof statusConfig]
          return (
            <Card key={contact.id} className="border-none shadow-md transition-shadow hover:shadow-lg">
              <CardContent className="p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14">
                      <AvatarFallback className="bg-[#905BF4]/10 text-[#905BF4] text-lg">
                        {contact.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-[#0F032D]">{contact.name}</h3>
                        <Badge className={type.color}>{type.label}</Badge>
                        <Badge className={status.color}>{status.label}</Badge>
                      </div>
                      <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#0F032D]/60">
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {contact.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {contact.phone}
                        </span>
                      </div>
                      <p className="mt-1 flex items-center gap-1 text-sm text-[#0F032D]/60">
                        <MapPin className="h-3 w-3" />
                        {contact.address}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-[#0F032D]/60">{contact.totalOrders} pedidos</p>
                      <p className="font-semibold text-[#0F032D]">{contact.totalSpent}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEditDialog(contact)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setHistoryDialog({ open: true, contact })}>
                          <History className="mr-2 h-4 w-4" />
                          Ver Histórico
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => setDeleteDialog({ open: true, contactId: contact.id })}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
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

      {/* Edit Dialog */}
      <Dialog open={editDialog.open} onOpenChange={(open) => {
        setEditDialog({ open, contact: open ? editDialog.contact : null })
        if (!open) setFormData(emptyFormData)
      }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Contato</DialogTitle>
            <DialogDescription>Atualize os dados do contato</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditContact} className="space-y-4">
            <div className="space-y-2">
              <Label>Tipo de Pessoa</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pf">Pessoa Física</SelectItem>
                  <SelectItem value="pj">Pessoa Jurídica</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="editName">Nome *</Label>
              <Input 
                id="editName"
                placeholder="Nome completo ou razão social" 
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editEmail">E-mail *</Label>
              <Input 
                id="editEmail"
                type="email" 
                placeholder="email@exemplo.com" 
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editPhone">Telefone *</Label>
              <Input 
                id="editPhone"
                type="tel" 
                placeholder="(11) 99999-9999" 
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editAddress">Endereço</Label>
              <Input 
                id="editAddress"
                placeholder="Endereço completo" 
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              />
            </div>
            <DialogFooter className="gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setEditDialog({ open: false, contact: null })}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-[#905BF4] text-white hover:bg-[#4E2BCC]" disabled={saving}>
                <Save className="mr-2 h-4 w-4" />
                {saving ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ open, contactId: open ? deleteDialog.contactId : null })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Contato</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este contato? 
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDeleteContact}
            >
              Sim, excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* History Dialog */}
      <Dialog open={historyDialog.open} onOpenChange={(open) => setHistoryDialog({ open, contact: open ? historyDialog.contact : null })}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Histórico de {historyDialog.contact?.name}</DialogTitle>
            <DialogDescription>Pedidos e orçamentos do cliente</DialogDescription>
          </DialogHeader>
          {historyDialog.contact && (
            <div className="space-y-4">
              <div className="rounded-lg bg-[#EFEFEF] p-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-[#0F032D]">{historyDialog.contact.totalOrders}</p>
                    <p className="text-sm text-[#0F032D]/60">Pedidos</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#905BF4]">{historyDialog.contact.totalSpent}</p>
                    <p className="text-sm text-[#0F032D]/60">Total Gasto</p>
                  </div>
                </div>
              </div>
              
              {historyDialog.contact.totalOrders > 0 ? (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-[#0F032D]/60">Últimos pedidos</p>
                  <div className="space-y-2">
                    {[
                      { id: "PED-4521", date: "05/12/2026", value: "R$ 2.350,00", status: "Entregue" },
                      { id: "PED-4518", date: "02/12/2026", value: "R$ 525,00", status: "Concluído" },
                      { id: "PED-4512", date: "28/11/2026", value: "R$ 1.200,00", status: "Concluído" },
                    ].slice(0, historyDialog.contact.totalOrders).map((order, i) => (
                      <div key={i} className="flex justify-between rounded-lg border border-[#EFEFEF] p-3">
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-[#0F032D]/60">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{order.value}</p>
                          <Badge variant="outline">{order.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-center text-[#0F032D]/60">Nenhum pedido encontrado</p>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setHistoryDialog({ open: false, contact: null })}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
