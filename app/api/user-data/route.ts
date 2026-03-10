import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const cpf = searchParams.get("cpf")

  if (!cpf) {
    return NextResponse.json({ error: "CPF is required" }, { status: 400 })
  }

  try {
    // Clean CPF (remove non-digits)
    const cleanCpf = cpf.replace(/\D/g, "")

    // Call external API
    const response = await fetch(`https://apela-api.tech/?user=a39d1d540e8677beb6b8bd8669c02df3&cpf=${cleanCpf}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()

    // Get user location
    let locationData = { city: "São Paulo" } // Default fallback
    try {
      const locationResponse = await fetch("https://ipapi.co/json/")
      if (locationResponse.ok) {
        locationData = await locationResponse.json()
      }
    } catch (locationError) {
      console.log("Location API failed, using fallback")
    }

    return NextResponse.json({
      success: true,
      data: {
        nome: data.nome || "Usuário",
        nascimento: data.nascimento || "",
        mae: data.mae || "",
        sexo: data.sexo || "",
        cidade: locationData.city || "São Paulo",
      },
    })
  } catch (error) {
    console.error("Error fetching user data:", error)

    // Return fallback data instead of error
    return NextResponse.json({
      success: false,
      data: {
        nome: "Usuário",
        nascimento: "",
        mae: "",
        sexo: "",
        cidade: "São Paulo",
      },
      error: "Unable to fetch user data, using fallback",
    })
  }
}
