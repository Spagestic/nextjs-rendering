import { Suspense } from "react"
import { unstable_noStore as noStore } from "next/cache"

async function getPokemonDetails() {
  noStore()
  // Simulate a slow API call
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const id = Math.floor(Math.random() * 151) + 1
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  return res.json()
}

function PokemonInfo() {
  return (
    <div className="animate-pulse">
      <div className="h-24 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded"></div>
    </div>
  )
}

async function PokemonData() {
  const pokemon = await getPokemonDetails()

  return (
    <div>
      <img src={pokemon.sprites.front_default || "/placeholder.svg"} alt={pokemon.name} className="mx-auto" />
      <h3 className="text-lg font-semibold capitalize">{pokemon.name}</h3>
      <p>
        Height: {pokemon.height} | Weight: {pokemon.weight}
      </p>
    </div>
  )
}

export default function PokemonDetails() {
  return (
    <div className="border p-4 rounded">
      <h2 className="text-xl font-semibold mb-4">Pokemon Details</h2>
      <Suspense fallback={<PokemonInfo />}>
        <PokemonData />
      </Suspense>
    </div>
  )
}

