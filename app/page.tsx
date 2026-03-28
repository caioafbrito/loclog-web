"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
  MessageCircle,
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
} from "lucide-react"
import Link from "next/link"

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

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0F032D] text-[#EFEFEF] shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#905BF4]">
                <Package className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">DZ LocLog</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-8 md:flex">
              <Link href="#problema" className="text-sm font-medium transition-colors hover:text-[#905BF4]">
                O Problema
              </Link>
              <Link href="#solucao" className="text-sm font-medium transition-colors hover:text-[#905BF4]">
                A Solução
              </Link>
              <Link href="#modulos" className="text-sm font-medium transition-colors hover:text-[#905BF4]">
                Módulos
              </Link>
              <Link href="#contato" className="text-sm font-medium transition-colors hover:text-[#905BF4]">
                Contato
              </Link>
            </nav>

            <div className="hidden md:block">
              <Button className="bg-[#905BF4] text-white hover:bg-[#4E2BCC]">
                Entrar na Comunidade
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="border-t border-[#2A1A50] py-4 md:hidden">
              <nav className="flex flex-col gap-4">
                <Link
                  href="#problema"
                  className="text-sm font-medium transition-colors hover:text-[#905BF4]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  O Problema
                </Link>
                <Link
                  href="#solucao"
                  className="text-sm font-medium transition-colors hover:text-[#905BF4]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  A Solução
                </Link>
                <Link
                  href="#modulos"
                  className="text-sm font-medium transition-colors hover:text-[#905BF4]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Módulos
                </Link>
                <Link
                  href="#contato"
                  className="text-sm font-medium transition-colors hover:text-[#905BF4]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contato
                </Link>
                <Button className="mt-2 w-full bg-[#905BF4] text-white hover:bg-[#4E2BCC]">
                  Entrar na Comunidade
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
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
              <Button size="lg" className="bg-[#905BF4] px-8 text-white hover:bg-[#4E2BCC]">
                Quero Participar
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#905BF4]/50 bg-transparent px-8 text-[#EFEFEF] hover:bg-[#905BF4]/10 hover:text-[#EFEFEF]"
              >
                Conhecer Módulos
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
              DZ LocLog: Tudo que você precisa em um só lugar
            </h2>
            <p className="text-lg text-[#0F032D]/70">
              Nascido da experiência real de mais de 10 anos no setor de locação, o DZ LocLog automatiza 
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

      {/* Benefits Section */}
      <section className="bg-[#EFEFEF] py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
            <div>
              <Badge className="mb-4 border-[#4E2BCC]/30 bg-[#4E2BCC]/10 text-[#4E2BCC]">Por que escolher</Badge>
              <h2 className="mb-6 text-3xl font-bold text-[#0F032D] md:text-4xl">
                Benefícios que fazem a diferença
              </h2>
              <p className="mb-8 text-lg text-[#0F032D]/70">
                O DZ LocLog foi desenvolvido por quem entende do negócio. Cada funcionalidade foi pensada 
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
              Entre na nossa comunidade do WhatsApp e seja o primeiro a saber da data de lançamento, 
              valores e funcionalidades da primeira versão do DZ LocLog.
            </p>
            <Button size="lg" className="bg-white px-8 text-[#4E2BCC] hover:bg-[#EFEFEF]">
              <MessageCircle className="mr-2 h-5 w-5" />
              Entrar na Comunidade do WhatsApp
            </Button>
            <p className="mt-6 text-sm text-white/70">
              Lançamento previsto: Final do primeiro semestre de 2026
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="bg-white py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 border-[#905BF4]/30 bg-[#905BF4]/10 text-[#905BF4]">Contato</Badge>
            <h2 className="mb-6 text-3xl font-bold text-[#0F032D] md:text-4xl">Fale Conosco</h2>
            <p className="mb-12 text-lg text-[#0F032D]/70">
              Tem dúvidas ou quer saber mais sobre o DZ LocLog? Entre em contato.
            </p>
          </div>
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
            <Card className="border-none bg-[#EFEFEF] text-center shadow-lg">
              <CardContent className="pt-8">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#905BF4]/10">
                  <Phone className="h-7 w-7 text-[#905BF4]" />
                </div>
                <h3 className="mb-2 font-semibold text-[#0F032D]">Telefone</h3>
                <p className="text-[#0F032D]/70">(15) 99999-9999</p>
              </CardContent>
            </Card>
            <Card className="border-none bg-[#EFEFEF] text-center shadow-lg">
              <CardContent className="pt-8">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#4E2BCC]/10">
                  <Mail className="h-7 w-7 text-[#4E2BCC]" />
                </div>
                <h3 className="mb-2 font-semibold text-[#0F032D]">E-mail</h3>
                <p className="text-[#0F032D]/70">contato@developz.com.br</p>
              </CardContent>
            </Card>
            <Card className="border-none bg-[#EFEFEF] text-center shadow-lg">
              <CardContent className="pt-8">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#0F032D]/10">
                  <MapPin className="h-7 w-7 text-[#0F032D]" />
                </div>
                <h3 className="mb-2 font-semibold text-[#0F032D]">Localização</h3>
                <p className="text-[#0F032D]/70">Sorocaba e Região</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F032D] py-12 text-[#EFEFEF]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#905BF4]">
                <Package className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">DZ LocLog</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#EFEFEF]/70">
              <Link href="https://www.developz.com.br" className="transition-colors hover:text-[#905BF4]">
                Developz
              </Link>
              <Link href="#" className="transition-colors hover:text-[#905BF4]">
                Termos de Uso
              </Link>
              <Link href="#" className="transition-colors hover:text-[#905BF4]">
                Privacidade
              </Link>
            </div>
            <p className="text-sm text-[#EFEFEF]/50">
              © 2026 Developz. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
