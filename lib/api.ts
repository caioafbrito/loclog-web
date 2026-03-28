// API Service - Se não configurada, usa dados mockados

import { 
  mockContacts, 
  mockQuotations, 
  mockOrders, 
  mockProducts, 
  mockWarehouses,
  mockInvoices,
  mockPartners,
  mockUsers,
  mockCompany,
  PLANS,
  ADDITIONALS,
  PACKAGES,
  getEntitlements
} from "./mock-data"

import type {
  Contact,
  Quotation,
  Order,
  Product,
  Warehouse,
  Invoice,
  Partner,
  User,
  Company,
  Plan,
  Additional,
  Package,
  Entitlements,
  PlanType
} from "./types"

// Verifica se a API está configurada
const API_URL = process.env.NEXT_PUBLIC_API_URL
const IS_API_CONFIGURED = !!API_URL && API_URL !== "undefined"

// Helper para simular delay de API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Simula resposta da API
async function mockFetch<T>(data: T, delayMs = 300): Promise<T> {
  await delay(delayMs)
  return data
}

// Clone para evitar mutação direta
function clone<T>(data: T): T {
  return JSON.parse(JSON.stringify(data))
}

// Storage local para dados mockados (simula persistência)
let contacts = clone(mockContacts)
let quotations = clone(mockQuotations)
let orders = clone(mockOrders)
let products = clone(mockProducts)
let warehouses = clone(mockWarehouses)
let invoices = clone(mockInvoices)
let partners = clone(mockPartners)
let users = clone(mockUsers)
let company = clone(mockCompany)

// ==================== CONTACTS ====================
export const contactsApi = {
  async getAll(): Promise<Contact[]> {
    if (IS_API_CONFIGURED) {
      const res = await fetch(`${API_URL}/contacts`)
      return res.json()
    }
    return mockFetch(contacts)
  },

  async getById(id: string): Promise<Contact | null> {
    if (IS_API_CONFIGURED) {
      const res = await fetch(`${API_URL}/contacts/${id}`)
      return res.json()
    }
    return mockFetch(contacts.find(c => c.id === id) || null)
  },

  async create(data: Omit<Contact, "id" | "createdAt" | "updatedAt">): Promise<Contact> {
    if (IS_API_CONFIGURED) {
      const res = await fetch(`${API_URL}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      return res.json()
    }
    const newContact: Contact = {
      ...data,
      id: `c${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    }
    contacts.push(newContact)
    return mockFetch(newContact)
  },

  async update(id: string, data: Partial<Contact>): Promise<Contact> {
    if (IS_API_CONFIGURED) {
      const res = await fetch(`${API_URL}/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      return res.json()
    }
    const index = contacts.findIndex(c => c.id === id)
    if (index !== -1) {
      contacts[index] = { ...contacts[index], ...data, updatedAt: new Date().toISOString().split("T")[0] }
    }
    return mockFetch(contacts[index])
  },

  async delete(id: string): Promise<void> {
    if (IS_API_CONFIGURED) {
      await fetch(`${API_URL}/contacts/${id}`, { method: "DELETE" })
      return
    }
    contacts = contacts.filter(c => c.id !== id)
    return mockFetch(undefined)
  }
}

// ==================== QUOTATIONS ====================
export const quotationsApi = {
  async getAll(): Promise<Quotation[]> {
    if (IS_API_CONFIGURED) {
      const res = await fetch(`${API_URL}/quotations`)
      return res.json()
    }
    return mockFetch(quotations)
  },

  async getById(id: string): Promise<Quotation | null> {
    if (IS_API_CONFIGURED) {
      const res = await fetch(`${API_URL}/quotations/${id}`)
      return res.json()
    }
    return mockFetch(quotations.find(q => q.id === id) || null)
  },

  async create(data: Omit<Quotation, "id" | "createdAt" | "updatedAt">): Promise<Quotation> {
    if (IS_API_CONFIGURED) {
      const res = await fetch(`${API_URL}/quotations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      return res.json()
    }
    const newQuotation: Quotation = {
      ...data,
      id: `Q-${Date.now().toString().slice(-3)}`,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    }
    quotations.unshift(newQuotation)
    return mockFetch(newQuotation)
  },

  async update(id: string, data: Partial<Quotation>): Promise<Quotation> {
    if (IS_API_CONFIGURED) {
      const res = await fetch(`${API_URL}/quotations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      return res.json()
    }
    const index = quotations.findIndex(q => q.id === id)
    if (index !== -1) {
      quotations[index] = { ...quotations[index], ...data, updatedAt: new Date().toISOString().split("T")[0] }
    }
    return mockFetch(quotations[index])
  },

  async updateStatus(id: string, status: Quotation["status"], cancellationReason?: string): Promise<Quotation> {
    return this.update(id, { status, cancellationReason })
  },

  async delete(id: string): Promise<void> {
    if (IS_API_CONFIGURED) {
      await fetch(`${API_URL}/quotations/${id}`, { method: "DELETE" })
      return
    }
    quotations = quotations.filter(q => q.id !== id)
    return mockFetch(undefined)
  },

  async convertToOrder(id: string): Promise<Order> {
    const quotation = quotations.find(q => q.id === id)
    if (!quotation) throw new Error("Orçamento não encontrado")
    
    const contact = contacts.find(c => c.id === quotation.contactId)
    
    const newOrder: Order = {
      id: `PED-${Date.now().toString().slice(-4)}`,
      quotationId: id,
      contactId: quotation.contactId,
      contactName: quotation.contactName,
      contactPhone: contact?.phone || "",
      items: quotation.items,
      subtotal: quotation.subtotal,
      deliveryFee: 0,
      discount: quotation.discount,
      total: quotation.total,
      status: "pending",
      paymentStatus: "pending",
      deliveryAddress: contact?.address || "",
      deliveryDate: "",
      deliveryTime: "",
      deliveryPriority: "commercial_hours",
      pickupDate: "",
      pickupTime: "",
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    }
    
    orders.unshift(newOrder)
    await this.updateStatus(id, "approved")
    
    return mockFetch(newOrder)
  }
}

// ==================== ORDERS ====================
export const ordersApi = {
  async getAll(): Promise<Order[]> {
    if (IS_API_CONFIGURED) {
      const res = await fetch(`${API_URL}/orders`)
      return res.json()
    }
    return mockFetch(orders)
  },

  async getById(id: string): Promise<Order | null> {
    if (IS_API_CONFIGURED) {
      const res = await fetch(`${API_URL}/orders/${id}`)
      return res.json()
    }
    return mockFetch(orders.find(o => o.id === id) || null)
  },

  async create(data: Omit<Order, "id" | "createdAt" | "updatedAt">): Promise<Order> {
    if (IS_API_CONFIGURED) {
      const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      return res.json()
    }
    const newOrder: Order = {
      ...data,
      id: `PED-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    }
    orders.unshift(newOrder)
    return mockFetch(newOrder)
  },

  async update(id: string, data: Partial<Order>): Promise<Order> {
    if (IS_API_CONFIGURED) {
      const res = await fetch(`${API_URL}/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      return res.json()
    }
    const index = orders.findIndex(o => o.id === id)
    if (index !== -1) {
      orders[index] = { ...orders[index], ...data, updatedAt: new Date().toISOString().split("T")[0] }
    }
    return mockFetch(orders[index])
  },

  async updateStatus(id: string, status: Order["status"], cancellationReason?: string): Promise<Order> {
    return this.update(id, { status, cancellationReason })
  },

  async updatePaymentStatus(id: string, paymentStatus: Order["paymentStatus"]): Promise<Order> {
    return this.update(id, { paymentStatus })
  },

  async delete(id: string): Promise<void> {
    if (IS_API_CONFIGURED) {
      await fetch(`${API_URL}/orders/${id}`, { method: "DELETE" })
      return
    }
    orders = orders.filter(o => o.id !== id)
    return mockFetch(undefined)
  }
}

// ==================== PRODUCTS ====================
export const productsApi = {
  async getAll(): Promise<Product[]> {
    if (IS_API_CONFIGURED) {
      const res = await fetch(`${API_URL}/products`)
      return res.json()
    }
    return mockFetch(products)
  },

  async getById(id: string): Promise<Product | null> {
    return mockFetch(products.find(p => p.id === id) || null)
  },

  async create(data: Omit<Product, "id" | "createdAt" | "updatedAt">): Promise<Product> {
    const newProduct: Product = {
      ...data,
      id: `p${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    }
    products.push(newProduct)
    return mockFetch(newProduct)
  },

  async update(id: string, data: Partial<Product>): Promise<Product> {
    const index = products.findIndex(p => p.id === id)
    if (index !== -1) {
      products[index] = { ...products[index], ...data, updatedAt: new Date().toISOString().split("T")[0] }
    }
    return mockFetch(products[index])
  },

  async delete(id: string): Promise<void> {
    products = products.filter(p => p.id !== id)
    return mockFetch(undefined)
  }
}

// ==================== WAREHOUSES ====================
export const warehousesApi = {
  async getAll(): Promise<Warehouse[]> {
    return mockFetch(warehouses)
  },

  async create(data: Omit<Warehouse, "id" | "createdAt" | "updatedAt">): Promise<Warehouse> {
    const newWarehouse: Warehouse = {
      ...data,
      id: `w${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    }
    warehouses.push(newWarehouse)
    return mockFetch(newWarehouse)
  },

  async update(id: string, data: Partial<Warehouse>): Promise<Warehouse> {
    const index = warehouses.findIndex(w => w.id === id)
    if (index !== -1) {
      warehouses[index] = { ...warehouses[index], ...data, updatedAt: new Date().toISOString().split("T")[0] }
    }
    return mockFetch(warehouses[index])
  },

  async delete(id: string): Promise<void> {
    warehouses = warehouses.filter(w => w.id !== id)
    return mockFetch(undefined)
  }
}

// ==================== INVOICES ====================
export const invoicesApi = {
  async getAll(): Promise<Invoice[]> {
    return mockFetch(invoices)
  },

  async updateStatus(id: string, status: Invoice["status"], paymentMethod?: Invoice["paymentMethod"]): Promise<Invoice> {
    const index = invoices.findIndex(i => i.id === id)
    if (index !== -1) {
      invoices[index] = { 
        ...invoices[index], 
        status, 
        paymentMethod,
        paidAt: status === "paid" ? new Date().toISOString().split("T")[0] : undefined,
        paidAmount: status === "paid" ? invoices[index].amount : invoices[index].paidAmount,
        updatedAt: new Date().toISOString().split("T")[0] 
      }
    }
    return mockFetch(invoices[index])
  }
}

// ==================== PARTNERS ====================
export const partnersApi = {
  async getAll(): Promise<Partner[]> {
    return mockFetch(partners)
  },

  async create(data: Omit<Partner, "id" | "createdAt" | "updatedAt" | "totalOrders" | "totalRevenue" | "balance">): Promise<Partner> {
    const newPartner: Partner = {
      ...data,
      id: `pr${Date.now()}`,
      totalOrders: 0,
      totalRevenue: 0,
      balance: 0,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    }
    partners.push(newPartner)
    return mockFetch(newPartner)
  },

  async updateStatus(id: string, status: Partner["status"]): Promise<Partner> {
    const index = partners.findIndex(p => p.id === id)
    if (index !== -1) {
      partners[index] = { ...partners[index], status, updatedAt: new Date().toISOString().split("T")[0] }
    }
    return mockFetch(partners[index])
  }
}

// ==================== COMPANY & ENTITLEMENTS ====================
export const companyApi = {
  async get(): Promise<Company> {
    return mockFetch(company)
  },

  async update(data: Partial<Company>): Promise<Company> {
    company = { ...company, ...data }
    return mockFetch(company)
  },

  async getEntitlements(): Promise<Entitlements> {
    return mockFetch(getEntitlements(company.plan, company.additionals, company.packages))
  },

  async updatePlan(plan: PlanType, additionals: string[] = [], packages: string[] = []): Promise<Company> {
    company = { ...company, plan, additionals, packages }
    return mockFetch(company)
  }
}

// ==================== PLANS & ADDITIONALS ====================
export const plansApi = {
  async getAll(): Promise<Plan[]> {
    return mockFetch(PLANS)
  },

  async getAdditionals(): Promise<Additional[]> {
    return mockFetch(ADDITIONALS)
  },

  async getPackages(): Promise<Package[]> {
    return mockFetch(PACKAGES)
  }
}

// Export all APIs
export const api = {
  contacts: contactsApi,
  quotations: quotationsApi,
  orders: ordersApi,
  products: productsApi,
  warehouses: warehousesApi,
  invoices: invoicesApi,
  partners: partnersApi,
  company: companyApi,
  plans: plansApi,
}

export default api
