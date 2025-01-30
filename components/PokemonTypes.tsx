import React from "react";
import { typeColors } from "@/lib/typeColors";

interface PokemonType {
  name: string;
}

async function getPokemonTypes() {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/type");
    if (!res.ok) throw new Error("Failed to fetch");
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching pokemon types:", error);
    return [];
  }
}

export default async function PokemonTypes() {
  const types = await getPokemonTypes();

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2 dark:text-white">
        Pokemon Types
      </h2>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {types.map((type: PokemonType) => {
          const colorClasses = typeColors[type.name] || typeColors.unknown;

          return (
            <li
              key={type.name}
              className={`${colorClasses} p-2 rounded text-center capitalize cursor-pointer hover:opacity-90 transition-opacity`}
            >
              {type.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
