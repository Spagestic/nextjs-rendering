export default function Header() {
  return (
    <header className="py-8 md:py-12 mb-8 border-b border-gray-100">
      <div className="container mx-auto px-4 flex flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-4">
          {/* Animated Pokeball icons */}
          <div className="w-8 h-8 md:w-12 md:h-12 relative animate-spin-slow">
            <div className="absolute inset-0 rounded-full border-4 border-red-500" />
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-red-500 transform -translate-y-1/2" />
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-gray-800 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
          </div>

          {/* Gradient title */}
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Next.js Pokémon Demo
          </h1>

          {/* Second Pokeball */}
          <div className="w-8 h-8 md:w-12 md:h-12 relative animate-spin-slow-reverse">
            <div className="absolute inset-0 rounded-full border-4 border-blue-500" />
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-blue-500 transform -translate-y-1/2" />
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-gray-800 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Subtitle with animated border */}
        <div className="relative inline-block">
          <p className="text-lg md:text-xl text-gray-600 font-medium relative z-10 px-4">
            Exploring Modern Rendering Patterns
          </p>
          <div className="absolute inset-0 border-b-2 border-purple-200 animate-pulse-border" />
        </div>

        {/* Description with hover effect */}
        <p className="mt-4 text-gray-500 max-w-2xl leading-relaxed transition-colors hover:text-gray-700">
          A comprehensive demonstration of Next.js features including SSG, SSR,
          ISR, CSR, and PPR - all powered by the Pokémon API. Explore different
          rendering strategies through interactive examples and real-world
          implementations.
        </p>
      </div>
    </header>
  );
}
