"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react"

const LOGO = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logotipo%20Loc%20Escuro%20%2B%20Log%20Roxo%20%2B%20Fundo%20Transparente%20%28Sem%20O%20com%20efeito%29-zzsT8fVYTnKNCGTlJeBVANDUnNvRfD.png"
const ICON_ROXO = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/I%CC%81cone%20Branco%20%2B%20Fundo%20Roxo-3M0Xw7o5VK1C6jszV8jAp8SIopVG4M.png"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulação de login - em produção, isso seria uma chamada à API
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Redireciona para o dashboard após "login"
    router.push("/dashboard")
  }

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
            width={140}
            height={50}
            className="h-12 w-auto"
          />
        </div>
        
        <div className="relative">
          <h2 className="mb-4 text-4xl font-bold text-white">
            Gerencie sua locadora de forma inteligente
          </h2>
          <p className="text-lg text-white/70">
            Pedidos, orçamentos, finanças, estoque e parcerias em um só lugar. 
            Automatize processos e foque no que importa: lucrar mais.
          </p>
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
              width={140}
              height={50}
              className="h-12 w-auto"
            />
          </div>

          <Card className="border-none shadow-xl">
            <CardHeader className="space-y-1 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl lg:hidden">
                <Image
                  src={ICON_ROXO}
                  alt="LocLog"
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              </div>
              <CardTitle className="text-2xl font-bold text-[#0F032D]">Bem-vindo de volta</CardTitle>
              <CardDescription className="text-[#0F032D]/60">
                Entre com suas credenciais para acessar o sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#0F032D]">E-mail ou telefone</Label>
                  <Input
                    id="email"
                    type="text"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="border-[#D0D0D8] bg-white focus:border-[#905BF4] focus:ring-[#905BF4]"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-[#0F032D]">Senha</Label>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-[#905BF4] hover:text-[#4E2BCC] hover:underline"
                    >
                      Esqueceu a senha?
                    </Link>
                  </div>
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
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#905BF4] text-white hover:bg-[#4E2BCC]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Entrando...
                    </>
                  ) : (
                    <>
                      Entrar
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

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
              </form>
            </CardContent>
          </Card>

          <p className="mt-6 text-center text-sm text-[#0F032D]/60">
            Não tem uma conta?{" "}
            <Link href="/register" className="font-medium text-[#905BF4] hover:text-[#4E2BCC] hover:underline">
              Criar conta
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
