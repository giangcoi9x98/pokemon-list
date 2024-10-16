import { fetchPokemon, fetchPokemonTypes } from "@/utils/api";
import React from "react";
import Filter from "./Filter";
import { IPokemon } from "@/types/pokemon.types";
const PokemonPage = async () => {
  const pokemons: IPokemon[] = await fetchPokemon();
  const types = await fetchPokemonTypes();
  return (
    <div>
      <Filter types={types} pokemons={pokemons} />
    </div>
  );
};
export default PokemonPage;
