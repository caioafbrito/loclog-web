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
  ChevronLeft,
  ChevronRight,
  Receipt,
  Boxes,
  Building2,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react"
import { PlanSelector } from "@/components/plan-selector"
import { usePlanStore } from "@/lib/store"
import { cn } from "@/lib/utils"

const LOGO_WHITE = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logotipo%20Branco%20%2B%20Fundo%20Transparente%20%28Sem%20O%20com%20efeito%29-2zkcgX2G3n8UrYsauTJMCYFZuWEHbX.png"
const ICON_WHITE = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/I%CC%81cone%20Branco%20%2B%20Fundo%20Transparente-dyRji75k6SupVh4qUrZ0XAPFZK4Jjn.png"

const mainNavigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, feature: null },
  { name: "Contatos", href: "/dashboard/contatos", icon: Users, feature: "contacts" },
  { name: "Orçamentos", href: "/dashboard/orcamentos", icon: Calculator, feature: "quotations" },
  { name: "Pedidos", href: "/dashboard/pedidos", icon: Package, feature: "orders" },
  { name: "Logística", href: "/dashboard/logistica", icon: Truck, feature: "logistics" },
  { name: "Inventário", href: "/dashboard/inventario", icon: Boxes, feature: "inventory" },
  { name: "Armazéns", href: "/dashboard/armazens", icon: Building2, feature: "warehouses" },
  { name: "Estoque", href: "/dashboard/estoque", icon: Warehouse, feature: "stock" },
  { name: "Financeiro", href: "/dashboard/financeiro", icon: CreditCard, feature: "financial" },
  { name: "Contábil", href: "/dashboard/contabil", icon: FileText, feature: "accounting" },
  { name: "Parceiros", href: "/dashboard/parceiros", icon: HandshakeIcon, feature: "partners" },
  { name: "Configurações", href: "/dashboard/configuracoes", icon: Settings, feature: null },
]

const supportMenu = [
  { name: "Documentação", href: "#", icon: BookOpen },
  { name: "Academia Developz", href: "#", icon: BarChart3 },
  { name: "Suporte via Chat", href: "#", icon: MessageCircle },
  { name: "Reportar Bug", href: "#", icon: Bug },
]

const managementMenu = [
  { name: "Faturas do Sistema", href: "/dashboard/billing", icon: Receipt },
  { name: "Uso do Sistema", href: "/dashboard/uso", icon: BarChart3 },
  { name: "Upgrade de Plano", href: "/dashboard/planos", icon: CreditCard },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [supportOpen, setSupportOpen] = useState(false)
  const [managementOpen, setManagementOpen] = useState(false)
  const { hasFeature, currentPlan } = usePlanStore()

  // Persist collapsed state
  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed")
    if (saved) {
      setSidebarCollapsed(JSON.parse(saved))
    }
  }, [])

  const toggleCollapsed = () => {
    const newState = !sidebarCollapsed
    setSidebarCollapsed(newState)
    localStorage.setItem("sidebar-collapsed", JSON.stringify(newState))
  }

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex min-h-screen bg-[#EFEFEF]">
        {/* Sidebar Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 flex flex-col bg-[#0F032D] transition-all duration-300 lg:static",
            sidebarCollapsed ? "lg:w-16" : "lg:w-64",
            sidebarOpen ? "w-64 translate-x-0" : "-translate-x-full lg:translate-x-0"
          )}
        >
          {/* Logo */}
          <div className={cn(
            "flex h-14 items-center justify-between border-b border-white/10",
            sidebarCollapsed ? "px-2" : "px-4"
          )}>
            <Link href="/dashboard" className="flex items-center">
              {sidebarCollapsed ? (
                <Image
                  src={ICON_WHITE}
                  alt="LocLog"
                  width={28}
                  height={28}
                  style={{ width: "28px", height: "28px" }}
                  className="rounded"
                />
              ) : (
                <Image
                  src={LOGO_WHITE}
                  alt="LocLog"
                  width={70}
                  height={20}
                  style={{ width: "70px", height: "auto" }}
                  className="max-h-5"
                />
              )}
            </Link>
            
            {/* Close button mobile */}
            <button
              className="rounded-lg p-1 text-white/60 hover:bg-white/10 hover:text-white lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>

            {/* Collapse button desktop */}
            <button
              className={cn(
                "hidden rounded-lg p-1 text-white/60 hover:bg-white/10 hover:text-white lg:flex",
                sidebarCollapsed && "absolute -right-3 top-4 z-10 bg-[#0F032D] rounded-full border border-white/10"
              )}
              onClick={toggleCollapsed}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <PanelLeftClose className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 py-4">
            <nav className={cn("space-y-1", sidebarCollapsed ? "px-2" : "px-3")}>
              {mainNavigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                const isDisabled = item.feature && !hasFeature(item.feature as any)
                
                const linkContent = (
                  <Link
                    href={isDisabled ? "#" : item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-[#905BF4] text-white"
                        : isDisabled
                        ? "text-white/30 cursor-not-allowed"
                        : "text-white/60 hover:bg-white/10 hover:text-white",
                      sidebarCollapsed && "justify-center px-2"
                    )}
                    onClick={(e) => {
                      if (isDisabled) e.preventDefault()
                      else setSidebarOpen(false)
                    }}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {!sidebarCollapsed && (
                      <>
                        <span className="flex-1">{item.name}</span>
                        {isDisabled && (
                          <Badge className="bg-white/10 text-white/50 text-[10px] px-1">PRO</Badge>
                        )}
                      </>
                    )}
                  </Link>
                )

                if (sidebarCollapsed) {
                  return (
                    <Tooltip key={item.name}>
                      <TooltipTrigger asChild>
                        {linkContent}
                      </TooltipTrigger>
                      <TooltipContent side="right" className="flex items-center gap-2">
                        {item.name}
                        {isDisabled && <Badge className="text-[10px]">PRO</Badge>}
                      </TooltipContent>
                    </Tooltip>
                  )
                }

                return <div key={item.name}>{linkContent}</div>
              })}
            </nav>

            {/* Divider */}
            <div className={cn("my-4 border-t border-white/10", sidebarCollapsed ? "mx-2" : "mx-3")} />

            {/* Collapsed mode - just icons */}
            {sidebarCollapsed ? (
              <div className="space-y-1 px-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="#"
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
                    onClick={() => setSupportOpen(!supportOpen)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white"
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className="h-5 w-5" />
                      Suporte
                    </div>
                    <ChevronDown className={cn("h-4 w-4 transition-transform", supportOpen && "rotate-180")} />
                  </button>
                  {supportOpen && (
                    <div className="ml-4 space-y-1 border-l border-white/10 pl-4">
                      {supportMenu.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/50 hover:bg-white/10 hover:text-white"
                        >
                          <item.icon className="h-4 w-4" />
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Menu de Gerenciamento */}
                <div className="mt-2 space-y-1 px-3">
                  <button
                    onClick={() => setManagementOpen(!managementOpen)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white"
                  >
                    <div className="flex items-center gap-3">
                      <Settings className="h-5 w-5" />
                      Gerenciamento
                    </div>
                    <ChevronDown className={cn("h-4 w-4 transition-transform", managementOpen && "rotate-180")} />
                  </button>
                  {managementOpen && (
                    <div className="ml-4 space-y-1 border-l border-white/10 pl-4">
                      {managementMenu.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/50 hover:bg-white/10 hover:text-white"
                        >
                          <item.icon className="h-4 w-4" />
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </ScrollArea>

          {/* User section */}
          <div className={cn(
            "border-t border-white/10 p-3",
            sidebarCollapsed && "flex justify-center"
          )}>
            {sidebarCollapsed ? (
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
                    <p className="text-xs text-muted-foreground">Plano Pro</p>
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
                  <p className="truncate text-xs text-white/50">Plano Pro</p>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Main content */}
        <div className="flex flex-1 flex-col">
          {/* Top header */}
          <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-[#D0D0D8] bg-white px-4 shadow-sm">
            <div className="flex items-center gap-4">
              <button
                className="rounded-lg p-2 text-[#0F032D] hover:bg-[#EFEFEF] lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </button>
              
              {/* Mobile logo */}
              <div className="lg:hidden">
                <Image
                  src={ICON_WHITE}
                  alt="LocLog"
                  width={24}
                  height={24}
                  style={{ width: "24px", height: "24px" }}
                  className="rounded bg-[#905BF4] p-0.5"
                />
              </div>
              
              {/* Breadcrumb ou título da página */}
              <div className="hidden lg:block">
                <h1 className="text-base font-semibold text-[#0F032D]">
                  {mainNavigation.find(item => pathname === item.href || pathname.startsWith(item.href + "/"))?.name || "Dashboard"}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Plan Selector */}
              <PlanSelector />

              {/* Notifications */}
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
                      <span className="font-medium text-[#0F032D]">Pedido Novo do Locador Matheus</span>
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

              {/* User menu */}
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

          {/* Page content */}
          <main className="flex-1 overflow-auto p-4 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </TooltipProvider>
  )
}
