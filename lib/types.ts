// Tipos principais do sistema LocLog

// Planos e Entitlements
export type PlanType = "starter" | "pro" | "enterprise" | "develop"

export interface Plan {
  id: PlanType
  name: string
  price: number
  yearlyPrice: number
  features: string[]
  limits: PlanLimits
}

export interface PlanLimits {
  contacts: number | "unlimited"
  quotations: number | "unlimited"
  orders: number | "unlimited"
  warehouses: number | "unlimited"
  products: number | "unlimited"
  users: number | "unlimited"
  partners: number | "unlimited"
  apiRequests: number | "unlimited"
}

export interface Additional {
  id: string
  name: string
  monthlyPrice: number
  setupPrice?: number
  transactionFee?: number
  description: string
  category: "monthly" | "setup" | "transaction"
}

export interface Package {
  id: string
  name: string
  price: number
  discount: string
  includes: string[]
}

// Contatos
export type ContactType = "client" | "supplier" | "partner" | "lead"

export interface Contact {
  id: string
  name: string
  email: string
  phone: string
  type: ContactType
  document?: string
  address?: string
  city?: string
  state?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

// Orçamentos
export type QuotationStatus = "draft" | "sent" | "approved" | "rejected" | "expired" | "cancelled"

export interface QuotationItem {
  productId: string
  productName: string
  quantity: number
  unitPrice: number
  subtotal: number
}

export interface Quotation {
  id: string
  contactId: string
  contactName: string
  items: QuotationItem[]
  subtotal: number
  discount: number
  total: number
  status: QuotationStatus
  validUntil: string
  notes?: string
  sentVia?: "whatsapp" | "email" | "presencial"
  cancellationReason?: string
  createdAt: string
  updatedAt: string
}

// Motivos de cancelamento de orçamento
export const QUOTATION_CANCELLATION_REASONS = [
  { id: "cheaper_competitor", label: "Concorrência mais barata" },
  { id: "slow_response", label: "Atendimento demorado" },
  { id: "client_changed_mind", label: "Cliente mudou de ideia" },
  { id: "budget_issues", label: "Problemas de orçamento do cliente" },
  { id: "event_cancelled", label: "Evento cancelado" },
  { id: "found_alternative", label: "Cliente encontrou alternativa" },
  { id: "no_availability", label: "Sem disponibilidade de estoque" },
  { id: "price_negotiation_failed", label: "Negociação de preço não aceita" },
  { id: "delivery_area", label: "Fora da área de entrega" },
  { id: "other", label: "Outro motivo" },
] as const

// Pedidos
export type OrderStatus = "pending" | "confirmed" | "in_progress" | "delivered" | "completed" | "cancelled"
export type PaymentStatus = "pending" | "partial" | "paid" | "refunded" | "cancelled"
export type DeliveryPriority = "commercial_hours" | "custom_period" | "specific_interval" | "fixed_time"

export interface OrderItem {
  productId: string
  productName: string
  quantity: number
  unitPrice: number
  subtotal: number
}

export interface Order {
  id: string
  quotationId?: string
  contactId: string
  contactName: string
  contactPhone: string
  items: OrderItem[]
  subtotal: number
  deliveryFee: number
  discount: number
  total: number
  status: OrderStatus
  paymentStatus: PaymentStatus
  deliveryAddress: string
  deliveryDate: string
  deliveryTime: string
  deliveryPriority: DeliveryPriority
  pickupDate: string
  pickupTime: string
  deliveryPersonId?: string
  deliveryPersonName?: string
  notes?: string
  cancellationReason?: string
  createdAt: string
  updatedAt: string
}

// Motivos de cancelamento de pedido
export const ORDER_CANCELLATION_REASONS = [
  { id: "support_delay", label: "Demora na resposta do suporte" },
  { id: "delivery_delay", label: "Entrega atrasada" },
  { id: "event_cancelled", label: "Evento cancelado" },
  { id: "wrong_items", label: "Itens errados entregues" },
  { id: "damaged_items", label: "Itens danificados" },
  { id: "payment_issues", label: "Problemas com pagamento" },
  { id: "client_no_show", label: "Cliente não compareceu" },
  { id: "weather_conditions", label: "Condições climáticas" },
  { id: "address_issues", label: "Problemas com endereço" },
  { id: "client_request", label: "Solicitação do cliente" },
  { id: "inventory_shortage", label: "Falta de estoque" },
  { id: "operational_issues", label: "Problemas operacionais" },
  { id: "other", label: "Outro motivo" },
] as const

// Produtos
export interface Product {
  id: string
  name: string
  description?: string
  category: string
  costPrice: number
  rentalPrice: number
  salePrice?: number
  stockQuantity: number
  minStock: number
  unit: string
  warehouseId: string
  warehouseName: string
  imageUrl?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// Armazéns
export interface Warehouse {
  id: string
  name: string
  address: string
  city: string
  state: string
  capacity: number
  usedCapacity: number
  isMain: boolean
  responsibleName?: string
  responsiblePhone?: string
  createdAt: string
  updatedAt: string
}

// Faturas
export type InvoiceStatus = "pending" | "partial" | "paid" | "overdue" | "cancelled"

export interface Invoice {
  id: string
  orderId: string
  contactId: string
  contactName: string
  amount: number
  paidAmount: number
  status: InvoiceStatus
  dueDate: string
  paidAt?: string
  paymentMethod?: "pix" | "card" | "cash" | "boleto" | "transfer"
  createdAt: string
  updatedAt: string
}

// Parceiros
export type PartnerRole = "provider" | "deliverer" | "both"
export type PartnerStatus = "pending" | "active" | "inactive"

export interface Partner {
  id: string
  name: string
  companyName: string
  email: string
  phone: string
  role: PartnerRole
  status: PartnerStatus
  totalOrders: number
  totalRevenue: number
  balance: number
  createdAt: string
  updatedAt: string
}

// Usuário e Empresa
export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: "admin" | "manager" | "operator" | "delivery"
  avatarUrl?: string
  isActive: boolean
  createdAt: string
}

export interface Company {
  id: string
  name: string
  tradeName: string
  document: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  logoUrl?: string
  plan: PlanType
  additionals: string[]
  packages: string[]
  workingHours: WorkingHours
  createdAt: string
}

export interface WorkingHours {
  monday: DaySchedule
  tuesday: DaySchedule
  wednesday: DaySchedule
  thursday: DaySchedule
  friday: DaySchedule
  saturday: DaySchedule
  sunday: DaySchedule
}

export interface DaySchedule {
  isOpen: boolean
  morningStart?: string
  morningEnd?: string
  afternoonStart?: string
  afternoonEnd?: string
}

// Entitlements baseados no plano
export interface Entitlements {
  plan: PlanType
  additionals: string[]
  packages: string[]
  features: {
    contacts: boolean
    quotations: boolean
    orders: boolean
    logistics: boolean
    inventory: boolean
    warehouses: boolean
    stock: boolean
    financial: boolean
    accounting: boolean
    partners: boolean
    reports: boolean
    api: boolean
    whatsappBot: boolean
    multiUsers: boolean
    customBranding: boolean
    prioritySupport: boolean
  }
  limits: PlanLimits
}
