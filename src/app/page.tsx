import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ConsultaProtocolo from "@/components/ConsultaProtocolo"

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col justify-between">
      <Header />
      <div className="flex-grow">
        <ConsultaProtocolo />
      </div>
      <Footer />
    </main>
  )
}
