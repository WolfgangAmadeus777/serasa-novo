import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Star, Shield, Clock, Users, Menu, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function SerasaLimpaNome() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-pink-600 text-white px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-pink-700 p-2 flex items-center gap-2 py-[18px] my-[-5px] w-0"
          >
            <Menu className="w-6 h-6" />
            <span className="text-sm">Menu</span>
          </Button>

          <div className="w-auto h-[52px] mx-0 my-0">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZeWic96ah9SKD4HTQbHRmNeE52dSXk.png"
              alt="Serasa Limpa Nome"
              width={180}
              height={40}
              className="w-auto mx-0 my-[0] py-0 h-[63px]"
            />
          </div>

          <Button variant="ghost" size="sm" className="text-white hover:bg-pink-700 flex items-center gap-2">
            <User className="w-5 h-5" />
            <span className="hidden sm:inline">Entrar</span>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-100 to-pink-200 px-4 py-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Serasa Limpa Nome:
              <br />
              <span className="text-pink-600">Negocie dívidas com até 90% de desconto</span>
            </h1>
            <p className="text-lg text-gray-700">
              {
                "Encontre ofertas de forma rápida e segura, com opções de parcelamento que facilitam a negociação das suas dívidas e ajudam a limpar o seu nome"
              }
            </p>
            <Link href="/entrar">
              <Button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 text-lg">Consultar CPF</Button>
            </Link>
          </div>
          <div className="relative">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/assets_b212bb18f00a40869a6cd42f77cbeefc_b799797afcc34c618873e57a818b68c3-SY76DmGXIerkAU1uP5EXBGjKGWCoHv.webp"
              alt="Homem sorrindo segurando celular com ofertas exclusivas"
              width={500}
              height={600}
              className="w-full h-auto rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-pink-50 px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-700 mb-6">Consultar CPF Gratis</p>
          <p className="text-sm text-gray-600">Confira abaixo as condições especiais e não perca essa oportunidade.</p>
        </div>
      </section>

      {/* App Mockup Section */}
      <section className="px-4 py-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge className="bg-pink-600 text-white">Novo</Badge>
            <h2 className="text-3xl font-bold text-gray-900">Junte suas dívidas e negocie em um único boleto</h2>
            <p className="text-gray-700">
              Agora você pode juntar todas as suas dívidas em um só lugar e negociar com condições especiais. Tudo isso
              de forma simples e rápida pelo app.
            </p>
            <Button className="bg-pink-600 hover:bg-pink-700 text-white">Conhecer o serviço</Button>
          </div>
          <div className="relative">
            <div className="bg-gray-100 rounded-2xl p-8">
              <Image
                src="/smartphone-app-interface-showing-debt-negotiation-.png"
                alt="Interface do app mostrando negociação de dívidas"
                width={300}
                height={500}
                className="mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-50 px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Por que negociar suas dívidas com a Serasa?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto">
                <Shield className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Ofertas exclusivas</h3>
              <p className="text-gray-600">
                Descontos de até 90% em suas dívidas com condições especiais negociadas diretamente com os credores.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto">
                <Clock className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Consulta e negociação</h3>
              <p className="text-gray-600">
                Consulte suas dívidas e negocie online de forma rápida e segura, sem sair de casa.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Suporte especializado</h3>
              <p className="text-gray-600">
                Conte com o apoio de especialistas para tirar suas dúvidas e te ajudar na negociação.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Logos */}
      <section className="px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            São mais de 1.000 parceiros com ofertas exclusivas para você
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-2xl font-bold text-purple-600">vivo</div>
            <div className="text-2xl font-bold text-blue-600">itaú</div>
            <div className="text-xl font-semibold text-gray-700">CLARO</div>
            <div className="text-xl font-semibold text-orange-500">Oi</div>
            <div className="text-xl font-semibold text-red-500">Santander</div>
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" className="border-pink-600 text-pink-600 hover:bg-pink-50 bg-transparent">
              Ver todos os parceiros
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Com a palavra, nossos clientes do nome limpo
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Amanda Camilla",
                text: "Consegui negociar minhas dívidas com 85% de desconto. Foi muito fácil e rápido pelo app.",
                rating: 5,
              },
              {
                name: "Roberto Pereira",
                text: "Excelente serviço! Limpei meu nome em poucos dias e consegui voltar a ter crédito no mercado.",
                rating: 5,
              },
              {
                name: "Ana Santos",
                text: "Recomendo para todos! O atendimento é ótimo e as condições de pagamento são muito boas.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="space-y-4">
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700">"{testimonial.text}"</p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="bg-pink-50 px-4 py-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Aplicativo Serasa</h2>
            <p className="text-gray-700">
              Baixe o app e tenha acesso completo aos serviços Serasa na palma da sua mão. Consulte seu CPF, negocie
              dívidas e muito mais.
            </p>
            <div className="flex space-x-4">
              <Button className="bg-pink-600 hover:bg-pink-700 text-white">Baixar na App Store</Button>
              <Button className="bg-pink-600 hover:bg-pink-700 text-white">Baixar no Google Play</Button>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white p-8 rounded-2xl shadow-lg inline-block">
              <Image src="/app-download-qr-code.png" alt="QR Code para download do app" width={200} height={200} />
              <p className="text-sm text-gray-600 mt-4">Escaneie o QR Code e baixe o app</p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Ficou ainda mais fácil negociar suas dívidas
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardContent className="space-y-4">
                <Image
                  src="/mobile-app-interface-pink-theme.png"
                  alt="App Serasa"
                  width={300}
                  height={200}
                  className="rounded-lg"
                />
                <h3 className="text-xl font-semibold text-gray-900">App Serasa</h3>
                <p className="text-gray-600">
                  Baixe o app e tenha acesso a todos os serviços Serasa de forma prática e segura.
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  Baixar aplicativo Serasa →
                </Button>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardContent className="space-y-4">
                <Image
                  src="/whatsapp-interface-green-theme.png"
                  alt="WhatsApp Serasa"
                  width={300}
                  height={200}
                  className="rounded-lg"
                />
                <h3 className="text-xl font-semibold text-gray-900">WhatsApp Serasa oficial</h3>
                <p className="text-gray-600">Negocie suas dívidas pelo WhatsApp de forma rápida e prática.</p>
                <Button variant="outline" className="w-full bg-transparent">
                  Acessar WhatsApp →
                </Button>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardContent className="space-y-4">
                <Image
                  src="/woman-professional-smiling-customer-service.png"
                  alt="Atendimento presencial"
                  width={300}
                  height={200}
                  className="rounded-lg"
                />
                <h3 className="text-xl font-semibold text-gray-900">Atendimento presencial</h3>
                <p className="text-gray-600">
                  Encontre uma unidade Serasa perto de você e seja atendido presencialmente.
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  Encontrar unidade →
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="bg-gray-50 px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Veja os conteúdos do nosso blog</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Planeje-se com antecedência: Estratégias Financeiras do Ano Novo",
                category: "Educação Financeira",
                image: "/financial-planning-calendar-notebook.png",
              },
              {
                title: "Como organizar o orçamento de dezembro para não se endividar no Natal",
                category: "Dicas",
                image: "/christmas-budget-planning-calculator.png",
              },
              {
                title: "Descubra as 10 dicas essenciais para manter o nome limpo",
                category: "Nome Limpo",
                image: "/financial-documents-organized-desk.png",
              },
            ].map((post, index) => (
              <Card key={index} className="overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6 space-y-3">
                  <Badge variant="secondary" className="text-xs">
                    {post.category}
                  </Badge>
                  <h3 className="font-semibold text-gray-900 line-clamp-2">{post.title}</h3>
                  <Button variant="link" className="p-0 text-pink-600">
                    Ler mais →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Tire suas dúvidas sobre o Limpa Nome</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                question: "Como eu consulto o meu CPF e descubro quais são as minhas dívidas?",
                answer:
                  "Você pode consultar seu CPF gratuitamente pelo app Serasa ou pelo site. Basta fazer seu cadastro e ter acesso completo ao seu relatório de crédito.",
              },
              {
                question: "Posso negociar no Feirão Limpa Nome mesmo se não tiver dívidas?",
                answer:
                  "O Feirão Limpa Nome é específico para quem tem dívidas registradas nos órgãos de proteção ao crédito. Se você não tem dívidas, pode aproveitar outros serviços Serasa.",
              },
              {
                question: "Qual o valor de desconto que posso conseguir no Limpa Nome?",
                answer:
                  "Os descontos podem chegar até 90%, dependendo do credor e das condições da negociação. Cada caso é analisado individualmente.",
              },
              {
                question: "Como eu sei se o pagamento foi reconhecido pelo credor?",
                answer:
                  "Após o pagamento, você recebe uma confirmação e pode acompanhar o status da quitação pelo app ou site Serasa.",
              },
              {
                question: "Posso parcelar o pagamento das minhas dívidas no Limpa Nome?",
                answer:
                  "Sim, muitas ofertas permitem parcelamento. As condições variam conforme o credor e o valor da dívida.",
              },
            ].map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-gray-900">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-700">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="text-center mt-8">
            <Button className="bg-pink-600 hover:bg-pink-700 text-white">Ver mais perguntas frequentes</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">O que você precisa</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    Consultar CPF
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Limpar nome
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Cartão de crédito
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Empréstimo
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Todos os sites</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    Serasa
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    SPC
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Cadastro Positivo
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Atendimento</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    Central de ajuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Fale conosco
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Ouvidoria
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Sobre a Serasa</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    Quem somos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Trabalhe conosco
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Imprensa
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-sm text-gray-400">
            <p>© 2024 Serasa S.A. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
