import { fetchPokemon, fetchPokemonTypes } from "@/utils/api";
import React from "react";
import { IPokemon } from "@/types/pokemon.types";
import Filter from "./pokemon-list/Filter";

const PokemonPage = async () => {
  const pokemons: IPokemon[] = await fetchPokemon(); // Fetch Pokémon based on type
  const types = await fetchPokemonTypes();
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Pokémon List</h1>
      <Filter types={types} pokemons={pokemons} />
    </div>
  );
};
export default PokemonPage;
