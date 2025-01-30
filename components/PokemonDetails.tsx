// components/PokemonDetails.tsx
import { Suspense } from "react";
import { unstable_noStore as noStore } from "next/cache";
import Image from "next/image";

interface PokemonType {
  type: {
    name: string;
  };
}

interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

const typeColors: { [key: string]: string } = {
  normal: "bg-[#A8A77A] text-white",
  fire: "bg-[#EE8130] text-white",
  water: "bg-[#6390F0] text-white",
  electric: "bg-[#F7D02C] text-gray-800",
  grass: "bg-[#7AC74C] text-white",
  ice: "bg-[#96D9D6] text-gray-800",
  fighting: "bg-[#C22E28] text-white",
  poison: "bg-[#A33EA1] text-white",
  ground: "bg-[#E2BF65] text-gray-800",
  flying: "bg-[#A98FF3] text-white",
  psychic: "bg-[#F95587] text-white",
  bug: "bg-[#A6B91A] text-white",
  rock: "bg-[#B6A136] text-white",
  ghost: "bg-[#735797] text-white",
  dragon: "bg-[#6F35FC] text-white",
  dark: "bg-[#705746] text-white",
  steel: "bg-[#B7B7CE] text-gray-800",
  fairy: "bg-[#D685AD] text-white",
  stellar: "bg-yellow-300 text-yellow-800",
  unknown: "bg-gray-300 text-gray-800",
};

async function fetchDetailsWithDelay() {
  noStore();
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const id = Math.floor(Math.random() * 151) + 1;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return res.json();
}

function LoadingSkeleton() {
  return (
    <div className="mb-4">
      <div className="bg-gray-100 p-4 rounded-lg shadow">
        {/* Pokemon image placeholder */}
        <div className="w-24 h-24 bg-gray-200 rounded-lg mx-auto mb-2" />

        {/* Name placeholder */}
        <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto mb-2" />

        {/* Types placeholder */}
        <div className="flex gap-2 justify-center mb-2">
          <div className="h-6 w-16 bg-gray-200 rounded-full" />
          <div className="h-6 w-16 bg-gray-200 rounded-full" />
        </div>

        {/* Stats table placeholder */}
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-2 px-3">
                <div className="h-4 bg-gray-200 rounded w-16" />
              </th>
              <th className="text-right py-2 px-3">
                <div className="h-4 bg-gray-200 rounded w-12 ml-auto" />
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(6)].map((_, i) => (
              <tr key={i} className="border-t">
                <td className="py-2 px-3">
                  <div className="h-4 bg-gray-200 rounded w-20" />
                </td>
                <td className="py-2 px-3">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2" />
                    <div className="h-4 bg-gray-200 rounded w-8" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

async function PokemonData() {
  const pokemon = await fetchDetailsWithDelay();

  return (
    <div className="mb-4">
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
          {pokemon.types.map((type: PokemonType) => (
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
            {pokemon.stats.map((stat: PokemonStat) => (
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
}

export default function PokemonDetails() {
  return (
    <div className="p-4 rounded">
      <h2 className="text-xl font-semibold mb-4">Streaming Details</h2>
      <Suspense fallback={<LoadingSkeleton />}>
        <PokemonData />
      </Suspense>
    </div>
  );
}
