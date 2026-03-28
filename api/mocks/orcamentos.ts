/**
 * Dados Mockados de Orçamentos
 */

export type StatusOrcamento = 
  | 'rascunho'
  | 'enviado'
  | 'visualizado'
  | 'em_negociacao'
  | 'aprovado'
  | 'convertido'
  | 'recusado'
  | 'expirado'
  | 'cancelado'

export interface ItemOrcamento {
  produtoId: string
  nome: string
  quantidade: number
  precoUnitario: number
  subtotal: number
}

export interface Orcamento {
  id: string
  numero: string
  contatoId: string
  clienteNome: string
  clienteTelefone: string
  clienteEmail: string
  itens: ItemOrcamento[]
  valorTotal: number
  desconto: number
  valorFinal: number
  status: StatusOrcamento
  validadeAte: string
  observacoes: string
  canalEnvio: 'whatsapp' | 'email' | 'presencial' | null
  motivoCancelamento?: string
  pedidoId?: string
  criadoEm: string
  atualizadoEm: string
}

export const orcamentosMock: Orcamento[] = [
  {
    id: 'orc-001',
    numero: 'ORC-198',
    contatoId: 'cont-004',
    clienteNome: 'João Pedro Oliveira',
    clienteTelefone: '(11) 95555-7890',
    clienteEmail: 'joao.oliveira@email.com',
    itens: [
      { produtoId: 'prod-001', nome: 'Cadeira Tiffany', quantidade: 15, precoUnitario: 35, subtotal: 525 },
    ],
    valorTotal: 525,
    desconto: 175,
    valorFinal: 350,
    status: 'enviado',
    validadeAte: '2026-12-15',
    observacoes: 'Cliente de indicação',
    canalEnvio: 'whatsapp',
    criadoEm: '2026-12-05T14:00:00Z',
    atualizadoEm: '2026-12-05T14:30:00Z',
  },
  {
    id: 'orc-002',
    numero: 'ORC-197',
    contatoId: 'cont-005',
    clienteNome: 'Casa de Festas Alegria',
    clienteTelefone: '(11) 94444-5678',
    clienteEmail: 'reservas@casaalegria.com.br',
    itens: [
      { produtoId: 'prod-001', nome: 'Cadeira Tiffany', quantidade: 80, precoUnitario: 35, subtotal: 2800 },
      { produtoId: 'prod-002', nome: 'Mesa Redonda 1,5m', quantidade: 15, precoUnitario: 85, subtotal: 1275 },
      { produtoId: 'prod-003', nome: 'Toalha de Mesa', quantidade: 15, precoUnitario: 25, subtotal: 375 },
    ],
    valorTotal: 4450,
    desconto: 450,
    valorFinal: 4000,
    status: 'em_negociacao',
    validadeAte: '2026-12-20',
    observacoes: 'Negociando desconto por volume',
    canalEnvio: 'email',
    criadoEm: '2026-12-03T10:00:00Z',
    atualizadoEm: '2026-12-04T16:00:00Z',
  },
  {
    id: 'orc-003',
    numero: 'ORC-196',
    contatoId: 'cont-001',
    clienteNome: 'Empresa Festa Feliz',
    clienteTelefone: '(11) 99999-1234',
    clienteEmail: 'contato@festafeliz.com.br',
    itens: [
      { produtoId: 'prod-001', nome: 'Cadeira Tiffany', quantidade: 50, precoUnitario: 35, subtotal: 1750 },
      { produtoId: 'prod-002', nome: 'Mesa Redonda 1,5m', quantidade: 10, precoUnitario: 85, subtotal: 850 },
    ],
    valorTotal: 2600,
    desconto: 0,
    valorFinal: 2600,
    status: 'convertido',
    validadeAte: '2026-12-10',
    observacoes: '',
    canalEnvio: 'whatsapp',
    pedidoId: 'ped-001',
    criadoEm: '2026-11-28T09:00:00Z',
    atualizadoEm: '2026-12-01T10:00:00Z',
  },
]

// Motivos de cancelamento de orçamento
export const motivosCancelamentoOrcamento = [
  { id: 'concorrencia_barata', label: 'Concorrência mais barata' },
  { id: 'atendimento_demorado', label: 'Atendimento demorado' },
  { id: 'produtos_nao_atendem', label: 'Produtos não atendem necessidade' },
  { id: 'mudanca_evento', label: 'Mudança de planos do evento' },
  { id: 'orcamento_alto', label: 'Orçamento acima do esperado' },
  { id: 'data_indisponivel', label: 'Data indisponível' },
  { id: 'cliente_nao_responde', label: 'Cliente não responde' },
  { id: 'duplicado', label: 'Orçamento duplicado' },
  { id: 'outro', label: 'Outro motivo' },
]
