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
  DialogTrigger,
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
import { Textarea } from "@/components/ui/textarea"
import {
  FileText,
  FileCheck,
  FilePlus,
  Receipt,
  Truck,
  ScrollText,
  ArrowLeft,
  Search,
  Download,
  Eye,
  Lock,
} from "lucide-react"
import { useOrganizacaoStore } from "@/store/organizacao"

const tiposDocumento = [
  {
    id: "nfse",
    nome: "NFS-e",
    descricao: "Nota Fiscal de Serviço Eletrônica",
    icone: FileText,
    adicional: "adicionalNFSe",
    planoMinimo: "enterprise",
  },
  {
    id: "nfe",
    nome: "NF-e",
    descricao: "Nota Fiscal Eletrônica",
    icone: FileCheck,
    adicional: "adicionalNFe",
    planoMinimo: "enterprise",
  },
  {
    id: "nf-remessa",
    nome: "NF de Remessa",
    descricao: "Nota Fiscal de Remessa de Bens",
    icone: Truck,
    adicional: "adicionalNFRemessa",
    planoMinimo: "enterprise",
  },
  {
    id: "fatura",
    nome: "Fatura de Locação",
    descricao: "Fatura detalhada de locação",
    icone: Receipt,
    adicional: "adicionalFaturaLocacao",
    planoMinimo: "pro",
  },
  {
    id: "contrato",
    nome: "Contrato",
    descricao: "Contrato de locação",
    icone: ScrollText,
    adicional: null,
    planoMinimo: "starter",
  },
]

const documentosRecentes = [
  { id: "DOC-001", tipo: "Contrato", pedido: "PED-4521", cliente: "Empresa Festa Feliz", data: "05/12/2026", status: "emitido" },
  { id: "DOC-002", tipo: "Fatura de Locação", pedido: "PED-4520", cliente: "Maria Santos", data: "04/12/2026", status: "emitido" },
  { id: "DOC-003", tipo: "NFS-e", pedido: "PED-4519", cliente: "Buffet Sabor & Arte", data: "03/12/2026", status: "pendente" },
]

export default function DocumentosPage() {
  const { planoAtual, adicionaisAtivos, pacotesAtivos } = useOrganizacaoStore()
  const [dialogAberto, setDialogAberto] = useState(false)
  const [tipoSelecionado, setTipoSelecionado] = useState<string | null>(null)
  const [busca, setBusca] = useState("")

  const verificarAcesso = (tipo: typeof tiposDocumento[0]) => {
    // Verifica pacote contábil
    if (pacotesAtivos.includes("pacoteContabil")) return true
    
    // Verifica adicional específico
    if (tipo.adicional && adicionaisAtivos.includes(tipo.adicional)) return true
    
    // Contrato está disponível em todos os planos
    if (tipo.id === "contrato") return true
    
    // Verifica plano mínimo
    const hierarquiaPlanos = ["starter", "pro", "enterprise", "develop"]
    const indicePlanoAtual = hierarquiaPlanos.indexOf(planoAtual)
    const indicePlanoMinimo = hierarquiaPlanos.indexOf(tipo.planoMinimo)
    
    return indicePlanoAtual >= indicePlanoMinimo
  }

  const handleEmitir = (tipoId: string) => {
    setTipoSelecionado(tipoId)
    setDialogAberto(true)
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
            <h1 className="text-2xl font-bold text-[#0F032D]">Emitir Documento</h1>
            <p className="text-sm text-muted-foreground">Gere documentos fiscais e contratuais</p>
          </div>
        </div>
      </div>

      {/* Tipos de Documento */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiposDocumento.map((tipo) => {
          const temAcesso = verificarAcesso(tipo)
          const Icone = tipo.icone
          
          return (
            <Card 
              key={tipo.id} 
              className={`relative border-none shadow-md transition-all ${
                temAcesso ? "hover:shadow-lg cursor-pointer" : "opacity-60"
              }`}
            >
              {!temAcesso && (
                <div className="absolute right-3 top-3">
                  <Badge variant="outline" className="gap-1 border-amber-500 text-amber-600">
                    <Lock className="h-3 w-3" />
                    {tipo.adicional ? "Adicional" : tipo.planoMinimo.toUpperCase()}
                  </Badge>
                </div>
              )}
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className={`rounded-lg p-2 ${temAcesso ? "bg-[#905BF4]/10" : "bg-gray-100"}`}>
                    <Icone className={`h-5 w-5 ${temAcesso ? "text-[#905BF4]" : "text-gray-400"}`} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{tipo.nome}</CardTitle>
                    <CardDescription>{tipo.descricao}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button 
                  className={`w-full ${temAcesso ? "bg-[#905BF4] hover:bg-[#4E2BCC]" : "bg-gray-300 cursor-not-allowed"}`}
                  disabled={!temAcesso}
                  onClick={() => temAcesso && handleEmitir(tipo.id)}
                >
                  <FilePlus className="mr-2 h-4 w-4" />
                  Emitir {tipo.nome}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Documentos Recentes */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Documentos Recentes</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar documento..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b text-left text-sm text-muted-foreground">
                  <th className="pb-3 font-medium">Documento</th>
                  <th className="pb-3 font-medium">Tipo</th>
                  <th className="pb-3 font-medium">Pedido</th>
                  <th className="pb-3 font-medium">Cliente</th>
                  <th className="pb-3 font-medium">Data</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {documentosRecentes.map((doc) => (
                  <tr key={doc.id} className="text-sm">
                    <td className="py-3 font-medium text-[#0F032D]">{doc.id}</td>
                    <td className="py-3">{doc.tipo}</td>
                    <td className="py-3">
                      <Link href={`/dashboard/pedidos`} className="text-[#905BF4] hover:underline">
                        {doc.pedido}
                      </Link>
                    </td>
                    <td className="py-3">{doc.cliente}</td>
                    <td className="py-3">{doc.data}</td>
                    <td className="py-3">
                      <Badge className={doc.status === "emitido" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}>
                        {doc.status === "emitido" ? "Emitido" : "Pendente"}
                      </Badge>
                    </td>
                    <td className="py-3">
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Dialog de Emissão */}
      <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Emitir Documento</DialogTitle>
            <DialogDescription>Preencha os dados para emitir o documento</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Pedido Relacionado</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o pedido" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PED-4521">PED-4521 - Empresa Festa Feliz</SelectItem>
                  <SelectItem value="PED-4520">PED-4520 - Maria Santos</SelectItem>
                  <SelectItem value="PED-4519">PED-4519 - Buffet Sabor & Arte</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Observações</Label>
              <Textarea placeholder="Observações adicionais..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogAberto(false)}>Cancelar</Button>
            <Button className="bg-[#905BF4] hover:bg-[#4E2BCC]" onClick={() => {
              alert("Documento emitido com sucesso!")
              setDialogAberto(false)
            }}>
              Emitir Documento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
