'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

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
    setErro("")
    setLoading(true)
    setResultado(null)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/consulta`, {
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
    <div className="max-w-4xl mx-auto mt-10 p-4">
      {/* Card de consulta */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Consulta de Protocolo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <Input
              placeholder="Digite o número do protocolo"
              value={protocolo}
              onChange={(e) => setProtocolo(e.target.value)}
              className="w-full sm:w-auto flex-1"
            />
            <Button onClick={buscarProtocolo} disabled={loading || !protocolo}>
              {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Buscar"}
            </Button>
          </div>
          {erro && <p className="text-red-500 text-sm">{erro}</p>}
        </CardContent>
      </Card>

      {/* Resultado da consulta */}
      {resultado && (
        <div className="mt-8 overflow-x-auto">
          <table className="min-w-full border border-zinc-300 text-sm">
            <thead className="bg-zinc-100">
              <tr>
                <th className="px-4 py-2 border">Protocolo</th>
                <th className="px-4 py-2 border">Natureza</th>
                <th className="px-4 py-2 border">Sequência</th>
                <th className="px-4 py-2 border">Andamento</th>
                {resultado.exigencia && <th className="px-4 py-2 border">Exigência</th>}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border text-center">{resultado.protocolo}</td>
                <td className="px-4 py-2 border text-center">{resultado.descNatureza}</td>
                <td className="px-4 py-2 border text-center">{resultado.sequencia}</td>
                <td className="px-4 py-2 border text-center">{resultado.descricaoAndamento}</td>
                {resultado.exigencia && <td className="px-4 py-2 border text-center">{resultado.exigencia}</td>}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
