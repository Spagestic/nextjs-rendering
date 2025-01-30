import { unstable_noStore as noStore } from "next/cache";
import Image from "next/image";
import type { Pokemon } from "@/types/pokemon";
import { typeColors } from "../lib/typeColors";

async function getRandomPokemon(retries = 3): Promise<Pokemon> {
  noStore();
  const id = Math.floor(Math.random() * 151) + 1;

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch Pokemon: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    if (retries > 0) {
      return getRandomPokemon(retries - 1);
    }
    throw error;
  }
}

export default async function RandomPokemon() {
  try {
    const pokemon = await getRandomPokemon();

    return (
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Random Pokemon</h2>
        <div className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-md transition-shadow">
          <Image
            src={pokemon.sprites.front_default || "/placeholder.svg"}
            alt={pokemon.name}
            width={96}
            height={96}
            className="mx-auto"
            priority
          />
          <p className="text-center capitalize font-medium text-lg mb-2">
            {pokemon.name}
          </p>

          <div className="flex flex-wrap gap-2 justify-center mb-2">
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                className={`px-2 py-1 ${
                  typeColors[type.type.name] || typeColors.unknown
                } rounded-full text-sm`}
              >
                {type.type.name}
              </span>
            ))}
          </div>

          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-2 px-3">Stat</th>
                <th className="text-right py-2 px-3">Value</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.stats.map((stat) => (
                <tr key={stat.stat.name} className="border-t">
                  <td className="py-2 px-3 capitalize">{stat.stat.name}</td>
                  <td className="py-2 px-3">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{
                            width: `${(stat.base_stat / 255) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="font-bold w-8 text-right">
                        {stat.base_stat}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded">
        Failed to load Pokemon. Please refresh the page.
      </div>
    );
  }
}
