import { Masthead } from '@/components/public/Masthead'
import { Footer } from '@/components/public/Footer'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#e9dfcd] text-stone-900">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden border-2 border-[#1c1a17] bg-[#fcf8f0] shadow-[0_12px_40px_rgba(50,40,20,0.08)]">
          <Masthead />
          <main>{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  )
}
