// components/Header.tsx
import Image from "next/image"

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/cropped-LOGO-14-RCPN.png" // substitua pelo caminho correto da sua logo
            alt="Cartório Logo"
            width={100}
            height={100}
            className="object-contain"
          />
          <span className="text-xl font-semibold text-zinc-800">
            14º RCPN Madureira
          </span>
        </div>

        {/* Espaço para navegação futura */}
        {/* <nav>
          <ul className="flex gap-4 text-sm text-zinc-600">
            <li><a href="#">Início</a></li>
            <li><a href="#">Serviços</a></li>
          </ul>
        </nav> */}
      </div>
    </header>
  )
}
