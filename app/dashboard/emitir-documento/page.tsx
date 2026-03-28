"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
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
  FileText, 
  ArrowLeft, 
  Search,
  CheckCircle,
  AlertTriangle,
  Lock,
  FileCheck,
  Receipt,
  Truck,
  ScrollText
} from "lucide-react"
import { useOrganizacaoStore } from "@/store/organizacao"

const tiposDocumento = [
  {
    id: "contrato",
    nome: "Contrato de Locação",
    descricao: "Contrato padrão de locação de equipamentos",
    icone: ScrollText,
    requerAdicional: null,
    requerPacote: null,
  },
  {
    id: "nfse",
    nome: "NFS-e (Nota Fiscal de Serviço)",
    descricao: "Nota fiscal eletrônica de serviço",
    icone: FileCheck,
    requerAdicional: "nfse",
    requerPacote: "contabil",
  },
  {
    id: "nfe",
    nome: "NF-e (Nota Fiscal Eletrônica)",
    descricao: "Nota fiscal eletrônica de produto",
    icone: FileText,
    requerAdicional: "nfe",
    requerPacote: "contabil",
  },
  {
    id: "nf_remessa",
    nome: "NF de Remessa",
    descricao: "Nota fiscal de remessa de bens (entrada/saída)",
    icone: Truck,
    requerAdicional: "nf_remessa",
    requerPacote: "contabil",
  },
  {
    id: "fatura_locacao",
    nome: "Fatura de Locação",
    descricao: "Fatura detalhada do serviço de locação",
    icone: Receipt,
    requerAdicional: "fatura_locacao",
    requerPacote: "contabil",
  },
]

const pedidosMock = [
  { id: "PED-4521", cliente: "Empresa Festa Feliz", valor: "R$ 2.350,00", data: "05/12/2026" },
  { id: "PED-4520", cliente: "Maria Santos", valor: "R$ 1.125,00", data: "04/12/2026" },
  { id: "PED-4519", cliente: "Buffet Sabor & Arte", valor: "R$ 5.200,00", data: "03/12/2026" },
]

export default function EmitirDocumentoPage() {
  const { adicionaisAtivos, pacotesAtivos } = useOrganizacaoStore()
  const [tipoSelecionado, setTipoSelecionado] = useState<string | null>(null)
  const [pedidoSelecionado, setPedidoSelecionado] = useState<string>("")
  const [buscaPedido, setBuscaPedido] = useState("")
  const [dialogSucesso, setDialogSucesso] = useState(false)

  const verificarDisponibilidade = (tipo: typeof tiposDocumento[0]) => {
    if (!tipo.requerAdicional && !tipo.requerPacote) return true
    
    const temPacote = tipo.requerPacote ? pacotesAtivos.includes(tipo.requerPacote) : false
    const temAdicional = tipo.requerAdicional ? adicionaisAtivos.includes(tipo.requerAdicional) : false
    
    return temPacote || temAdicional
  }

  const handleEmitir = () => {
    if (tipoSelecionado && pedidoSelecionado) {
      setDialogSucesso(true)
    }
  }

  const pedidosFiltrados = pedidosMock.filter(p => 
    p.id.toLowerCase().includes(buscaPedido.toLowerCase()) ||
    p.cliente.toLowerCase().includes(buscaPedido.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-[#0F032D]">Emitir Documento</h1>
          <p className="text-sm text-muted-foreground">Selecione o tipo de documento e o pedido relacionado</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Seleção de Tipo de Documento */}
        <Card>
          <CardHeader>
            <CardTitle>Tipo de Documento</CardTitle>
            <CardDescription>Escolha o documento que deseja emitir</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {tiposDocumento.map((tipo) => {
              const disponivel = verificarDisponibilidade(tipo)
              const Icone = tipo.icone
              
              return (
                <div
                  key={tipo.id}
                  onClick={() => disponivel && setTipoSelecionado(tipo.id)}
                  className={`flex items-center gap-4 rounded-lg border p-4 transition-colors ${
                    disponivel 
                      ? tipoSelecionado === tipo.id
                        ? "border-[#905BF4] bg-[#905BF4]/5"
                        : "cursor-pointer hover:border-[#905BF4]/50 hover:bg-[#EFEFEF]"
                      : "cursor-not-allowed opacity-60"
                  }`}
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    disponivel ? "bg-[#905BF4]/10" : "bg-gray-100"
                  }`}>
                    {disponivel ? (
                      <Icone className="h-5 w-5 text-[#905BF4]" />
                    ) : (
                      <Lock className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[#0F032D]">{tipo.nome}</span>
                      {!disponivel && (
                        <Badge variant="outline" className="text-xs">
                          {tipo.requerPacote === "contabil" ? "Pacote Contábil" : "Adicional"}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{tipo.descricao}</p>
                  </div>
                  {tipoSelecionado === tipo.id && (
                    <CheckCircle className="h-5 w-5 text-[#905BF4]" />
                  )}
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Seleção de Pedido */}
        <Card>
          <CardHeader>
            <CardTitle>Pedido Relacionado</CardTitle>
            <CardDescription>Selecione o pedido para vincular ao documento</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por ID ou cliente..."
                value={buscaPedido}
                onChange={(e) => setBuscaPedido(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="max-h-[300px] space-y-2 overflow-y-auto">
              {pedidosFiltrados.map((pedido) => (
                <div
                  key={pedido.id}
                  onClick={() => setPedidoSelecionado(pedido.id)}
                  className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors ${
                    pedidoSelecionado === pedido.id
                      ? "border-[#905BF4] bg-[#905BF4]/5"
                      : "hover:border-[#905BF4]/50 hover:bg-[#EFEFEF]"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-[#905BF4]/10 text-[#905BF4]">{pedido.id}</Badge>
                      <span className="font-medium text-[#0F032D]">{pedido.cliente}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">Data: {pedido.data}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-[#0F032D]">{pedido.valor}</span>
                  </div>
                </div>
              ))}
            </div>

            {pedidosFiltrados.length === 0 && (
              <div className="py-8 text-center text-muted-foreground">
                Nenhum pedido encontrado
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Ações */}
      <Card>
        <CardContent className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <AlertTriangle className="h-4 w-4" />
            <span>Certifique-se de que todos os dados do pedido estão corretos antes de emitir.</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/dashboard">Cancelar</Link>
            </Button>
            <Button 
              className="bg-[#905BF4] hover:bg-[#4E2BCC]"
              disabled={!tipoSelecionado || !pedidoSelecionado}
              onClick={handleEmitir}
            >
              <FileText className="mr-2 h-4 w-4" />
              Emitir Documento
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Dialog de Sucesso */}
      <Dialog open={dialogSucesso} onOpenChange={setDialogSucesso}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Documento Emitido com Sucesso
            </DialogTitle>
            <DialogDescription>
              O documento foi gerado e está disponível para download.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="rounded-lg bg-[#EFEFEF] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#0F032D]">
                    {tiposDocumento.find(t => t.id === tipoSelecionado)?.nome}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Pedido: {pedidoSelecionado}
                  </p>
                </div>
                <Button size="sm" className="bg-[#905BF4] hover:bg-[#4E2BCC]">
                  Download PDF
                </Button>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDialogSucesso(false)}>
              Fechar
            </Button>
            <Button 
              className="bg-[#905BF4] hover:bg-[#4E2BCC]"
              onClick={() => {
                setDialogSucesso(false)
                setTipoSelecionado(null)
                setPedidoSelecionado("")
              }}
            >
              Emitir Outro
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
