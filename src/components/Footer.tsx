// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-zinc-800 text-white text-sm mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Lado Esquerdo */}
        <div className="text-center md:text-left">
          <h4 className="font-semibold mb-1">INFORMAÇÕES</h4>
          <p>
            <span className="font-semibold">Horário de Funcionamento:</span> Segunda à Sexta de 09:00–16:00 <span className="font-bold">(Exceto feriados)</span><br />
            Sábado, Domingo e Feriados 09:00–12:00 <span className="font-semibold"> (Plantão para Registro de Óbito)</span><br />
            <span className="font-semibold">Localização:</span><br />
            Madureira Shopping, 5º Piso (Estr. do Portela, 222 - Madureira)
          </p>
        </div>

        {/* Lado Direito */}
        <div className="text-center md:text-right">
          <p>
            <span className="font-semibold">Telefone:</span> (21) 3795-4364<br />
            <span className="font-semibold">2ª via:</span> atendimento@cartoriomadureira14.com.br<br />
            <span className="font-semibold">Averbação:</span> averbacao@cartoriomadureira14.com.br<br />
            <span className="font-semibold">Casamento:</span> casamento@cartoriomadureira14.com.br
          </p>
        </div>
      </div>

      <div className="bg-zinc-700 text-center py-3 text-xs text-gray-300">
        Todos os Direitos Reservados 14º RCPN © 2025 - CartorioGenial
      </div>
    </footer>
  )
}
