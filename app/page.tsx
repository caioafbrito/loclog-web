"use client"

import { useState } from "react"
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
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Package,
  Truck,
  Users,
  FileText,
  Calculator,
  Warehouse,
  BarChart3,
  Settings,
  HandshakeIcon,
  CreditCard,
  Map,
  ChevronRight,
  Menu,
  X,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Shield,
  Zap,
  Clock,
  Phone,
  Mail,
  MapPin,
  Check,
  Minus,
  Crown,
  Star,
  Building2,
  Code,
  LayoutDashboard,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Logo URLs
const LOGO_HEADER = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logotipo%20Loc%20Escuro%20%2B%20Log%20Roxo%20%2B%20Fundo%20Transparente%20%28Sem%20O%20com%20efeito%29-zzsT8fVYTnKNCGTlJeBVANDUnNvRfD.png"
const LOGO_FOOTER = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logotipo%20Branco%20%2B%20Fundo%20Transparente%20%28Sem%20O%20com%20efeito%29-2zkcgX2G3n8UrYsauTJMCYFZuWEHbX.png"

const modules = [
  {
    icon: Settings,
    title: "Configuração",
    description: "Cadastre os dados da sua empresa para integração com os outros módulos do sistema.",
    color: "from-[#905BF4] to-[#4E2BCC]",
  },
  {
    icon: Users,
    title: "Contato",
    description: "Gerencie todos os seus clientes e contatos em um só lugar, com categorização automática.",
    color: "from-[#4E2BCC] to-[#0F032D]",
  },
  {
    icon: Calculator,
    title: "Orçamento",
    description: "Crie orçamentos profissionais com geração automática de documentos em PDF.",
    color: "from-[#905BF4] to-[#4E2BCC]",
  },
  {
    icon: Package,
    title: "Pedido",
    description: "O módulo central que orquestra pagamentos, estoque, contabilidade e logística.",
    color: "from-[#4E2BCC] to-[#0F032D]",
  },
  {
    icon: Truck,
    title: "Logística",
    description: "Navegação integrada com Google Maps, controle de entregas e retiradas em tempo real.",
    color: "from-[#905BF4] to-[#4E2BCC]",
  },
  {
    icon: Warehouse,
    title: "Inventário & Armazéns",
    description: "Gerencie múltiplos armazéns, controle de estoque por localização e relatórios consolidados.",
    color: "from-[#4E2BCC] to-[#0F032D]",
  },
  {
    icon: BarChart3,
    title: "Estoque",
    description: "Controle de disponibilidade por período, planejamento e gestão de estoque de aluguel e venda.",
    color: "from-[#905BF4] to-[#4E2BCC]",
  },
  {
    icon: CreditCard,
    title: "Financeiro",
    description: "Gestão de faturas, contas fixas e variáveis, saldo de parceiros e relatórios completos.",
    color: "from-[#4E2BCC] to-[#0F032D]",
  },
  {
    icon: FileText,
    title: "Contábil",
    description: "Notas fiscais, faturas de locação e contratos gerados automaticamente.",
    color: "from-[#905BF4] to-[#4E2BCC]",
  },
  {
    icon: HandshakeIcon,
    title: "Programa de Parceiros",
    description: "Conecte-se com outros locadores e aumente seu faturamento com parcerias estratégicas.",
    color: "from-[#4E2BCC] to-[#0F032D]",
  },
]

const features = [
  {
    icon: Zap,
    title: "Automatização Total",
    description: "Gere contratos, notas fiscais e faturas com apenas 1 clique.",
  },
  {
    icon: Shield,
    title: "Cobrança Segura",
    description: "PIX, cartão de crédito, boleto e maquininha com baixa automática.",
  },
  {
    icon: Clock,
    title: "Economia de Tempo",
    description: "Automatize seu WhatsApp com chatbot para gerar pedidos automaticamente.",
  },
  {
    icon: Map,
    title: "Logística Integrada",
    description: "Navegação GPS e controle de entregas direto no aplicativo.",
  },
]

const benefits = [
  "Acesso em qualquer dispositivo",
  "Controle financeiro completo",
  "Programa de parcerias exclusivo",
  "Suporte dedicado",
  "Comunidade de locadores",
  "Atualizações constantes",
]

// Dados dos planos
const plans = [
  {
    name: "Starter",
    icon: Star,
    price: "R$ 249",
    yearlyPrice: "R$ 199",
    yearlyTotal: "R$ 2.338/ano",
    discount: "20%",
    description: "Ideal para quem está começando",
    available: true,
    launchDate: "Lançamento",
    highlights: [
      "Até 150 reservas/mês",
      "1 usuário",
      "Gestão de orçamentos e pedidos",
      "Cobrança online via PIX",
      "Emissão de contratos",
      "Suporte via WhatsApp",
    ],
  },
  {
    name: "Pro",
    icon: Crown,
    price: "R$ 449",
    yearlyPrice: "R$ 379",
    yearlyTotal: "R$ 4.548/ano",
    discount: "15%",
    description: "Para locadoras em crescimento",
    available: true,
    launchDate: "Lançamento",
    popular: true,
    highlights: [
      "Até 500 reservas/mês",
      "Até 5 usuários",
      "Tudo do Starter +",
      "Gestão de equipe e entregadores",
      "Controle de estoque completo",
      "Rotas logísticas e GPS",
      "Relatórios avançados",
      "Produtos para venda",
    ],
  },
  {
    name: "Enterprise",
    icon: Building2,
    price: "R$ 749",
    yearlyPrice: "R$ 639",
    yearlyTotal: "R$ 7.668/ano",
    discount: "15%",
    description: "Para grandes operações",
    available: false,
    launchDate: "Janeiro 2027",
    highlights: [
      "Reservas ilimitadas",
      "Usuários ilimitados",
      "Tudo do Pro +",
      "Gestão de múltiplos armazéns",
      "Chat com clientes",
      "Curso em vídeo exclusivo",
      "SLA prioritário",
    ],
  },
  {
    name: "Develop",
    icon: Code,
    price: "Sob consulta",
    yearlyPrice: null,
    yearlyTotal: null,
    discount: null,
    description: "Soluções personalizadas",
    available: false,
    launchDate: "Julho 2027",
    highlights: [
      "Tudo do Enterprise +",
      "Integrações personalizadas",
      "Acesso completo à API",
      "SLA personalizado",
      "Desenvolvimento sob demanda",
    ],
  },
]

// Tabela completa de comparação
const comparisonData = {
  categories: [
    {
      name: "Disponibilidade",
      features: [
        { name: "Disponível no lançamento", starter: true, pro: true, enterprise: false, develop: false },
        { name: "Data prevista", starter: "Lançamento", pro: "Lançamento", enterprise: "Janeiro 2027", develop: "Julho 2027" },
      ],
    },
    {
      name: "Limites",
      features: [
        { name: "Máximo de reservas", starter: "150", pro: "500", enterprise: "Ilimitado", develop: "Ilimitado" },
        { name: "Excedente por reserva", starter: "R$ 2,00", pro: "R$ 1,50", enterprise: "N/A", develop: "N/A" },
        { name: "Valor limite (upgrade auto)", starter: "R$ 449,00", pro: "R$ 749,00", enterprise: "N/A", develop: "N/A" },
        { name: "Máximo de usuários", starter: "1", pro: "5", enterprise: "Ilimitado", develop: "Ilimitado" },
        { name: "Excedente por usuário/mês", starter: "R$ 59,00", pro: "R$ 59,00", enterprise: "N/A", develop: "N/A" },
      ],
    },
    {
      name: "Gestão Básica",
      features: [
        { name: "Gestão de contatos", starter: true, pro: true, enterprise: true, develop: true },
        { name: "Gestão de usuários", starter: false, pro: true, enterprise: true, develop: true },
        { name: "Gestão de equipe", starter: false, pro: false, enterprise: true, develop: true },
      ],
    },
    {
      name: "Orçamentos",
      features: [
        { name: "Gestão de orçamentos", starter: true, pro: true, enterprise: true, develop: true },
        { name: "Gerar PDF de orçamento", starter: true, pro: true, enterprise: true, develop: true },
        { name: "Gerar texto de orçamento", starter: true, pro: true, enterprise: true, develop: true },
        { name: "Reservar orçamento", starter: true, pro: true, enterprise: true, develop: true },
      ],
    },
    {
      name: "Pedidos",
      features: [
        { name: "Gestão de pedidos", starter: true, pro: true, enterprise: true, develop: true },
        { name: "Gerar PDF de pedido", starter: true, pro: true, enterprise: true, develop: true },
        { name: "Gerar PDF de entrega", starter: false, pro: true, enterprise: true, develop: true },
        { name: "Definir entregador de pedido", starter: false, pro: true, enterprise: true, develop: true },
      ],
    },
    {
      name: "Financeiro",
      features: [
        { name: "Cobrar online (PIX, cartão)", starter: true, pro: true, enterprise: true, develop: true },
        { name: "Realizar pagamento", starter: false, pro: false, enterprise: true, develop: true },
        { name: "Baixa automática no financeiro", starter: true, pro: true, enterprise: true, develop: true },
        { name: "Gerenciar faturas", starter: true, pro: true, enterprise: true, develop: true },
        { name: "Consultar status financeiro", starter: true, pro: true, enterprise: true, develop: true },
      ],
    },
    {
      name: "Logística",
      features: [
        { name: "Atualizar status logístico", starter: true, pro: true, enterprise: true, develop: true },
        { name: "Criar rota logística", starter: false, pro: true, enterprise: true, develop: true },
        { name: "Gerenciar rotas", starter: false, pro: true, enterprise: true, develop: true },
        { name: "Visualizar localização dos entregadores", starter: false, pro: true, enterprise: true, develop: true },
        { name: "Conversar com entregador", starter: false, pro: true, enterprise: true, develop: true },
        { name: "Visualizar andamento de rota", starter: false, pro: true, enterprise: true, develop: true },
        { name: "Iniciar rota", starter: false, pro: true, enterprise: true, develop: true },
        { name: "Conversar com cliente", starter: false, pro: false, enterprise: true, develop: true },
      ],
    },
    {
      name: "Produtos e Estoque",
      features: [
        { name: "Gerenciar produtos", starter: true, pro: true, enterprise: true, develop: true },
        { name: "Habilitar produto para aluguel", starter: true, pro: true, enterprise: true, develop: true },
        { name: "Habilitar produto para venda", starter: false, pro: true, enterprise: true, develop: true },
        { name: "Gerenciar armazéns", starter: false, pro: false, enterprise: true, develop: true },
        { name: "Atualizar estoque de aluguel", starter: false, pro: true, enterprise: true, develop: true },
        { name: "Atualizar estoque de venda", starter: false, pro: true, enterprise: true, develop: true },
        { name: "Consultar estoque real e estimado", starter: false, pro: true, enterprise: true, develop: true },
        { name: "Consultar estoque de venda", starter: false, pro: true, enterprise: true, develop: true },
      ],
    },
    {
      name: "Recursos Adicionais",
      features: [
        { name: "Emitir contrato", starter: true, pro: true, enterprise: true, develop: true },
        { name: "Relatórios", starter: false, pro: true, enterprise: true, develop: true },
        { name: "Documentação", starter: true, pro: true, enterprise: true, develop: true },
        { name: "Curso em Vídeo", starter: false, pro: false, enterprise: true, develop: true },
      ],
    },
    {
      name: "Suporte (SLA)",
      features: [
        { name: "P1 - Crítico (sistema fora do ar)", starter: "4 horas", pro: "2 horas", enterprise: "1 hora", develop: "Personalizado" },
        { name: "P2 - Médio (bugs em módulos)", starter: "8 horas", pro: "4 horas", enterprise: "2 horas", develop: "Personalizado" },
        { name: "P3 - Baixo (dúvidas/sugestões)", starter: "2 dias úteis", pro: "1 dia útil", enterprise: "4 horas", develop: "Personalizado" },
        { name: "Canais de atendimento", starter: "WhatsApp, Instagram, E-mail", pro: "WhatsApp, Instagram, E-mail", enterprise: "WhatsApp, Instagram, E-mail", develop: "Todos + Dedicado" },
      ],
    },
    {
      name: "Exclusivo Develop",
      features: [
        { name: "Integrações Personalizadas", starter: false, pro: false, enterprise: false, develop: true },
        { name: "Acesso à API", starter: false, pro: false, enterprise: false, develop: true },
      ],
    },
  ],
  addons: {
    mensal: [
      { name: "Emitir NFSe", value: "R$ 60,00/mês", available: true, note: "*SLA depende de terceiros" },
      { name: "Emitir fatura de locação (manual ou automática)", value: "R$ 20,00/mês", available: true, note: "" },
      { name: "Emitir NFe (venda)", value: "R$ 60,00/mês", available: true, note: "*SLA depende de terceiros" },
      { name: "Emitir NF de remessa de bens", value: "R$ 60,00/mês", available: true, note: "*SLA depende de terceiros" },
      { name: "Cobrar com maquininha", value: "R$ 80,00/mês", available: false, note: "*SLA depende de terceiros" },
      { name: "Chatbot Integrado", value: "R$ 400,00/mês", available: false, note: "*SLA depende de terceiros" },
    ],
    taxa: [
      { name: "Acesso ao Programa de Parceiros", value: "5% por pedido recebido + Taxa Stone", available: false, note: "" },
      { name: "Cobrar com maquininha", value: "+ Taxa Stone", available: false, note: "" },
    ],
    setup: [
      { name: "Chatbot Integrado", value: "R$ 1.200,00 (único)", available: false, note: "" },
    ],
  },
  packages: [
    { 
      name: "Pacote Contábil", 
      description: "Emissão de NFSe, NFe, remessa e fatura de locação", 
      value: "R$ 149,00/mês",
      savings: "Economia de até R$ 51,00/mês",
      available: true 
    },
    { 
      name: "Pacote Parceiro Preparado", 
      description: "Programa de Parceiros + Cobrar com maquininha", 
      value: "5% por pedido + Taxa Stone",
      savings: "Economize na mensalidade da maquininha",
      available: false 
    },
  ],
}

function FeatureValue({ value }: { value: boolean | string }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="h-5 w-5 text-[#905BF4]" />
    ) : (
      <Minus className="h-5 w-5 text-[#0F032D]/30" />
    )
  }
  return <span className="text-xs font-medium text-[#0F032D]">{value}</span>
}

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={LOGO_HEADER}
                alt="LocLog"
                width={100}
                height={40}
                style={{ width: "auto", height: "auto" }}
                className="h-9 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-8 md:flex">
              <Link href="#problema" className="text-sm font-medium text-[#0F032D] transition-colors hover:text-[#905BF4]">
                O Problema
              </Link>
              <Link href="#solucao" className="text-sm font-medium text-[#0F032D] transition-colors hover:text-[#905BF4]">
                A Solução
              </Link>
              <Link href="#modulos" className="text-sm font-medium text-[#0F032D] transition-colors hover:text-[#905BF4]">
                Módulos
              </Link>
              <Link href="#planos" className="text-sm font-medium text-[#0F032D] transition-colors hover:text-[#905BF4]">
                Planos
              </Link>
              <Link href="#contato" className="text-sm font-medium text-[#0F032D] transition-colors hover:text-[#905BF4]">
                Contato
              </Link>
            </nav>

            <div className="hidden items-center gap-4 md:flex">
              <Button variant="outline" size="sm" className="border-[#905BF4] text-[#905BF4] hover:bg-[#905BF4]/10" asChild>
                <Link href="/dashboard">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <Button size="sm" className="bg-[#905BF4] text-white hover:bg-[#4E2BCC]" asChild>
                <Link href="#planos">
                  Ver Planos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6 text-[#0F032D]" /> : <Menu className="h-6 w-6 text-[#0F032D]" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="border-t border-[#EFEFEF] py-4 md:hidden">
              <nav className="flex flex-col gap-4">
                <Link
                  href="#problema"
                  className="text-sm font-medium text-[#0F032D] transition-colors hover:text-[#905BF4]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  O Problema
                </Link>
                <Link
                  href="#solucao"
                  className="text-sm font-medium text-[#0F032D] transition-colors hover:text-[#905BF4]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  A Solução
                </Link>
                <Link
                  href="#modulos"
                  className="text-sm font-medium text-[#0F032D] transition-colors hover:text-[#905BF4]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Módulos
                </Link>
                <Link
                  href="#planos"
                  className="text-sm font-medium text-[#0F032D] transition-colors hover:text-[#905BF4]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Planos
                </Link>
                <Link
                  href="#contato"
                  className="text-sm font-medium text-[#0F032D] transition-colors hover:text-[#905BF4]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contato
                </Link>
                <div className="flex flex-col gap-2 pt-2">
                  <Button variant="outline" className="w-full border-[#905BF4] text-[#905BF4] hover:bg-[#905BF4]/10" asChild>
                    <Link href="/dashboard">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </Button>
                  <Button className="w-full bg-[#905BF4] text-white hover:bg-[#4E2BCC]" asChild>
                    <Link href="#planos">
                      Ver Planos
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0F032D] py-20 text-[#EFEFEF] lg:py-32">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-[#905BF4] blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-[#4E2BCC] blur-[128px]" />
        </div>
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-6 border-[#905BF4]/30 bg-[#905BF4]/10 text-[#905BF4]">
              <Sparkles className="mr-1 h-3 w-3" />
              Lançamento em breve
            </Badge>
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-balance md:text-6xl lg:text-7xl">
              O Sistema que Revoluciona o{" "}
              <span className="bg-gradient-to-r from-[#905BF4] to-[#B794F6] bg-clip-text text-transparent">
                Aluguel de Mesas e Cadeiras
              </span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-[#EFEFEF]/80 text-pretty md:text-xl">
              Gerencie pedidos, estoque, finanças, logística e parcerias em um só lugar. 
              Automatize processos e foque no que importa: lucrar mais.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="bg-[#905BF4] px-8 text-white hover:bg-[#4E2BCC]" asChild>
                <Link href="#planos">
                  Ver Planos e Preços
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#905BF4]/50 bg-transparent px-8 text-[#EFEFEF] hover:bg-[#905BF4]/10 hover:text-[#EFEFEF]"
                asChild
              >
                <Link href="#modulos">
                  Conhecer Módulos
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problema" className="bg-[#EFEFEF] py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 border-[#4E2BCC]/30 bg-[#4E2BCC]/10 text-[#4E2BCC]">Um Problema</Badge>
            <h2 className="mb-6 text-3xl font-bold text-[#0F032D] md:text-4xl">
              Você se identifica com alguma dessas dificuldades?
            </h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
            <Card className="border-none bg-white shadow-lg">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-[#905BF4]/10">
                  <FileText className="h-6 w-6 text-[#905BF4]" />
                </div>
                <CardTitle className="text-[#0F032D]">Burocracia Complexa</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-[#0F032D]/70">
                  Dificuldade em fazer documentos como contratos, notas fiscais e faturas fazem você deixar de alugar para bons clientes.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="border-none bg-white shadow-lg">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-[#4E2BCC]/10">
                  <BarChart3 className="h-6 w-6 text-[#4E2BCC]" />
                </div>
                <CardTitle className="text-[#0F032D]">Gestão no Papel</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-[#0F032D]/70">
                  O uso de papel e caneta não permite saber de forma fácil o quanto entrou no caixa e quanto foi deixado de faturar.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="border-none bg-white shadow-lg">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0F032D]/10">
                  <Users className="h-6 w-6 text-[#0F032D]" />
                </div>
                <CardTitle className="text-[#0F032D]">Sobrecarga</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-[#0F032D]/70">
                  A centralização de todos os papéis no proprietário causa sobrecarga constante e dificuldades para se planejar.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solucao" className="bg-white py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 border-[#905BF4]/30 bg-[#905BF4]/10 text-[#905BF4]">A Solução</Badge>
            <h2 className="mb-6 text-3xl font-bold text-[#0F032D] md:text-4xl">
              LocLog: Tudo que você precisa em um só lugar
            </h2>
            <p className="text-lg text-[#0F032D]/70">
              Nascido da experiência real de mais de 10 anos no setor de locação, o LocLog automatiza 
              processos e conecta locadores em uma comunidade voltada para o mesmo objetivo: lucrar mais.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#905BF4] to-[#4E2BCC]">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[#0F032D]">{feature.title}</h3>
                <p className="text-sm text-[#0F032D]/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section id="modulos" className="bg-[#0F032D] py-20 text-[#EFEFEF] lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 border-[#905BF4]/30 bg-[#905BF4]/10 text-[#905BF4]">Módulos</Badge>
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Um ecossistema completo para sua locadora
            </h2>
            <p className="text-lg text-[#EFEFEF]/70">
              Cada módulo foi projetado para resolver problemas específicos e se integrar perfeitamente com os demais.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {modules.map((module, index) => (
              <Card
                key={index}
                className="group cursor-pointer border-[#2A1A50] bg-[#1A0A40] transition-all duration-300 hover:border-[#905BF4]/50 hover:bg-[#2A1A50]"
              >
                <CardHeader className="pb-2">
                  <div
                    className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${module.color}`}
                  >
                    <module.icon className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className="text-base text-[#EFEFEF]">{module.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-[#EFEFEF]/60">{module.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="planos" className="bg-[#EFEFEF] py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 border-[#905BF4]/30 bg-[#905BF4]/10 text-[#905BF4]">Planos</Badge>
            <h2 className="mb-6 text-3xl font-bold text-[#0F032D] md:text-4xl">
              Escolha o plano ideal para sua locadora
            </h2>
            <p className="mb-4 text-lg text-[#0F032D]/70">
              Planos flexíveis que crescem junto com o seu negócio. Comece pequeno e escale conforme sua demanda.
            </p>
            <p className="text-sm text-[#905BF4] font-medium">
              Pague anualmente e economize até 20% no valor total
            </p>
          </div>

          {/* Plans Grid */}
          <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative border-2 transition-all duration-300 ${
                  plan.popular
                    ? "border-[#905BF4] bg-white shadow-xl shadow-[#905BF4]/10"
                    : "border-transparent bg-white shadow-lg hover:border-[#905BF4]/30"
                } ${!plan.available ? "opacity-80" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-[#905BF4] text-white">Mais Popular</Badge>
                  </div>
                )}
                <CardHeader className="pb-4 pt-6">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#905BF4] to-[#4E2BCC]">
                    <plan.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-[#0F032D]">{plan.name}</CardTitle>
                  <CardDescription className="text-[#0F032D]/60">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    {plan.yearlyPrice ? (
                      <>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-bold text-[#0F032D]">{plan.price}</span>
                          <span className="text-[#0F032D]/60">/mês</span>
                        </div>
                        <div className="mt-1 text-sm text-[#905BF4]">
                          ou {plan.yearlyPrice}/mês no plano anual
                          {plan.discount && (
                            <span className="ml-1 font-semibold">({plan.discount} off)</span>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="text-2xl font-bold text-[#0F032D]">{plan.price}</div>
                    )}
                  </div>

                  <div className="space-y-3">
                    {plan.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#905BF4]" />
                        <span className="text-sm text-[#0F032D]/80">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    {plan.available ? (
                      <Button className="w-full bg-[#905BF4] text-white hover:bg-[#4E2BCC]">
                        Começar Agora
                      </Button>
                    ) : (
                      <div className="text-center">
                        <Badge variant="outline" className="border-[#0F032D]/20 text-[#0F032D]/60">
                          {plan.launchDate}
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Compare Plans Button */}
          <div className="mt-12 text-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="lg" className="border-[#905BF4] text-[#905BF4] hover:bg-[#905BF4]/10">
                  Comparar Planos Detalhadamente
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] max-w-7xl overflow-y-auto bg-white">
                <DialogHeader>
                  <DialogTitle className="text-2xl text-[#0F032D]">Comparação Completa de Planos</DialogTitle>
                  <DialogDescription>Compare todos os recursos disponíveis em cada plano</DialogDescription>
                </DialogHeader>
                
                <Tabs defaultValue="funcionalidades" className="mt-6">
                  <TabsList className="mb-6 grid w-full grid-cols-3">
                    <TabsTrigger value="funcionalidades">Funcionalidades</TabsTrigger>
                    <TabsTrigger value="adicionais">Adicionais Avulsos</TabsTrigger>
                    <TabsTrigger value="pacotes">Pacotes</TabsTrigger>
                  </TabsList>

                  <TabsContent value="funcionalidades" className="space-y-4">
                    {/* Header fixo com planos */}
                    <div className="overflow-x-auto">
                      <div className="min-w-[700px]">
                        <div className="rounded-lg bg-[#0F032D] p-4">
                          <div className="grid grid-cols-[minmax(200px,2fr)_repeat(4,minmax(100px,1fr))] gap-4 text-center text-white">
                            <div className="text-left font-medium">Funcionalidade</div>
                            <div>
                              <div className="font-semibold">Starter</div>
                              <div className="text-xs text-[#905BF4]">R$ 249/mês</div>
                            </div>
                            <div>
                              <div className="font-semibold">Pro</div>
                              <div className="text-xs text-[#905BF4]">R$ 449/mês</div>
                            </div>
                            <div>
                              <div className="font-semibold">Enterprise</div>
                              <div className="text-xs text-[#905BF4]">R$ 749/mês</div>
                            </div>
                            <div>
                              <div className="font-semibold">Develop</div>
                              <div className="text-xs text-[#905BF4]">Sob consulta</div>
                            </div>
                          </div>
                        </div>

                        {/* Categorias */}
                        {comparisonData.categories.map((category, catIndex) => (
                          <div key={catIndex} className="mt-4 overflow-hidden rounded-lg border border-[#EFEFEF]">
                            <div className="bg-[#905BF4]/10 px-4 py-3">
                              <h3 className="font-semibold text-[#0F032D]">{category.name}</h3>
                            </div>
                            <div className="divide-y divide-[#EFEFEF]">
                              {category.features.map((feature, featIndex) => (
                                <div
                                  key={featIndex}
                                  className="grid grid-cols-[minmax(200px,2fr)_repeat(4,minmax(100px,1fr))] gap-4 px-4 py-3 text-center hover:bg-[#EFEFEF]/50"
                                >
                                  <div className="text-left text-sm text-[#0F032D]">{feature.name}</div>
                                  <div className="flex items-center justify-center">
                                    <FeatureValue value={feature.starter} />
                                  </div>
                                  <div className="flex items-center justify-center">
                                    <FeatureValue value={feature.pro} />
                                  </div>
                                  <div className="flex items-center justify-center">
                                    <FeatureValue value={feature.enterprise} />
                                  </div>
                                  <div className="flex items-center justify-center">
                                    <FeatureValue value={feature.develop} />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="adicionais" className="space-y-6">
                    {/* Mensais */}
                    <div className="overflow-hidden rounded-lg border border-[#EFEFEF]">
                      <div className="bg-[#905BF4] px-4 py-3">
                        <h3 className="font-semibold text-white">Valor Mensal</h3>
                      </div>
                      <div className="divide-y divide-[#EFEFEF]">
                        {comparisonData.addons.mensal.map((addon, index) => (
                          <div key={index} className="grid grid-cols-3 gap-4 px-4 py-3 hover:bg-[#EFEFEF]/50">
                            <div>
                              <div className="text-sm font-medium text-[#0F032D]">{addon.name}</div>
                              {addon.note && <div className="text-xs text-[#0F032D]/50">{addon.note}</div>}
                            </div>
                            <div className="text-center text-sm font-semibold text-[#0F032D]">{addon.value}</div>
                            <div className="text-center">
                              {addon.available ? (
                                <Badge className="bg-green-100 text-green-700">Disponível no lançamento</Badge>
                              ) : (
                                <Badge variant="outline" className="text-[#0F032D]/60">Em breve</Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Taxas */}
                    <div className="overflow-hidden rounded-lg border border-[#EFEFEF]">
                      <div className="bg-[#4E2BCC] px-4 py-3">
                        <h3 className="font-semibold text-white">Taxa Transacional</h3>
                      </div>
                      <div className="divide-y divide-[#EFEFEF]">
                        {comparisonData.addons.taxa.map((addon, index) => (
                          <div key={index} className="grid grid-cols-3 gap-4 px-4 py-3 hover:bg-[#EFEFEF]/50">
                            <div className="text-sm font-medium text-[#0F032D]">{addon.name}</div>
                            <div className="text-center text-sm font-semibold text-[#0F032D]">{addon.value}</div>
                            <div className="text-center">
                              {addon.available ? (
                                <Badge className="bg-green-100 text-green-700">Disponível no lançamento</Badge>
                              ) : (
                                <Badge variant="outline" className="text-[#0F032D]/60">Em breve</Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Setup */}
                    <div className="overflow-hidden rounded-lg border border-[#EFEFEF]">
                      <div className="bg-[#0F032D] px-4 py-3">
                        <h3 className="font-semibold text-white">Valor de Implantação (Setup)</h3>
                      </div>
                      <div className="divide-y divide-[#EFEFEF]">
                        {comparisonData.addons.setup.map((addon, index) => (
                          <div key={index} className="grid grid-cols-3 gap-4 px-4 py-3 hover:bg-[#EFEFEF]/50">
                            <div className="text-sm font-medium text-[#0F032D]">{addon.name}</div>
                            <div className="text-center text-sm font-semibold text-[#0F032D]">{addon.value}</div>
                            <div className="text-center">
                              {addon.available ? (
                                <Badge className="bg-green-100 text-green-700">Disponível no lançamento</Badge>
                              ) : (
                                <Badge variant="outline" className="text-[#0F032D]/60">Em breve</Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="pacotes" className="space-y-4">
                    <p className="text-sm text-[#0F032D]/70">
                      Combine funcionalidades e economize com nossos pacotes especiais.
                    </p>
                    <div className="grid gap-4 md:grid-cols-2">
                      {comparisonData.packages.map((pkg, index) => (
                        <Card key={index} className={`border-2 ${pkg.available ? 'border-[#905BF4]' : 'border-[#EFEFEF]'}`}>
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <CardTitle className="text-lg text-[#0F032D]">{pkg.name}</CardTitle>
                              {pkg.available ? (
                                <Badge className="bg-green-100 text-green-700">Disponível</Badge>
                              ) : (
                                <Badge variant="outline" className="text-[#0F032D]/60">Em breve</Badge>
                              )}
                            </div>
                            <CardDescription className="text-[#0F032D]/70">{pkg.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-[#905BF4]">{pkg.value}</div>
                            <p className="mt-2 text-sm text-green-600">{pkg.savings}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
            <div>
              <Badge className="mb-4 border-[#4E2BCC]/30 bg-[#4E2BCC]/10 text-[#4E2BCC]">Por que escolher</Badge>
              <h2 className="mb-6 text-3xl font-bold text-[#0F032D] md:text-4xl">
                Benefícios que fazem a diferença
              </h2>
              <p className="mb-8 text-lg text-[#0F032D]/70">
                O LocLog foi desenvolvido por quem entende do negócio. Cada funcionalidade foi pensada 
                para resolver problemas reais do dia a dia de um locador.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-[#905BF4]" />
                    <span className="text-[#0F032D]">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-[#905BF4] to-[#4E2BCC] p-1">
                <div className="flex h-full w-full items-center justify-center rounded-[1.4rem] bg-[#0F032D]">
                  <div className="p-8 text-center">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#905BF4] to-[#4E2BCC]">
                      <HandshakeIcon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="mb-2 text-2xl font-bold text-[#EFEFEF]">Programa de Parcerias</h3>
                    <p className="text-[#EFEFEF]/70">
                      Foque em alugar. O valor é recebido automaticamente assim que faz a entrega.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#905BF4] to-[#4E2BCC] py-20 lg:py-28">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-white blur-[100px]" />
          <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-white blur-[100px]" />
        </div>
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center text-white">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
              Pronto para revolucionar sua locadora?
            </h2>
            <p className="mb-10 text-lg text-white/90">
              Escolha o plano ideal para o seu negócio e comece a automatizar seus processos hoje mesmo. 
              Lançamento previsto para o primeiro semestre de 2026.
            </p>
            <Button size="lg" className="bg-white px-8 text-[#4E2BCC] hover:bg-[#EFEFEF]" asChild>
              <Link href="#planos">
                Ver Planos e Preços
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <p className="mt-6 text-sm text-white/70">
              Planos a partir de R$ 199/mês no pagamento anual
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="bg-white py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 border-[#905BF4]/30 bg-[#905BF4]/10 text-[#905BF4]">Contato</Badge>
            <h2 className="mb-6 text-3xl font-bold text-[#0F032D] md:text-4xl">
              Fale Conosco
            </h2>
            <p className="mb-12 text-lg text-[#0F032D]/70">
              Tem dúvidas? Entre em contato com nossa equipe e descubra como o LocLog pode ajudar sua locadora.
            </p>
          </div>
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
            <Card className="border-none bg-[#EFEFEF] text-center">
              <CardHeader>
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-[#905BF4]/10">
                  <Phone className="h-6 w-6 text-[#905BF4]" />
                </div>
                <CardTitle className="text-lg text-[#0F032D]">WhatsApp</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#0F032D]/70">(11) 99999-9999</p>
              </CardContent>
            </Card>
            <Card className="border-none bg-[#EFEFEF] text-center">
              <CardHeader>
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-[#4E2BCC]/10">
                  <Mail className="h-6 w-6 text-[#4E2BCC]" />
                </div>
                <CardTitle className="text-lg text-[#0F032D]">E-mail</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#0F032D]/70">contato@loclog.com.br</p>
              </CardContent>
            </Card>
            <Card className="border-none bg-[#EFEFEF] text-center">
              <CardHeader>
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0F032D]/10">
                  <MapPin className="h-6 w-6 text-[#0F032D]" />
                </div>
                <CardTitle className="text-lg text-[#0F032D]">Localização</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#0F032D]/70">São Paulo, SP - Brasil</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F032D] py-12 text-[#EFEFEF]">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <Image
                src={LOGO_FOOTER}
                alt="LocLog"
                width={100}
                height={40}
                style={{ width: "auto", height: "auto" }}
                className="mb-4 h-9 w-auto"
              />
              <p className="max-w-sm text-sm text-[#EFEFEF]/60">
                O sistema completo para gestão de locadoras de bens móveis. 
                Automatize processos, aumente a produtividade e lucre mais.
              </p>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-[#EFEFEF]">Links Rápidos</h4>
              <nav className="flex flex-col gap-2">
                <Link href="#problema" className="text-sm text-[#EFEFEF]/60 transition-colors hover:text-[#905BF4]">
                  O Problema
                </Link>
                <Link href="#solucao" className="text-sm text-[#EFEFEF]/60 transition-colors hover:text-[#905BF4]">
                  A Solução
                </Link>
                <Link href="#modulos" className="text-sm text-[#EFEFEF]/60 transition-colors hover:text-[#905BF4]">
                  Módulos
                </Link>
                <Link href="#planos" className="text-sm text-[#EFEFEF]/60 transition-colors hover:text-[#905BF4]">
                  Planos
                </Link>
              </nav>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-[#EFEFEF]">Suporte</h4>
              <nav className="flex flex-col gap-2">
                <Link href="#" className="text-sm text-[#EFEFEF]/60 transition-colors hover:text-[#905BF4]">
                  Documentação
                </Link>
                <Link href="#" className="text-sm text-[#EFEFEF]/60 transition-colors hover:text-[#905BF4]">
                  Academia Developz
                </Link>
                <Link href="#contato" className="text-sm text-[#EFEFEF]/60 transition-colors hover:text-[#905BF4]">
                  Contato
                </Link>
                <Link href="/dashboard" className="text-sm text-[#EFEFEF]/60 transition-colors hover:text-[#905BF4]">
                  Acessar Sistema
                </Link>
              </nav>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#2A1A50] pt-8 md:flex-row">
            <p className="text-sm text-[#EFEFEF]/40">
              © {new Date().getFullYear()} LocLog by Developz. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-[#EFEFEF]/40 transition-colors hover:text-[#905BF4]">
                Termos de Uso
              </Link>
              <Link href="#" className="text-sm text-[#EFEFEF]/40 transition-colors hover:text-[#905BF4]">
                Privacidade
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
