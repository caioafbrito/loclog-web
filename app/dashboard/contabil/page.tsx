"use client"

import { useState } from "react"
import { 
  FileText, 
  Download, 
  Plus, 
  Search, 
  Filter,
  Calendar,
  Building2,
  Receipt,
  FileCheck,
  Send,
  Eye,
  MoreHorizontal,
  AlertCircle,
  CheckCircle2,
  Clock,
  Printer
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

// Dados de exemplo
const notasFiscais = [
  { 
    id: "NFS-001245", 
    tipo: "Serviço",
    cliente: "Maria Santos", 
    pedido: "PED-001234",
    valor: 1850.00,
    status: "emitida",
    dataEmissao: "2024-01-20",
    prefeitura: "Aprovada"
  },
  { 
    id: "NFS-001244", 
    tipo: "Serviço",
    cliente: "João Silva", 
    pedido: "PED-001233",
    valor: 3200.00,
    status: "emitida",
    dataEmissao: "2024-01-19",
    prefeitura: "Aprovada"
  },
  { 
    id: "NFS-001243", 
    tipo: "Remessa",
    cliente: "Carlos Oliveira", 
    pedido: "PED-001232",
    valor: 0,
    status: "pendente",
    dataEmissao: "-",
    prefeitura: "Aguardando"
  },
]

const contratos = [
  {
    id: "CTR-001089",
    cliente: "Maria Santos",
    pedido: "PED-001234",
    tipo: "Locação",
    dataInicio: "2024-01-25",
    dataFim: "2024-01-26",
    status: "ativo",
    assinado: true
  },
  {
    id: "CTR-001088",
    cliente: "João Silva",
    pedido: "PED-001233",
    tipo: "Locação",
    dataInicio: "2024-01-20",
    dataFim: "2024-01-21",
    status: "finalizado",
    assinado: true
  },
  {
    id: "CTR-001087",
    cliente: "Carlos Oliveira",
    pedido: "PED-001232",
    tipo: "Locação",
    dataInicio: "2024-01-28",
    dataFim: "2024-01-29",
    status: "aguardando",
    assinado: false
  },
]

const faturas = [
  {
    id: "FAT-002345",
    cliente: "Maria Santos",
    pedido: "PED-001234",
    valor: 1850.00,
    vencimento: "2024-01-25",
    status: "paga"
  },
  {
    id: "FAT-002344",
    cliente: "João Silva",
    pedido: "PED-001233",
    valor: 3200.00,
    vencimento: "2024-01-20",
    status: "paga"
  },
  {
    id: "FAT-002343",
    cliente: "Carlos Oliveira",
    pedido: "PED-001232",
    valor: 2100.00,
    vencimento: "2024-01-28",
    status: "pendente"
  },
]

export default function ContabilPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isNewDocOpen, setIsNewDocOpen] = useState(false)

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      emitida: "bg-green-100 text-green-800",
      pendente: "bg-yellow-100 text-yellow-800",
      cancelada: "bg-red-100 text-red-800",
      ativo: "bg-green-100 text-green-800",
      finalizado: "bg-gray-100 text-gray-800",
      aguardando: "bg-yellow-100 text-yellow-800",
      paga: "bg-green-100 text-green-800",
    }
    const labels: Record<string, string> = {
      emitida: "Emitida",
      pendente: "Pendente",
      cancelada: "Cancelada",
      ativo: "Ativo",
      finalizado: "Finalizado",
      aguardando: "Aguardando",
      paga: "Paga",
    }
    return <Badge className={styles[status]}>{labels[status]}</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F032D]">Módulo Contábil</h1>
          <p className="text-muted-foreground">
            Notas fiscais, contratos e documentos de locação
          </p>
        </div>
        <Dialog open={isNewDocOpen} onOpenChange={setIsNewDocOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#905BF4] hover:bg-[#4E2BCC]">
              <Plus className="mr-2 h-4 w-4" />
              Novo Documento
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Gerar Documento</DialogTitle>
              <DialogDescription>
                Selecione o tipo de documento a ser gerado
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Tipo de Documento</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nfs">Nota Fiscal de Serviço</SelectItem>
                    <SelectItem value="nfr-saida">Nota de Remessa (Saída)</SelectItem>
                    <SelectItem value="nfr-entrada">Nota de Remessa (Entrada)</SelectItem>
                    <SelectItem value="contrato">Contrato de Locação</SelectItem>
                    <SelectItem value="fatura">Fatura de Locação</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Pedido Vinculado</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o pedido" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PED-001234">PED-001234 - Maria Santos</SelectItem>
                    <SelectItem value="PED-001233">PED-001233 - João Silva</SelectItem>
                    <SelectItem value="PED-001232">PED-001232 - Carlos Oliveira</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full bg-[#905BF4] hover:bg-[#4E2BCC]">
                Gerar Documento
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Estatísticas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Notas Emitidas</CardTitle>
            <Receipt className="h-4 w-4 text-[#905BF4]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#0F032D]">47</div>
            <p className="text-xs text-muted-foreground">Este mês</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Contratos Ativos</CardTitle>
            <FileCheck className="h-4 w-4 text-[#905BF4]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#0F032D]">12</div>
            <p className="text-xs text-muted-foreground">Em andamento</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#0F032D]">5</div>
            <p className="text-xs text-muted-foreground">Aguardando emissão</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Valor Faturado</CardTitle>
            <Building2 className="h-4 w-4 text-[#905BF4]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#0F032D]">R$ 45.320</div>
            <p className="text-xs text-muted-foreground">Este mês</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs de Documentos */}
      <Tabs defaultValue="notas" className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <TabsList className="bg-[#EFEFEF]">
            <TabsTrigger value="notas" className="data-[state=active]:bg-[#905BF4] data-[state=active]:text-white">
              Notas Fiscais
            </TabsTrigger>
            <TabsTrigger value="contratos" className="data-[state=active]:bg-[#905BF4] data-[state=active]:text-white">
              Contratos
            </TabsTrigger>
            <TabsTrigger value="faturas" className="data-[state=active]:bg-[#905BF4] data-[state=active]:text-white">
              Faturas
            </TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar documentos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-64"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Notas Fiscais */}
        <TabsContent value="notas">
          <Card>
            <CardHeader>
              <CardTitle>Notas Fiscais</CardTitle>
              <CardDescription>
                Gerencie notas fiscais de serviço e remessa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Pedido</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Data Emissão</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Prefeitura</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notasFiscais.map((nota) => (
                    <TableRow key={nota.id}>
                      <TableCell className="font-medium">{nota.id}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{nota.tipo}</Badge>
                      </TableCell>
                      <TableCell>{nota.cliente}</TableCell>
                      <TableCell className="text-[#905BF4]">{nota.pedido}</TableCell>
                      <TableCell>
                        {nota.valor > 0 ? `R$ ${nota.valor.toFixed(2)}` : "-"}
                      </TableCell>
                      <TableCell>{nota.dataEmissao}</TableCell>
                      <TableCell>{getStatusBadge(nota.status)}</TableCell>
                      <TableCell>
                        {nota.prefeitura === "Aprovada" ? (
                          <span className="flex items-center gap-1 text-green-600">
                            <CheckCircle2 className="h-4 w-4" />
                            Aprovada
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-yellow-600">
                            <Clock className="h-4 w-4" />
                            Aguardando
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Visualizar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download PDF
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Send className="mr-2 h-4 w-4" />
                              Enviar por E-mail
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Printer className="mr-2 h-4 w-4" />
                              Imprimir
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

        {/* Contratos */}
        <TabsContent value="contratos">
          <Card>
            <CardHeader>
              <CardTitle>Contratos de Locação</CardTitle>
              <CardDescription>
                Gerencie contratos de locação de materiais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Pedido</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Período</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assinatura</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contratos.map((contrato) => (
                    <TableRow key={contrato.id}>
                      <TableCell className="font-medium">{contrato.id}</TableCell>
                      <TableCell>{contrato.cliente}</TableCell>
                      <TableCell className="text-[#905BF4]">{contrato.pedido}</TableCell>
                      <TableCell>{contrato.tipo}</TableCell>
                      <TableCell>
                        {contrato.dataInicio} a {contrato.dataFim}
                      </TableCell>
                      <TableCell>{getStatusBadge(contrato.status)}</TableCell>
                      <TableCell>
                        {contrato.assinado ? (
                          <span className="flex items-center gap-1 text-green-600">
                            <CheckCircle2 className="h-4 w-4" />
                            Assinado
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-yellow-600">
                            <AlertCircle className="h-4 w-4" />
                            Pendente
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Visualizar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download PDF
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Send className="mr-2 h-4 w-4" />
                              Enviar para Assinatura
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

        {/* Faturas */}
        <TabsContent value="faturas">
          <Card>
            <CardHeader>
              <CardTitle>Faturas de Locação</CardTitle>
              <CardDescription>
                Gerencie faturas geradas para os pedidos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Pedido</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {faturas.map((fatura) => (
                    <TableRow key={fatura.id}>
                      <TableCell className="font-medium">{fatura.id}</TableCell>
                      <TableCell>{fatura.cliente}</TableCell>
                      <TableCell className="text-[#905BF4]">{fatura.pedido}</TableCell>
                      <TableCell>R$ {fatura.valor.toFixed(2)}</TableCell>
                      <TableCell>{fatura.vencimento}</TableCell>
                      <TableCell>{getStatusBadge(fatura.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Visualizar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download PDF
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Send className="mr-2 h-4 w-4" />
                              Enviar por E-mail
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
      </Tabs>

      {/* Informação do Provedor */}
      <Card className="border-[#905BF4]/20 bg-[#905BF4]/5">
        <CardContent className="flex items-center gap-4 pt-6">
          <div className="rounded-full bg-[#905BF4]/10 p-3">
            <Building2 className="h-6 w-6 text-[#905BF4]" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-[#0F032D]">Integração com Prefeitura</h3>
            <p className="text-sm text-muted-foreground">
              O módulo contábil está integrado com o provedor fiscal da sua cidade para emissão automática de notas fiscais.
            </p>
          </div>
          <Button variant="outline" className="border-[#905BF4] text-[#905BF4] hover:bg-[#905BF4] hover:text-white">
            Configurar Integração
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
