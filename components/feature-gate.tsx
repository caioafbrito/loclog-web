"use client"

import { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lock, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { usePlanStore } from "@/lib/store"
import type { Entitlements } from "@/lib/types"

interface FeatureGateProps {
  feature: keyof Entitlements["features"]
  children: ReactNode
  fallback?: ReactNode
  showUpgrade?: boolean
}

export function FeatureGate({ 
  feature, 
  children, 
  fallback,
  showUpgrade = true 
}: FeatureGateProps) {
  const { hasFeature, getUpgradeSuggestion } = usePlanStore()
  
  const allowed = hasFeature(feature)
  const suggestion = getUpgradeSuggestion(feature)

  if (allowed) {
    return <>{children}</>
  }

  if (fallback) {
    return <>{fallback}</>
  }

  if (!showUpgrade) {
    return null
  }

  return (
    <Card className="border-dashed border-2 border-[#905BF4]/30 bg-[#905BF4]/5">
      <CardContent className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <div className="rounded-full bg-[#905BF4]/10 p-4">
          <Lock className="h-8 w-8 text-[#905BF4]" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-[#0F032D]">Recurso Bloqueado</h3>
          <p className="max-w-sm text-sm text-muted-foreground">
            {suggestion || "Este recurso não está disponível no seu plano atual."}
          </p>
        </div>
        <Button asChild className="bg-[#905BF4] hover:bg-[#4E2BCC]">
          <Link href="/dashboard/planos">
            <Sparkles className="mr-2 h-4 w-4" />
            Ver Planos
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

// Hook para uso inline
export function useFeatureGate(feature: keyof Entitlements["features"]) {
  const { hasFeature, getUpgradeSuggestion } = usePlanStore()
  
  return {
    allowed: hasFeature(feature),
    suggestion: getUpgradeSuggestion(feature),
    UpgradePrompt: () => (
      <div className="flex items-center gap-2 rounded-lg bg-[#905BF4]/5 px-3 py-2 text-sm">
        <Lock className="h-4 w-4 text-[#905BF4]" />
        <span className="text-muted-foreground">{getUpgradeSuggestion(feature)}</span>
        <Button asChild size="sm" variant="link" className="h-auto p-0 text-[#905BF4]">
          <Link href="/dashboard/planos">Ver planos</Link>
        </Button>
      </div>
    )
  }
}

// Componente de botão com gate
interface GatedButtonProps {
  feature: keyof Entitlements["features"]
  children: ReactNode
  onClick?: () => void
  className?: string
  variant?: "default" | "outline" | "ghost" | "secondary"
  size?: "default" | "sm" | "lg" | "icon"
  disabled?: boolean
}

export function GatedButton({ 
  feature, 
  children, 
  onClick,
  className,
  variant = "default",
  size = "default",
  disabled
}: GatedButtonProps) {
  const { hasFeature, getUpgradeSuggestion } = usePlanStore()
  const allowed = hasFeature(feature)

  if (!allowed) {
    return (
      <Button
        variant={variant}
        size={size}
        className={`relative ${className}`}
        disabled
        title={getUpgradeSuggestion(feature) || "Recurso indisponível"}
      >
        <Lock className="mr-2 h-3 w-3" />
        {children}
        <Badge className="absolute -right-2 -top-2 bg-[#905BF4] text-[10px] px-1">PRO</Badge>
      </Button>
    )
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  )
}

// Badge para mostrar que algo é PRO
export function ProBadge() {
  return (
    <Badge className="bg-gradient-to-r from-[#905BF4] to-[#4E2BCC] text-white text-[10px] px-1.5 py-0">
      PRO
    </Badge>
  )
}

// Componente wrapper para seções inteiras
interface GatedSectionProps {
  feature: keyof Entitlements["features"]
  title: string
  description?: string
  children: ReactNode
}

export function GatedSection({ feature, title, description, children }: GatedSectionProps) {
  const { hasFeature, getUpgradeSuggestion } = usePlanStore()
  const allowed = hasFeature(feature)

  if (!allowed) {
    return (
      <div className="relative">
        <div className="pointer-events-none opacity-40 blur-[2px]">
          {children}
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <Card className="max-w-md border-[#905BF4]/20 shadow-lg">
            <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
              <div className="rounded-full bg-[#905BF4]/10 p-3">
                <Lock className="h-6 w-6 text-[#905BF4]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#0F032D]">{title}</h3>
                {description && (
                  <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                )}
                <p className="mt-2 text-sm text-[#905BF4]">
                  {getUpgradeSuggestion(feature)}
                </p>
              </div>
              <Button asChild size="sm" className="bg-[#905BF4] hover:bg-[#4E2BCC]">
                <Link href="/dashboard/planos">
                  Fazer Upgrade
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
