// components/PokemonSearch.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Image from "next/image";
import { Button } from "./ui/button";

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  height: number;
  weight: number;
}

export default function PokemonSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [cache, setCache] = useState<Map<string, Pokemon>>(new Map());
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [allPokemon, setAllPokemon] = useState<string[]>([]);

  // Load initial data
  useEffect(() => {
    // Load search history from localStorage
    const savedHistory = localStorage.getItem("pokemonSearchHistory");
    if (savedHistory) setSearchHistory(JSON.parse(savedHistory));

    // Fetch all Pokémon names for suggestions
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=1000")
      .then((res) =>
        setAllPokemon(res.data.results.map((p: { name: string }) => p.name))
      );
  }, []);

  // Persist search history
  useEffect(() => {
    localStorage.setItem("pokemonSearchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  // Cache management
  const addToCache = useCallback((name: string, data: Pokemon) => {
    setCache((prev) => new Map(prev).set(name, data));
  }, []);

  const searchPokemon = useCallback(
    async (name: string) => {
      if (!name) return;

      const lowerName = name.toLowerCase();

      // Check cache first
      if (cache.has(lowerName)) {
        const cachedPokemon = cache.get(lowerName);
        if (cachedPokemon) {
          setPokemon(cachedPokemon);
          setSuggestions([]); // Clear suggestions
          return;
        }
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${lowerName}`
        );
        const data = response.data;

        setPokemon(data);
        setSuggestions([]); // Clear suggestions
        addToCache(lowerName, data); // Add to cache
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "Pokémon not found!";
        setError(errorMessage);
        setPokemon(null);
      } finally {
        setLoading(false);
      }
    },
    [cache, addToCache]
  );

  // Debounced search with auto-suggest
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm.trim()) {
        // Update suggestions
        const matches = allPokemon
          .filter((name) => name.startsWith(searchTerm.toLowerCase()))
          .slice(0, 5);
        setSuggestions(matches);

        // Auto-search after 3 characters
        if (searchTerm.length >= 3) {
          searchPokemon(searchTerm);
        }
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm, allPokemon, searchPokemon]);

  return (
    <div className="mb-4 relative">
      <h2 className="text-xl font-semibold mb-2">Pokemon Search (CSR)</h2>
      <div className="space-y-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            searchPokemon(searchTerm);
            setSuggestions([]); // Clear suggestions on form submit
          }}
        >
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Start typing to search..."
            />

            {/* Auto-suggest dropdown */}
            {suggestions.length > 0 && (
              <div className="absolute z-10 w-full bg-white border rounded shadow-lg mt-1">
                {suggestions.map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => {
                      setSearchTerm(name);
                      setSuggestions([]);
                    }}
                    className="p-2 hover:bg-gray-100 cursor-pointer capitalize"
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </form>

        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded">{error}</div>
        )}

        {loading && (
          <div className="p-4 bg-gray-100 rounded animate-pulse">
            Searching for {searchTerm}...
          </div>
        )}

        {pokemon && (
          <div className="p-4 border rounded-lg bg-white shadow-sm">
            <div className="flex items-center gap-4">
              <Image
                src={pokemon.sprites.front_default || "/placeholder.svg"}
                alt={pokemon.name}
                width={96}
                height={96}
                className="rounded-lg"
              />
              <div>
                <h3 className="text-xl font-semibold capitalize">
                  {pokemon.name}
                </h3>
                <div className="flex gap-2 mt-2">
                  {pokemon.types.map((type, index) => (
                    <span
                      key={index as number}
                      className="px-2 py-1 bg-gray-100 rounded-full text-sm capitalize"
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
                <p className="mt-2">
                  Height: {pokemon.height} | Weight: {pokemon.weight}
                </p>
              </div>
            </div>
          </div>
        )}

        {searchHistory.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Search History:</h4>
            <div className="flex gap-2 flex-wrap">
              {searchHistory.map((term, index) => (
                <Button
                  key={index as number}
                  onClick={() => setSearchTerm(term)}
                  className="px-3 py-1 bg-gray-100 text-primary rounded-full text-sm hover:bg-gray-200 transition-colors capitalize"
                >
                  {term}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
