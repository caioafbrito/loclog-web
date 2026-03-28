"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  MessageCircle, 
  Book, 
  GraduationCap, 
  Bug, 
  Phone, 
  Mail,
  ExternalLink,
  Send
} from "lucide-react"

export default function SuportePage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#0F032D]">Suporte</h1>
        <p className="text-muted-foreground">
          Precisa de ajuda? Estamos aqui para você.
        </p>
      </div>

      {/* Quick Access Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="cursor-pointer hover:border-[#905BF4] transition-colors">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="p-2 rounded-lg bg-[#905BF4]/10">
              <Book className="h-6 w-6 text-[#905BF4]" />
            </div>
            <div>
              <CardTitle className="text-base">Documentação</CardTitle>
              <CardDescription>Guias e tutoriais</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" asChild>
              <a href="https://docs.loclog.com.br" target="_blank" rel="noopener noreferrer">
                Acessar
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:border-[#905BF4] transition-colors">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="p-2 rounded-lg bg-[#905BF4]/10">
              <GraduationCap className="h-6 w-6 text-[#905BF4]" />
            </div>
            <div>
              <CardTitle className="text-base">Academia Developz</CardTitle>
              <CardDescription>Cursos e treinamentos</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" asChild>
              <a href="https://academia.developz.com.br" target="_blank" rel="noopener noreferrer">
                Acessar
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:border-[#905BF4] transition-colors">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="p-2 rounded-lg bg-[#905BF4]/10">
              <MessageCircle className="h-6 w-6 text-[#905BF4]" />
            </div>
            <div>
              <CardTitle className="text-base">Chat ao Vivo</CardTitle>
              <CardDescription>Fale com um atendente</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-[#905BF4] hover:bg-[#4E2BCC]">
              Iniciar Chat
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:border-[#905BF4] transition-colors">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="p-2 rounded-lg bg-[#905BF4]/10">
              <Bug className="h-6 w-6 text-[#905BF4]" />
            </div>
            <div>
              <CardTitle className="text-base">Reportar Bug</CardTitle>
              <CardDescription>Encontrou um problema?</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Reportar
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Contact Form and Info */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Enviar Mensagem</CardTitle>
            <CardDescription>
              Descreva sua dúvida ou problema e nossa equipe entrará em contato
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Assunto</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o assunto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="duvida">Dúvida sobre funcionalidade</SelectItem>
                  <SelectItem value="problema">Problema técnico</SelectItem>
                  <SelectItem value="financeiro">Faturamento e pagamentos</SelectItem>
                  <SelectItem value="integracao">Integração com outros sistemas</SelectItem>
                  <SelectItem value="sugestao">Sugestão de melhoria</SelectItem>
                  <SelectItem value="outro">Outro assunto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Prioridade</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baixa - Posso esperar</SelectItem>
                  <SelectItem value="medium">Média - Preciso em alguns dias</SelectItem>
                  <SelectItem value="high">Alta - Preciso urgente</SelectItem>
                  <SelectItem value="critical">Crítica - Sistema parado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Mensagem</Label>
              <Textarea 
                id="message" 
                placeholder="Descreva sua dúvida ou problema com o máximo de detalhes possível..."
                rows={5}
              />
            </div>
            <Button className="w-full bg-[#905BF4] hover:bg-[#4E2BCC]">
              <Send className="mr-2 h-4 w-4" />
              Enviar Mensagem
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contato Direto</CardTitle>
              <CardDescription>
                Fale diretamente com nossa equipe
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-[#EFEFEF]">
                <div className="p-2 rounded-full bg-white">
                  <Phone className="h-5 w-5 text-[#905BF4]" />
                </div>
                <div>
                  <p className="font-medium">WhatsApp</p>
                  <p className="text-sm text-muted-foreground">(11) 99999-9999</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-lg bg-[#EFEFEF]">
                <div className="p-2 rounded-full bg-white">
                  <Mail className="h-5 w-5 text-[#905BF4]" />
                </div>
                <div>
                  <p className="font-medium">E-mail</p>
                  <p className="text-sm text-muted-foreground">suporte@loclog.com.br</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Horário de Atendimento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Segunda a Sexta</span>
                  <span className="font-medium">08:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sábado</span>
                  <span className="font-medium">09:00 - 13:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Domingo e Feriados</span>
                  <span className="font-medium text-muted-foreground">Fechado</span>
                </div>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                * Clientes Enterprise possuem suporte 24/7 via chat e telefone.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SLA de Atendimento</CardTitle>
              <CardDescription>Tempo de resposta por plano</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Starter</span>
                  <span className="text-sm font-medium">até 48h úteis</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Pro</span>
                  <span className="text-sm font-medium text-[#905BF4]">até 24h úteis</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Enterprise</span>
                  <span className="text-sm font-medium text-green-600">até 4h úteis</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
