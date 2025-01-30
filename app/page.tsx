import Header from "@/components/Header";
import PokemonTypes from "@/components/PokemonTypes";
import RandomPokemon from "@/components/RandomPokemon";
import PokemonSearch from "@/components/PokemonSearch";
import PokemonDetails from "@/components/PokemonDetails";

export const experimental_ppr = true;

export default function Home() {
  return (
    <main className="container mx-auto pb-8 px-4 lg:px-8">
      <Header />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column */}
        <div className="space-y-12">
          {/* ISR Section */}
          <section className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="mb-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                  ISR
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Incremental Static Regeneration
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                The Pokemon types list is revalidated every hour. This shows how
                Next.js can update static content after build time while
                maintaining excellent performance.
              </p>
            </div>
            <PokemonTypes />
          </section>

          {/* SSR Section */}
          <section className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="mb-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  SSR
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Server-Side Rendering
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Fresh data on every request. This random Pokemon is rendered on
                the server with no caching, demonstrating real-time data
                fetching.
              </p>
            </div>
            <RandomPokemon />
          </section>

          {/* CSR Section */}
          <section className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="mb-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  CSR
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Client-Side Rendering
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Fully interactive client-side features with:
              </p>
              <div className="grid grid-cols-2 gap-2 mb-6">
                {[
                  "Caching",
                  "Local Storage",
                  "Auto-Suggest",
                  "Error Handling",
                ].map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg"
                  >
                    <div className="h-2 w-2 bg-green-500 rounded-full" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <PokemonSearch />
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-12">
          {/* PPR Section */}
          <section className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow top-6">
            <div className="mb-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">
                  PPR
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Partial Prerendering
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Experience instant static content with asynchronous dynamic
                loading. Notice how the layout appears immediately while the
                Pokemon details stream in.
              </p>
            </div>
            <PokemonDetails />
          </section>

          {/* Caching Section */}
          <section className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Caching Strategies
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">ISR Cache</h3>
                <p className="text-blue-700 text-sm">
                  Revalidates every 1 hour - Perfect for semi-static content
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">
                  SSR Cache
                </h3>
                <p className="text-purple-700 text-sm">
                  No caching - Fresh data on every request
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">CSR Cache</h3>
                <p className="text-green-700 text-sm">
                  Client-side Map cache + localStorage history
                </p>
              </div>
            </div>
          </section>

          {/* Concepts Section */}
          <section className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Core Concepts
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-2">Streaming</h3>
                <p className="text-gray-600 text-sm">
                  Progressive content loading with React Suspense boundaries
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Dynamic Rendering
                </h3>
                <p className="text-gray-600 text-sm">
                  Per-request rendering decisions based on context
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Hybrid Architecture
                </h3>
                <p className="text-gray-600 text-sm">
                  Mix SSG, SSR, CSR, and PPR in a single page
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
