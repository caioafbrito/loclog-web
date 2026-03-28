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
  DialogFooter,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Check,
  Star,
  Crown,
  Building2,
  Code,
  ArrowRight,
  AlertCircle,
  Sparkles,
} from "lucide-react"

const plans = [
  {
    id: "starter",
    name: "Starter",
    icon: Star,
    price: 249,
    yearlyPrice: 199,
    description: "Ideal para quem está começando",
    features: [
      "Até 150 reservas/mês",
      "1 usuário",
      "Gestão de orçamentos e pedidos",
      "Cobrança online via PIX",
      "Emissão de contratos",
      "Suporte via WhatsApp",
    ],
    available: true,
  },
  {
    id: "pro",
    name: "Pro",
    icon: Crown,
    price: 449,
    yearlyPrice: 379,
    description: "Para locadoras em crescimento",
    popular: true,
    current: true,
    features: [
      "Até 500 reservas/mês",
      "Até 5 usuários",
      "Tudo do Starter +",
      "Gestão de equipe e entregadores",
      "Controle de estoque completo",
      "Rotas logísticas e GPS",
      "Relatórios avançados",
      "Produtos para venda",
    ],
    available: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: Building2,
    price: 749,
    yearlyPrice: 639,
    description: "Para grandes operações",
    features: [
      "Reservas ilimitadas",
      "Usuários ilimitados",
      "Tudo do Pro +",
      "Gestão de múltiplos armazéns",
      "Chat com clientes",
      "Curso em vídeo exclusivo",
      "SLA prioritário",
    ],
    available: false,
    launchDate: "Janeiro 2027",
  },
  {
    id: "develop",
    name: "Develop",
    icon: Code,
    price: null,
    yearlyPrice: null,
    description: "Soluções personalizadas",
    features: [
      "Tudo do Enterprise +",
      "Integrações personalizadas",
      "Acesso completo à API",
      "SLA personalizado",
      "Desenvolvimento sob demanda",
    ],
    available: false,
    launchDate: "Julho 2027",
  },
]

const addons = [
  { name: "Pacote Contábil", price: 149, description: "NFSe, NFe, remessa e fatura de locação", active: true },
  { name: "Emitir NFSe", price: 60, description: "Emissão de notas fiscais de serviço", active: false },
  { name: "Fatura de Locação", price: 20, description: "Emissão manual ou automática", active: false },
]

export default function PlansPage() {
  const [yearly, setYearly] = useState(false)
  const [upgradeDialog, setUpgradeDialog] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null)

  const handleUpgrade = (plan: typeof plans[0]) => {
    setSelectedPlan(plan)
    setUpgradeDialog(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#0F032D]">Planos e Preços</h1>
        <p className="text-[#0F032D]/60">Gerencie seu plano e adicionais</p>
      </div>

      {/* Plano Atual Banner */}
      <Card className="border-2 border-[#905BF4] bg-[#905BF4]/5">
        <CardContent className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
          <div>
            <Badge className="bg-[#905BF4] text-white">Plano Atual</Badge>
            <h2 className="mt-2 text-2xl font-bold text-[#0F032D]">Plano Pro</h2>
            <p className="text-[#0F032D]/60">R$ 449,00/mês + R$ 149,00 (Pacote Contábil)</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Gerenciar Adicionais</Button>
            <Button className="bg-[#905BF4] hover:bg-[#4E2BCC]">
              Fazer Upgrade
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Toggle Mensal/Anual */}
      <div className="flex items-center justify-center gap-4">
        <span className={`text-sm ${!yearly ? "font-semibold text-[#0F032D]" : "text-[#0F032D]/60"}`}>
          Mensal
        </span>
        <Switch checked={yearly} onCheckedChange={setYearly} />
        <span className={`text-sm ${yearly ? "font-semibold text-[#0F032D]" : "text-[#0F032D]/60"}`}>
          Anual
        </span>
        {yearly && (
          <Badge className="bg-green-100 text-green-700">
            <Sparkles className="mr-1 h-3 w-3" />
            Economize até 20%
          </Badge>
        )}
      </div>

      {/* Cards de Planos */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative border-2 ${
              plan.current
                ? "border-[#905BF4] bg-[#905BF4]/5"
                : plan.popular
                ? "border-[#4E2BCC]"
                : "border-[#EFEFEF]"
            }`}
          >
            {plan.popular && !plan.current && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#4E2BCC]">
                Mais Popular
              </Badge>
            )}
            {plan.current && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#905BF4]">
                Seu Plano
              </Badge>
            )}
            <CardHeader className="text-center">
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-[#905BF4]/10">
                <plan.icon className="h-6 w-6 text-[#905BF4]" />
              </div>
              <CardTitle className="text-[#0F032D]">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              {plan.price ? (
                <div className="mb-6">
                  <span className="text-4xl font-bold text-[#0F032D]">
                    R$ {yearly ? plan.yearlyPrice : plan.price}
                  </span>
                  <span className="text-[#0F032D]/60">/mês</span>
                  {yearly && (
                    <p className="mt-1 text-sm text-green-600">
                      R$ {(plan.yearlyPrice! * 12).toLocaleString()}/ano
                    </p>
                  )}
                </div>
              ) : (
                <div className="mb-6">
                  <span className="text-2xl font-bold text-[#0F032D]">Sob consulta</span>
                </div>
              )}

              <ul className="mb-6 space-y-3 text-left">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#0F032D]">
                    <Check className="h-4 w-4 shrink-0 text-[#905BF4]" />
                    {feature}
                  </li>
                ))}
              </ul>

              {plan.current ? (
                <Button className="w-full" disabled>
                  Plano Atual
                </Button>
              ) : plan.available ? (
                <Button
                  className="w-full bg-[#905BF4] hover:bg-[#4E2BCC]"
                  onClick={() => handleUpgrade(plan)}
                >
                  {plan.id === "starter" ? "Fazer Downgrade" : "Fazer Upgrade"}
                </Button>
              ) : (
                <Button className="w-full" variant="outline" disabled>
                  <AlertCircle className="mr-2 h-4 w-4" />
                  {plan.launchDate}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Adicionais Avulsos */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle className="text-[#0F032D]">Adicionais Disponíveis</CardTitle>
          <CardDescription>Funcionalidades extras para complementar seu plano</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {addons.map((addon, index) => (
              <div
                key={index}
                className={`flex items-center justify-between rounded-lg border p-4 ${
                  addon.active ? "border-[#905BF4] bg-[#905BF4]/5" : "border-[#EFEFEF]"
                }`}
              >
                <div className="flex items-center gap-4">
                  <Switch checked={addon.active} />
                  <div>
                    <p className="font-medium text-[#0F032D]">{addon.name}</p>
                    <p className="text-sm text-[#0F032D]/60">{addon.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-[#0F032D]">R$ {addon.price},00/mês</p>
                  {addon.active && (
                    <Badge className="bg-green-100 text-green-700">Ativo</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dialog de Upgrade */}
      <Dialog open={upgradeDialog} onOpenChange={setUpgradeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Alteração de Plano</DialogTitle>
            <DialogDescription>
              Você está prestes a alterar seu plano para {selectedPlan?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="rounded-lg bg-[#EFEFEF] p-4">
              <div className="flex items-center justify-between">
                <span className="text-[#0F032D]/60">Plano atual</span>
                <span className="font-medium">Pro - R$ 449,00/mês</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[#0F032D]/60">Novo plano</span>
                <span className="font-medium">
                  {selectedPlan?.name} - R$ {yearly ? selectedPlan?.yearlyPrice : selectedPlan?.price},00/mês
                </span>
              </div>
            </div>
            <p className="text-sm text-[#0F032D]/60">
              A alteração será efetivada imediatamente. A diferença de valor será calculada 
              proporcionalmente ao período restante.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUpgradeDialog(false)}>
              Cancelar
            </Button>
            <Button className="bg-[#905BF4] hover:bg-[#4E2BCC]">
              Confirmar Alteração
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
