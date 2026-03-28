"use client"

import { useState } from "react"
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
  Receipt,
  Boxes,
  Building2,
} from "lucide-react"

const LOGO_WHITE = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logotipo%20Branco%20%2B%20Fundo%20Transparente%20%28Sem%20O%20com%20efeito%29-2zkcgX2G3n8UrYsauTJMCYFZuWEHbX.png"
const ICON_WHITE = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/I%CC%81cone%20Branco%20%2B%20Fundo%20Transparente-dyRji75k6SupVh4qUrZ0XAPFZK4Jjn.png"

const mainNavigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Contatos", href: "/dashboard/contatos", icon: Users },
  { name: "Orçamentos", href: "/dashboard/orcamentos", icon: Calculator },
  { name: "Pedidos", href: "/dashboard/pedidos", icon: Package },
  { name: "Logística", href: "/dashboard/logistica", icon: Truck },
  { name: "Inventário", href: "/dashboard/inventario", icon: Boxes },
  { name: "Armazéns", href: "/dashboard/armazens", icon: Building2 },
  { name: "Estoque", href: "/dashboard/estoque", icon: Warehouse },
  { name: "Financeiro", href: "/dashboard/financeiro", icon: CreditCard },
  { name: "Contábil", href: "/dashboard/contabil", icon: FileText },
  { name: "Parceiros", href: "/dashboard/parceiros", icon: HandshakeIcon },
  { name: "Configurações", href: "/dashboard/configuracoes", icon: Settings },
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
  const [supportOpen, setSupportOpen] = useState(false)
  const [managementOpen, setManagementOpen] = useState(false)

  return (
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
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#0F032D] transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/dashboard" className="flex items-center gap-2">
<Image
                src={LOGO_WHITE}
                alt="LocLog"
                width={100}
                height={35}
                style={{ width: "auto", height: "auto" }}
              className="h-8 w-auto"
            />
          </Link>
          <button
            className="rounded-lg p-1 text-white/60 hover:bg-white/10 hover:text-white lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-1">
            {mainNavigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#905BF4] text-white"
                      : "text-white/60 hover:bg-white/10 hover:text-white"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Divider */}
          <div className="my-6 border-t border-white/10" />

          {/* Menu de Suporte */}
          <div className="space-y-1">
            <button
              onClick={() => setSupportOpen(!supportOpen)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white"
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="h-5 w-5" />
                Suporte
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${supportOpen ? "rotate-180" : ""}`} />
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
          <div className="mt-2 space-y-1">
            <button
              onClick={() => setManagementOpen(!managementOpen)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white"
            >
              <div className="flex items-center gap-3">
                <Settings className="h-5 w-5" />
                Gerenciamento
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${managementOpen ? "rotate-180" : ""}`} />
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
        </ScrollArea>

        {/* User section */}
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/avatars/user.jpg" />
              <AvatarFallback className="bg-[#905BF4] text-white">DZ</AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-white">DZ Locadora</p>
              <p className="truncate text-xs text-white/50">Plano Pro</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Top header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#D0D0D8] bg-white px-4 shadow-sm">
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
                width={32}
                height={32}
                style={{ width: "auto", height: "auto" }}
                className="h-8 w-8 rounded-lg bg-[#905BF4] p-1"
              />
            </div>
            
            {/* Breadcrumb ou título da página */}
            <div className="hidden lg:block">
              <h1 className="text-lg font-semibold text-[#0F032D]">
                {mainNavigation.find(item => pathname === item.href || pathname.startsWith(item.href + "/"))?.name || "Dashboard"}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-[#0F032D]">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#905BF4] p-0 text-xs text-white">
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
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/user.jpg" />
                    <AvatarFallback className="bg-[#905BF4] text-white text-sm">DZ</AvatarFallback>
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
  )
}
