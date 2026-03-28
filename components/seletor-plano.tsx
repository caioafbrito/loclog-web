"use client"

/**
 * Componente Seletor de Plano
 * Permite selecionar plano, adicionais e pacotes para simular entitlements
 */

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { 
  Settings2, 
  Crown,
  Package,
  Plus,
  Check,
  X,
  ChevronDown,
} from "lucide-react"
import { 
  useOrganizacaoStore,
  useEntitlements,
} from "@/store/organizacao"
import { 
  PLANOS, 
  ADICIONAIS, 
  PACOTES,
} from "@/store/dados/planos"
import type { NomePlano, NomeAdicional, NomePacote } from "@/store/tipos/plano"

const CORES_PLANO: Record<NomePlano, string> = {
  starter: 'bg-blue-500',
  pro: 'bg-[#905BF4]',
  enterprise: 'bg-amber-500',
  develop: 'bg-emerald-500',
}

export function SeletorPlano() {
  const [aberto, setAberto] = useState(false)
  const { 
    configuracao, 
    definirPlano, 
    adicionarAdicional, 
    removerAdicional,
    adicionarPacote,
    removerPacote,
  } = useOrganizacaoStore()
  
  const planoAtual = PLANOS[configuracao.plano]

  const toggleAdicional = (adicionalId: NomeAdicional) => {
    if (configuracao.adicionais.includes(adicionalId)) {
      removerAdicional(adicionalId)
    } else {
      adicionarAdicional(adicionalId)
    }
  }

  const togglePacote = (pacoteId: NomePacote) => {
    if (configuracao.pacotes.includes(pacoteId)) {
      removerPacote(pacoteId)
    } else {
      adicionarPacote(pacoteId)
    }
  }

  const adicionaisDisponiveis = Object.values(ADICIONAIS).filter(a => a.disponivelLancamento)
  const pacotesDisponiveis = Object.values(PACOTES).filter(p => p.disponivelLancamento)

  const totalAdicionais = configuracao.adicionais.length + configuracao.pacotes.length

  return (
    <Popover open={aberto} onOpenChange={setAberto}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 border-[#905BF4]/30 bg-white/50 hover:bg-white"
        >
          <Crown className="h-4 w-4 text-[#905BF4]" />
          <span className="hidden sm:inline">{planoAtual.nome}</span>
          {totalAdicionais > 0 && (
            <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
              +{totalAdicionais}
            </Badge>
          )}
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="border-b p-4">
          <div className="flex items-center gap-2">
            <Settings2 className="h-4 w-4 text-[#905BF4]" />
            <h3 className="font-semibold text-[#0F032D]">Simulador de Plano</h3>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Selecione plano, adicionais e pacotes para visualizar funcionalidades
          </p>
        </div>

        <div className="p-4 space-y-4">
          {/* Seletor de Plano */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Plano Base
            </Label>
            <Select 
              value={configuracao.plano} 
              onValueChange={(value: NomePlano) => definirPlano(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.values(PLANOS).map((plano) => (
                  <SelectItem 
                    key={plano.id} 
                    value={plano.id}
                    disabled={!plano.disponivel}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${CORES_PLANO[plano.id]}`} />
                      <span>{plano.nome}</span>
                      {plano.mensalidade && (
                        <span className="text-xs text-muted-foreground">
                          R$ {plano.mensalidade}/mês
                        </span>
                      )}
                      {!plano.disponivel && (
                        <Badge variant="outline" className="ml-auto text-[10px]">
                          {plano.dataPrevisao}
                        </Badge>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Pacotes */}
          {pacotesDisponiveis.length > 0 && (
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Pacotes
              </Label>
              <div className="space-y-2">
                {pacotesDisponiveis.map((pacote) => (
                  <div 
                    key={pacote.id}
                    className="flex items-start gap-3 rounded-lg border p-3 hover:bg-muted/50 cursor-pointer"
                    onClick={() => togglePacote(pacote.id)}
                  >
                    <Checkbox 
                      checked={configuracao.pacotes.includes(pacote.id)}
                      onCheckedChange={() => togglePacote(pacote.id)}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-[#905BF4]" />
                        <span className="font-medium text-sm">{pacote.nome}</span>
                      </div>
                      {pacote.valorMensal && (
                        <p className="text-xs text-muted-foreground mt-0.5">
                          R$ {pacote.valorMensal}/mês
                        </p>
                      )}
                      <p className="text-[10px] text-muted-foreground mt-1">
                        Inclui: {pacote.adicionaisInclusos.map(a => ADICIONAIS[a].nome).join(', ')}
                      </p>
                    </div>
                    {configuracao.pacotes.includes(pacote.id) && (
                      <Check className="h-4 w-4 text-green-600 shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Adicionais Avulsos */}
          {adicionaisDisponiveis.length > 0 && (
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Adicionais Avulsos
              </Label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {adicionaisDisponiveis.map((adicional) => {
                  // Verifica se já está incluso em algum pacote selecionado
                  const inclusoEmPacote = configuracao.pacotes.some(pacoteId => {
                    const pacote = PACOTES[pacoteId]
                    return pacote.adicionaisInclusos.includes(adicional.id)
                  })

                  return (
                    <div 
                      key={adicional.id}
                      className={`flex items-start gap-3 rounded-lg border p-3 ${
                        inclusoEmPacote 
                          ? 'bg-muted/30 opacity-60' 
                          : 'hover:bg-muted/50 cursor-pointer'
                      }`}
                      onClick={() => !inclusoEmPacote && toggleAdicional(adicional.id)}
                    >
                      <Checkbox 
                        checked={configuracao.adicionais.includes(adicional.id) || inclusoEmPacote}
                        disabled={inclusoEmPacote}
                        onCheckedChange={() => !inclusoEmPacote && toggleAdicional(adicional.id)}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <Plus className="h-3 w-3 text-[#905BF4]" />
                          <span className="font-medium text-sm">{adicional.nome}</span>
                        </div>
                        {adicional.valorMensal && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            R$ {adicional.valorMensal}/mês
                          </p>
                        )}
                        {inclusoEmPacote && (
                          <p className="text-[10px] text-green-600 mt-0.5">
                            Incluso no pacote
                          </p>
                        )}
                      </div>
                      {(configuracao.adicionais.includes(adicional.id) || inclusoEmPacote) && (
                        <Check className="h-4 w-4 text-green-600 shrink-0" />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Resumo */}
        <div className="border-t bg-muted/30 p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Valor estimado:</span>
            <span className="font-bold text-[#0F032D]">
              R$ {calcularValorTotal(configuracao)}/mês
            </span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

function calcularValorTotal(config: { plano: NomePlano; adicionais: NomeAdicional[]; pacotes: NomePacote[] }): string {
  let total = 0
  
  // Plano base
  const plano = PLANOS[config.plano]
  if (plano.mensalidade) {
    total += plano.mensalidade
  }

  // Pacotes
  for (const pacoteId of config.pacotes) {
    const pacote = PACOTES[pacoteId]
    if (pacote.valorMensal) {
      total += pacote.valorMensal
    }
  }

  // Adicionais (exceto os que já estão em pacotes)
  const adicionaisEmPacotes = new Set<NomeAdicional>()
  for (const pacoteId of config.pacotes) {
    const pacote = PACOTES[pacoteId]
    pacote.adicionaisInclusos.forEach(a => adicionaisEmPacotes.add(a))
  }

  for (const adicionalId of config.adicionais) {
    if (!adicionaisEmPacotes.has(adicionalId)) {
      const adicional = ADICIONAIS[adicionalId]
      if (adicional.valorMensal) {
        total += adicional.valorMensal
      }
    }
  }

  return total.toFixed(2).replace('.', ',')
}
