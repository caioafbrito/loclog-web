"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CreditCard,
  QrCode,
  Banknote,
  ArrowLeft,
  Search,
  Send,
  Copy,
  CheckCircle,
  Clock,
  AlertCircle,
  DollarSign,
} from "lucide-react"

const faturasPendentes = [
  { id: "FAT-001", pedido: "PED-4521", cliente: "Empresa Festa Feliz", valor: "R$ 2.350,00", vencimento: "10/12/2026", diasAtraso: 0 },
  { id: "FAT-003", pedido: "PED-4519", cliente: "Buffet Sabor & Arte", valor: "R$ 2.600,00", vencimento: "06/12/2026", diasAtraso: 2 },
  { id: "FAT-006", pedido: "PED-4516", cliente: "Casa de Eventos Sol", valor: "R$ 1.800,00", vencimento: "01/12/2026", diasAtraso: 7 },
]

const metodosPagamento = [
  { id: "pix", nome: "PIX", icone: QrCode, descricao: "Pagamento instantâneo via QR Code" },
  { id: "cartao", nome: "Cartão", icone: CreditCard, descricao: "Crédito ou débito" },
  { id: "boleto", nome: "Boleto", icone: Banknote, descricao: "Boleto bancário" },
  { id: "dinheiro", nome: "Dinheiro", icone: DollarSign, descricao: "Pagamento em espécie" },
]

export default function CobrancaPage() {
  const [dialogAberto, setDialogAberto] = useState(false)
  const [faturaSelecionada, setFaturaSelecionada] = useState<typeof faturasPendentes[0] | null>(null)
  const [metodoPagamento, setMetodoPagamento] = useState("pix")
  const [pixGerado, setPixGerado] = useState(false)
  const [busca, setBusca] = useState("")

  const handleCobrar = (fatura: typeof faturasPendentes[0]) => {
    setFaturaSelecionada(fatura)
    setPixGerado(false)
    setDialogAberto(true)
  }

  const handleGerarPix = () => {
    setPixGerado(true)
  }

  const handleConfirmarPagamento = () => {
    alert(`Pagamento da fatura ${faturaSelecionada?.id} confirmado!`)
    setDialogAberto(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-[#0F032D]">Cobranças</h1>
            <p className="text-sm text-muted-foreground">Gerencie cobranças e pagamentos</p>
          </div>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-none shadow-md">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-amber-100 p-3">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pendentes</p>
                <p className="text-2xl font-bold text-[#0F032D]">R$ 6.750,00</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-red-100 p-3">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Atrasadas</p>
                <p className="text-2xl font-bold text-[#0F032D]">R$ 4.400,00</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-green-100 p-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Recebido Hoje</p>
                <p className="text-2xl font-bold text-[#0F032D]">R$ 1.125,00</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Faturas Pendentes */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Faturas Pendentes</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar fatura..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {faturasPendentes.map((fatura) => (
              <div key={fatura.id} className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-6">
                  <div>
                    <p className="font-medium text-[#0F032D]">{fatura.id}</p>
                    <p className="text-sm text-muted-foreground">{fatura.pedido}</p>
                  </div>
                  <div>
                    <p className="font-medium">{fatura.cliente}</p>
                    <p className="text-sm text-muted-foreground">Venc: {fatura.vencimento}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-lg font-bold text-[#0F032D]">{fatura.valor}</p>
                    {fatura.diasAtraso > 0 && (
                      <Badge className="bg-red-100 text-red-700">
                        {fatura.diasAtraso} dias de atraso
                      </Badge>
                    )}
                  </div>
                  <Button 
                    className="bg-[#905BF4] hover:bg-[#4E2BCC]"
                    onClick={() => handleCobrar(fatura)}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Cobrar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dialog de Cobrança */}
      <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Cobrar Fatura {faturaSelecionada?.id}</DialogTitle>
            <DialogDescription>
              {faturaSelecionada?.cliente} - {faturaSelecionada?.valor}
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="pix" onValueChange={setMetodoPagamento}>
            <TabsList className="grid w-full grid-cols-4">
              {metodosPagamento.map((metodo) => {
                const Icone = metodo.icone
                return (
                  <TabsTrigger key={metodo.id} value={metodo.id} className="gap-1">
                    <Icone className="h-4 w-4" />
                    <span className="hidden sm:inline">{metodo.nome}</span>
                  </TabsTrigger>
                )
              })}
            </TabsList>
            
            <TabsContent value="pix" className="mt-4 space-y-4">
              {!pixGerado ? (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Gere um QR Code PIX para o cliente realizar o pagamento instantâneo.
                  </p>
                  <Button className="w-full bg-[#905BF4] hover:bg-[#4E2BCC]" onClick={handleGerarPix}>
                    <QrCode className="mr-2 h-4 w-4" />
                    Gerar QR Code PIX
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className="rounded-lg bg-white p-4 shadow-inner">
                      <div className="h-48 w-48 rounded bg-[#0F032D] p-4">
                        <div className="grid h-full w-full grid-cols-8 gap-0.5">
                          {Array.from({ length: 64 }).map((_, i) => (
                            <div
                              key={i}
                              className={`${Math.random() > 0.5 ? "bg-white" : "bg-transparent"}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Código PIX Copia e Cola</Label>
                    <div className="flex gap-2">
                      <Input value="00020126580014br.gov.bcb.pix..." readOnly className="font-mono text-xs" />
                      <Button variant="outline" size="icon">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={() => alert("Link enviado por WhatsApp!")}>
                      Enviar por WhatsApp
                    </Button>
                    <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={handleConfirmarPagamento}>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Confirmar Pagamento
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="cartao" className="mt-4 space-y-4">
              <p className="text-sm text-muted-foreground">
                Gere um link de pagamento para o cliente pagar com cartão de crédito ou débito.
              </p>
              <Button className="w-full bg-[#905BF4] hover:bg-[#4E2BCC]">
                <CreditCard className="mr-2 h-4 w-4" />
                Gerar Link de Pagamento
              </Button>
            </TabsContent>
            
            <TabsContent value="boleto" className="mt-4 space-y-4">
              <p className="text-sm text-muted-foreground">
                Gere um boleto bancário para o cliente.
              </p>
              <div className="space-y-2">
                <Label>Dias para Vencimento</Label>
                <Select defaultValue="3">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 dia</SelectItem>
                    <SelectItem value="3">3 dias</SelectItem>
                    <SelectItem value="5">5 dias</SelectItem>
                    <SelectItem value="7">7 dias</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full bg-[#905BF4] hover:bg-[#4E2BCC]">
                <Banknote className="mr-2 h-4 w-4" />
                Gerar Boleto
              </Button>
            </TabsContent>
            
            <TabsContent value="dinheiro" className="mt-4 space-y-4">
              <p className="text-sm text-muted-foreground">
                Registre um pagamento em dinheiro recebido presencialmente.
              </p>
              <div className="space-y-2">
                <Label>Valor Recebido</Label>
                <Input type="text" defaultValue={faturaSelecionada?.valor} />
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleConfirmarPagamento}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Confirmar Recebimento
              </Button>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  )
}
