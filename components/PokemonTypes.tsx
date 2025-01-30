async function getPokemonTypes() {
  const res = await fetch("https://pokeapi.co/api/v2/type")
  const data = await res.json()
  return data.results.slice(0, 10) // Get first 10 types
}

export default async function PokemonTypes() {
  const types = await getPokemonTypes()

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Pokemon Types</h2>
      <ul className="grid grid-cols-2 gap-2">
        {types.map((type: { name: string }) => (
          <li key={type.name} className="bg-gray-100 p-2 rounded">
            {type.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

