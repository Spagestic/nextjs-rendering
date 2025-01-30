import { unstable_noStore as noStore } from "next/cache"

async function getRandomPokemon() {
  noStore()
  const id = Math.floor(Math.random() * 151) + 1
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  return res.json()
}

export default async function RandomPokemon() {
  const pokemon = await getRandomPokemon()

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Random Pokemon</h2>
      <div className="bg-gray-100 p-4 rounded">
        <img src={pokemon.sprites.front_default || "/placeholder.svg"} alt={pokemon.name} className="mx-auto" />
        <p className="text-center capitalize">{pokemon.name}</p>
      </div>
    </div>
  )
}

