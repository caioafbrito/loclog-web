"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"
import { 
  Crown, 
  ChevronDown, 
  Check,
  Sparkles,
  Zap,
  Building2,
  Code,
  Package,
  Plus
} from "lucide-react"
import { usePlanStore, PLANS, ADDITIONALS, PACKAGES } from "@/lib/store"
import type { PlanType } from "@/lib/types"

const planIcons: Record<PlanType, React.ReactNode> = {
  starter: <Zap className="h-3 w-3" />,
  pro: <Crown className="h-3 w-3" />,
  enterprise: <Building2 className="h-3 w-3" />,
  develop: <Code className="h-3 w-3" />,
}

const planColors: Record<PlanType, string> = {
  starter: "bg-blue-500/10 text-blue-600 border-blue-200",
  pro: "bg-[#905BF4]/10 text-[#905BF4] border-[#905BF4]/30",
  enterprise: "bg-amber-500/10 text-amber-600 border-amber-200",
  develop: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
}

export function PlanSelector() {
  const { 
    currentPlan, 
    additionals, 
    packages, 
    setPlan, 
    toggleAdditional, 
    togglePackage,
    reset 
  } = usePlanStore()
  
  const currentPlanData = PLANS.find(p => p.id === currentPlan)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className={`gap-2 border ${planColors[currentPlan]}`}
        >
          {planIcons[currentPlan]}
          <span className="hidden sm:inline">{currentPlanData?.name}</span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Visualizar como Plano</span>
          <Badge variant="outline" className="text-xs font-normal">Demo</Badge>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* Planos */}
        {PLANS.map((plan) => (
          <DropdownMenuItem 
            key={plan.id}
            onClick={() => setPlan(plan.id)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              {planIcons[plan.id]}
              <div>
                <span className="font-medium">{plan.name}</span>
                {plan.price > 0 && (
                  <span className="ml-2 text-xs text-muted-foreground">
                    R$ {plan.price}/mês
                  </span>
                )}
              </div>
            </div>
            {currentPlan === plan.id && <Check className="h-4 w-4 text-[#905BF4]" />}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />
        
        {/* Adicionais */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="gap-2">
            <Plus className="h-4 w-4" />
            Adicionais
            {additionals.length > 0 && (
              <Badge className="ml-auto bg-[#905BF4]/10 text-[#905BF4] text-xs">
                {additionals.length}
              </Badge>
            )}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-64">
            <DropdownMenuLabel>Adicionais Mensais</DropdownMenuLabel>
            {ADDITIONALS.filter(a => a.category === "monthly").map((additional) => (
              <DropdownMenuCheckboxItem
                key={additional.id}
                checked={additionals.includes(additional.id)}
                onCheckedChange={() => toggleAdditional(additional.id)}
              >
                <div className="flex flex-col">
                  <span>{additional.name}</span>
                  <span className="text-xs text-muted-foreground">
                    R$ {additional.monthlyPrice}/mês
                  </span>
                </div>
              </DropdownMenuCheckboxItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Setup Único</DropdownMenuLabel>
            {ADDITIONALS.filter(a => a.category === "setup").map((additional) => (
              <DropdownMenuCheckboxItem
                key={additional.id}
                checked={additionals.includes(additional.id)}
                onCheckedChange={() => toggleAdditional(additional.id)}
              >
                <div className="flex flex-col">
                  <span>{additional.name}</span>
                  <span className="text-xs text-muted-foreground">
                    R$ {additional.setupPrice}
                  </span>
                </div>
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {/* Pacotes */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="gap-2">
            <Package className="h-4 w-4" />
            Pacotes
            {packages.length > 0 && (
              <Badge className="ml-auto bg-[#905BF4]/10 text-[#905BF4] text-xs">
                {packages.length}
              </Badge>
            )}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-64">
            {PACKAGES.map((pkg) => (
              <DropdownMenuCheckboxItem
                key={pkg.id}
                checked={packages.includes(pkg.id)}
                onCheckedChange={() => togglePackage(pkg.id)}
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span>{pkg.name}</span>
                    <Badge variant="secondary" className="text-xs">{pkg.discount} off</Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    R$ {pkg.price}/mês
                  </span>
                </div>
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={reset}
          className="text-muted-foreground cursor-pointer"
        >
          Resetar para padrão
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
