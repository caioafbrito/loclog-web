"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  ArrowLeft, 
  Package,
  ImagePlus,
  Save,
  Loader2,
  DollarSign,
  Hash,
  Boxes,
  Tag,
  Plus,
  X
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const categories = [
  { id: "mobiliario", name: "Mobiliário" },
  { id: "decoracao", name: "Decoração" },
  { id: "iluminacao", name: "Iluminação" },
  { id: "utensílios", name: "Utensílios" },
  { id: "textil", name: "Têxtil" },
  { id: "estrutura", name: "Estrutura" },
]

const warehouses = [
  { id: "1", name: "Armazém Central" },
  { id: "2", name: "Filial Zona Sul" },
  { id: "3", name: "Filial Zona Norte" },
]

export default function NovoProdutoPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    description: "",
    dailyPrice: "",
    weeklyPrice: "",
    monthlyPrice: "",
    quantity: "",
    minStock: "",
    warehouse: "",
    isActive: true,
    condition: "new",
    notes: "",
  })

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag))
  }

  const handleSubmit = async () => {
    if (!formData.name || !formData.category || !formData.dailyPrice) {
      toast({
        title: "Dados incompletos",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    
    toast({
      title: "Produto cadastrado",
      description: `O produto ${formData.name} foi cadastrado com sucesso.`,
    })
    
    router.push("/dashboard/inventario")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/inventario">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-[#0F032D]">Novo Produto</h1>
          <p className="text-[#0F032D]/60">Cadastre um novo item no inventário</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Form */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Package className="h-5 w-5" />
                Informações do Produto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Produto *</Label>
                  <Input
                    id="name"
                    placeholder="Ex: Cadeira Tiffany"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU / Código</Label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="sku"
                      placeholder="CAD-TIF-001"
                      className="pl-10"
                      value={formData.sku}
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria *</Label>
                  <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="condition">Condição</Label>
                  <Select value={formData.condition} onValueChange={(v) => setFormData({ ...formData, condition: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">Novo</SelectItem>
                      <SelectItem value="excellent">Excelente</SelectItem>
                      <SelectItem value="good">Bom</SelectItem>
                      <SelectItem value="regular">Regular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva o produto..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Adicionar tag..."
                      className="pl-10"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    />
                  </div>
                  <Button type="button" variant="outline" onClick={addTag}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="gap-1">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="hover:text-destructive">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <DollarSign className="h-5 w-5" />
                Preços de Locação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="dailyPrice">Preço Diário *</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">R$</span>
                    <Input
                      id="dailyPrice"
                      type="number"
                      step="0.01"
                      placeholder="0,00"
                      className="pl-10"
                      value={formData.dailyPrice}
                      onChange={(e) => setFormData({ ...formData, dailyPrice: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weeklyPrice">Preço Semanal</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">R$</span>
                    <Input
                      id="weeklyPrice"
                      type="number"
                      step="0.01"
                      placeholder="0,00"
                      className="pl-10"
                      value={formData.weeklyPrice}
                      onChange={(e) => setFormData({ ...formData, weeklyPrice: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthlyPrice">Preço Mensal</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">R$</span>
                    <Input
                      id="monthlyPrice"
                      type="number"
                      step="0.01"
                      placeholder="0,00"
                      className="pl-10"
                      value={formData.monthlyPrice}
                      onChange={(e) => setFormData({ ...formData, monthlyPrice: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Boxes className="h-5 w-5" />
                Estoque
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantidade em Estoque</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="0"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minStock">Estoque Mínimo</Label>
                  <Input
                    id="minStock"
                    type="number"
                    placeholder="0"
                    value={formData.minStock}
                    onChange={(e) => setFormData({ ...formData, minStock: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="warehouse">Armazém</Label>
                  <Select value={formData.warehouse} onValueChange={(v) => setFormData({ ...formData, warehouse: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {warehouses.map((wh) => (
                        <SelectItem key={wh.id} value={wh.id}>{wh.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <Label htmlFor="active" className="font-medium">Produto Ativo</Label>
                  <p className="text-sm text-muted-foreground">
                    Produtos inativos não aparecem para locação
                  </p>
                </div>
                <Switch
                  id="active"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <ImagePlus className="h-5 w-5" />
                Imagens
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center">
                <ImagePlus className="mb-4 h-12 w-12 text-muted-foreground/50" />
                <p className="font-medium text-muted-foreground">Arraste imagens ou clique para enviar</p>
                <p className="text-sm text-muted-foreground">PNG, JPG até 5MB</p>
                <Button variant="outline" className="mt-4">
                  Selecionar Arquivos
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary */}
        <div className="space-y-6">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="text-lg">Resumo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {formData.name && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Produto</span>
                    <span className="font-medium">{formData.name}</span>
                  </div>
                )}
                {formData.category && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Categoria</span>
                    <span className="font-medium">
                      {categories.find(c => c.id === formData.category)?.name}
                    </span>
                  </div>
                )}
                {formData.dailyPrice && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Preço/dia</span>
                    <span className="font-medium">R$ {parseFloat(formData.dailyPrice).toFixed(2)}</span>
                  </div>
                )}
                {formData.quantity && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Quantidade</span>
                    <span className="font-medium">{formData.quantity} unidades</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status</span>
                  <span className={`font-medium ${formData.isActive ? "text-green-600" : "text-red-600"}`}>
                    {formData.isActive ? "Ativo" : "Inativo"}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <Button
                  className="w-full bg-[#905BF4] hover:bg-[#4E2BCC]"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Cadastrar Produto
                    </>
                  )}
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/dashboard/inventario">Cancelar</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
