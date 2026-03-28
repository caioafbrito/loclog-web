/**
 * Dados Mockados de Contatos
 */

export interface Contato {
  id: string
  nome: string
  tipo: 'pessoa_fisica' | 'pessoa_juridica'
  documento: string
  email: string
  telefone: string
  endereco: string
  categoria: 'cliente' | 'fornecedor' | 'parceiro' | 'lead'
  criadoEm: string
  atualizadoEm: string
}

export const contatosMock: Contato[] = [
  {
    id: 'cont-001',
    nome: 'Empresa Festa Feliz Ltda',
    tipo: 'pessoa_juridica',
    documento: '12.345.678/0001-90',
    email: 'contato@festafeliz.com.br',
    telefone: '(11) 99999-1234',
    endereco: 'Rua das Flores, 123 - São Paulo, SP',
    categoria: 'cliente',
    criadoEm: '2025-01-15T10:30:00Z',
    atualizadoEm: '2025-01-15T10:30:00Z',
  },
  {
    id: 'cont-002',
    nome: 'Maria Santos Silva',
    tipo: 'pessoa_fisica',
    documento: '123.456.789-00',
    email: 'maria.santos@email.com',
    telefone: '(11) 97777-9012',
    endereco: 'Rua Augusta, 500 - São Paulo, SP',
    categoria: 'cliente',
    criadoEm: '2025-02-20T14:15:00Z',
    atualizadoEm: '2025-02-20T14:15:00Z',
  },
  {
    id: 'cont-003',
    nome: 'Buffet Sabor & Arte',
    tipo: 'pessoa_juridica',
    documento: '98.765.432/0001-10',
    email: 'eventos@saborarte.com.br',
    telefone: '(11) 96666-3456',
    endereco: 'Rua dos Eventos, 789 - São Paulo, SP',
    categoria: 'parceiro',
    criadoEm: '2025-01-10T09:00:00Z',
    atualizadoEm: '2025-03-01T11:20:00Z',
  },
  {
    id: 'cont-004',
    nome: 'João Pedro Oliveira',
    tipo: 'pessoa_fisica',
    documento: '987.654.321-00',
    email: 'joao.oliveira@email.com',
    telefone: '(11) 95555-7890',
    endereco: 'Av. Paulista, 1000 - São Paulo, SP',
    categoria: 'cliente',
    criadoEm: '2025-03-05T16:45:00Z',
    atualizadoEm: '2025-03-05T16:45:00Z',
  },
  {
    id: 'cont-005',
    nome: 'Casa de Festas Alegria',
    tipo: 'pessoa_juridica',
    documento: '11.222.333/0001-44',
    email: 'reservas@casaalegria.com.br',
    telefone: '(11) 94444-5678',
    endereco: 'Rua da Alegria, 200 - Guarulhos, SP',
    categoria: 'lead',
    criadoEm: '2025-03-10T08:30:00Z',
    atualizadoEm: '2025-03-10T08:30:00Z',
  },
]
