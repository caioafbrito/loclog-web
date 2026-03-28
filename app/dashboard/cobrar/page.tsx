"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { 
  DollarSign, 
  ArrowLeft, 
  Search,
  CheckCircle,
  Copy,
  QrCode,
  CreditCard,
  Banknote,
  Send,
  Clock,
  AlertCircle
} from "lucide-react"

const faturasMock = [
  { 
    id: "FAT-001", 
    pedidoId: "PED-4521",
    cliente: "Empresa Festa Feliz", 
    valor: 2350.00,
    valorFormatado: "R$ 2.350,00", 
    status: "pending",
    vencimento: "10/12/2026",
    telefone: "(11) 99999-1234",
    email: "contato@festasfeliz.com.br"
  },
  { 
    id: "FAT-003", 
    pedidoId: "PED-4519",
    cliente: "Buffet Sabor & Arte", 
    valor: 5200.00,
    valorFormatado: "R$ 5.200,00", 
    status: "partial",
    valorPago: 2600.00,
    valorPendente: 2600.00,
    vencimento: "06/12/2026",
    telefone: "(11) 96666-3456",
    email: "financeiro@saborearte.com.br"
  },
]

const metodosCobranca = [
  { id: "pix", nome: "PIX", icone: QrCode, descricao: "Pagamento instantâneo via PIX" },
  { id: "boleto", nome: "Boleto Bancário", icone: Banknote, descricao: "Boleto com vencimento" },
  { id: "cartao", nome: "Link de Cartão", icone: CreditCard, descricao: "Link para pagamento com cartão" },
  { id: "whatsapp", nome: "Enviar por WhatsApp", icone: Send, descricao: "Enviar cobrança via WhatsApp" },
]

export default function CobrarPage() {
  const [faturaSelecionada, setFaturaSelecionada] = useState<typeof faturasMock[0] | null>(null)
  const [metodoSelecionado, setMetodoSelecionado] = useState<string>("")
  const [buscaFatura, setBuscaFatura] = useState("")
  const [dialogCobranca, setDialogCobranca] = useState(false)
  const [cobrancaGerada, setCobrancaGerada] = useState(false)
  const [mensagemPersonalizada, setMensagemPersonalizada] = useState("")

  const faturasFiltradas = faturasMock.filter(f => 
    f.id.toLowerCase().includes(buscaFatura.toLowerCase()) ||
    f.cliente.toLowerCase().includes(buscaFatura.toLowerCase()) ||
    f.pedidoId.toLowerCase().includes(buscaFatura.toLowerCase())
  )

  const handleGerarCobranca = () => {
    setCobrancaGerada(true)
  }

  const pixCode = "00020126580014br.gov.bcb.pix0136a1b2c3d4-e5f6-7890-abcd-ef1234567890520400005303986540" + 
    (faturaSelecionada?.valorPendente || faturaSelecionada?.valor || 0).toFixed(2).replace(".", "") +
    "5802BR5925LOCLOG SISTEMA DE LOCACAO6009SAO PAULO62070503***6304"

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-[#0F032D]">Cobrar</h1>
          <p className="text-sm text-muted-foreground">Gere cobranças e envie para seus clientes</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Seleção de Fatura */}
        <Card>
          <CardHeader>
            <CardTitle>Faturas Pendentes</CardTitle>
            <CardDescription>Selecione a fatura que deseja cobrar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por ID, pedido ou cliente..."
                value={buscaFatura}
                onChange={(e) => setBuscaFatura(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="max-h-[350px] space-y-3 overflow-y-auto">
              {faturasFiltradas.map((fatura) => (
                <div
                  key={fatura.id}
                  onClick={() => {
                    setFaturaSelecionada(fatura)
                    setCobrancaGerada(false)
                  }}
                  className={`cursor-pointer rounded-lg border p-4 transition-colors ${
                    faturaSelecionada?.id === fatura.id
                      ? "border-[#905BF4] bg-[#905BF4]/5"
                      : "hover:border-[#905BF4]/50 hover:bg-[#EFEFEF]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className="bg-[#905BF4]/10 text-[#905BF4]">{fatura.id}</Badge>
                        <Badge variant="outline">{fatura.pedidoId}</Badge>
                        {fatura.status === "partial" && (
                          <Badge className="bg-yellow-100 text-yellow-800">Parcial</Badge>
                        )}
                      </div>
                      <p className="mt-2 truncate font-medium text-[#0F032D]">{fatura.cliente}</p>
                      <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>Vencimento: {fatura.vencimento}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      {fatura.status === "partial" ? (
                        <>
                          <p className="text-sm text-muted-foreground line-through">
                            {fatura.valorFormatado}
                          </p>
                          <p className="font-bold text-[#0F032D]">
                            R$ {fatura.valorPendente?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </p>
                          <p className="text-xs text-muted-foreground">pendente</p>
                        </>
                      ) : (
                        <p className="font-bold text-[#0F032D]">{fatura.valorFormatado}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {faturasFiltradas.length === 0 && (
              <div className="py-8 text-center text-muted-foreground">
                <AlertCircle className="mx-auto mb-2 h-8 w-8" />
                <p>Nenhuma fatura pendente encontrada</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Método de Cobrança */}
        <Card>
          <CardHeader>
            <CardTitle>Método de Cobrança</CardTitle>
            <CardDescription>Escolha como deseja realizar a cobrança</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!faturaSelecionada ? (
              <div className="py-12 text-center text-muted-foreground">
                <DollarSign className="mx-auto mb-2 h-8 w-8" />
                <p>Selecione uma fatura para continuar</p>
              </div>
            ) : (
              <>
                <div className="grid gap-3 sm:grid-cols-2">
                  {metodosCobranca.map((metodo) => {
                    const Icone = metodo.icone
                    return (
                      <div
                        key={metodo.id}
                        onClick={() => setMetodoSelecionado(metodo.id)}
                        className={`flex cursor-pointer flex-col items-center gap-2 rounded-lg border p-4 text-center transition-colors ${
                          metodoSelecionado === metodo.id
                            ? "border-[#905BF4] bg-[#905BF4]/5"
                            : "hover:border-[#905BF4]/50 hover:bg-[#EFEFEF]"
                        }`}
                      >
                        <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
                          metodoSelecionado === metodo.id ? "bg-[#905BF4]" : "bg-[#EFEFEF]"
                        }`}>
                          <Icone className={`h-6 w-6 ${
                            metodoSelecionado === metodo.id ? "text-white" : "text-[#0F032D]"
                          }`} />
                        </div>
                        <span className="font-medium text-[#0F032D]">{metodo.nome}</span>
                        <span className="text-xs text-muted-foreground">{metodo.descricao}</span>
                      </div>
                    )
                  })}
                </div>

                {metodoSelecionado === "whatsapp" && (
                  <div className="space-y-2">
                    <Label>Mensagem personalizada (opcional)</Label>
                    <Textarea
                      placeholder="Ex: Olá! Segue o link para pagamento do seu pedido..."
                      value={mensagemPersonalizada}
                      onChange={(e) => setMensagemPersonalizada(e.target.value)}
                      rows={3}
                    />
                  </div>
                )}

                <Button 
                  className="w-full bg-[#905BF4] hover:bg-[#4E2BCC]"
                  disabled={!metodoSelecionado}
                  onClick={handleGerarCobranca}
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  Gerar Cobrança
                </Button>

                {cobrancaGerada && (
                  <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                    <div className="mb-3 flex items-center gap-2 text-green-800">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-medium">Cobrança gerada com sucesso!</span>
                    </div>
                    
                    {metodoSelecionado === "pix" && (
                      <div className="space-y-3">
                        <div className="flex justify-center">
                          <div className="rounded-lg bg-white p-4">
                            <QrCode className="h-32 w-32 text-[#0F032D]" />
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input 
                            value={pixCode.substring(0, 50) + "..."} 
                            readOnly 
                            className="text-xs"
                          />
                          <Button 
                            size="icon" 
                            variant="outline"
                            onClick={() => navigator.clipboard.writeText(pixCode)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {metodoSelecionado === "boleto" && (
                      <div className="space-y-2">
                        <p className="text-sm text-green-700">
                          Boleto gerado com vencimento em {faturaSelecionada.vencimento}
                        </p>
                        <Button size="sm" variant="outline">
                          Download PDF do Boleto
                        </Button>
                      </div>
                    )}

                    {metodoSelecionado === "cartao" && (
                      <div className="space-y-2">
                        <p className="text-sm text-green-700">Link de pagamento criado:</p>
                        <div className="flex items-center gap-2">
                          <Input 
                            value="https://pay.loclog.com.br/p/abc123xyz" 
                            readOnly 
                            className="text-xs"
                          />
                          <Button 
                            size="icon" 
                            variant="outline"
                            onClick={() => navigator.clipboard.writeText("https://pay.loclog.com.br/p/abc123xyz")}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {metodoSelecionado === "whatsapp" && (
                      <div className="space-y-2">
                        <p className="text-sm text-green-700">
                          Pronto para enviar para {faturaSelecionada.telefone}
                        </p>
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => {
                            const msg = encodeURIComponent(
                              mensagemPersonalizada || 
                              `Olá! Segue o link para pagamento da fatura ${faturaSelecionada.id} no valor de R$ ${(faturaSelecionada.valorPendente || faturaSelecionada.valor).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
                            )
                            window.open(`https://wa.me/${faturaSelecionada.telefone.replace(/\D/g, "")}?text=${msg}`, "_blank")
                          }}
                        >
                          <Send className="mr-2 h-4 w-4" />
                          Abrir WhatsApp
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
