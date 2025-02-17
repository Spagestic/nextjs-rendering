import React from "react";

interface PokemonType {
  name: string;
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
