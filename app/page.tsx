import Header from "@/components/Header";
import PokemonTypes from "@/components/PokemonTypes";
import RandomPokemon from "@/components/RandomPokemon";
import PokemonSearch from "@/components/PokemonSearch";
import PokemonDetails from "@/components/PokemonDetails";

export const experimental_ppr = true;

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      {/* Static Site Generation (SSG) - Built at compile time */}
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          {/* Incremental Static Regeneration (ISR) */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Incremental Static Regeneration (ISR)
            </h2>
            <p className="mb-4">
              The Pokemon types list below is revalidated every hour. It uses
              ISR to update static content after initial build while maintaining
              performance benefits.
            </p>
            <PokemonTypes />
          </section>

          {/* Server-Side Rendering (SSR) */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Dynamic Content (SSR)</h2>
            <p className="mb-4">
              The random Pokemon below demonstrates Server-Side Rendering (SSR).
              It fetches new data on each request, showing how Next.js can
              render dynamic content on the server.
            </p>
            <RandomPokemon />
          </section>

          {/* Client-Side Rendering (CSR) */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Client-Side Rendering (CSR)
            </h2>
            <p className="mb-4">
              The search component below demonstrates advanced CSR features:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li className="mb-2">Client-side caching using Map API</li>
              <li className="mb-2">
                Persistent search history via localStorage
              </li>
              <li className="mb-2">
                Auto-suggest functionality with debouncing
              </li>
              <li className="mb-2">
                Client-side error handling and loading states
              </li>
              <li className="mb-2">
                Optimized network requests with cache-first strategy
              </li>
            </ul>
            <PokemonSearch />
          </section>
        </div>

        <div>
          {/* Partial Prerendering (PPR) */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Partial Prerendering (PPR)
            </h2>
            <p className="mb-4">
              Partial Prerendering, a new feature in Next.js, is demonstrated
              below. The static parts (title and layout) are instantly
              displayed, while dynamic content (Pokemon details) is loaded
              asynchronously.
            </p>
            <PokemonDetails />
          </section>

          {/* Caching */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Caching</h2>
            <p className="mb-4">
              Next.js automatically caches the results of data fetching
              functions. The Pokemon Types list above is an example of cached
              content. After the initial fetch, subsequent requests will use the
              cached data, improving performance.
            </p>
          </section>

          {/* Other Next.js Concepts */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Other Next.js Concepts</h2>
            <ul className="list-disc pl-5">
              <li className="mb-2">
                <strong>Incremental Static Regeneration (ISR):</strong> Allows
                updating static content after build time. Not shown here, but
                could be applied to the Pokemon Types list for periodic updates.
              </li>
              <li className="mb-2">
                <strong>Streaming:</strong> The Pokemon Details section uses
                React Suspense, enabling streaming of UI content as it becomes
                available.
              </li>
              <li>
                <strong>Dynamic Rendering:</strong> The Random Pokemon section
                forces dynamic rendering by opting out of caching, ensuring
                fresh data on each request.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
