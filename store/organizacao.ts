/**
 * Store da Organização - Gerenciamento de Plano e Entitlements
 * Usando Zustand para gerenciamento de estado global
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { 
  NomePlano, 
  NomeAdicional, 
  NomePacote, 
  ConfiguracaoOrganizacao,
  Entitlements
} from './tipos/plano'
import { calcularEntitlements, PLANOS, ADICIONAIS, PACOTES } from './dados/planos'

interface OrganizacaoState {
  // Configuração atual
  configuracao: ConfiguracaoOrganizacao
  
  // Entitlements calculados
  entitlements: Entitlements
  
  // Ações
  definirPlano: (plano: NomePlano) => void
  adicionarAdicional: (adicional: NomeAdicional) => void
  removerAdicional: (adicional: NomeAdicional) => void
  adicionarPacote: (pacote: NomePacote) => void
  removerPacote: (pacote: NomePacote) => void
  resetarConfiguracao: () => void
}

const configuracaoPadrao: ConfiguracaoOrganizacao = {
  plano: 'starter',
  adicionais: [],
  pacotes: [],
}

export const useOrganizacaoStore = create<OrganizacaoState>()(
  persist(
    (set, get) => ({
      configuracao: configuracaoPadrao,
      entitlements: calcularEntitlements(configuracaoPadrao),

      definirPlano: (plano: NomePlano) => {
        const novaConfig = { ...get().configuracao, plano }
        set({
          configuracao: novaConfig,
          entitlements: calcularEntitlements(novaConfig),
        })
      },

      adicionarAdicional: (adicional: NomeAdicional) => {
        const configAtual = get().configuracao
        if (configAtual.adicionais.includes(adicional)) return

        const novaConfig = {
          ...configAtual,
          adicionais: [...configAtual.adicionais, adicional],
        }
        set({
          configuracao: novaConfig,
          entitlements: calcularEntitlements(novaConfig),
        })
      },

      removerAdicional: (adicional: NomeAdicional) => {
        const configAtual = get().configuracao
        const novaConfig = {
          ...configAtual,
          adicionais: configAtual.adicionais.filter(a => a !== adicional),
        }
        set({
          configuracao: novaConfig,
          entitlements: calcularEntitlements(novaConfig),
        })
      },

      adicionarPacote: (pacote: NomePacote) => {
        const configAtual = get().configuracao
        if (configAtual.pacotes.includes(pacote)) return

        const novaConfig = {
          ...configAtual,
          pacotes: [...configAtual.pacotes, pacote],
        }
        set({
          configuracao: novaConfig,
          entitlements: calcularEntitlements(novaConfig),
        })
      },

      removerPacote: (pacote: NomePacote) => {
        const configAtual = get().configuracao
        const novaConfig = {
          ...configAtual,
          pacotes: configAtual.pacotes.filter(p => p !== pacote),
        }
        set({
          configuracao: novaConfig,
          entitlements: calcularEntitlements(novaConfig),
        })
      },

      resetarConfiguracao: () => {
        set({
          configuracao: configuracaoPadrao,
          entitlements: calcularEntitlements(configuracaoPadrao),
        })
      },
    }),
    {
      name: 'loclog-organizacao',
    }
  )
)

// ============================================================
// HOOKS DE CONVENIÊNCIA
// ============================================================

export function useEntitlements() {
  return useOrganizacaoStore(state => state.entitlements)
}

export function useConfiguracao() {
  return useOrganizacaoStore(state => state.configuracao)
}

export function usePlanoAtual() {
  const config = useOrganizacaoStore(state => state.configuracao)
  return PLANOS[config.plano]
}

export function useAdicionaisDisponiveis() {
  return Object.values(ADICIONAIS).filter(a => a.disponivelLancamento)
}

export function usePacotesDisponiveis() {
  return Object.values(PACOTES).filter(p => p.disponivelLancamento)
}
