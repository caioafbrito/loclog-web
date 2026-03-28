"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Send, 
  Loader2,
  Ban
} from "lucide-react"
import { 
  QUOTATION_CANCELLATION_REASONS, 
  ORDER_CANCELLATION_REASONS 
} from "@/lib/types"
import type { QuotationStatus, OrderStatus } from "@/lib/types"

// Status labels e cores
export const quotationStatusConfig: Record<QuotationStatus, { label: string; color: string; icon: React.ReactNode }> = {
  draft: { label: "Rascunho", color: "bg-gray-100 text-gray-700", icon: <Clock className="h-3 w-3" /> },
  sent: { label: "Enviado", color: "bg-blue-100 text-blue-700", icon: <Send className="h-3 w-3" /> },
  approved: { label: "Aprovado", color: "bg-green-100 text-green-700", icon: <CheckCircle2 className="h-3 w-3" /> },
  rejected: { label: "Rejeitado", color: "bg-red-100 text-red-700", icon: <XCircle className="h-3 w-3" /> },
  expired: { label: "Expirado", color: "bg-amber-100 text-amber-700", icon: <AlertTriangle className="h-3 w-3" /> },
  cancelled: { label: "Cancelado", color: "bg-red-100 text-red-700", icon: <Ban className="h-3 w-3" /> },
}

export const orderStatusConfig: Record<OrderStatus, { label: string; color: string; icon: React.ReactNode }> = {
  pending: { label: "Pendente", color: "bg-amber-100 text-amber-700", icon: <Clock className="h-3 w-3" /> },
  confirmed: { label: "Confirmado", color: "bg-blue-100 text-blue-700", icon: <CheckCircle2 className="h-3 w-3" /> },
  in_progress: { label: "Em Andamento", color: "bg-purple-100 text-purple-700", icon: <Loader2 className="h-3 w-3" /> },
  delivered: { label: "Entregue", color: "bg-teal-100 text-teal-700", icon: <CheckCircle2 className="h-3 w-3" /> },
  completed: { label: "Concluído", color: "bg-green-100 text-green-700", icon: <CheckCircle2 className="h-3 w-3" /> },
  cancelled: { label: "Cancelado", color: "bg-red-100 text-red-700", icon: <Ban className="h-3 w-3" /> },
}

// Badge de status
interface StatusBadgeProps {
  status: QuotationStatus | OrderStatus
  type: "quotation" | "order"
}

export function StatusBadge({ status, type }: StatusBadgeProps) {
  const config = type === "quotation" 
    ? quotationStatusConfig[status as QuotationStatus] 
    : orderStatusConfig[status as OrderStatus]

  return (
    <Badge className={`${config.color} gap-1`}>
      {config.icon}
      {config.label}
    </Badge>
  )
}

// Modal de Cancelamento de Orçamento
interface CancelQuotationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  quotationId: string
  onConfirm: (reason: string, details?: string) => Promise<void>
}

export function CancelQuotationModal({ 
  open, 
  onOpenChange, 
  quotationId,
  onConfirm 
}: CancelQuotationModalProps) {
  const [reason, setReason] = useState("")
  const [details, setDetails] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleConfirm = async () => {
    if (!reason) return
    setIsLoading(true)
    try {
      await onConfirm(reason, details)
      onOpenChange(false)
      setReason("")
      setDetails("")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <Ban className="h-5 w-5" />
            Cancelar Orçamento
          </DialogTitle>
          <DialogDescription>
            Cancelar o orçamento <strong>{quotationId}</strong>. Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="reason">Motivo do Cancelamento *</Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o motivo..." />
              </SelectTrigger>
              <SelectContent>
                {QUOTATION_CANCELLATION_REASONS.map((r) => (
                  <SelectItem key={r.id} value={r.id}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="details">Detalhes Adicionais</Label>
            <Textarea
              id="details"
              placeholder="Informações adicionais sobre o cancelamento..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Voltar
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleConfirm}
            disabled={!reason || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cancelando...
              </>
            ) : (
              "Confirmar Cancelamento"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Modal de Cancelamento de Pedido
interface CancelOrderModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  orderId: string
  onConfirm: (reason: string, details?: string) => Promise<void>
}

export function CancelOrderModal({ 
  open, 
  onOpenChange, 
  orderId,
  onConfirm 
}: CancelOrderModalProps) {
  const [reason, setReason] = useState("")
  const [details, setDetails] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleConfirm = async () => {
    if (!reason) return
    setIsLoading(true)
    try {
      await onConfirm(reason, details)
      onOpenChange(false)
      setReason("")
      setDetails("")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <Ban className="h-5 w-5" />
            Cancelar Pedido
          </DialogTitle>
          <DialogDescription>
            Cancelar o pedido <strong>{orderId}</strong>. Esta ação não pode ser desfeita e pode afetar o estoque e financeiro.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="reason">Motivo do Cancelamento *</Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o motivo..." />
              </SelectTrigger>
              <SelectContent>
                {ORDER_CANCELLATION_REASONS.map((r) => (
                  <SelectItem key={r.id} value={r.id}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="details">Detalhes Adicionais</Label>
            <Textarea
              id="details"
              placeholder="Informações adicionais sobre o cancelamento..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Voltar
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleConfirm}
            disabled={!reason || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cancelando...
              </>
            ) : (
              "Confirmar Cancelamento"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Modal de Atualização de Status de Orçamento
interface UpdateQuotationStatusModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  quotationId: string
  currentStatus: QuotationStatus
  onConfirm: (newStatus: QuotationStatus) => Promise<void>
}

export function UpdateQuotationStatusModal({
  open,
  onOpenChange,
  quotationId,
  currentStatus,
  onConfirm
}: UpdateQuotationStatusModalProps) {
  const [newStatus, setNewStatus] = useState<QuotationStatus>(currentStatus)
  const [isLoading, setIsLoading] = useState(false)

  const availableStatuses: QuotationStatus[] = ["draft", "sent", "approved", "rejected", "expired"]

  const handleConfirm = async () => {
    if (newStatus === currentStatus) return
    setIsLoading(true)
    try {
      await onConfirm(newStatus)
      onOpenChange(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Atualizar Status do Orçamento</DialogTitle>
          <DialogDescription>
            Alterar o status do orçamento <strong>{quotationId}</strong>
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-2">
            <Label>Novo Status</Label>
            <Select value={newStatus} onValueChange={(v) => setNewStatus(v as QuotationStatus)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    <div className="flex items-center gap-2">
                      {quotationStatusConfig[status].icon}
                      {quotationStatusConfig[status].label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button 
            onClick={handleConfirm}
            disabled={newStatus === currentStatus || isLoading}
            className="bg-[#905BF4] hover:bg-[#4E2BCC]"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              "Salvar"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Modal de Atualização de Status de Pedido
interface UpdateOrderStatusModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  orderId: string
  currentStatus: OrderStatus
  onConfirm: (newStatus: OrderStatus) => Promise<void>
}

export function UpdateOrderStatusModal({
  open,
  onOpenChange,
  orderId,
  currentStatus,
  onConfirm
}: UpdateOrderStatusModalProps) {
  const [newStatus, setNewStatus] = useState<OrderStatus>(currentStatus)
  const [isLoading, setIsLoading] = useState(false)

  const availableStatuses: OrderStatus[] = ["pending", "confirmed", "in_progress", "delivered", "completed"]

  const handleConfirm = async () => {
    if (newStatus === currentStatus) return
    setIsLoading(true)
    try {
      await onConfirm(newStatus)
      onOpenChange(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Atualizar Status do Pedido</DialogTitle>
          <DialogDescription>
            Alterar o status do pedido <strong>{orderId}</strong>
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-2">
            <Label>Novo Status</Label>
            <Select value={newStatus} onValueChange={(v) => setNewStatus(v as OrderStatus)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    <div className="flex items-center gap-2">
                      {orderStatusConfig[status].icon}
                      {orderStatusConfig[status].label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button 
            onClick={handleConfirm}
            disabled={newStatus === currentStatus || isLoading}
            className="bg-[#905BF4] hover:bg-[#4E2BCC]"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              "Salvar"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Modal de Confirmação Genérico
interface ConfirmModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  variant?: "default" | "destructive"
  onConfirm: () => Promise<void>
}

export function ConfirmModal({
  open,
  onOpenChange,
  title,
  description,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "default",
  onConfirm
}: ConfirmModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleConfirm = async () => {
    setIsLoading(true)
    try {
      await onConfirm()
      onOpenChange(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className={variant === "destructive" ? "text-red-600" : ""}>
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {cancelText}
          </Button>
          <Button 
            variant={variant === "destructive" ? "destructive" : "default"}
            onClick={handleConfirm}
            disabled={isLoading}
            className={variant === "default" ? "bg-[#905BF4] hover:bg-[#4E2BCC]" : ""}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
