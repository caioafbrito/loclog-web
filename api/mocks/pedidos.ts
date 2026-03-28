/**
 * Dados Mockados de Pedidos
 */

export type StatusPedido = 
  | 'rascunho'
  | 'confirmado'
  | 'aguardando_entrega'
  | 'em_transito'
  | 'entregue'
  | 'aguardando_retirada'
  | 'retirado'
  | 'concluido'
  | 'cancelado'

export type StatusPagamento = 'pendente' | 'parcial' | 'pago' | 'cancelado'

export interface ItemPedido {
  produtoId: string
  nome: string
  quantidade: number
  precoUnitario: number
  subtotal: number
}

export interface Pedido {
  id: string
  numero: string
  contatoId: string
  clienteNome: string
  clienteTelefone: string
  enderecoEntrega: string
  itens: ItemPedido[]
  valorTotal: number
  status: StatusPedido
  statusPagamento: StatusPagamento
  valorPago: number
  dataEntrega: string
  horarioEntrega: string
  dataRetirada: string
  horarioRetirada: string
  entregadorId: string | null
  entregadorNome: string | null
  observacoes: string
  motivoCancelamento?: string
  criadoEm: string
  atualizadoEm: string
}

export const pedidosMock: Pedido[] = [
  {
    id: 'ped-001',
    numero: 'PED-4521',
    contatoId: 'cont-001',
    clienteNome: 'Empresa Festa Feliz',
    clienteTelefone: '(11) 99999-1234',
    enderecoEntrega: 'Rua das Flores, 123 - São Paulo, SP',
    itens: [
      { produtoId: 'prod-001', nome: 'Cadeira Tiffany', quantidade: 50, precoUnitario: 35, subtotal: 1750 },
      { produtoId: 'prod-002', nome: 'Mesa Redonda 1,5m', quantidade: 10, precoUnitario: 85, subtotal: 850 },
    ],
    valorTotal: 2600,
    status: 'aguardando_entrega',
    statusPagamento: 'pendente',
    valorPago: 0,
    dataEntrega: '2026-12-05',
    horarioEntrega: '08:00',
    dataRetirada: '2026-12-06',
    horarioRetirada: '20:00',
    entregadorId: 'user-002',
    entregadorNome: 'Carlos Silva',
    observacoes: 'Cliente solicita entrega pela manhã',
    criadoEm: '2026-12-01T10:00:00Z',
    atualizadoEm: '2026-12-01T10:00:00Z',
  },
  {
    id: 'ped-002',
    numero: 'PED-4520',
    contatoId: 'cont-002',
    clienteNome: 'Maria Santos',
    clienteTelefone: '(11) 97777-9012',
    enderecoEntrega: 'Rua Augusta, 500 - São Paulo, SP',
    itens: [
      { produtoId: 'prod-001', nome: 'Cadeira Tiffany', quantidade: 20, precoUnitario: 35, subtotal: 700 },
      { produtoId: 'prod-002', nome: 'Mesa Redonda 1,5m', quantidade: 5, precoUnitario: 85, subtotal: 425 },
    ],
    valorTotal: 1125,
    status: 'entregue',
    statusPagamento: 'pago',
    valorPago: 1125,
    dataEntrega: '2026-12-04',
    horarioEntrega: '09:00',
    dataRetirada: '2026-12-04',
    horarioRetirada: '18:00',
    entregadorId: 'user-003',
    entregadorNome: 'João Pereira',
    observacoes: '',
    criadoEm: '2026-11-28T14:30:00Z',
    atualizadoEm: '2026-12-04T18:00:00Z',
  },
  {
    id: 'ped-003',
    numero: 'PED-4519',
    contatoId: 'cont-003',
    clienteNome: 'Buffet Sabor & Arte',
    clienteTelefone: '(11) 96666-3456',
    enderecoEntrega: 'Rua dos Eventos, 789 - São Paulo, SP',
    itens: [
      { produtoId: 'prod-001', nome: 'Cadeira Tiffany', quantidade: 100, precoUnitario: 35, subtotal: 3500 },
      { produtoId: 'prod-002', nome: 'Mesa Redonda 1,5m', quantidade: 20, precoUnitario: 85, subtotal: 1700 },
    ],
    valorTotal: 5200,
    status: 'em_transito',
    statusPagamento: 'parcial',
    valorPago: 2600,
    dataEntrega: '2026-12-03',
    horarioEntrega: '07:00',
    dataRetirada: '2026-12-05',
    horarioRetirada: '22:00',
    entregadorId: 'user-004',
    entregadorNome: 'Pedro Santos',
    observacoes: 'Evento corporativo de grande porte',
    criadoEm: '2026-11-25T09:00:00Z',
    atualizadoEm: '2026-12-03T07:30:00Z',
  },
]

// Motivos de cancelamento de pedido
export const motivosCancelamentoPedido = [
  { id: 'demora_resposta', label: 'Demora na resposta de suporte' },
  { id: 'entrega_atrasada', label: 'Entrega atrasada' },
  { id: 'evento_cancelado', label: 'Evento cancelado pelo cliente' },
  { id: 'mudanca_data', label: 'Mudança de data do evento' },
  { id: 'problemas_pagamento', label: 'Problemas com pagamento' },
  { id: 'produto_indisponivel', label: 'Produto indisponível na data' },
  { id: 'cliente_desistiu', label: 'Cliente desistiu' },
  { id: 'erro_cadastro', label: 'Erro no cadastro do pedido' },
  { id: 'outro', label: 'Outro motivo' },
]
