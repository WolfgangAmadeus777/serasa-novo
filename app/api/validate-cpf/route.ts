import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { cpf } = await request.json()

    // Remove formatting from CPF
    const cleanCpf = cpf.replace(/\D/g, "")

    // Basic CPF validation algorithm
    if (cleanCpf.length !== 11) {
      return NextResponse.json({ valid: false, message: "CPF deve ter 11 dígitos" }, { status: 400 })
    }

    // Check if all digits are the same (invalid CPF)
    if (/^(\d)\1{10}$/.test(cleanCpf)) {
      return NextResponse.json({ valid: false, message: "CPF inválido" }, { status: 400 })
    }

    // Calculate first verification digit
    let sum = 0
    for (let i = 0; i < 9; i++) {
      sum += Number.parseInt(cleanCpf.charAt(i)) * (10 - i)
    }
    let remainder = 11 - (sum % 11)
    const digit1 = remainder >= 10 ? 0 : remainder

    // Calculate second verification digit
    sum = 0
    for (let i = 0; i < 10; i++) {
      sum += Number.parseInt(cleanCpf.charAt(i)) * (11 - i)
    }
    remainder = 11 - (sum % 11)
    const digit2 = remainder >= 10 ? 0 : remainder

    // Verify if calculated digits match the provided ones
    if (Number.parseInt(cleanCpf.charAt(9)) !== digit1 || Number.parseInt(cleanCpf.charAt(10)) !== digit2) {
      return NextResponse.json({ valid: false, message: "CPF inválido" }, { status: 400 })
    }

    // Simulate checking if CPF exists in database (always return true for demo)
    // In a real application, you would check against your database here
    return NextResponse.json({ valid: true, message: "CPF válido" })
  } catch (error) {
    return NextResponse.json({ valid: false, message: "Erro interno do servidor" }, { status: 500 })
  }
}
