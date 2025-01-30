"use client"

import { useState } from "react"

export default function PokemonSearch() {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Searching for: ${searchTerm}`)
    // In a real app, you'd typically fetch data here or update the URL
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Search Pokemon</h2>
      <div className="flex">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-2 border rounded-l"
          placeholder="Enter Pokemon name"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-r">
          Search
        </button>
      </div>
    </form>
  )
}

