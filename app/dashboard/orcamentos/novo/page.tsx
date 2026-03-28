"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ArrowLeft,
  Trash2,
  Calendar,
  User,
  MapPin,
  Package,
  Save,
  Send,
  FileText,
  MessageCircle,
} from "lucide-react"

// Produtos disponíveis
const availableProducts = [
  { id: 1, name: "Cadeiras", price: 35, stock: 200 },
  { id: 2, name: "Mesas", price: 85, stock: 50 },
  { id: 3, name: "Toalhas", price: 15, stock: 100 },
  { id: 4, name: "Capas para Cadeiras", price: 10, stock: 200 },
  { id: 5, name: "Cadeiras Infantis", price: 25, stock: 30 },
  { id: 6, name: "Mesas Infantis", price: 60, stock: 15 },
  { id: 7, name: "Rechaud", price: 120, stock: 20 },
  { id: 8, name: "Freezer Horizontal", price: 200, stock: 10 },
]

// Contatos existentes
const existingContacts = [
  { id: 1, name: "Empresa Festa Feliz", phone: "(11) 99999-1234", type: "pj" },
  { id: 2, name: "João Silva", phone: "(11) 98888-5678", type: "pf" },
  { id: 3, name: "Maria Santos", phone: "(11) 97777-9012", type: "pf" },
  { id: 4, name: "Buffet Sabor & Arte", phone: "(11) 96666-3456", type: "pj" },
]

interface QuoteItem {
  productId: number
  productName: string
  quantity: number
  unitPrice: number
}

export default function NovoOrcamentoPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [selectedContact, setSelectedContact] = useState<string>("")
  const [items, setItems] = useState<QuoteItem[]>([])
  
  // Formulário
  const [formData, setFormData] = useState({
    clientName: "",
    clientPhone: "",
    clientType: "pf",
    eventDate: "",
    eventAddress: "",
    validUntil: "",
    notes: "",
  })

  const handleContactSelect = (contactId: string) => {
    setSelectedContact(contactId)
    const contact = existingContacts.find(c => c.id.toString() === contactId)
    if (contact) {
      setFormData(prev => ({
        ...prev,
        clientName: contact.name,
        clientPhone: contact.phone,
        clientType: contact.type,
      }))
    }
  }

  const addItem = (productId: number) => {
    const product = availableProducts.find(p => p.id === productId)
    if (product) {
      const existingItem = items.find(i => i.productId === productId)
      if (existingItem) {
        setItems(items.map(i => 
          i.productId === productId 
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ))
      } else {
        setItems([...items, {
          productId: product.id,
          productName: product.name,
          quantity: 1,
          unitPrice: product.price,
        }])
      }
    }
  }

  const updateItemQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      setItems(items.filter(i => i.productId !== productId))
    } else {
      setItems(items.map(i => 
        i.productId === productId 
          ? { ...i, quantity }
          : i
      ))
    }
  }

  const removeItem = (productId: number) => {
    setItems(items.filter(i => i.productId !== productId))
  }

  const total = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0)

  const handleSubmit = async (e: React.FormEvent, action: "draft" | "send") => {
    e.preventDefault()
    setSaving(true)
    
    // Simular salvamento
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Redirecionar para lista de orçamentos
    router.push("/dashboard/orcamentos")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/orcamentos">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-[#0F032D]">Novo Orçamento</h1>
          <p className="text-[#0F032D]/60">Crie um orçamento para seu cliente</p>
        </div>
      </div>

      <form onSubmit={(e) => handleSubmit(e, "draft")}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Coluna Principal */}
          <div className="space-y-6 lg:col-span-2">
            {/* Dados do Cliente */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Dados do Cliente
                </CardTitle>
                <CardDescription>Selecione um contato existente ou preencha os dados</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Contato Existente</Label>
                    <Select value={selectedContact} onValueChange={handleContactSelect}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecionar contato..." />
                      </SelectTrigger>
                      <SelectContent>
                        {existingContacts.map(contact => (
                          <SelectItem key={contact.id} value={contact.id.toString()}>
                            {contact.name} - {contact.phone}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Tipo de Pessoa</Label>
                    <Select
                      value={formData.clientType}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, clientType: value }))}
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
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="clientName">Nome do Cliente *</Label>
                    <Input
                      id="clientName"
                      value={formData.clientName}
                      onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                      placeholder="Nome completo ou empresa"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clientPhone">Telefone *</Label>
                    <Input
                      id="clientPhone"
                      value={formData.clientPhone}
                      onChange={(e) => setFormData(prev => ({ ...prev, clientPhone: e.target.value }))}
                      placeholder="(11) 99999-9999"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Itens do Orçamento */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Itens do Orçamento
                </CardTitle>
                <CardDescription>Adicione os produtos para orçar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Adicionar Produto */}
                <div className="space-y-2">
                  <Label>Adicionar Produto</Label>
                  <Select onValueChange={(value) => addItem(parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar produto..." />
                    </SelectTrigger>
                    <SelectContent>
                      {availableProducts.map(product => (
                        <SelectItem key={product.id} value={product.id.toString()}>
                          {product.name} - R$ {product.price.toFixed(2)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Lista de Itens */}
                {items.length > 0 ? (
                  <div className="space-y-2">
                    {items.map(item => (
                      <div
                        key={item.productId}
                        className="flex items-center justify-between rounded-lg border border-[#EFEFEF] p-3"
                      >
                        <div>
                          <p className="font-medium text-[#0F032D]">{item.productName}</p>
                          <p className="text-sm text-[#0F032D]/60">R$ {item.unitPrice.toFixed(2)} un.</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateItemQuantity(item.productId, item.quantity - 1)}
                            >
                              -
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateItemQuantity(item.productId, parseInt(e.target.value) || 0)}
                              className="h-8 w-16 text-center"
                              min={1}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateItemQuantity(item.productId, item.quantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                          <p className="w-24 text-right font-semibold text-[#0F032D]">
                            R$ {(item.quantity * item.unitPrice).toFixed(2)}
                          </p>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
                            onClick={() => removeItem(item.productId)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border-2 border-dashed border-[#D0D0D8] p-8 text-center">
                    <Package className="mx-auto h-12 w-12 text-[#0F032D]/30" />
                    <p className="mt-2 text-[#0F032D]/60">Nenhum item adicionado</p>
                    <p className="text-sm text-[#0F032D]/40">Selecione produtos acima para adicionar</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Informações do Evento */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Informações do Evento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="eventDate">Data do Evento</Label>
                    <Input
                      id="eventDate"
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, eventDate: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="validUntil">Validade do Orçamento</Label>
                    <Input
                      id="validUntil"
                      type="date"
                      value={formData.validUntil}
                      onChange={(e) => setFormData(prev => ({ ...prev, validUntil: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventAddress">Local do Evento</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-[#0F032D]/40" />
                    <Input
                      id="eventAddress"
                      value={formData.eventAddress}
                      onChange={(e) => setFormData(prev => ({ ...prev, eventAddress: e.target.value }))}
                      placeholder="Endereço do evento"
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Observações */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Observações</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Observações adicionais para o cliente..."
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  rows={4}
                />
              </CardContent>
            </Card>
          </div>

          {/* Coluna Lateral - Resumo */}
          <div className="space-y-6">
            <Card className="sticky top-6 border-none shadow-md">
              <CardHeader>
                <CardTitle>Resumo do Orçamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.length > 0 ? (
                  <>
                    <div className="space-y-2">
                      {items.map(item => (
                        <div key={item.productId} className="flex justify-between text-sm">
                          <span className="text-[#0F032D]/70">
                            {item.quantity}x {item.productName}
                          </span>
                          <span className="font-medium">
                            R$ {(item.quantity * item.unitPrice).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-[#EFEFEF] pt-4">
                      <div className="flex justify-between text-lg font-bold text-[#0F032D]">
                        <span>Total</span>
                        <span>R$ {total.toFixed(2)}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-center text-[#0F032D]/60">Nenhum item adicionado</p>
                )}

                <div className="space-y-3 pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-[#905BF4] hover:bg-[#4E2BCC]"
                    disabled={items.length === 0 || saving}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {saving ? "Salvando..." : "Salvar Rascunho"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    disabled={items.length === 0}
                    onClick={(e) => handleSubmit(e as any, "send")}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Salvar e Enviar
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button type="button" variant="outline" size="sm" disabled={items.length === 0}>
                      <FileText className="mr-1 h-3 w-3" />
                      PDF
                    </Button>
                    <Button type="button" variant="outline" size="sm" disabled={items.length === 0}>
                      <MessageCircle className="mr-1 h-3 w-3" />
                      WhatsApp
                    </Button>
                  </div>
                  <Button type="button" variant="ghost" className="w-full" asChild>
                    <Link href="/dashboard/orcamentos">Cancelar</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
