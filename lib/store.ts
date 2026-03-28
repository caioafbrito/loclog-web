// Store global para gerenciamento de estado
import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { PlanType, Entitlements } from "./types"
import { getEntitlements, PLANS, ADDITIONALS, PACKAGES } from "./mock-data"

interface PlanStore {
  // Estado atual do plano (para demo/visualização)
  currentPlan: PlanType
  additionals: string[]
  packages: string[]
  
  // Entitlements calculados
  entitlements: Entitlements
  
  // Ações
  setPlan: (plan: PlanType) => void
  toggleAdditional: (additionalId: string) => void
  togglePackage: (packageId: string) => void
  setAdditionals: (additionals: string[]) => void
  setPackages: (packages: string[]) => void
  reset: () => void
  
  // Helpers
  hasFeature: (feature: keyof Entitlements["features"]) => boolean
  getLimit: (limit: keyof Entitlements["limits"]) => number | "unlimited"
  isWithinLimit: (limit: keyof Entitlements["limits"], current: number) => boolean
  getUpgradeSuggestion: (feature: keyof Entitlements["features"]) => string | null
}

const defaultPlan: PlanType = "pro"
const defaultAdditionals: string[] = ["pix_integration"]
const defaultPackages: string[] = []

export const usePlanStore = create<PlanStore>()(
  persist(
    (set, get) => ({
      currentPlan: defaultPlan,
      additionals: defaultAdditionals,
      packages: defaultPackages,
      entitlements: getEntitlements(defaultPlan, defaultAdditionals, defaultPackages),

      setPlan: (plan) => {
        const { additionals, packages } = get()
        set({
          currentPlan: plan,
          entitlements: getEntitlements(plan, additionals, packages)
        })
      },

      toggleAdditional: (additionalId) => {
        const { currentPlan, additionals, packages } = get()
        const newAdditionals = additionals.includes(additionalId)
          ? additionals.filter(a => a !== additionalId)
          : [...additionals, additionalId]
        
        set({
          additionals: newAdditionals,
          entitlements: getEntitlements(currentPlan, newAdditionals, packages)
        })
      },

      togglePackage: (packageId) => {
        const { currentPlan, additionals, packages } = get()
        const newPackages = packages.includes(packageId)
          ? packages.filter(p => p !== packageId)
          : [...packages, packageId]
        
        set({
          packages: newPackages,
          entitlements: getEntitlements(currentPlan, additionals, newPackages)
        })
      },

      setAdditionals: (additionals) => {
        const { currentPlan, packages } = get()
        set({
          additionals,
          entitlements: getEntitlements(currentPlan, additionals, packages)
        })
      },

      setPackages: (packages) => {
        const { currentPlan, additionals } = get()
        set({
          packages,
          entitlements: getEntitlements(currentPlan, additionals, packages)
        })
      },

      reset: () => {
        set({
          currentPlan: defaultPlan,
          additionals: defaultAdditionals,
          packages: defaultPackages,
          entitlements: getEntitlements(defaultPlan, defaultAdditionals, defaultPackages)
        })
      },

      hasFeature: (feature) => {
        return get().entitlements.features[feature]
      },

      getLimit: (limit) => {
        return get().entitlements.limits[limit]
      },

      isWithinLimit: (limit, current) => {
        const limitValue = get().entitlements.limits[limit]
        if (limitValue === "unlimited") return true
        return current < limitValue
      },

      getUpgradeSuggestion: (feature) => {
        const { currentPlan, entitlements } = get()
        if (entitlements.features[feature]) return null
        
        // Sugestões baseadas na feature
        const suggestions: Record<string, string> = {
          orders: currentPlan === "starter" ? "Faça upgrade para o plano Pro para pedidos ilimitados" : null,
          logistics: currentPlan === "starter" ? "Faça upgrade para o plano Pro para acessar o módulo de logística" : null,
          stock: currentPlan === "starter" ? "Faça upgrade para o plano Pro para gestão de estoque avançada" : null,
          financial: currentPlan === "starter" ? "Faça upgrade para o plano Pro para o módulo financeiro" : null,
          accounting: "Faça upgrade para o plano Enterprise para o módulo contábil",
          partners: "Faça upgrade para o plano Enterprise para o programa de parceiros",
          api: "Faça upgrade para o plano Enterprise para acesso à API",
          whatsappBot: "Adquira o adicional Chatbot WhatsApp ou o Pacote Automação",
          customBranding: "Faça upgrade para Enterprise ou adquira o adicional Domínio Personalizado",
          prioritySupport: currentPlan === "starter" ? "Faça upgrade para o plano Pro para suporte prioritário" : null,
        } as Record<string, string | null>
        
        return suggestions[feature] || `Recurso não disponível no plano ${PLANS.find(p => p.id === currentPlan)?.name}`
      }
    }),
    {
      name: "loclog-plan-store",
    }
  )
)

// Hook para verificar feature com mensagem
export function useFeatureCheck() {
  const { hasFeature, getUpgradeSuggestion } = usePlanStore()
  
  return {
    checkFeature: (feature: keyof Entitlements["features"]) => ({
      allowed: hasFeature(feature),
      suggestion: getUpgradeSuggestion(feature)
    })
  }
}

// Export dos dados para uso em componentes
export { PLANS, ADDITIONALS, PACKAGES }
