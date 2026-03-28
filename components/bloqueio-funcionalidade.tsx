"use client"

/**
 * Componente de Bloqueio de Funcionalidade
 * Exibe overlay quando funcionalidade não está disponível no plano
 */

import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lock, Crown, Package, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEntitlements } from "@/store/organizacao"
import { obterPlanoMinimo, obterAdicionalParaFuncionalidade, PLANOS, ADICIONAIS, PACOTES } from "@/store/dados/planos"
import type { Entitlements, NomePlano, NomeAdicional, NomePacote } from "@/store/tipos/plano"

interface BloqueioFuncionalidadeProps {
  funcionalidade: keyof Entitlements
  children: ReactNode
  modo?: 'overlay' | 'substituir' | 'ocultar'
  className?: string
}

export function BloqueioFuncionalidade({ 
  funcionalidade, 
  children, 
  modo = 'overlay',
  className = '',
}: BloqueioFuncionalidadeProps) {
  const entitlements = useEntitlements()
  const temAcesso = entitlements[funcionalidade]

  if (temAcesso) {
    return <>{children}</>
  }

  if (modo === 'ocultar') {
    return null
  }

  const planoMinimo = obterPlanoMinimo(funcionalidade)
  const adicionalNecessario = obterAdicionalParaFuncionalidade(funcionalidade)

  if (modo === 'substituir') {
    return (
      <Card className={`border-dashed border-2 border-muted ${className}`}>
        <CardContent className="flex flex-col items-center justify-center py-8 px-4 text-center">
          <div className="rounded-full bg-muted p-3 mb-4">
            <Lock className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-[#0F032D] mb-2">
            Funcionalidade Bloqueada
          </h3>
          <p className="text-sm text-muted-foreground mb-4 max-w-sm">
            {getMensagemBloqueio(funcionalidade, planoMinimo, adicionalNecessario)}
          </p>
          <Button size="sm" className="bg-[#905BF4] hover:bg-[#4E2BCC]" asChild>
            <Link href="/dashboard/planos">
              <Crown className="mr-2 h-4 w-4" />
              Ver Planos
            </Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  // Modo overlay
  return (
    <div className={`relative ${className}`}>
      <div className="pointer-events-none opacity-40 blur-[1px]">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-[2px] rounded-lg">
        <div className="text-center p-4 max-w-sm">
          <div className="rounded-full bg-muted p-3 mb-3 mx-auto w-fit">
            <Lock className="h-5 w-5 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            {getMensagemBloqueio(funcionalidade, planoMinimo, adicionalNecessario)}
          </p>
          <Button size="sm" className="bg-[#905BF4] hover:bg-[#4E2BCC]" asChild>
            <Link href="/dashboard/planos">
              Fazer Upgrade
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

// Componente para botões individuais
interface BotaoBloqueadoProps {
  funcionalidade: keyof Entitlements
  children: ReactNode
  className?: string
}

export function BotaoBloqueado({ 
  funcionalidade, 
  children,
  className = '',
}: BotaoBloqueadoProps) {
  const entitlements = useEntitlements()
  const temAcesso = entitlements[funcionalidade]

  if (temAcesso) {
    return <>{children}</>
  }

  const planoMinimo = obterPlanoMinimo(funcionalidade)
  const adicionalNecessario = obterAdicionalParaFuncionalidade(funcionalidade)

  return (
    <div className={`relative inline-flex ${className}`}>
      <div className="pointer-events-none opacity-50">
        {children}
      </div>
      <Badge 
        variant="secondary" 
        className="absolute -top-2 -right-2 text-[10px] px-1.5 py-0.5 bg-amber-100 text-amber-700 border-amber-200"
      >
        <Lock className="h-2.5 w-2.5 mr-0.5" />
        {planoMinimo ? PLANOS[planoMinimo].nome : adicionalNecessario ? 'Adicional' : 'Pro'}
      </Badge>
    </div>
  )
}

// Componente para itens de menu
interface ItemMenuBloqueadoProps {
  funcionalidade: keyof Entitlements
  icone: ReactNode
  label: string
  href: string
  ativo?: boolean
}

export function ItemMenuBloqueado({
  funcionalidade,
  icone,
  label,
  href,
  ativo = false,
}: ItemMenuBloqueadoProps) {
  const entitlements = useEntitlements()
  const temAcesso = entitlements[funcionalidade]

  const planoMinimo = obterPlanoMinimo(funcionalidade)

  if (!temAcesso) {
    return (
      <div
        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-white/40 cursor-not-allowed`}
        title={`Disponível a partir do plano ${planoMinimo ? PLANOS[planoMinimo].nome : 'Pro'}`}
      >
        <span className="opacity-40">{icone}</span>
        <span className="flex-1">{label}</span>
        <Lock className="h-3 w-3" />
      </div>
    )
  }

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
        ativo 
          ? 'bg-white/10 text-white' 
          : 'text-white/70 hover:bg-white/5 hover:text-white'
      }`}
    >
      {icone}
      <span>{label}</span>
    </Link>
  )
}

// Helpers
function getMensagemBloqueio(
  funcionalidade: keyof Entitlements,
  planoMinimo: NomePlano | null,
  adicionalNecessario: NomeAdicional | NomePacote | null
): string {
  if (adicionalNecessario) {
    if (adicionalNecessario in ADICIONAIS) {
      return `Adquira o adicional "${ADICIONAIS[adicionalNecessario as NomeAdicional].nome}" ou o Pacote Contábil para acessar.`
    }
    if (adicionalNecessario in PACOTES) {
      return `Adquira o "${PACOTES[adicionalNecessario as NomePacote].nome}" para acessar.`
    }
  }

  if (planoMinimo) {
    return `Faça upgrade para o plano ${PLANOS[planoMinimo].nome} para acessar esta funcionalidade.`
  }

  return 'Esta funcionalidade não está disponível no seu plano atual.'
}

// Mapeamento de funcionalidades para labels amigáveis
export const LABELS_FUNCIONALIDADES: Partial<Record<keyof Entitlements, string>> = {
  gestaoContatos: 'Gestão de Contatos',
  gestaoUsuarios: 'Gestão de Usuários',
  gestaoEquipe: 'Gestão de Equipe',
  gestaoOrcamentos: 'Gestão de Orçamentos',
  gestaoPedidos: 'Gestão de Pedidos',
  criarRotaLogistica: 'Criar Rotas',
  gerenciarRotas: 'Gerenciar Rotas',
  gerenciarArmazens: 'Gerenciar Armazéns',
  relatorios: 'Relatórios',
  emitirNfse: 'Emitir NFSe',
  emitirNfeVenda: 'Emitir NFe',
  emitirNfRemessa: 'Emitir NF Remessa',
  emitirFaturaLocacao: 'Emitir Fatura de Locação',
}
