'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

const SHEET_ID = process.env.SHEET_ID
const API_KEY = process.env.GOOGLE__PRIVATE_KEY
const RANGE = "Página1!A2:E1000" // ajuste conforme sua aba/intervalo

interface Registro {
    protocolo: string
    descNatureza: string
    sequencia: string
    descricaoAndamento: string
    exigencia: string
}

export default function ConsultaProtocolo() {
    const [protocolo, setProtocolo] = useState("")
    const [resultado, setResultado] = useState<Registro | null>(null)
    const [loading, setLoading] = useState(false)
    const [erro, setErro] = useState("")

    const buscarProtocolo = async () => {
        console.log("GOOGLE_PRIVATE_KEY starts with:", process.env.GOOGLE_PRIVATE_KEY?.slice(0, 30))
        setErro("")
        setLoading(true)
        setResultado(null)

        try {
            const res = await fetch("/api/consulta", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ protocolo }),
            })

            const data = await res.json()

            if (!res.ok) {
                setErro(data.error || "Erro desconhecido")
            } else {
                setResultado(data)
            }
        } catch (err) {
            setErro("Erro na requisição")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-xl mx-auto mt-10 p-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Consulta de Protocolo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Input
                            placeholder="Digite o número do protocolo"
                            value={protocolo}
                            onChange={(e) => setProtocolo(e.target.value)}
                        />
                        <Button onClick={buscarProtocolo} disabled={loading || !protocolo}>
                            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Buscar"}
                        </Button>
                    </div>

                    {erro && <p className="text-red-500 text-sm">{erro}</p>}

                    {resultado && (
                        <div className="space-y-2 mt-4">
                            <p><strong>Natureza:</strong> {resultado.descNatureza}</p>
                            <p><strong>Sequência:</strong> {resultado.sequencia}</p>
                            <p><strong>Andamento:</strong> {resultado.descricaoAndamento}</p>
                            {resultado.exigencia && (
                                <p><strong>Exigência:</strong> {resultado.exigencia}</p>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
