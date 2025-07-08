// app/api/consulta/route.ts
import { google } from 'googleapis'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const { protocolo } = await req.json()

        if (!protocolo) {
            return NextResponse.json({ error: 'Protocolo não informado' }, { status: 400 })
        }

        // Verificar se as variáveis de ambiente estão definidas
        if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL || !process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY || !process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID) {
            console.error('Variáveis de ambiente não configuradas')
            return NextResponse.json({ error: 'Configuração do servidor incompleta' }, { status: 500 })
        }

        // Processar a chave privada
        let privateKey = process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY
        
        // Remover aspas se existirem
        if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
            privateKey = privateKey.slice(1, -1)
        }
        
        // Converter \n escapado para quebras de linha reais
        privateKey = privateKey.replace(/\\n/g, '\n')

        // Configurar autenticação JWT
        const auth = new google.auth.JWT({
            email: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL,
            key: privateKey,
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        })

        // Inicializar cliente do Google Sheets
        const sheets = google.sheets({ version: 'v4', auth })

        // Buscar dados da planilha
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID,
            range: 'Página1!A2:E1000',
        })

        const rows = response.data.values

        if (!rows || rows.length === 0) {
            return NextResponse.json({ error: 'Planilha vazia ou sem dados' }, { status: 404 })
        }

        // Procurar o protocolo na planilha
        const linha = rows.find((r) => r[0] === protocolo)

        if (!linha) {
            return NextResponse.json({ error: 'Protocolo não encontrado' }, { status: 404 })
        }

        // Extrair dados da linha encontrada
        const [protocoloFound, descNatureza, sequencia, descricaoAndamento, exigencia] = linha

        return NextResponse.json({
            protocolo: protocoloFound,
            descNatureza: descNatureza || '',
            sequencia: sequencia || '',
            descricaoAndamento: descricaoAndamento || '',
            exigencia: exigencia || '',
        })

    } catch (error) {
        console.error('Erro detalhado:', error)
        
        // Verificar se é erro de autenticação
        if (error instanceof Error && error.message.includes('invalid_grant')) {
            return NextResponse.json({ 
                error: 'Erro de autenticação JWT. Verifique as credenciais do Google.' 
            }, { status: 401 })
        }

        return NextResponse.json({ 
            error: 'Erro interno do servidor' 
        }, { status: 500 })
    }
}