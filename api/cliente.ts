/**
 * Cliente HTTP para comunicação com o Backend
 * Quando a API estiver disponível, substitui os mocks automaticamente
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL

// Verifica se a API está configurada
export const apiConfigurada = !!API_URL

export interface RespostaApi<T> {
  sucesso: boolean
  dados?: T
  erro?: string
  mensagem?: string
}

export interface OpcoesRequisicao {
  metodo?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  corpo?: unknown
  headers?: Record<string, string>
}

export async function requisicaoApi<T>(
  endpoint: string, 
  opcoes: OpcoesRequisicao = {}
): Promise<RespostaApi<T>> {
  if (!API_URL) {
    return {
      sucesso: false,
      erro: 'API não configurada. Usando dados mockados.',
    }
  }

  const { metodo = 'GET', corpo, headers = {} } = opcoes

  try {
    const resposta = await fetch(`${API_URL}${endpoint}`, {
      method: metodo,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: corpo ? JSON.stringify(corpo) : undefined,
    })

    const dados = await resposta.json()

    if (!resposta.ok) {
      return {
        sucesso: false,
        erro: dados.mensagem || `Erro ${resposta.status}`,
      }
    }

    return {
      sucesso: true,
      dados: dados as T,
    }
  } catch (erro) {
    return {
      sucesso: false,
      erro: erro instanceof Error ? erro.message : 'Erro desconhecido',
    }
  }
}
