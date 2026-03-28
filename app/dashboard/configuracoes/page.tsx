"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { 
  Building2, 
  User, 
  Bell, 
  Shield, 
  CreditCard,
  FileText,
  Palette,
  Globe,
  Mail,
  Phone,
  MapPin,
  Save,
  Upload,
  Clock,
  Plus,
  Trash2,
} from "lucide-react"

export default function ConfiguracoesPage() {
  const [saving, setSaving] = useState(false)

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => setSaving(false), 1000)
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

      {/* Tabs */}
      <Tabs defaultValue="company" className="space-y-4">
        <TabsList className="bg-[#EFEFEF] flex-wrap h-auto gap-1 p-1">
          <TabsTrigger value="company" className="gap-2">
            <Building2 className="h-4 w-4" />
            Empresa
          </TabsTrigger>
          <TabsTrigger value="users" className="gap-2">
            <User className="h-4 w-4" />
            Usuários
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="billing" className="gap-2">
            <CreditCard className="h-4 w-4" />
            Faturamento
          </TabsTrigger>
          <TabsTrigger value="documents" className="gap-2">
            <FileText className="h-4 w-4" />
            Documentos
          </TabsTrigger>
          <TabsTrigger value="hours" className="gap-2">
            <Clock className="h-4 w-4" />
            Horários
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2">
            <Palette className="h-4 w-4" />
            Aparência
          </TabsTrigger>
        </TabsList>

        <TabsContent value="company" className="space-y-6">
          {/* Dados da Empresa */}
          <Card>
            <CardHeader>
              <CardTitle>Dados da Empresa</CardTitle>
              <CardDescription>
                Informações legais e de contato da sua empresa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="h-24 w-24 rounded-lg bg-[#EFEFEF] flex items-center justify-center border-2 border-dashed border-muted-foreground/25">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <Button variant="outline" size="sm">
                    Alterar Logo
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    PNG, JPG ou SVG. Máximo 2MB.
                  </p>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Razão Social</Label>
                  <Input id="companyName" defaultValue="Minha Empresa Locações LTDA" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tradeName">Nome Fantasia</Label>
                  <Input id="tradeName" defaultValue="Minha Empresa Locações" />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input id="cnpj" defaultValue="12.345.678/0001-90" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stateReg">Inscrição Estadual</Label>
                  <Input id="stateReg" defaultValue="123.456.789.012" />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" className="pl-9" defaultValue="contato@minhaempresa.com.br" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="phone" className="pl-9" defaultValue="(11) 99999-9999" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Endereço
                </h4>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="cep">CEP</Label>
                    <Input id="cep" defaultValue="01234-567" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="street">Rua</Label>
                    <Input id="street" defaultValue="Rua das Locações" />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="space-y-2">
                    <Label htmlFor="number">Número</Label>
                    <Input id="number" defaultValue="123" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="complement">Complemento</Label>
                    <Input id="complement" defaultValue="Galpão A" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="neighborhood">Bairro</Label>
                    <Input id="neighborhood" defaultValue="Centro" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade/UF</Label>
                    <Input id="city" defaultValue="São Paulo - SP" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Configurações Fiscais */}
          <Card>
            <CardHeader>
              <CardTitle>Configurações Fiscais</CardTitle>
              <CardDescription>
                Configurações para emissão de notas fiscais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="taxRegime">Regime Tributário</Label>
                  <Select defaultValue="simples">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="simples">Simples Nacional</SelectItem>
                      <SelectItem value="presumido">Lucro Presumido</SelectItem>
                      <SelectItem value="real">Lucro Real</SelectItem>
                      <SelectItem value="mei">MEI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnae">CNAE Principal</Label>
                  <Input id="cnae" defaultValue="7739-0/99" />
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label>Emitir NFS-e Automaticamente</Label>
                  <p className="text-sm text-muted-foreground">
                    Emite nota fiscal de serviço automaticamente ao concluir um pedido
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Meu Perfil</CardTitle>
              <CardDescription>
                Suas informações pessoais de acesso
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="userName">Nome Completo</Label>
                  <Input id="userName" defaultValue="João da Silva" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userEmail">E-mail de Acesso</Label>
                  <Input id="userEmail" type="email" defaultValue="joao@minhaempresa.com.br" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="userPhone">Telefone</Label>
                  <Input id="userPhone" defaultValue="(11) 99999-1234" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userRole">Função</Label>
                  <Select defaultValue="admin">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="manager">Gerente</SelectItem>
                      <SelectItem value="operator">Operador</SelectItem>
                      <SelectItem value="driver">Motorista</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h4 className="font-medium">Alterar Senha</h4>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Senha Atual</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nova Senha</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Usuários do Sistema</CardTitle>
              <CardDescription>
                Gerencie os acessos da sua equipe
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <User className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-[#0F032D]">Gerenciamento de Usuários</h3>
                <p className="text-muted-foreground mb-4">
                  Disponível nos planos Pro e Enterprise.
                </p>
                <Button className="bg-[#905BF4] hover:bg-[#4E2BCC]">
                  Fazer Upgrade
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificação</CardTitle>
              <CardDescription>
                Configure como você deseja receber alertas e atualizações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label>Notificações por E-mail</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba atualizações importantes por e-mail
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label>Notificações por WhatsApp</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba alertas instantâneos via WhatsApp
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label>Novos Pedidos</Label>
                  <p className="text-sm text-muted-foreground">
                    Seja notificado quando um novo pedido for criado
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label>Pagamentos Recebidos</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba confirmação de pagamentos
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label>Estoque Baixo</Label>
                  <p className="text-sm text-muted-foreground">
                    Alertas quando produtos atingirem estoque mínimo
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label>Solicitações de Parceria</Label>
                  <p className="text-sm text-muted-foreground">
                    Notificações sobre novas solicitações de parceiros
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Seu Plano</CardTitle>
              <CardDescription>
                Informações sobre sua assinatura atual
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#905BF4] to-[#4E2BCC] rounded-lg text-white">
                <div>
                  <h3 className="text-lg font-bold">Plano Pro</h3>
                  <p className="text-white/80">Renovação em 15/02/2024</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">R$ 119,90</p>
                  <p className="text-white/80">/mês</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" className="flex-1">
                  Ver Faturas
                </Button>
                <Button className="flex-1 bg-[#905BF4] hover:bg-[#4E2BCC]">
                  Fazer Upgrade
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Método de Pagamento</CardTitle>
              <CardDescription>
                Cartão cadastrado para cobrança
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-16 bg-[#0F032D] rounded flex items-center justify-center text-white text-xs font-bold">
                    VISA
                  </div>
                  <div>
                    <p className="font-medium">**** **** **** 4242</p>
                    <p className="text-sm text-muted-foreground">Expira em 12/2026</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Alterar
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Modelos de Documentos</CardTitle>
              <CardDescription>
                Personalize os documentos gerados pelo sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Orçamento</p>
                  <p className="text-sm text-muted-foreground">Modelo de orçamento para clientes</p>
                </div>
                <Button variant="outline" size="sm">
                  Editar
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Contrato de Locação</p>
                  <p className="text-sm text-muted-foreground">Contrato padrão de aluguel</p>
                </div>
                <Button variant="outline" size="sm">
                  Editar
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Fatura de Locação</p>
                  <p className="text-sm text-muted-foreground">Fatura para cobrança do cliente</p>
                </div>
                <Button variant="outline" size="sm">
                  Editar
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Comprovante de Entrega</p>
                  <p className="text-sm text-muted-foreground">Documento de conferência na entrega</p>
                </div>
                <Button variant="outline" size="sm">
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hours" className="space-y-6">
          {/* Horário Comercial Principal */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Horário Comercial
              </CardTitle>
              <CardDescription>
                Define o horário padrão de funcionamento para entregas e retiradas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"].map((day, index) => (
                <div key={day} className="flex flex-wrap items-center gap-4 rounded-lg border p-4">
                  <div className="w-24 font-medium text-[#0F032D]">{day}</div>
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

          {/* Períodos Personalizados */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Períodos Personalizados</CardTitle>
                  <CardDescription>
                    Crie períodos de entrega específicos (ex: Manhã, Tarde, Noite)
                  </CardDescription>
                </div>
                <Button size="sm" className="bg-[#905BF4] hover:bg-[#4E2BCC]">
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Período
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Período Manhã */}
              <div className="rounded-lg border p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-[#905BF4]/10 text-[#905BF4]">Manhã</Badge>
                      <span className="text-sm text-muted-foreground">Prioridade: Alta</span>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">Horário:</Label>
                        <Input type="time" defaultValue="08:00" className="w-28" />
                        <span className="text-muted-foreground">às</span>
                        <Input type="time" defaultValue="12:00" className="w-28" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">Dias:</Label>
                        <Select defaultValue="seg-sex">
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="seg-sex">Seg - Sex</SelectItem>
                            <SelectItem value="seg-sab">Seg - Sáb</SelectItem>
                            <SelectItem value="todos">Todos os dias</SelectItem>
                            <SelectItem value="personalizado">Personalizado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-red-600 hover:bg-red-50 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Período Tarde */}
              <div className="rounded-lg border p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-[#4E2BCC]/10 text-[#4E2BCC]">Tarde</Badge>
                      <span className="text-sm text-muted-foreground">Prioridade: Alta</span>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">Horário:</Label>
                        <Input type="time" defaultValue="13:00" className="w-28" />
                        <span className="text-muted-foreground">às</span>
                        <Input type="time" defaultValue="18:00" className="w-28" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">Dias:</Label>
                        <Select defaultValue="seg-sex">
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="seg-sex">Seg - Sex</SelectItem>
                            <SelectItem value="seg-sab">Seg - Sáb</SelectItem>
                            <SelectItem value="todos">Todos os dias</SelectItem>
                            <SelectItem value="personalizado">Personalizado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-red-600 hover:bg-red-50 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Período Noite */}
              <div className="rounded-lg border p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-[#0F032D]/10 text-[#0F032D]">Noite</Badge>
                      <span className="text-sm text-muted-foreground">Prioridade: Média</span>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">Horário:</Label>
                        <Input type="time" defaultValue="18:00" className="w-28" />
                        <span className="text-muted-foreground">às</span>
                        <Input type="time" defaultValue="21:00" className="w-28" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">Dias:</Label>
                        <Select defaultValue="seg-sex">
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="seg-sex">Seg - Sex</SelectItem>
                            <SelectItem value="seg-sab">Seg - Sáb</SelectItem>
                            <SelectItem value="todos">Todos os dias</SelectItem>
                            <SelectItem value="personalizado">Personalizado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-red-600 hover:bg-red-50 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prioridade de Entrega */}
          <Card>
            <CardHeader>
              <CardTitle>Prioridade de Entrega</CardTitle>
              <CardDescription>
                Define a ordem de prioridade para agendar entregas nos pedidos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-[#EFEFEF] p-4">
                <ol className="space-y-3">
                  <li className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#905BF4] text-xs font-bold text-white">1</span>
                    <span className="font-medium text-[#0F032D]">Horário Comercial</span>
                    <span className="text-sm text-muted-foreground">- Usa o horário comercial padrão da empresa</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#4E2BCC] text-xs font-bold text-white">2</span>
                    <span className="font-medium text-[#0F032D]">Período Personalizado</span>
                    <span className="text-sm text-muted-foreground">- Manhã, Tarde ou Noite</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0F032D] text-xs font-bold text-white">3</span>
                    <span className="font-medium text-[#0F032D]">Intervalo Específico</span>
                    <span className="text-sm text-muted-foreground">- Definido no momento do pedido</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-bold text-white">4</span>
                    <span className="font-medium text-[#0F032D]">Horário Fixo</span>
                    <span className="text-sm text-muted-foreground">- Hora exata escolhida pelo cliente</span>
                  </li>
                </ol>
              </div>
              <p className="text-sm text-muted-foreground">
                * Prioridades mais altas oferecem maior flexibilidade logística e facilitam a otimização de rotas.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Aparência</CardTitle>
              <CardDescription>
                Personalize a interface do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Tema</Label>
                <Select defaultValue="light">
                  <SelectTrigger className="w-[200px]">
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
                <Label>Idioma</Label>
                <Select defaultValue="pt-BR">
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Formato de Data</Label>
                <Select defaultValue="dd/mm/yyyy">
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dd/mm/yyyy">DD/MM/AAAA</SelectItem>
                    <SelectItem value="mm/dd/yyyy">MM/DD/AAAA</SelectItem>
                    <SelectItem value="yyyy-mm-dd">AAAA-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
