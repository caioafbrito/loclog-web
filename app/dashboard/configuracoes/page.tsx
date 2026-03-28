"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Building2, 
  User, 
  Bell, 
  CreditCard,
  FileText,
  Palette,
  Mail,
  Phone,
  MapPin,
  Save,
  Upload,
  Clock,
  Plus,
  Trash2,
  Settings,
  Calculator,
  Truck,
  Percent,
  DollarSign,
  Shield,
  Users,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Definição das seções do menu
const menuSecoes = [
  {
    titulo: "Geral",
    itens: [
      { id: "empresa", nome: "Dados da Empresa", icone: Building2 },
      { id: "usuarios", nome: "Usuários e Permissões", icone: Users },
      { id: "notificacoes", nome: "Notificações", icone: Bell },
    ]
  },
  {
    titulo: "Operacional",
    itens: [
      { id: "parametros", nome: "Parâmetros de Precificação", icone: Calculator },
      { id: "horarios", nome: "Horários de Funcionamento", icone: Clock },
      { id: "logistica", nome: "Configurações Logísticas", icone: Truck },
    ]
  },
  {
    titulo: "Financeiro",
    itens: [
      { id: "faturamento", nome: "Faturamento", icone: CreditCard },
      { id: "documentos", nome: "Documentos Fiscais", icone: FileText },
    ]
  },
  {
    titulo: "Sistema",
    itens: [
      { id: "aparencia", nome: "Aparência", icone: Palette },
      { id: "seguranca", nome: "Segurança", icone: Shield },
    ]
  },
]

export default function ConfiguracoesPage() {
  const [saving, setSaving] = useState(false)
  const [secaoAtiva, setSecaoAtiva] = useState("parametros")
  
  // Estados dos parâmetros
  const [taxaLogistica, setTaxaLogistica] = useState("2.50")
  const [taxaMaoDeObra, setTaxaMaoDeObra] = useState("10")
  const [maoDeObraAtiva, setMaoDeObraAtiva] = useState(true)
  const [freteMinimo, setFreteMinimo] = useState("50.00")

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      alert("Configurações salvas com sucesso!")
    }, 1000)
  }

  const renderConteudo = () => {
    switch (secaoAtiva) {
      case "parametros":
        return <SecaoParametros 
          taxaLogistica={taxaLogistica}
          setTaxaLogistica={setTaxaLogistica}
          taxaMaoDeObra={taxaMaoDeObra}
          setTaxaMaoDeObra={setTaxaMaoDeObra}
          maoDeObraAtiva={maoDeObraAtiva}
          setMaoDeObraAtiva={setMaoDeObraAtiva}
          freteMinimo={freteMinimo}
          setFreteMinimo={setFreteMinimo}
        />
      case "empresa":
        return <SecaoEmpresa />
      case "horarios":
        return <SecaoHorarios />
      case "notificacoes":
        return <SecaoNotificacoes />
      case "aparencia":
        return <SecaoAparencia />
      case "usuarios":
        return <SecaoUsuarios />
      case "faturamento":
        return <SecaoFaturamento />
      case "documentos":
        return <SecaoDocumentos />
      case "logistica":
        return <SecaoLogistica />
      case "seguranca":
        return <SecaoSeguranca />
      default:
        return <SecaoParametros 
          taxaLogistica={taxaLogistica}
          setTaxaLogistica={setTaxaLogistica}
          taxaMaoDeObra={taxaMaoDeObra}
          setTaxaMaoDeObra={setTaxaMaoDeObra}
          maoDeObraAtiva={maoDeObraAtiva}
          setMaoDeObraAtiva={setMaoDeObraAtiva}
          freteMinimo={freteMinimo}
          setFreteMinimo={setFreteMinimo}
        />
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F032D]">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie as configurações da sua empresa e do sistema
          </p>
        </div>
        <Button className="bg-[#905BF4] hover:bg-[#4E2BCC]" onClick={handleSave} disabled={saving}>
          <Save className="mr-2 h-4 w-4" />
          {saving ? "Salvando..." : "Salvar Alterações"}
        </Button>
      </div>

      {/* Layout com menu lateral */}
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Menu Lateral */}
        <Card className="border-none shadow-md lg:w-72 shrink-0">
          <ScrollArea className="h-auto lg:h-[calc(100vh-220px)]">
            <div className="p-4 space-y-6">
              {menuSecoes.map((secao) => (
                <div key={secao.titulo}>
                  <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {secao.titulo}
                  </h3>
                  <div className="space-y-1">
                    {secao.itens.map((item) => {
                      const Icone = item.icone
                      const ativo = secaoAtiva === item.id
                      return (
                        <button
                          key={item.id}
                          onClick={() => setSecaoAtiva(item.id)}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                            ativo
                              ? "bg-[#905BF4] text-white font-medium"
                              : "text-[#0F032D] hover:bg-[#EFEFEF]"
                          )}
                        >
                          <Icone className="h-4 w-4 shrink-0" />
                          <span className="flex-1 text-left">{item.nome}</span>
                          {ativo && <ChevronRight className="h-4 w-4" />}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Conteúdo */}
        <div className="flex-1 min-w-0">
          {renderConteudo()}
        </div>
      </div>
    </div>
  )
}

// ============================================================
// SEÇÃO: PARÂMETROS DE PRECIFICAÇÃO
// ============================================================
function SecaoParametros({
  taxaLogistica,
  setTaxaLogistica,
  taxaMaoDeObra,
  setTaxaMaoDeObra,
  maoDeObraAtiva,
  setMaoDeObraAtiva,
  freteMinimo,
  setFreteMinimo,
}: {
  taxaLogistica: string
  setTaxaLogistica: (v: string) => void
  taxaMaoDeObra: string
  setTaxaMaoDeObra: (v: string) => void
  maoDeObraAtiva: boolean
  setMaoDeObraAtiva: (v: boolean) => void
  freteMinimo: string
  setFreteMinimo: (v: string) => void
}) {
  return (
    <div className="space-y-6">
      {/* Taxa Logística */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-[#905BF4]/10 p-2">
              <Truck className="h-5 w-5 text-[#905BF4]" />
            </div>
            <div>
              <CardTitle>Taxa Logística (Frete)</CardTitle>
              <CardDescription>
                Valor cobrado por quilômetro rodado para cálculo automático do frete
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="taxa-km">Valor por Quilômetro (R$)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="taxa-km"
                  type="number"
                  step="0.01"
                  min="0"
                  value={taxaLogistica}
                  onChange={(e) => setTaxaLogistica(e.target.value)}
                  className="pl-9"
                  placeholder="2.50"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Ex: Se a distância for 20km, o frete será R$ {(parseFloat(taxaLogistica || "0") * 20).toFixed(2)}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="frete-minimo">Frete Mínimo (R$)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="frete-minimo"
                  type="number"
                  step="0.01"
                  min="0"
                  value={freteMinimo}
                  onChange={(e) => setFreteMinimo(e.target.value)}
                  className="pl-9"
                  placeholder="50.00"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Valor mínimo cobrado independente da distância
              </p>
            </div>
          </div>
          
          <div className="rounded-lg bg-[#EFEFEF] p-4">
            <h4 className="font-medium text-[#0F032D] mb-2">Como funciona o cálculo do frete:</h4>
            <ol className="space-y-1 text-sm text-muted-foreground list-decimal list-inside">
              <li>O endereço do cliente é inserido no orçamento</li>
              <li>A distância é calculada via Google Maps API</li>
              <li>Distância × Taxa por km = Valor do frete</li>
              <li>Se o valor for menor que o mínimo, cobra-se o mínimo</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      {/* Taxa de Mão de Obra */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-[#4E2BCC]/10 p-2">
                <Percent className="h-5 w-5 text-[#4E2BCC]" />
              </div>
              <div>
                <CardTitle>Taxa de Mão de Obra</CardTitle>
                <CardDescription>
                  Percentual adicional sobre o valor dos itens do orçamento
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="mao-obra-ativa" className="text-sm">Ativa</Label>
              <Switch
                id="mao-obra-ativa"
                checked={maoDeObraAtiva}
                onCheckedChange={setMaoDeObraAtiva}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className={cn("space-y-4", !maoDeObraAtiva && "opacity-50 pointer-events-none")}>
          <div className="max-w-xs space-y-2">
            <Label htmlFor="taxa-mao-obra">Percentual (%)</Label>
            <div className="relative">
              <Percent className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="taxa-mao-obra"
                type="number"
                step="0.5"
                min="0"
                max="100"
                value={taxaMaoDeObra}
                onChange={(e) => setTaxaMaoDeObra(e.target.value)}
                className="pl-9"
                placeholder="10"
                disabled={!maoDeObraAtiva}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Padrão: 10% (orçamento de R$ 1.000 + 10% = R$ 1.100)
            </p>
          </div>
          
          <div className="rounded-lg bg-[#EFEFEF] p-4">
            <h4 className="font-medium text-[#0F032D] mb-2">Exemplo de cálculo:</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Valor dos itens:</span>
                <span className="font-medium">R$ 1.000,00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Mão de obra ({taxaMaoDeObra}%):</span>
                <span className="font-medium">R$ {(1000 * parseFloat(taxaMaoDeObra || "0") / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Frete (20km):</span>
                <span className="font-medium">R$ {Math.max(parseFloat(freteMinimo || "0"), parseFloat(taxaLogistica || "0") * 20).toFixed(2)}</span>
              </div>
              <div className="border-t pt-1 mt-1 flex justify-between">
                <span className="font-medium text-[#0F032D]">Total do orçamento:</span>
                <span className="font-bold text-[#905BF4]">
                  R$ {(
                    1000 + 
                    (maoDeObraAtiva ? 1000 * parseFloat(taxaMaoDeObra || "0") / 100 : 0) + 
                    Math.max(parseFloat(freteMinimo || "0"), parseFloat(taxaLogistica || "0") * 20)
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Outras Configurações de Precificação */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>Outras Configurações</CardTitle>
          <CardDescription>Configurações adicionais de precificação</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="font-medium">Desconto para Retirada no Local</p>
              <p className="text-sm text-muted-foreground">Zera automaticamente o frete quando o cliente retira</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="font-medium">Arredondar Valores</p>
              <p className="text-sm text-muted-foreground">Arredonda o total do orçamento para valores inteiros</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="font-medium">Mostrar Detalhamento no Orçamento</p>
              <p className="text-sm text-muted-foreground">Exibe separadamente: itens, mão de obra e frete</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ============================================================
// SEÇÃO: DADOS DA EMPRESA
// ============================================================
function SecaoEmpresa() {
  return (
    <div className="space-y-6">
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>Dados da Empresa</CardTitle>
          <CardDescription>Informações básicas da sua locadora</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="razao-social">Razão Social</Label>
              <Input id="razao-social" placeholder="Nome da empresa" defaultValue="DZ Locadora LTDA" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nome-fantasia">Nome Fantasia</Label>
              <Input id="nome-fantasia" placeholder="Nome fantasia" defaultValue="DZ Locadora" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input id="cnpj" placeholder="00.000.000/0000-00" defaultValue="12.345.678/0001-90" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ie">Inscrição Estadual</Label>
              <Input id="ie" placeholder="000.000.000.000" defaultValue="123.456.789.000" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>Contato</CardTitle>
          <CardDescription>Informações de contato da empresa</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="email" type="email" className="pl-9" defaultValue="contato@dzlocadora.com.br" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="telefone" className="pl-9" defaultValue="(11) 99999-9999" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="endereco">Endereço</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Textarea id="endereco" className="pl-9" defaultValue="Rua das Flores, 123 - Centro, São Paulo - SP, 01234-567" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>Logo da Empresa</CardTitle>
          <CardDescription>Faça upload do logotipo para usar em documentos e orçamentos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex h-24 w-24 items-center justify-center rounded-lg border-2 border-dashed border-[#D0D0D8] bg-[#EFEFEF]">
              <Upload className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Fazer Upload
              </Button>
              <p className="text-xs text-muted-foreground">PNG, JPG ou SVG. Máximo 2MB.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ============================================================
// SEÇÃO: HORÁRIOS DE FUNCIONAMENTO
// ============================================================
function SecaoHorarios() {
  const dias = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"]
  
  return (
    <div className="space-y-6">
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>Horário Comercial</CardTitle>
          <CardDescription>Define o horário padrão de funcionamento para entregas e retiradas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {dias.map((dia, index) => (
            <div key={dia} className="flex flex-wrap items-center gap-4 rounded-lg border p-4">
              <div className="w-24 font-medium text-[#0F032D]">{dia}</div>
              <div className="flex flex-1 flex-wrap items-center gap-2">
                <Switch defaultChecked={index < 5} />
                {index < 5 ? (
                  <>
                    <div className="flex items-center gap-2">
                      <Label className="text-sm text-muted-foreground">Manhã:</Label>
                      <Input type="time" defaultValue="08:00" className="w-28" />
                      <span className="text-muted-foreground">às</span>
                      <Input type="time" defaultValue="12:00" className="w-28" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Label className="text-sm text-muted-foreground">Tarde:</Label>
                      <Input type="time" defaultValue="13:00" className="w-28" />
                      <span className="text-muted-foreground">às</span>
                      <Input type="time" defaultValue="17:00" className="w-28" />
                    </div>
                  </>
                ) : index === 5 ? (
                  <div className="flex items-center gap-2">
                    <Input type="time" defaultValue="08:00" className="w-28" />
                    <span className="text-muted-foreground">às</span>
                    <Input type="time" defaultValue="12:00" className="w-28" />
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">Fechado</span>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-none shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Períodos de Entrega</CardTitle>
              <CardDescription>Crie períodos personalizados (Manhã, Tarde, Noite)</CardDescription>
            </div>
            <Button size="sm" className="bg-[#905BF4] hover:bg-[#4E2BCC]">
              <Plus className="mr-2 h-4 w-4" />
              Novo Período
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { nome: "Manhã", horario: "08:00 - 12:00", cor: "bg-amber-100 text-amber-700" },
            { nome: "Tarde", horario: "13:00 - 18:00", cor: "bg-blue-100 text-blue-700" },
            { nome: "Noite", horario: "18:00 - 21:00", cor: "bg-purple-100 text-purple-700" },
          ].map((periodo) => (
            <div key={periodo.nome} className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <Badge className={periodo.cor}>{periodo.nome}</Badge>
                <span className="text-sm text-muted-foreground">{periodo.horario}</span>
              </div>
              <Button variant="ghost" size="icon" className="text-red-600 hover:bg-red-50 hover:text-red-700">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

// ============================================================
// SEÇÕES PLACEHOLDER
// ============================================================
function SecaoNotificacoes() {
  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <CardTitle>Notificações</CardTitle>
        <CardDescription>Configure como você deseja receber notificações</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {[
          { titulo: "Novos pedidos", descricao: "Receba alertas quando novos pedidos forem criados" },
          { titulo: "Pagamentos", descricao: "Notificações de confirmação de pagamento" },
          { titulo: "Orçamentos", descricao: "Alertas quando orçamentos forem aceitos ou recusados" },
          { titulo: "Estoque baixo", descricao: "Aviso quando produtos estiverem acabando" },
        ].map((item) => (
          <div key={item.titulo} className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="font-medium">{item.titulo}</p>
              <p className="text-sm text-muted-foreground">{item.descricao}</p>
            </div>
            <Switch defaultChecked />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function SecaoAparencia() {
  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <CardTitle>Aparência</CardTitle>
        <CardDescription>Personalize a aparência do sistema</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Tema</Label>
          <Select defaultValue="light">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Claro</SelectItem>
              <SelectItem value="dark">Escuro</SelectItem>
              <SelectItem value="system">Sistema</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Cor de destaque</Label>
          <div className="flex gap-2">
            {["#905BF4", "#4E2BCC", "#0F032D", "#22c55e", "#f97316"].map((cor) => (
              <button
                key={cor}
                className="h-8 w-8 rounded-full border-2 border-white shadow-md"
                style={{ backgroundColor: cor }}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SecaoUsuarios() {
  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Usuários</CardTitle>
            <CardDescription>Gerencie os usuários com acesso ao sistema</CardDescription>
          </div>
          <Button className="bg-[#905BF4] hover:bg-[#4E2BCC]">
            <Plus className="mr-2 h-4 w-4" />
            Novo Usuário
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            { nome: "João Silva", email: "joao@empresa.com", cargo: "Administrador" },
            { nome: "Maria Santos", email: "maria@empresa.com", cargo: "Operador" },
          ].map((user) => (
            <div key={user.email} className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#905BF4] flex items-center justify-center text-white font-medium">
                  {user.nome.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-medium">{user.nome}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <Badge variant="outline">{user.cargo}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function SecaoFaturamento() {
  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <CardTitle>Faturamento</CardTitle>
        <CardDescription>Configure opções de cobrança e pagamento</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Prazo padrão de pagamento</Label>
          <Select defaultValue="30">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">À vista</SelectItem>
              <SelectItem value="7">7 dias</SelectItem>
              <SelectItem value="14">14 dias</SelectItem>
              <SelectItem value="30">30 dias</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <p className="font-medium">Cobrar multa por atraso</p>
            <p className="text-sm text-muted-foreground">2% sobre o valor após o vencimento</p>
          </div>
          <Switch defaultChecked />
        </div>
      </CardContent>
    </Card>
  )
}

function SecaoDocumentos() {
  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <CardTitle>Documentos Fiscais</CardTitle>
        <CardDescription>Configure a emissão de notas fiscais</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
          <p className="text-sm text-amber-800">
            Para emitir notas fiscais, é necessário configurar o certificado digital A1.
          </p>
        </div>
        <Button variant="outline">
          <Upload className="mr-2 h-4 w-4" />
          Fazer Upload do Certificado
        </Button>
      </CardContent>
    </Card>
  )
}

function SecaoLogistica() {
  const [logisticaInternaAtiva, setLogisticaInternaAtiva] = useState(true)
  
  return (
    <div className="space-y-6">
      {/* Logística Interna */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-[#905BF4]/10 p-2">
                <Truck className="h-5 w-5 text-[#905BF4]" />
              </div>
              <div>
                <CardTitle>Logística Interna</CardTitle>
                <CardDescription>
                  Habilite para controlar separação e conferência de mercadorias no armazém
                </CardDescription>
              </div>
            </div>
            <Switch 
              checked={logisticaInternaAtiva} 
              onCheckedChange={setLogisticaInternaAtiva} 
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-[#EFEFEF] p-4">
            <h4 className="font-semibold text-[#0F032D] mb-3">Fluxo de Status Logísticos</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Entenda como cada status funciona e quem é responsável por cada etapa:
            </p>
            
            {/* Fluxo de Entrega */}
            <div className="mb-6">
              <h5 className="font-medium text-[#905BF4] mb-2 flex items-center gap-2">
                <Badge className="bg-[#905BF4]/10 text-[#905BF4]">Fluxo de Entrega</Badge>
              </h5>
              <div className="space-y-2 text-sm">
                {logisticaInternaAtiva && (
                  <>
                    <div className="flex items-start gap-2">
                      <Badge className="bg-amber-100 text-amber-800 shrink-0">1. A Separar</Badge>
                      <span className="text-muted-foreground">Pedido aprovado aguardando separação no estoque. <span className="font-medium text-[#0F032D]">(Responsável: Estoquista)</span></span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge className="bg-orange-100 text-orange-800 shrink-0">2. Separado</Badge>
                      <span className="text-muted-foreground">Mercadoria separada e pronta para carregar. <span className="font-medium text-[#0F032D]">(Responsável: Estoquista)</span></span>
                    </div>
                  </>
                )}
                <div className="flex items-start gap-2">
                  <Badge className="bg-blue-100 text-blue-800 shrink-0">{logisticaInternaAtiva ? "3" : "1"}. Saiu para Entrega</Badge>
                  <span className="text-muted-foreground">Quando inicia-se uma rota em que o pedido será entregue. <span className="font-medium text-[#0F032D]">(Automático: Início da rota)</span></span>
                </div>
                <div className="flex items-start gap-2">
                  <Badge className="bg-purple-100 text-purple-800 shrink-0">{logisticaInternaAtiva ? "4" : "2"}. Entregue</Badge>
                  <span className="text-muted-foreground">Mercadoria entregue no local do evento. <span className="font-medium text-[#0F032D]">(Responsável: Motorista - via app de rota)</span></span>
                </div>
              </div>
            </div>
            
            {/* Fluxo de Retirada */}
            <div className="mb-6">
              <h5 className="font-medium text-[#4E2BCC] mb-2 flex items-center gap-2">
                <Badge className="bg-[#4E2BCC]/10 text-[#4E2BCC]">Fluxo de Retirada</Badge>
              </h5>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <Badge className="bg-blue-100 text-blue-800 shrink-0">1. Saiu para Retirada</Badge>
                  <span className="text-muted-foreground">Quando inicia-se uma rota de retirada. <span className="font-medium text-[#0F032D]">(Automático: Início da rota)</span></span>
                </div>
                <div className="flex items-start gap-2">
                  <Badge className="bg-purple-100 text-purple-800 shrink-0">2. Retirado</Badge>
                  <span className="text-muted-foreground">Mercadoria retirada do local do evento. <span className="font-medium text-[#0F032D]">(Responsável: Motorista - via app de rota)</span></span>
                </div>
                {logisticaInternaAtiva ? (
                  <>
                    <div className="flex items-start gap-2">
                      <Badge className="bg-amber-100 text-amber-800 shrink-0">3. A Conferir</Badge>
                      <span className="text-muted-foreground">Mercadoria aguardando conferência no retorno ao armazém. <span className="font-medium text-[#0F032D]">(Responsável: Estoquista)</span></span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge className="bg-green-100 text-green-800 shrink-0">4. Conferido/Concluído</Badge>
                      <span className="text-muted-foreground">Mercadoria conferida e devolvida ao estoque. <span className="font-medium text-[#0F032D]">(Responsável: Estoquista)</span></span>
                    </div>
                  </>
                ) : (
                  <div className="flex items-start gap-2">
                    <Badge className="bg-green-100 text-green-800 shrink-0">3. Concluído</Badge>
                    <span className="text-muted-foreground">Mercadoria retornada. <span className="font-medium text-[#0F032D]">(Responsável: Motorista marca ao chegar com a retirada)</span></span>
                  </div>
                )}
              </div>
            </div>

            {/* Navegação do Motorista */}
            <div className="rounded-lg bg-white p-3 border">
              <h5 className="font-medium text-[#0F032D] mb-2">App do Motorista</h5>
              <p className="text-sm text-muted-foreground">
                O motorista acessa a navegação da rota integrada com o Google Maps. 
                Durante a rota, ele pode marcar cada parada como "Entregue" ou "Retirado" diretamente pelo celular.
                {!logisticaInternaAtiva && " Ao retornar ao armazém com as retiradas, o motorista marca como 'Concluído'."}
              </p>
            </div>
          </div>

          {logisticaInternaAtiva && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm text-amber-800">
                <strong>Logística Interna Ativa:</strong> Serão exibidos os status "A Separar", "Separado", "A Conferir" e "Conferido" para controle de armazém.
              </p>
            </div>
          )}

          {!logisticaInternaAtiva && (
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
              <p className="text-sm text-blue-800">
                <strong>Logística Interna Desativada:</strong> O fluxo será simplificado. Apenas status de rota (Saiu para Entrega/Retirada) e conclusão pelo motorista.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Opções de Agendamento */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>Opções de Agendamento</CardTitle>
          <CardDescription>Configure regras para agendamento de entregas e retiradas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="font-medium">Permitir agendamento no mesmo dia</p>
              <p className="text-sm text-muted-foreground">Clientes podem agendar entregas para o mesmo dia</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="font-medium">Antecedência mínima</p>
              <p className="text-sm text-muted-foreground">Horas de antecedência para agendamento</p>
            </div>
            <Select defaultValue="2">
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0h</SelectItem>
                <SelectItem value="2">2h</SelectItem>
                <SelectItem value="4">4h</SelectItem>
                <SelectItem value="24">24h</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="font-medium">Raio máximo de atendimento</p>
              <p className="text-sm text-muted-foreground">Distância máxima para entregas</p>
            </div>
            <Select defaultValue="50">
              <SelectTrigger className="w-28">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="20">20 km</SelectItem>
                <SelectItem value="50">50 km</SelectItem>
                <SelectItem value="100">100 km</SelectItem>
                <SelectItem value="0">Sem limite</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Motoristas */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Motoristas</CardTitle>
              <CardDescription>Gerencie os motoristas cadastrados</CardDescription>
            </div>
            <Button size="sm" className="bg-[#905BF4] hover:bg-[#4E2BCC]">
              <Plus className="mr-2 h-4 w-4" />
              Novo Motorista
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { nome: "João Motorista", telefone: "(11) 99999-1111", status: "Ativo" },
              { nome: "Pedro Entregador", telefone: "(11) 99999-2222", status: "Ativo" },
              { nome: "Carlos Silva", telefone: "(11) 99999-3333", status: "Inativo" },
            ].map((motorista) => (
              <div key={motorista.nome} className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#4E2BCC] flex items-center justify-center text-white font-medium">
                    {motorista.nome.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium">{motorista.nome}</p>
                    <p className="text-sm text-muted-foreground">{motorista.telefone}</p>
                  </div>
                </div>
                <Badge variant={motorista.status === "Ativo" ? "default" : "secondary"}>
                  {motorista.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function SecaoSeguranca() {
  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <CardTitle>Segurança</CardTitle>
        <CardDescription>Configure opções de segurança da conta</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <p className="font-medium">Autenticação em duas etapas</p>
            <p className="text-sm text-muted-foreground">Adiciona uma camada extra de segurança</p>
          </div>
          <Switch />
        </div>
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <p className="font-medium">Sessão automática</p>
            <p className="text-sm text-muted-foreground">Desconectar após 30 minutos de inatividade</p>
          </div>
          <Switch defaultChecked />
        </div>
      </CardContent>
    </Card>
  )
}
