"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  LayoutDashboard,
  Users,
  Calculator,
  Package,
  Truck,
  Warehouse,
  BarChart3,
  CreditCard,
  FileText,
  HandshakeIcon,
  Settings,
  Bell,
  Menu,
  X,
  LogOut,
  User,
  HelpCircle,
  BookOpen,
  MessageCircle,
  Bug,
  ChevronDown,
  ChevronRight,
  Receipt,
  Boxes,
  Building2,
  PanelLeftClose,
  Lock,
} from "lucide-react"
import { SeletorPlano } from "@/components/seletor-plano"
import { useEntitlements, useOrganizacaoStore } from "@/store/organizacao"
import { PLANOS } from "@/store/dados/planos"
import type { Entitlements } from "@/store/tipos/plano"
import { cn } from "@/lib/utils"

const LOGO_WHITE = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logotipo%20Branco%20%2B%20Fundo%20Transparente%20%28Sem%20O%20com%20efeito%29-2zkcgX2G3n8UrYsauTJMCYFZuWEHbX.png"
const ICON_WHITE = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/I%CC%81cone%20Branco%20%2B%20Fundo%20Transparente-dyRji75k6SupVh4qUrZ0XAPFZK4Jjn.png"

// Mapeamento de itens de navegação com suas funcionalidades requeridas
interface ItemNavegacao {
  nome: string
  href: string
  icone: React.ElementType
  funcionalidade: keyof Entitlements | null
  planoMinimo?: string
}

const navegacaoPrincipal: ItemNavegacao[] = [
  { nome: "Dashboard", href: "/dashboard", icone: LayoutDashboard, funcionalidade: null },
  { nome: "Contatos", href: "/dashboard/contatos", icone: Users, funcionalidade: "gestaoContatos" },
  { nome: "Orçamentos", href: "/dashboard/orcamentos", icone: Calculator, funcionalidade: "gestaoOrcamentos" },
  { nome: "Pedidos", href: "/dashboard/pedidos", icone: Package, funcionalidade: "gestaoPedidos" },
  { nome: "Logística", href: "/dashboard/logistica", icone: Truck, funcionalidade: "criarRotaLogistica", planoMinimo: "Pro" },
  { nome: "Inventário", href: "/dashboard/inventario", icone: Boxes, funcionalidade: "gerenciarProdutos" },
  { nome: "Armazéns", href: "/dashboard/armazens", icone: Building2, funcionalidade: "gerenciarArmazens", planoMinimo: "Enterprise" },
  { nome: "Estoque", href: "/dashboard/estoque", icone: Warehouse, funcionalidade: "atualizarEstoqueAluguel", planoMinimo: "Pro" },
  { nome: "Financeiro", href: "/dashboard/financeiro", icone: CreditCard, funcionalidade: "gerenciarFaturas" },
  { nome: "Contábil", href: "/dashboard/contabil", icone: FileText, funcionalidade: null },
  { nome: "Parceiros", href: "/dashboard/parceiros", icone: HandshakeIcon, funcionalidade: "programaParceiros", planoMinimo: "Adicional" },
  { nome: "Configurações", href: "/dashboard/configuracoes", icone: Settings, funcionalidade: null },
]

const menuSuporte = [
  { nome: "Documentação", href: "/dashboard/suporte", icone: BookOpen },
  { nome: "Academia Developz", href: "#", icone: BarChart3 },
  { nome: "Suporte via Chat", href: "#", icone: MessageCircle },
  { nome: "Reportar Bug", href: "#", icone: Bug },
]

const menuGerenciamento = [
  { nome: "Faturas do Sistema", href: "/dashboard/billing", icone: Receipt },
  { nome: "Uso do Sistema", href: "/dashboard/uso", icone: BarChart3 },
  { nome: "Upgrade de Plano", href: "/dashboard/planos", icone: CreditCard },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarAberta, setSidebarAberta] = useState(false)
  const [sidebarRecolhida, setSidebarRecolhida] = useState(false)
  const [suporteAberto, setSuporteAberto] = useState(false)
  const [gerenciamentoAberto, setGerenciamentoAberto] = useState(false)
  
  const entitlements = useEntitlements()
  const { configuracao } = useOrganizacaoStore()
  const planoAtual = PLANOS[configuracao.plano]

  // Persistir estado recolhido
  useEffect(() => {
    const salvo = localStorage.getItem("sidebar-recolhida")
    if (salvo) {
      setSidebarRecolhida(JSON.parse(salvo))
    }
  }, [])

  const alternarRecolhido = () => {
    const novoEstado = !sidebarRecolhida
    setSidebarRecolhida(novoEstado)
    localStorage.setItem("sidebar-recolhida", JSON.stringify(novoEstado))
  }

  const verificarAcesso = (item: ItemNavegacao): boolean => {
    if (!item.funcionalidade) return true
    return entitlements[item.funcionalidade]
  }

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex min-h-screen bg-[#EFEFEF]">
        {/* Overlay Mobile */}
        {sidebarAberta && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarAberta(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 flex flex-col bg-[#0F032D] transition-all duration-300 lg:static",
            sidebarRecolhida ? "lg:w-16" : "lg:w-64",
            sidebarAberta ? "w-64 translate-x-0" : "-translate-x-full lg:translate-x-0"
          )}
        >
          {/* Logo */}
          <div className={cn(
            "flex h-16 items-center justify-between border-b border-white/10",
            sidebarRecolhida ? "px-3" : "px-5"
          )}>
            <Link href="/dashboard" className="flex items-center">
              {sidebarRecolhida ? (
                <Image
                  src={ICON_WHITE}
                  alt="LocLog"
                  width={24}
                  height={24}
                  className="rounded"
                  style={{ width: "24px", height: "24px", objectFit: "contain" }}
                />
              ) : (
                <Image
                  src={LOGO_WHITE}
                  alt="LocLog"
                  width={88}
                  height={35}
                  className="w-auto"
                  style={{ width: "auto", height: "28px", objectFit: "contain" }}
                  priority
                  loading="eager"
                />
              )}
            </Link>
            
            {/* Botão fechar mobile */}
            <button
              className="rounded-lg p-1 text-white/60 hover:bg-white/10 hover:text-white lg:hidden"
              onClick={() => setSidebarAberta(false)}
            >
              <X className="h-5 w-5" />
            </button>

            {/* Botão recolher desktop */}
            <button
              className={cn(
                "hidden rounded-lg p-1 text-white/60 hover:bg-white/10 hover:text-white lg:flex",
                sidebarRecolhida && "absolute -right-3 top-4 z-10 bg-[#0F032D] rounded-full border border-white/10"
              )}
              onClick={alternarRecolhido}
            >
              {sidebarRecolhida ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <PanelLeftClose className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Navegação */}
          <ScrollArea className="flex-1 py-4">
            <nav className={cn("space-y-1", sidebarRecolhida ? "px-2" : "px-3")}>
              {navegacaoPrincipal.map((item) => {
                const estaAtivo = pathname === item.href || pathname.startsWith(item.href + "/")
                const temAcesso = verificarAcesso(item)
                
                const conteudoLink = (
                  <Link
                    href={temAcesso ? item.href : "#"}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      estaAtivo
                        ? "bg-[#905BF4] text-white"
                        : temAcesso
                        ? "text-white/60 hover:bg-white/10 hover:text-white"
                        : "text-white/30 cursor-not-allowed",
                      sidebarRecolhida && "justify-center px-2"
                    )}
                    onClick={(e) => {
                      if (!temAcesso) e.preventDefault()
                      else setSidebarAberta(false)
                    }}
                  >
                    <item.icone className="h-5 w-5 shrink-0" />
                    {!sidebarRecolhida && (
                      <>
                        <span className="flex-1">{item.nome}</span>
                        {!temAcesso && (
                          <div className="flex items-center gap-1">
                            <Lock className="h-3 w-3" />
                            <Badge className="bg-white/10 text-white/50 text-[10px] px-1">
                              {item.planoMinimo || "PRO"}
                            </Badge>
                          </div>
                        )}
                      </>
                    )}
                  </Link>
                )

                if (sidebarRecolhida) {
                  return (
                    <Tooltip key={item.nome}>
                      <TooltipTrigger asChild>
                        {conteudoLink}
                      </TooltipTrigger>
                      <TooltipContent side="right" className="flex items-center gap-2">
                        {item.nome}
                        {!temAcesso && (
                          <Badge className="text-[10px]">
                            {item.planoMinimo || "PRO"}
                          </Badge>
                        )}
                      </TooltipContent>
                    </Tooltip>
                  )
                }

                return <div key={item.nome}>{conteudoLink}</div>
              })}
            </nav>

            {/* Divisor */}
            <div className={cn("my-4 border-t border-white/10", sidebarRecolhida ? "mx-2" : "mx-3")} />

            {/* Modo recolhido - apenas ícones */}
            {sidebarRecolhida ? (
              <div className="space-y-1 px-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="/dashboard/suporte"
                      className="flex items-center justify-center rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white"
                    >
                      <HelpCircle className="h-5 w-5" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">Suporte</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="/dashboard/billing"
                      className="flex items-center justify-center rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white"
                    >
                      <Receipt className="h-5 w-5" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">Gerenciamento</TooltipContent>
                </Tooltip>
              </div>
            ) : (
              <>
                {/* Menu de Suporte */}
                <div className="space-y-1 px-3">
                  <button
                    onClick={() => setSuporteAberto(!suporteAberto)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white"
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className="h-5 w-5" />
                      Suporte
                    </div>
                    <ChevronDown className={cn("h-4 w-4 transition-transform", suporteAberto && "rotate-180")} />
                  </button>
                  {suporteAberto && (
                    <div className="ml-4 space-y-1 border-l border-white/10 pl-4">
                      {menuSuporte.map((item) => (
                        <Link
                          key={item.nome}
                          href={item.href}
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/50 hover:bg-white/10 hover:text-white"
                        >
                          <item.icone className="h-4 w-4" />
                          {item.nome}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Menu de Gerenciamento */}
                <div className="mt-2 space-y-1 px-3">
                  <button
                    onClick={() => setGerenciamentoAberto(!gerenciamentoAberto)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white"
                  >
                    <div className="flex items-center gap-3">
                      <Settings className="h-5 w-5" />
                      Gerenciamento
                    </div>
                    <ChevronDown className={cn("h-4 w-4 transition-transform", gerenciamentoAberto && "rotate-180")} />
                  </button>
                  {gerenciamentoAberto && (
                    <div className="ml-4 space-y-1 border-l border-white/10 pl-4">
                      {menuGerenciamento.map((item) => (
                        <Link
                          key={item.nome}
                          href={item.href}
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/50 hover:bg-white/10 hover:text-white"
                        >
                          <item.icone className="h-4 w-4" />
                          {item.nome}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </ScrollArea>

          {/* Seção do usuário */}
          <div className={cn(
            "border-t border-white/10 p-3",
            sidebarRecolhida && "flex justify-center"
          )}>
            {sidebarRecolhida ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarImage src="/avatars/user.jpg" />
                    <AvatarFallback className="bg-[#905BF4] text-white text-xs">DZ</AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <div>
                    <p className="font-medium">DZ Locadora</p>
                    <p className="text-xs text-muted-foreground">Plano {planoAtual.nome}</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            ) : (
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/avatars/user.jpg" />
                  <AvatarFallback className="bg-[#905BF4] text-white text-sm">DZ</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <p className="truncate text-sm font-medium text-white">DZ Locadora</p>
                  <p className="truncate text-xs text-white/50">Plano {planoAtual.nome}</p>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Conteúdo principal */}
        <div className="flex flex-1 flex-col">
          {/* Header superior */}
          <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-[#D0D0D8] bg-white px-4 shadow-sm">
            <div className="flex items-center gap-4">
              <button
                className="rounded-lg p-2 text-[#0F032D] hover:bg-[#EFEFEF] lg:hidden"
                onClick={() => setSidebarAberta(true)}
              >
                <Menu className="h-5 w-5" />
              </button>
              
              {/* Logo mobile */}
              <div className="lg:hidden">
                <Image
                  src={ICON_WHITE}
                  alt="LocLog"
                  width={24}
                  height={24}
                  style={{ width: "24px", height: "24px", objectFit: "contain" }}
                  className="rounded bg-[#905BF4] p-0.5"
                />
              </div>
              
              {/* Título da página */}
              <div className="hidden lg:block">
                <h1 className="text-base font-semibold text-[#0F032D]">
                  {navegacaoPrincipal.find(item => pathname === item.href || pathname.startsWith(item.href + "/"))?.nome || "Dashboard"}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Seletor de Plano */}
              <SeletorPlano />

              {/* Notificações */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative text-[#0F032D]">
                    <Bell className="h-5 w-5" />
                    <Badge className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#905BF4] p-0 text-[10px] text-white">
                      3
                    </Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notificações</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                    <div className="flex w-full items-start justify-between">
                      <span className="font-medium text-[#0F032D]">Novo Pedido Recebido</span>
                      <Badge className="bg-[#905BF4]/10 text-[#905BF4]">Novo</Badge>
                    </div>
                    <span className="text-xs text-[#0F032D]/60">Há 5 minutos</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                    <span className="font-medium text-[#0F032D]">Pagamento confirmado - PED-4521</span>
                    <span className="text-xs text-[#0F032D]/60">Há 1 hora</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                    <span className="font-medium text-[#0F032D]">Orçamento aceito - #Q-198</span>
                    <span className="text-xs text-[#0F032D]/60">Há 2 horas</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="justify-center text-[#905BF4]">
                    Ver todas as notificações
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Menu do usuário */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 px-2">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src="/avatars/user.jpg" />
                      <AvatarFallback className="bg-[#905BF4] text-white text-xs">DZ</AvatarFallback>
                    </Avatar>
                    <span className="hidden text-sm font-medium text-[#0F032D] md:inline">DZ Locadora</span>
                    <ChevronDown className="h-4 w-4 text-[#0F032D]/60" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/perfil" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/configuracoes" className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Configurações
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="text-red-600">
                    <Link href="/" className="flex items-center gap-2">
                      <LogOut className="h-4 w-4" />
                      Sair
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Conteúdo da página */}
          <main className="flex-1 overflow-auto p-4 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </TooltipProvider>
  )
}
