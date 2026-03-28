"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, ArrowRight, Loader2, Check } from "lucide-react"

const LOGO = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logotipo%20Loc%20Escuro%20%2B%20Log%20Roxo%20%2B%20Fundo%20Transparente%20%28Sem%20O%20com%20efeito%29-zzsT8fVYTnKNCGTlJeBVANDUnNvRfD.png"
const ICON_ROXO = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/I%CC%81cone%20Branco%20%2B%20Fundo%20Roxo-3M0Xw7o5VK1C6jszV8jAp8SIopVG4M.png"

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    document: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (step === 1) {
      setStep(2)
      return
    }
    
    setIsLoading(true)
    
    // Simulação de registro
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    router.push("/dashboard")
  }

  const passwordRequirements = [
    { text: "Mínimo 8 caracteres", met: formData.password.length >= 8 },
    { text: "Uma letra maiúscula", met: /[A-Z]/.test(formData.password) },
    { text: "Uma letra minúscula", met: /[a-z]/.test(formData.password) },
    { text: "Um número", met: /\d/.test(formData.password) },
  ]

  return (
    <div className="flex min-h-screen">
      {/* Lado esquerdo - Branding */}
      <div className="relative hidden w-1/2 bg-[#0F032D] lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-[#905BF4] blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-[#4E2BCC] blur-[128px]" />
        </div>
        
        <div className="relative">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logotipo%20Branco%20%2B%20Fundo%20Transparente%20%28Sem%20O%20com%20efeito%29-2zkcgX2G3n8UrYsauTJMCYFZuWEHbX.png"
            alt="LocLog"
            width={120}
            height={48}
            style={{ width: "auto", height: "auto" }}
            className="h-10 w-auto"
          />
        </div>
        
        <div className="relative space-y-8">
          <h2 className="text-4xl font-bold text-white">
            Comece a transformar sua locadora hoje
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#905BF4]">
                <Check className="h-4 w-4 text-white" />
              </div>
              <p className="text-white/80">Cadastro rápido em 2 minutos</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#905BF4]">
                <Check className="h-4 w-4 text-white" />
              </div>
              <p className="text-white/80">7 dias de teste grátis</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#905BF4]">
                <Check className="h-4 w-4 text-white" />
              </div>
              <p className="text-white/80">Sem compromisso, cancele quando quiser</p>
            </div>
          </div>
        </div>
        
        <div className="relative">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} LocLog by Developz
          </p>
        </div>
      </div>

      {/* Lado direito - Formulário */}
      <div className="flex w-full items-center justify-center bg-[#EFEFEF] p-8 lg:w-1/2">
        <div className="w-full max-w-md">
          {/* Logo mobile */}
          <div className="mb-8 flex justify-center lg:hidden">
            <Image
              src={LOGO}
              alt="LocLog"
              width={120}
              height={48}
              style={{ width: "auto", height: "auto" }}
              className="h-10 w-auto"
            />
          </div>

          <Card className="border-none shadow-xl">
            <CardHeader className="space-y-1 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl lg:hidden">
                <Image
                  src={ICON_ROXO}
                  alt="LocLog"
                  width={48}
                  height={48}
                  style={{ width: "48px", height: "48px" }}
                  className="object-cover"
                />
              </div>
              <CardTitle className="text-2xl font-bold text-[#0F032D]">
                {step === 1 ? "Criar sua conta" : "Dados da empresa"}
              </CardTitle>
              <CardDescription className="text-[#0F032D]/60">
                {step === 1 
                  ? "Preencha seus dados pessoais para começar"
                  : "Informe os dados da sua locadora"
                }
              </CardDescription>
              
              {/* Progress indicator */}
              <div className="flex items-center justify-center gap-2 pt-4">
                <div className={`h-2 w-16 rounded-full ${step >= 1 ? 'bg-[#905BF4]' : 'bg-[#D0D0D8]'}`} />
                <div className={`h-2 w-16 rounded-full ${step >= 2 ? 'bg-[#905BF4]' : 'bg-[#D0D0D8]'}`} />
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {step === 1 ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-[#0F032D]">Nome completo</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="João da Silva"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="border-[#D0D0D8] bg-white focus:border-[#905BF4] focus:ring-[#905BF4]"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[#0F032D]">E-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="border-[#D0D0D8] bg-white focus:border-[#905BF4] focus:ring-[#905BF4]"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-[#0F032D]">Telefone (WhatsApp)</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(11) 99999-9999"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="border-[#D0D0D8] bg-white focus:border-[#905BF4] focus:ring-[#905BF4]"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-[#0F032D]">Senha</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className="border-[#D0D0D8] bg-white pr-10 focus:border-[#905BF4] focus:ring-[#905BF4]"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0F032D]/50 hover:text-[#0F032D]"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-1">
                        {passwordRequirements.map((req, i) => (
                          <div key={i} className="flex items-center gap-1">
                            <div className={`h-1.5 w-1.5 rounded-full ${req.met ? 'bg-green-500' : 'bg-[#D0D0D8]'}`} />
                            <span className={`text-xs ${req.met ? 'text-green-600' : 'text-[#0F032D]/50'}`}>
                              {req.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-[#0F032D]">Confirmar senha</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="border-[#D0D0D8] bg-white focus:border-[#905BF4] focus:ring-[#905BF4]"
                        required
                      />
                      {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                        <p className="text-xs text-red-500">As senhas não coincidem</p>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="companyName" className="text-[#0F032D]">Nome da empresa</Label>
                      <Input
                        id="companyName"
                        type="text"
                        placeholder="Minha Locadora"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="border-[#D0D0D8] bg-white focus:border-[#905BF4] focus:ring-[#905BF4]"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="document" className="text-[#0F032D]">CPF ou CNPJ</Label>
                      <Input
                        id="document"
                        type="text"
                        placeholder="000.000.000-00 ou 00.000.000/0001-00"
                        value={formData.document}
                        onChange={(e) => setFormData({ ...formData, document: e.target.value })}
                        className="border-[#D0D0D8] bg-white focus:border-[#905BF4] focus:ring-[#905BF4]"
                        required
                      />
                    </div>

                    <div className="rounded-lg bg-[#905BF4]/10 p-4">
                      <p className="text-sm text-[#0F032D]">
                        <strong>Teste grátis por 7 dias!</strong>
                        <br />
                        <span className="text-[#0F032D]/70">
                          Você terá acesso completo ao plano Pro durante o período de teste. 
                          Nenhum cartão de crédito necessário.
                        </span>
                      </p>
                    </div>
                  </>
                )}

                <div className="flex gap-3 pt-2">
                  {step === 2 && (
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 border-[#D0D0D8] text-[#0F032D] hover:bg-[#EFEFEF]"
                      onClick={() => setStep(1)}
                    >
                      Voltar
                    </Button>
                  )}
                  <Button
                    type="submit"
                    className={`bg-[#905BF4] text-white hover:bg-[#4E2BCC] ${step === 1 ? 'w-full' : 'flex-1'}`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Criando conta...
                      </>
                    ) : step === 1 ? (
                      <>
                        Continuar
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Criar conta
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>

                {step === 1 && (
                  <>
                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-[#D0D0D8]" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-[#0F032D]/50">ou continue com</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        className="border-[#D0D0D8] bg-white text-[#0F032D] hover:bg-[#EFEFEF]"
                      >
                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        Google
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="border-[#D0D0D8] bg-white text-[#0F032D] hover:bg-[#EFEFEF]"
                      >
                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                        </svg>
                        Apple
                      </Button>
                    </div>
                  </>
                )}
              </form>
            </CardContent>
          </Card>

          <p className="mt-6 text-center text-sm text-[#0F032D]/60">
            Já tem uma conta?{" "}
            <Link href="/login" className="font-medium text-[#905BF4] hover:text-[#4E2BCC] hover:underline">
              Fazer login
            </Link>
          </p>

          <p className="mt-4 text-center text-xs text-[#0F032D]/40">
            <Link href="/" className="hover:text-[#905BF4] hover:underline">
              Voltar para a página inicial
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
