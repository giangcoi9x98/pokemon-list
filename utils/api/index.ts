// utils/fetchPokemon.ts
import { POKEMON_BASE_URL } from "@/configs/common.config";
import { IPokemonType } from "@/types/pokemon.types";
import axios from "axios";

const BaseUrl = "https://pokeapi.co/api/v2";
export const fetchPokemon = async () => {
  try {
    const response = await axios.get(`${POKEMON_BASE_URL}/pokemon?limit=1200`);
    const pokemons = response.data.results;
    return pokemons;
  } catch {
    return [];
  }
};

export const fetchPokemonTypes = async () => {
  try {
    const types = await axios.get(`${POKEMON_BASE_URL}/type`);
    const response: IPokemonType[] = types.data.results;
    return response.map((e) => e.name);
  } catch {
    return [];
  }
};

export const fetchPokemonsByType = async (type: string) => {
  try {
    const response = await axios.get(`${BaseUrl}/type/${type}`);
    const pokemons = response.data.pokemon.map(
      (e: { pokemon: IPokemonType }) => e.pokemon
    );
    return { [type]: pokemons };
  } catch {
    return { [type]: [] };
  }
};

export const fetchAllPokemonsPerType = async (types: string[]) => {
  const validTypes = types.filter(Boolean);
  if (validTypes.length === 0) return null;

  try {
    const allPokemons = await Promise.all(
      validTypes.map((type) => fetchPokemonsByType(type))
    );

    return allPokemons.reduce((acc, current) => {
      return { ...acc, ...current };
    }, {});
  } catch {
    return {};
  }
};
