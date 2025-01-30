// components/PokemonDetails.tsx
import { Suspense } from "react";
import { unstable_noStore as noStore } from "next/cache";
import Image from "next/image";

async function fetchDetailsWithDelay() {
  noStore();
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const id = Math.floor(Math.random() * 151) + 1;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return res.json();
}

function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-24 bg-gray-200 rounded" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
    </div>
  );
}

async function PokemonData() {
  const pokemon = await fetchDetailsWithDelay();

  return (
    <div className="space-y-4">
      <Image
        src={pokemon.sprites.front_default || "/placeholder.svg"}
        alt={pokemon.name}
        width={96}
        height={96}
        className="mx-auto"
        priority
        placeholder="blur"
        blurDataURL="/placeholder.svg"
      />
      <h3 className="text-lg font-semibold capitalize text-center">
        {pokemon.name}
      </h3>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="text-center">Height: {pokemon.height}</div>
        <div className="text-center">Weight: {pokemon.weight}</div>
      </div>
    </div>
  );
}

export default function PokemonDetails() {
  return (
    <div className="border p-4 rounded">
      <h2 className="text-xl font-semibold mb-4">Streaming Details</h2>
      <Suspense fallback={<LoadingSkeleton />}>
        <PokemonData />
      </Suspense>
    </div>
  );
}
