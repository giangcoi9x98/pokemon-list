"use client";
import { PokemonImage } from "@/components/PokemonImage";
import { IPokemon } from "@/types/pokemon.types";
import { fetchAllPokemonsPerType } from "@/utils/api";
import React, { useEffect, useMemo, useState } from "react";

interface FilterProps {
  types: string[];
  pokemons: IPokemon[];
}

const ITEMS_PER_PAGE = 48;

const Filter: React.FC<FilterProps> = ({ types, pokemons }) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonPerType, setPokemonPerType] = useState<{
    [key: string]: IPokemon[];
  } | null>(null);

  const handleTypeClick = (type: string) => {
    setCurrentPage(1);
    setSelectedTypes((prevTypes) =>
      prevTypes.includes(type)
        ? prevTypes.filter((t) => t !== type)
        : [...prevTypes, type]
    );
  };

  useEffect(() => {
    if (types.length) {
      fetchAllPokemonsPerType(types).then((res) => {
        setPokemonPerType(res);
      });
    }
  }, [types]);
  const filteredPokemons = useMemo(() => {
    if (!selectedTypes.length || !pokemonPerType) {
      return pokemons;
    }

    const firstTypePokemons = pokemonPerType[selectedTypes[0]];

    if (!firstTypePokemons || !firstTypePokemons.length) {
      return [];
    }

    return selectedTypes.reduce((acc, type) => {
      const currentTypePokemons = pokemonPerType[type] || [];
      return acc.filter((pokemon) =>
        currentTypePokemons.some((p) => p.name === pokemon.name)
      );
    }, firstTypePokemons);
  }, [selectedTypes, pokemonPerType, pokemons]);

  const totalPages = Math.ceil(filteredPokemons.length / ITEMS_PER_PAGE);

  const currentPokemons = filteredPokemons.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="container mx-auto py-4">
        <div className="flex flex-wrap gap-2 mb-4 items-center">
          <p className="font-bold">Types: </p>
          {types.map((type) => (
            <button
              key={type}
              className={`px-2 py-2 rounded border-2 border-primary font-bold m-1 ${
                selectedTypes.includes(type)
                  ? "bg-primary text-white"
                  : "text-primary"
              }`}
              onClick={() => handleTypeClick(type)}
            >
              {type}
            </button>
          ))}
        </div>
        {!!filteredPokemons.length && (
          <p className="mb-4 font-bold">
            {filteredPokemons.length} results found.
          </p>
        )}
      </div>

      <div className="w-full">
        {currentPokemons?.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 lg:gap-6">
            {currentPokemons.map((pokemon) => (
              <div
                key={pokemon.name}
                className="text-center flex justify-center items-center flex-col"
              >
                <PokemonImage pokemon={pokemon} width={100} height={100} />
                <p>{pokemon.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center font-bold text-2xl w-full py-4">
            No results found.
          </div>
        )}
      </div>

      <div className="flex justify-center gap-4 items-center mt-4 font-bold">
        <button
          className={`px-4 py-2 rounded border-2 bg-primary ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : "text-white"
          }`}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className={`px-4 py-2 rounded border-2 bg-primary ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "text-white"
          }`}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Filter;
