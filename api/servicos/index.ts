/**
 * Serviços de API - Fachada para comunicação com backend
 * Se API não está configurada, usa dados mockados
 */

import { apiConfigurada, requisicaoApi, type RespostaApi } from '../cliente'
import { contatosMock, type Contato } from '../mocks/contatos'
import { pedidosMock, type Pedido, type StatusPedido } from '../mocks/pedidos'
import { orcamentosMock, type Orcamento, type StatusOrcamento } from '../mocks/orcamentos'

// ============================================================
// SERVIÇO DE CONTATOS
// ============================================================

export const servicoContatos = {
  async listar(): Promise<RespostaApi<Contato[]>> {
    if (!apiConfigurada) {
      return { sucesso: true, dados: contatosMock }
    }
    return requisicaoApi<Contato[]>('/contatos')
  },

  async obter(id: string): Promise<RespostaApi<Contato>> {
    if (!apiConfigurada) {
      const contato = contatosMock.find(c => c.id === id)
      return contato 
        ? { sucesso: true, dados: contato }
        : { sucesso: false, erro: 'Contato não encontrado' }
    }
    return requisicaoApi<Contato>(`/contatos/${id}`)
  },

  async criar(dados: Omit<Contato, 'id' | 'criadoEm' | 'atualizadoEm'>): Promise<RespostaApi<Contato>> {
    if (!apiConfigurada) {
      const novo: Contato = {
        ...dados,
        id: `cont-${Date.now()}`,
        criadoEm: new Date().toISOString(),
        atualizadoEm: new Date().toISOString(),
      }
      contatosMock.push(novo)
      return { sucesso: true, dados: novo, mensagem: 'Contato criado com sucesso' }
    }
    return requisicaoApi<Contato>('/contatos', { metodo: 'POST', corpo: dados })
  },

  async atualizar(id: string, dados: Partial<Contato>): Promise<RespostaApi<Contato>> {
    if (!apiConfigurada) {
      const index = contatosMock.findIndex(c => c.id === id)
      if (index === -1) return { sucesso: false, erro: 'Contato não encontrado' }
      
      contatosMock[index] = { 
        ...contatosMock[index], 
        ...dados, 
        atualizadoEm: new Date().toISOString() 
      }
      return { sucesso: true, dados: contatosMock[index], mensagem: 'Contato atualizado' }
    }
    return requisicaoApi<Contato>(`/contatos/${id}`, { metodo: 'PUT', corpo: dados })
  },

  async excluir(id: string): Promise<RespostaApi<void>> {
    if (!apiConfigurada) {
      const index = contatosMock.findIndex(c => c.id === id)
      if (index === -1) return { sucesso: false, erro: 'Contato não encontrado' }
      
      contatosMock.splice(index, 1)
      return { sucesso: true, mensagem: 'Contato excluído' }
    }
    return requisicaoApi<void>(`/contatos/${id}`, { metodo: 'DELETE' })
  },
}

// ============================================================
// SERVIÇO DE PEDIDOS
// ============================================================

export const servicoPedidos = {
  async listar(): Promise<RespostaApi<Pedido[]>> {
    if (!apiConfigurada) {
      return { sucesso: true, dados: pedidosMock }
    }
    return requisicaoApi<Pedido[]>('/pedidos')
  },

  async obter(id: string): Promise<RespostaApi<Pedido>> {
    if (!apiConfigurada) {
      const pedido = pedidosMock.find(p => p.id === id)
      return pedido 
        ? { sucesso: true, dados: pedido }
        : { sucesso: false, erro: 'Pedido não encontrado' }
    }
    return requisicaoApi<Pedido>(`/pedidos/${id}`)
  },

  async criar(dados: Omit<Pedido, 'id' | 'numero' | 'criadoEm' | 'atualizadoEm'>): Promise<RespostaApi<Pedido>> {
    if (!apiConfigurada) {
      const ultimoNumero = pedidosMock.length > 0 
        ? parseInt(pedidosMock[0].numero.replace('PED-', ''))
        : 4520
      
      const novo: Pedido = {
        ...dados,
        id: `ped-${Date.now()}`,
        numero: `PED-${ultimoNumero + 1}`,
        criadoEm: new Date().toISOString(),
        atualizadoEm: new Date().toISOString(),
      }
      pedidosMock.unshift(novo)
      return { sucesso: true, dados: novo, mensagem: 'Pedido criado com sucesso' }
    }
    return requisicaoApi<Pedido>('/pedidos', { metodo: 'POST', corpo: dados })
  },

  async atualizarStatus(id: string, status: StatusPedido, motivo?: string): Promise<RespostaApi<Pedido>> {
    if (!apiConfigurada) {
      const index = pedidosMock.findIndex(p => p.id === id)
      if (index === -1) return { sucesso: false, erro: 'Pedido não encontrado' }
      
      pedidosMock[index] = { 
        ...pedidosMock[index], 
        status,
        motivoCancelamento: status === 'cancelado' ? motivo : undefined,
        atualizadoEm: new Date().toISOString() 
      }
      return { sucesso: true, dados: pedidosMock[index], mensagem: 'Status atualizado' }
    }
    return requisicaoApi<Pedido>(`/pedidos/${id}/status`, { 
      metodo: 'PATCH', 
      corpo: { status, motivo } 
    })
  },

  async excluir(id: string): Promise<RespostaApi<void>> {
    if (!apiConfigurada) {
      const index = pedidosMock.findIndex(p => p.id === id)
      if (index === -1) return { sucesso: false, erro: 'Pedido não encontrado' }
      
      pedidosMock.splice(index, 1)
      return { sucesso: true, mensagem: 'Pedido excluído' }
    }
    return requisicaoApi<void>(`/pedidos/${id}`, { metodo: 'DELETE' })
  },

  async gerarPdf(id: string): Promise<RespostaApi<{ url: string }>> {
    if (!apiConfigurada) {
      // Simula geração de PDF
      return { 
        sucesso: true, 
        dados: { url: `/api/pedidos/${id}/pdf` },
        mensagem: 'PDF gerado com sucesso' 
      }
    }
    return requisicaoApi<{ url: string }>(`/pedidos/${id}/pdf`, { metodo: 'POST' })
  },
}

// ============================================================
// SERVIÇO DE ORÇAMENTOS
// ============================================================

export const servicoOrcamentos = {
  async listar(): Promise<RespostaApi<Orcamento[]>> {
    if (!apiConfigurada) {
      return { sucesso: true, dados: orcamentosMock }
    }
    return requisicaoApi<Orcamento[]>('/orcamentos')
  },

  async obter(id: string): Promise<RespostaApi<Orcamento>> {
    if (!apiConfigurada) {
      const orcamento = orcamentosMock.find(o => o.id === id)
      return orcamento 
        ? { sucesso: true, dados: orcamento }
        : { sucesso: false, erro: 'Orçamento não encontrado' }
    }
    return requisicaoApi<Orcamento>(`/orcamentos/${id}`)
  },

  async criar(dados: Omit<Orcamento, 'id' | 'numero' | 'criadoEm' | 'atualizadoEm'>): Promise<RespostaApi<Orcamento>> {
    if (!apiConfigurada) {
      const ultimoNumero = orcamentosMock.length > 0 
        ? parseInt(orcamentosMock[0].numero.replace('ORC-', ''))
        : 198
      
      const novo: Orcamento = {
        ...dados,
        id: `orc-${Date.now()}`,
        numero: `ORC-${ultimoNumero + 1}`,
        criadoEm: new Date().toISOString(),
        atualizadoEm: new Date().toISOString(),
      }
      orcamentosMock.unshift(novo)
      return { sucesso: true, dados: novo, mensagem: 'Orçamento criado com sucesso' }
    }
    return requisicaoApi<Orcamento>('/orcamentos', { metodo: 'POST', corpo: dados })
  },

  async atualizarStatus(id: string, status: StatusOrcamento, motivo?: string): Promise<RespostaApi<Orcamento>> {
    if (!apiConfigurada) {
      const index = orcamentosMock.findIndex(o => o.id === id)
      if (index === -1) return { sucesso: false, erro: 'Orçamento não encontrado' }
      
      orcamentosMock[index] = { 
        ...orcamentosMock[index], 
        status,
        motivoCancelamento: status === 'cancelado' ? motivo : undefined,
        atualizadoEm: new Date().toISOString() 
      }
      return { sucesso: true, dados: orcamentosMock[index], mensagem: 'Status atualizado' }
    }
    return requisicaoApi<Orcamento>(`/orcamentos/${id}/status`, { 
      metodo: 'PATCH', 
      corpo: { status, motivo } 
    })
  },

  async converterEmPedido(id: string): Promise<RespostaApi<Pedido>> {
    if (!apiConfigurada) {
      const orcamento = orcamentosMock.find(o => o.id === id)
      if (!orcamento) return { sucesso: false, erro: 'Orçamento não encontrado' }
      
      // Cria pedido baseado no orçamento
      const novoPedido = await servicoPedidos.criar({
        contatoId: orcamento.contatoId,
        clienteNome: orcamento.clienteNome,
        clienteTelefone: orcamento.clienteTelefone,
        enderecoEntrega: '',
        itens: orcamento.itens,
        valorTotal: orcamento.valorFinal,
        status: 'confirmado',
        statusPagamento: 'pendente',
        valorPago: 0,
        dataEntrega: '',
        horarioEntrega: '',
        dataRetirada: '',
        horarioRetirada: '',
        entregadorId: null,
        entregadorNome: null,
        observacoes: orcamento.observacoes,
      })
      
      if (novoPedido.sucesso && novoPedido.dados) {
        // Atualiza orçamento
        const index = orcamentosMock.findIndex(o => o.id === id)
        orcamentosMock[index] = {
          ...orcamentosMock[index],
          status: 'convertido',
          pedidoId: novoPedido.dados.id,
          atualizadoEm: new Date().toISOString(),
        }
      }
      
      return novoPedido
    }
    return requisicaoApi<Pedido>(`/orcamentos/${id}/converter`, { metodo: 'POST' })
  },

  async gerarPdf(id: string): Promise<RespostaApi<{ url: string }>> {
    if (!apiConfigurada) {
      return { 
        sucesso: true, 
        dados: { url: `/api/orcamentos/${id}/pdf` },
        mensagem: 'PDF gerado com sucesso' 
      }
    }
    return requisicaoApi<{ url: string }>(`/orcamentos/${id}/pdf`, { metodo: 'POST' })
  },

  async gerarTexto(id: string): Promise<RespostaApi<{ texto: string }>> {
    if (!apiConfigurada) {
      const orcamento = orcamentosMock.find(o => o.id === id)
      if (!orcamento) return { sucesso: false, erro: 'Orçamento não encontrado' }
      
      const texto = `
*ORÇAMENTO ${orcamento.numero}*

Cliente: ${orcamento.clienteNome}

*Itens:*
${orcamento.itens.map(item => `- ${item.quantidade}x ${item.nome}: R$ ${item.subtotal.toFixed(2)}`).join('\n')}

*Subtotal:* R$ ${orcamento.valorTotal.toFixed(2)}
*Desconto:* R$ ${orcamento.desconto.toFixed(2)}
*TOTAL:* R$ ${orcamento.valorFinal.toFixed(2)}

Válido até: ${new Date(orcamento.validadeAte).toLocaleDateString('pt-BR')}
      `.trim()
      
      return { sucesso: true, dados: { texto } }
    }
    return requisicaoApi<{ texto: string }>(`/orcamentos/${id}/texto`)
  },
}

// Re-exporta tipos
export type { Contato } from '../mocks/contatos'
export type { Pedido, StatusPedido, ItemPedido } from '../mocks/pedidos'
export type { Orcamento, StatusOrcamento, ItemOrcamento } from '../mocks/orcamentos'
export { motivosCancelamentoPedido } from '../mocks/pedidos'
export { motivosCancelamentoOrcamento } from '../mocks/orcamentos'
