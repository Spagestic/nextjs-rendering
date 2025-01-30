import React from "react";
import { typeColors } from "../lib/typeColors";

interface PokemonType {
  name: string;
}

async function getPokemonTypes() {
  const res = await fetch("https://pokeapi.co/api/v2/type");
  const data = await res.json();
  return data.results;
}

export default async function PokemonTypes() {
  const types = await getPokemonTypes();

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2 dark:text-white">
        Pokemon Types
      </h2>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {/* Added responsive grid columns */}
        {types.map((type: PokemonType) => (
          <li
            key={type.name}
            className={`${
              typeColors[type.name]
            } p-2 rounded text-center capitalize`}
          >
            {/* Added text-center for better visual alignment */}
            {type.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
