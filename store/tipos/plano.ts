/**
 * Tipos de Planos e Entitlements - DDD com Linguagem Ubíqua em Português
 */

export type NomePlano = 'starter' | 'pro' | 'enterprise' | 'develop'

export type NomeAdicional = 
  | 'emitir_nfse'
  | 'emitir_fatura_locacao'
  | 'emitir_nfe_venda'
  | 'emitir_nf_remessa'
  | 'programa_parceiros'
  | 'cobrar_maquininha'
  | 'chatbot_integrado'

export type NomePacote = 
  | 'pacote_contabil'
  | 'pacote_parceiro_preparado'

export interface LimitesPlano {
  maximoReservas: number | 'ilimitado'
  excedentePorReserva: number | null
  valorLimiteCobranca: number | null
  maximoUsuarios: number | 'ilimitado'
  excedentePorUsuario: number | null
}

export interface Plano {
  id: NomePlano
  nome: string
  mensalidade: number | null
  anuidade: number | null
  descontoAnual: number
  disponivel: boolean
  dataPrevisao: string
  limites: LimitesPlano
  funcionalidades: Record<string, boolean>
  sla: {
    p1: string
    p2: string
    p3: string
  }
  canaisAtendimento: string[]
}

export interface Adicional {
  id: NomeAdicional
  nome: string
  disponivelLancamento: boolean
  valorMensal: number | null
  taxaTransacional: string | null
  valorImplantacao: number | null
}

export interface Pacote {
  id: NomePacote
  nome: string
  disponivelLancamento: boolean
  valorMensal: number | null
  taxaTransacional: string | null
  adicionaisInclusos: NomeAdicional[]
}

export interface ConfiguracaoOrganizacao {
  plano: NomePlano
  adicionais: NomeAdicional[]
  pacotes: NomePacote[]
}

export interface Entitlements {
  // Gestão Básica
  gestaoContatos: boolean
  gestaoUsuarios: boolean
  gestaoEquipe: boolean
  
  // Orçamentos
  gestaoOrcamentos: boolean
  gerarPdfOrcamento: boolean
  gerarTextoOrcamento: boolean
  reservarOrcamento: boolean
  
  // Pedidos
  gestaoPedidos: boolean
  gerarPdfPedido: boolean
  gerarPdfEntrega: boolean
  definirEntregador: boolean
  cobrarOnline: boolean
  realizarPagamento: boolean
  baixaAutomaticaFinanceiro: boolean
  gerenciarFaturas: boolean
  consultarStatusFinanceiro: boolean
  atualizarStatusLogistico: boolean
  
  // Logística
  criarRotaLogistica: boolean
  gerenciarRotas: boolean
  visualizarLocalizacaoEntregadores: boolean
  conversarComEntregador: boolean
  visualizarAndamentoRota: boolean
  iniciarRota: boolean
  conversarComCliente: boolean
  
  // Produtos e Estoque
  gerenciarProdutos: boolean
  habilitarProdutoAluguel: boolean
  habilitarProdutoVenda: boolean
  gerenciarArmazens: boolean
  atualizarEstoqueAluguel: boolean
  atualizarEstoqueVenda: boolean
  consultarEstoqueAluguel: boolean
  consultarEstoqueVenda: boolean
  
  // Documentos
  emitirContrato: boolean
  emitirNfse: boolean
  emitirFaturaLocacao: boolean
  emitirNfeVenda: boolean
  emitirNfRemessa: boolean
  
  // Parceiros
  programaParceiros: boolean
  cobrarMaquininha: boolean
  
  // Outros
  relatorios: boolean
  documentacao: boolean
  cursoVideo: boolean
  chatbotIntegrado: boolean
  integracoesPersonalizadas: boolean
  acessoApi: boolean
}
