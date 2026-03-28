"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  GripVertical,
  MapPin,
  Clock,
  Truck,
  Save,
  Loader2,
  Calendar,
  User
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface RouteStop {
  id: string
  type: "pickup" | "delivery"
  orderId: string
  client: string
  address: string
  time: string
  notes: string
}

const availableOrders = [
  { id: "PED-4521", client: "Empresa Festa Feliz", address: "Rua das Flores, 123 - SP", type: "delivery" },
  { id: "PED-4520", client: "Maria Santos", address: "Rua Augusta, 500 - SP", type: "pickup" },
  { id: "PED-4519", client: "Buffet Sabor & Arte", address: "Rua dos Eventos, 789 - SP", type: "delivery" },
]

const drivers = [
  { id: "1", name: "Carlos Silva", vehicle: "Fiorino ABC-1234" },
  { id: "2", name: "João Santos", vehicle: "HR XYZ-5678" },
  { id: "3", name: "Pedro Oliveira", vehicle: "Sprinter DEF-9012" },
]

export default function NovaRotaPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [stops, setStops] = useState<RouteStop[]>([])
  const [selectedOrder, setSelectedOrder] = useState("")
  
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    driver: "",
    startTime: "08:00",
    notes: "",
  })

  const addStop = () => {
    if (!selectedOrder) return
    
    const order = availableOrders.find(o => o.id === selectedOrder)
    if (!order) return

    const newStop: RouteStop = {
      id: `stop-${Date.now()}`,
      type: order.type as "pickup" | "delivery",
      orderId: order.id,
      client: order.client,
      address: order.address,
      time: "",
      notes: "",
    }

    setStops([...stops, newStop])
    setSelectedOrder("")
  }

  const removeStop = (stopId: string) => {
    setStops(stops.filter(s => s.id !== stopId))
  }

  const updateStop = (stopId: string, field: keyof RouteStop, value: string) => {
    setStops(stops.map(s => s.id === stopId ? { ...s, [field]: value } : s))
  }

  const handleSubmit = async () => {
    if (!formData.name || !formData.date || !formData.driver || stops.length === 0) {
      toast({
        title: "Dados incompletos",
        description: "Preencha todos os campos obrigatórios e adicione pelo menos uma parada.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    
    toast({
      title: "Rota criada",
      description: `A rota ${formData.name} foi criada com sucesso.`,
    })
    
    router.push("/dashboard/logistica")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/logistica">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-[#0F032D]">Nova Rota</h1>
          <p className="text-[#0F032D]/60">Crie uma nova rota de entregas e retiradas</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Form */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informações da Rota</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome da Rota *</Label>
                  <Input
                    id="name"
                    placeholder="Ex: Rota Zona Sul - Manhã"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Data *</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="date"
                      type="date"
                      className="pl-10"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="driver">Motorista *</Label>
                  <Select value={formData.driver} onValueChange={(v) => setFormData({ ...formData, driver: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o motorista" />
                    </SelectTrigger>
                    <SelectContent>
                      {drivers.map((driver) => (
                        <SelectItem key={driver.id} value={driver.id}>
                          <div className="flex flex-col">
                            <span>{driver.name}</span>
                            <span className="text-xs text-muted-foreground">{driver.vehicle}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startTime">Horário de Início</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="startTime"
                      type="time"
                      className="pl-10"
                      value={formData.startTime}
                      onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Observações</Label>
                <Textarea
                  id="notes"
                  placeholder="Instruções especiais para o motorista..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Stops */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Paradas</CardTitle>
                  <CardDescription>Adicione as entregas e retiradas da rota</CardDescription>
                </div>
                <Badge variant="outline">{stops.length} paradas</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add Stop */}
              <div className="flex gap-2">
                <Select value={selectedOrder} onValueChange={setSelectedOrder}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Selecione um pedido..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availableOrders.map((order) => (
                      <SelectItem key={order.id} value={order.id}>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {order.type === "delivery" ? "Entrega" : "Retirada"}
                          </Badge>
                          <span>{order.id}</span>
                          <span className="text-muted-foreground">- {order.client}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={addStop} disabled={!selectedOrder}>
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar
                </Button>
              </div>

              {/* Stops List */}
              {stops.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                  <Truck className="mb-4 h-12 w-12 text-muted-foreground/50" />
                  <p className="font-medium text-muted-foreground">Nenhuma parada adicionada</p>
                  <p className="text-sm text-muted-foreground">Selecione pedidos acima para adicionar à rota</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {stops.map((stop, index) => (
                    <div 
                      key={stop.id}
                      className="flex gap-3 rounded-lg border p-4"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#905BF4] text-sm font-bold text-white">
                        {index + 1}
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <Badge className={stop.type === "delivery" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}>
                                {stop.type === "delivery" ? "Entrega" : "Retirada"}
                              </Badge>
                              <span className="font-medium">{stop.orderId}</span>
                            </div>
                            <p className="mt-1 text-sm">{stop.client}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-600 hover:bg-red-50 hover:text-red-700"
                            onClick={() => removeStop(stop.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 shrink-0" />
                          {stop.address}
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="space-y-1">
                            <Label className="text-xs">Horário Previsto</Label>
                            <Input
                              type="time"
                              value={stop.time}
                              onChange={(e) => updateStop(stop.id, "time", e.target.value)}
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">Observações</Label>
                            <Input
                              placeholder="Obs. da parada..."
                              value={stop.notes}
                              onChange={(e) => updateStop(stop.id, "notes", e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Summary */}
        <div className="space-y-6">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="text-lg">Resumo da Rota</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total de Paradas</span>
                  <span className="font-medium">{stops.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Entregas</span>
                  <span className="font-medium">{stops.filter(s => s.type === "delivery").length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Retiradas</span>
                  <span className="font-medium">{stops.filter(s => s.type === "pickup").length}</span>
                </div>
                {formData.driver && (
                  <>
                    <div className="border-t pt-3" />
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{drivers.find(d => d.id === formData.driver)?.name}</span>
                    </div>
                  </>
                )}
              </div>

              <div className="space-y-2 pt-4">
                <Button
                  className="w-full bg-[#905BF4] hover:bg-[#4E2BCC]"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Criar Rota
                    </>
                  )}
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/dashboard/logistica">Cancelar</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
