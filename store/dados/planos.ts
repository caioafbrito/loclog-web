/**
 * Dados dos Planos conforme Planilha de Precificação
 * Mapeamento exato das funcionalidades por plano
 */

import type { 
  Plano, 
  Adicional, 
  Pacote, 
  NomePlano,
  NomeAdicional,
  NomePacote,
  Entitlements,
  ConfiguracaoOrganizacao
} from '../tipos/plano'

// ============================================================
// PLANOS
// ============================================================

export const PLANOS: Record<NomePlano, Plano> = {
  starter: {
    id: 'starter',
    nome: 'Starter',
    mensalidade: 249,
    anuidade: 199,
    descontoAnual: 20,
    disponivel: true,
    dataPrevisao: 'Lançamento',
    limites: {
      maximoReservas: 150,
      excedentePorReserva: 2.00,
      valorLimiteCobranca: 449,
      maximoUsuarios: 1,
      excedentePorUsuario: 59,
    },
    funcionalidades: {
      gestaoContatos: true,
      gestaoUsuarios: false,
      gestaoEquipe: false,
      gestaoOrcamentos: true,
      gerarPdfOrcamento: true,
      gerarTextoOrcamento: true,
      reservarOrcamento: true,
      gestaoPedidos: true,
      gerarPdfPedido: true,
      gerarPdfEntrega: false,
      definirEntregador: false,
      cobrarOnline: true,
      realizarPagamento: false,
      baixaAutomaticaFinanceiro: true,
      gerenciarFaturas: true,
      consultarStatusFinanceiro: true,
      atualizarStatusLogistico: true,
      criarRotaLogistica: false,
      gerenciarRotas: false,
      visualizarLocalizacaoEntregadores: false,
      conversarComEntregador: false,
      visualizarAndamentoRota: false,
      iniciarRota: false,
      conversarComCliente: false,
      gerenciarProdutos: true,
      habilitarProdutoAluguel: true,
      habilitarProdutoVenda: false,
      gerenciarArmazens: false,
      atualizarEstoqueAluguel: false,
      atualizarEstoqueVenda: false,
      consultarEstoqueAluguel: false,
      consultarEstoqueVenda: false,
      emitirContrato: true,
      relatorios: false,
      documentacao: true,
      cursoVideo: false,
      integracoesPersonalizadas: false,
      acessoApi: false,
    },
    sla: {
      p1: '4 horas',
      p2: '8 horas',
      p3: '2 dias úteis',
    },
    canaisAtendimento: ['WhatsApp', 'Instagram', 'Messenger', 'E-mail'],
  },

  pro: {
    id: 'pro',
    nome: 'Pro',
    mensalidade: 449,
    anuidade: 379,
    descontoAnual: 15,
    disponivel: true,
    dataPrevisao: 'Lançamento',
    limites: {
      maximoReservas: 500,
      excedentePorReserva: 1.50,
      valorLimiteCobranca: 749,
      maximoUsuarios: 5,
      excedentePorUsuario: 59,
    },
    funcionalidades: {
      gestaoContatos: true,
      gestaoUsuarios: true,
      gestaoEquipe: false,
      gestaoOrcamentos: true,
      gerarPdfOrcamento: true,
      gerarTextoOrcamento: true,
      reservarOrcamento: true,
      gestaoPedidos: true,
      gerarPdfPedido: true,
      gerarPdfEntrega: true,
      definirEntregador: true,
      cobrarOnline: true,
      realizarPagamento: false,
      baixaAutomaticaFinanceiro: true,
      gerenciarFaturas: true,
      consultarStatusFinanceiro: true,
      atualizarStatusLogistico: true,
      criarRotaLogistica: true,
      gerenciarRotas: true,
      visualizarLocalizacaoEntregadores: true,
      conversarComEntregador: true,
      visualizarAndamentoRota: true,
      iniciarRota: true,
      conversarComCliente: false,
      gerenciarProdutos: true,
      habilitarProdutoAluguel: true,
      habilitarProdutoVenda: true,
      gerenciarArmazens: false,
      atualizarEstoqueAluguel: true,
      atualizarEstoqueVenda: true,
      consultarEstoqueAluguel: true,
      consultarEstoqueVenda: true,
      emitirContrato: true,
      relatorios: true,
      documentacao: true,
      cursoVideo: false,
      integracoesPersonalizadas: false,
      acessoApi: false,
    },
    sla: {
      p1: '2 horas',
      p2: '4 horas',
      p3: '1 dia útil',
    },
    canaisAtendimento: ['WhatsApp', 'Instagram', 'Messenger', 'E-mail'],
  },

  enterprise: {
    id: 'enterprise',
    nome: 'Enterprise',
    mensalidade: 749,
    anuidade: 639,
    descontoAnual: 15,
    disponivel: false,
    dataPrevisao: 'Janeiro 2027',
    limites: {
      maximoReservas: 'ilimitado',
      excedentePorReserva: null,
      valorLimiteCobranca: null,
      maximoUsuarios: 'ilimitado',
      excedentePorUsuario: null,
    },
    funcionalidades: {
      gestaoContatos: true,
      gestaoUsuarios: true,
      gestaoEquipe: true,
      gestaoOrcamentos: true,
      gerarPdfOrcamento: true,
      gerarTextoOrcamento: true,
      reservarOrcamento: true,
      gestaoPedidos: true,
      gerarPdfPedido: true,
      gerarPdfEntrega: true,
      definirEntregador: true,
      cobrarOnline: true,
      realizarPagamento: true,
      baixaAutomaticaFinanceiro: true,
      gerenciarFaturas: true,
      consultarStatusFinanceiro: true,
      atualizarStatusLogistico: true,
      criarRotaLogistica: true,
      gerenciarRotas: true,
      visualizarLocalizacaoEntregadores: true,
      conversarComEntregador: true,
      visualizarAndamentoRota: true,
      iniciarRota: true,
      conversarComCliente: true,
      gerenciarProdutos: true,
      habilitarProdutoAluguel: true,
      habilitarProdutoVenda: true,
      gerenciarArmazens: true,
      atualizarEstoqueAluguel: true,
      atualizarEstoqueVenda: true,
      consultarEstoqueAluguel: true,
      consultarEstoqueVenda: true,
      emitirContrato: true,
      relatorios: true,
      documentacao: true,
      cursoVideo: true,
      integracoesPersonalizadas: false,
      acessoApi: false,
    },
    sla: {
      p1: '1 hora',
      p2: '2 horas',
      p3: '4 horas',
    },
    canaisAtendimento: ['WhatsApp', 'Instagram', 'Messenger', 'E-mail'],
  },

  develop: {
    id: 'develop',
    nome: 'Develop',
    mensalidade: null,
    anuidade: null,
    descontoAnual: 0,
    disponivel: false,
    dataPrevisao: 'Julho 2027',
    limites: {
      maximoReservas: 'ilimitado',
      excedentePorReserva: null,
      valorLimiteCobranca: null,
      maximoUsuarios: 'ilimitado',
      excedentePorUsuario: null,
    },
    funcionalidades: {
      gestaoContatos: true,
      gestaoUsuarios: true,
      gestaoEquipe: true,
      gestaoOrcamentos: true,
      gerarPdfOrcamento: true,
      gerarTextoOrcamento: true,
      reservarOrcamento: true,
      gestaoPedidos: true,
      gerarPdfPedido: true,
      gerarPdfEntrega: true,
      definirEntregador: true,
      cobrarOnline: true,
      realizarPagamento: true,
      baixaAutomaticaFinanceiro: true,
      gerenciarFaturas: true,
      consultarStatusFinanceiro: true,
      atualizarStatusLogistico: true,
      criarRotaLogistica: true,
      gerenciarRotas: true,
      visualizarLocalizacaoEntregadores: true,
      conversarComEntregador: true,
      visualizarAndamentoRota: true,
      iniciarRota: true,
      conversarComCliente: true,
      gerenciarProdutos: true,
      habilitarProdutoAluguel: true,
      habilitarProdutoVenda: true,
      gerenciarArmazens: true,
      atualizarEstoqueAluguel: true,
      atualizarEstoqueVenda: true,
      consultarEstoqueAluguel: true,
      consultarEstoqueVenda: true,
      emitirContrato: true,
      relatorios: true,
      documentacao: true,
      cursoVideo: true,
      integracoesPersonalizadas: true,
      acessoApi: true,
    },
    sla: {
      p1: 'Personalizado',
      p2: 'Personalizado',
      p3: 'Personalizado',
    },
    canaisAtendimento: ['WhatsApp', 'Instagram', 'Messenger', 'E-mail'],
  },
}

// ============================================================
// ADICIONAIS AVULSOS
// ============================================================

export const ADICIONAIS: Record<NomeAdicional, Adicional> = {
  emitir_nfse: {
    id: 'emitir_nfse',
    nome: 'Emitir NFSe',
    disponivelLancamento: true,
    valorMensal: 60,
    taxaTransacional: null,
    valorImplantacao: null,
  },
  emitir_fatura_locacao: {
    id: 'emitir_fatura_locacao',
    nome: 'Emitir Fatura de Locação',
    disponivelLancamento: true,
    valorMensal: 20,
    taxaTransacional: null,
    valorImplantacao: null,
  },
  emitir_nfe_venda: {
    id: 'emitir_nfe_venda',
    nome: 'Emitir NFe (Venda)',
    disponivelLancamento: true,
    valorMensal: 60,
    taxaTransacional: null,
    valorImplantacao: null,
  },
  emitir_nf_remessa: {
    id: 'emitir_nf_remessa',
    nome: 'Emitir NF de Remessa de Bens',
    disponivelLancamento: true,
    valorMensal: 60,
    taxaTransacional: null,
    valorImplantacao: null,
  },
  programa_parceiros: {
    id: 'programa_parceiros',
    nome: 'Programa de Parceiros',
    disponivelLancamento: false,
    valorMensal: null,
    taxaTransacional: '5% por pedido recebido + Taxa Stone',
    valorImplantacao: null,
  },
  cobrar_maquininha: {
    id: 'cobrar_maquininha',
    nome: 'Cobrar com Maquininha',
    disponivelLancamento: false,
    valorMensal: 80,
    taxaTransacional: 'Taxa Stone',
    valorImplantacao: null,
  },
  chatbot_integrado: {
    id: 'chatbot_integrado',
    nome: 'Chatbot Integrado',
    disponivelLancamento: false,
    valorMensal: 400,
    taxaTransacional: null,
    valorImplantacao: 1200,
  },
}

// ============================================================
// PACOTES
// ============================================================

export const PACOTES: Record<NomePacote, Pacote> = {
  pacote_contabil: {
    id: 'pacote_contabil',
    nome: 'Pacote Contábil',
    disponivelLancamento: true,
    valorMensal: 149,
    taxaTransacional: null,
    adicionaisInclusos: ['emitir_nfse', 'emitir_nfe_venda', 'emitir_nf_remessa', 'emitir_fatura_locacao'],
  },
  pacote_parceiro_preparado: {
    id: 'pacote_parceiro_preparado',
    nome: 'Pacote Parceiro Preparado',
    disponivelLancamento: false,
    valorMensal: null,
    taxaTransacional: '5% por pedido recebido + Taxa Stone',
    adicionaisInclusos: ['programa_parceiros', 'cobrar_maquininha'],
  },
}

// ============================================================
// CALCULADOR DE ENTITLEMENTS
// ============================================================

export function calcularEntitlements(config: ConfiguracaoOrganizacao): Entitlements {
  const plano = PLANOS[config.plano]
  const funcionalidades = plano.funcionalidades

  // Adicionais diretos
  const temAdicionalNfse = config.adicionais.includes('emitir_nfse')
  const temAdicionalFaturaLocacao = config.adicionais.includes('emitir_fatura_locacao')
  const temAdicionalNfeVenda = config.adicionais.includes('emitir_nfe_venda')
  const temAdicionalNfRemessa = config.adicionais.includes('emitir_nf_remessa')
  const temAdicionalParceiros = config.adicionais.includes('programa_parceiros')
  const temAdicionalMaquininha = config.adicionais.includes('cobrar_maquininha')
  const temAdicionalChatbot = config.adicionais.includes('chatbot_integrado')

  // Pacotes
  const temPacoteContabil = config.pacotes.includes('pacote_contabil')
  const temPacoteParceiroPreparado = config.pacotes.includes('pacote_parceiro_preparado')

  return {
    // Gestão Básica
    gestaoContatos: funcionalidades.gestaoContatos,
    gestaoUsuarios: funcionalidades.gestaoUsuarios,
    gestaoEquipe: funcionalidades.gestaoEquipe,

    // Orçamentos
    gestaoOrcamentos: funcionalidades.gestaoOrcamentos,
    gerarPdfOrcamento: funcionalidades.gerarPdfOrcamento,
    gerarTextoOrcamento: funcionalidades.gerarTextoOrcamento,
    reservarOrcamento: funcionalidades.reservarOrcamento,

    // Pedidos
    gestaoPedidos: funcionalidades.gestaoPedidos,
    gerarPdfPedido: funcionalidades.gerarPdfPedido,
    gerarPdfEntrega: funcionalidades.gerarPdfEntrega,
    definirEntregador: funcionalidades.definirEntregador,
    cobrarOnline: funcionalidades.cobrarOnline,
    realizarPagamento: funcionalidades.realizarPagamento,
    baixaAutomaticaFinanceiro: funcionalidades.baixaAutomaticaFinanceiro,
    gerenciarFaturas: funcionalidades.gerenciarFaturas,
    consultarStatusFinanceiro: funcionalidades.consultarStatusFinanceiro,
    atualizarStatusLogistico: funcionalidades.atualizarStatusLogistico,

    // Logística
    criarRotaLogistica: funcionalidades.criarRotaLogistica,
    gerenciarRotas: funcionalidades.gerenciarRotas,
    visualizarLocalizacaoEntregadores: funcionalidades.visualizarLocalizacaoEntregadores,
    conversarComEntregador: funcionalidades.conversarComEntregador,
    visualizarAndamentoRota: funcionalidades.visualizarAndamentoRota,
    iniciarRota: funcionalidades.iniciarRota,
    conversarComCliente: funcionalidades.conversarComCliente,

    // Produtos e Estoque
    gerenciarProdutos: funcionalidades.gerenciarProdutos,
    habilitarProdutoAluguel: funcionalidades.habilitarProdutoAluguel,
    habilitarProdutoVenda: funcionalidades.habilitarProdutoVenda,
    gerenciarArmazens: funcionalidades.gerenciarArmazens,
    atualizarEstoqueAluguel: funcionalidades.atualizarEstoqueAluguel,
    atualizarEstoqueVenda: funcionalidades.atualizarEstoqueVenda,
    consultarEstoqueAluguel: funcionalidades.consultarEstoqueAluguel,
    consultarEstoqueVenda: funcionalidades.consultarEstoqueVenda,

    // Documentos (plano + adicionais + pacotes)
    emitirContrato: funcionalidades.emitirContrato,
    emitirNfse: temAdicionalNfse || temPacoteContabil,
    emitirFaturaLocacao: temAdicionalFaturaLocacao || temPacoteContabil,
    emitirNfeVenda: temAdicionalNfeVenda || temPacoteContabil,
    emitirNfRemessa: temAdicionalNfRemessa || temPacoteContabil,

    // Parceiros (adicionais + pacotes)
    programaParceiros: temAdicionalParceiros || temPacoteParceiroPreparado,
    cobrarMaquininha: temAdicionalMaquininha || temPacoteParceiroPreparado,

    // Outros
    relatorios: funcionalidades.relatorios,
    documentacao: funcionalidades.documentacao,
    cursoVideo: funcionalidades.cursoVideo,
    chatbotIntegrado: temAdicionalChatbot,
    integracoesPersonalizadas: funcionalidades.integracoesPersonalizadas,
    acessoApi: funcionalidades.acessoApi,
  }
}

// ============================================================
// HELPERS
// ============================================================

export function obterPlanoMinimo(funcionalidade: keyof Entitlements): NomePlano | null {
  const ordem: NomePlano[] = ['starter', 'pro', 'enterprise', 'develop']
  
  for (const planoId of ordem) {
    const config: ConfiguracaoOrganizacao = {
      plano: planoId,
      adicionais: [],
      pacotes: [],
    }
    const entitlements = calcularEntitlements(config)
    if (entitlements[funcionalidade]) {
      return planoId
    }
  }
  return null
}

export function obterAdicionalParaFuncionalidade(funcionalidade: keyof Entitlements): NomeAdicional | NomePacote | null {
  const mapeamento: Partial<Record<keyof Entitlements, NomeAdicional | NomePacote>> = {
    emitirNfse: 'emitir_nfse',
    emitirFaturaLocacao: 'emitir_fatura_locacao',
    emitirNfeVenda: 'emitir_nfe_venda',
    emitirNfRemessa: 'emitir_nf_remessa',
    programaParceiros: 'programa_parceiros',
    cobrarMaquininha: 'cobrar_maquininha',
    chatbotIntegrado: 'chatbot_integrado',
  }
  return mapeamento[funcionalidade] || null
}
