export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col items-center justify-center text-center px-6">
      <p className="text-xs tracking-[0.2em] uppercase font-garamond text-[#8B7355] mb-4">Veritas Editions</p>
      <h1 className="font-garamond text-6xl text-[#2A2927] mb-4">404</h1>
      <p className="font-garamond text-xl text-[#5C4A32] mb-8">This page does not exist.</p>
      <a href="/" className="inline-block bg-[#2A2927] text-[#EFECE5] px-8 py-4 text-xs tracking-widest uppercase font-garamond">
        Return Home
      </a>
    </div>
  )
}
