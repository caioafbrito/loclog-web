"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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
  Truck,
  Calculator,
  Loader2,
  Info,
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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

// Parâmetros de configuração (normalmente viriam do store)
const PARAMETROS_PADRAO = {
  taxaLogisticaKm: 2.50, // R$/km
  freteMinimo: 50.00,
  taxaMaoDeObra: 10, // %
  maoDeObraAtiva: true,
  enderecoBase: "Rua das Flores, 100 - Centro, São Paulo - SP",
}

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
  const [calculandoFrete, setCalculandoFrete] = useState(false)
  
  // Estados de frete e mão de obra
  const [distanciaKm, setDistanciaKm] = useState<number | null>(null)
  const [freteCalculado, setFreteCalculado] = useState<number | null>(null)
  const [freteManual, setFreteManual] = useState("")
  const [usarFreteManual, setUsarFreteManual] = useState(false)
  const [aplicarMaoDeObra, setAplicarMaoDeObra] = useState(PARAMETROS_PADRAO.maoDeObraAtiva)
  
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

  // Simular cálculo de distância quando o endereço é alterado
  useEffect(() => {
    if (formData.eventAddress.length > 10) {
      setCalculandoFrete(true)
      // Simular chamada de API do Google Maps
      const timeout = setTimeout(() => {
        // Distância simulada baseada no tamanho do endereço (apenas para demo)
        const distanciaSimulada = Math.floor(Math.random() * 30) + 5 // 5 a 35 km
        setDistanciaKm(distanciaSimulada)
        
        // Calcular frete: distância * taxa por km
        const freteCalc = distanciaSimulada * PARAMETROS_PADRAO.taxaLogisticaKm
        // Aplicar frete mínimo
        const freteComMinimo = Math.max(freteCalc, PARAMETROS_PADRAO.freteMinimo)
        setFreteCalculado(freteComMinimo)
        setCalculandoFrete(false)
      }, 1000)
      
      return () => clearTimeout(timeout)
    } else {
      setDistanciaKm(null)
      setFreteCalculado(null)
    }
  }, [formData.eventAddress])

  // Cálculos
  const subtotalItens = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0)
  
  const freteEfetivo = useMemo(() => {
    if (usarFreteManual && freteManual) {
      return parseFloat(freteManual) || 0
    }
    return freteCalculado || 0
  }, [usarFreteManual, freteManual, freteCalculado])
  
  const subtotalComFrete = subtotalItens + freteEfetivo
  
  const valorMaoDeObra = aplicarMaoDeObra 
    ? subtotalComFrete * (PARAMETROS_PADRAO.taxaMaoDeObra / 100)
    : 0
  
  const totalFinal = subtotalComFrete + valorMaoDeObra

  const handleSubmit = async (e: React.FormEvent, action: "draft" | "send") => {
    e.preventDefault()
    setSaving(true)
    
    // Simular salvamento
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Redirecionar para lista de orçamentos
    router.push("/dashboard/orcamentos")
  }

  return (
    <TooltipProvider>
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
                          className="flex flex-col gap-2 rounded-lg border border-[#EFEFEF] p-3 sm:flex-row sm:items-center sm:justify-between"
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

              {/* Informações do Evento e Frete */}
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Local do Evento e Frete
                  </CardTitle>
                  <CardDescription>
                    O frete é calculado automaticamente com base na distância
                  </CardDescription>
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
                    <Label htmlFor="eventAddress">Endereço do Evento *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-[#0F032D]/40" />
                      <Input
                        id="eventAddress"
                        value={formData.eventAddress}
                        onChange={(e) => setFormData(prev => ({ ...prev, eventAddress: e.target.value }))}
                        placeholder="Rua, número, bairro, cidade - UF"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Cálculo de Frete */}
                  <div className="rounded-lg bg-[#EFEFEF] p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Truck className="h-5 w-5 text-[#905BF4]" />
                      <h4 className="font-semibold text-[#0F032D]">Cálculo do Frete</h4>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-[#0F032D]/40 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>Frete calculado com base na taxa de R$ {PARAMETROS_PADRAO.taxaLogisticaKm.toFixed(2)}/km configurada nos parâmetros do sistema.</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>

                    {calculandoFrete ? (
                      <div className="flex items-center gap-2 text-[#0F032D]/60">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Calculando distância...</span>
                      </div>
                    ) : distanciaKm ? (
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <div>
                            <span className="text-[#0F032D]/60">Distância:</span>
                            <span className="ml-2 font-semibold text-[#0F032D]">{distanciaKm} km</span>
                          </div>
                          <div>
                            <span className="text-[#0F032D]/60">Taxa:</span>
                            <span className="ml-2 font-semibold text-[#0F032D]">R$ {PARAMETROS_PADRAO.taxaLogisticaKm.toFixed(2)}/km</span>
                          </div>
                          <div>
                            <span className="text-[#0F032D]/60">Frete Mínimo:</span>
                            <span className="ml-2 font-semibold text-[#0F032D]">R$ {PARAMETROS_PADRAO.freteMinimo.toFixed(2)}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between rounded-lg bg-white p-3">
                          <span className="font-medium text-[#0F032D]">Frete Calculado:</span>
                          <span className="text-lg font-bold text-[#905BF4]">
                            R$ {freteCalculado?.toFixed(2)}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <Switch
                            id="freteManual"
                            checked={usarFreteManual}
                            onCheckedChange={setUsarFreteManual}
                          />
                          <Label htmlFor="freteManual" className="text-sm">
                            Informar frete manualmente
                          </Label>
                        </div>

                        {usarFreteManual && (
                          <div className="space-y-2">
                            <Label htmlFor="freteManualValue">Valor do Frete Manual</Label>
                            <div className="relative">
                              <span className="absolute left-3 top-2.5 text-[#0F032D]/60">R$</span>
                              <Input
                                id="freteManualValue"
                                type="number"
                                value={freteManual}
                                onChange={(e) => setFreteManual(e.target.value)}
                                placeholder="0.00"
                                className="pl-10"
                                step="0.01"
                                min="0"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-[#0F032D]/60">
                        Digite o endereço completo para calcular o frete automaticamente
                      </p>
                    )}
                  </div>

                  {/* Mão de Obra */}
                  <div className="rounded-lg bg-[#EFEFEF] p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Calculator className="h-5 w-5 text-[#905BF4]" />
                      <h4 className="font-semibold text-[#0F032D]">Mão de Obra</h4>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-[#0F032D]/40 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>Taxa de {PARAMETROS_PADRAO.taxaMaoDeObra}% sobre o subtotal + frete. Pode ser desativada nos parâmetros do sistema.</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Switch
                          id="maoDeObra"
                          checked={aplicarMaoDeObra}
                          onCheckedChange={setAplicarMaoDeObra}
                        />
                        <Label htmlFor="maoDeObra" className="text-sm">
                          Aplicar taxa de mão de obra ({PARAMETROS_PADRAO.taxaMaoDeObra}%)
                        </Label>
                      </div>
                      {aplicarMaoDeObra && subtotalComFrete > 0 && (
                        <span className="font-semibold text-[#0F032D]">
                          + R$ {valorMaoDeObra.toFixed(2)}
                        </span>
                      )}
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
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-[#0F032D]/70">Subtotal Itens</span>
                          <span className="font-medium">R$ {subtotalItens.toFixed(2)}</span>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-[#0F032D]/70 flex items-center gap-1">
                            Frete
                            {distanciaKm && (
                              <Badge variant="outline" className="text-[10px]">
                                {distanciaKm}km
                              </Badge>
                            )}
                          </span>
                          <span className="font-medium">
                            {freteEfetivo > 0 ? `R$ ${freteEfetivo.toFixed(2)}` : "-"}
                          </span>
                        </div>
                        
                        {aplicarMaoDeObra && (
                          <div className="flex justify-between text-sm">
                            <span className="text-[#0F032D]/70">
                              Mão de Obra ({PARAMETROS_PADRAO.taxaMaoDeObra}%)
                            </span>
                            <span className="font-medium">
                              R$ {valorMaoDeObra.toFixed(2)}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between text-lg font-bold text-[#0F032D]">
                        <span>Total</span>
                        <span className="text-[#905BF4]">R$ {totalFinal.toFixed(2)}</span>
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
    </TooltipProvider>
  )
}
