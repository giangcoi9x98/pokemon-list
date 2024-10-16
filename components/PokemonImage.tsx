import { BASE_POKEMON_IMAGE_URL } from "@/configs/common.config";
import { IPokemon } from "@/types/pokemon.types";
import { getPokemonId } from "@/utils/string.util";
import ImageComponent from "next/image";
import React from "react";

export const PokemonImage = ({
  pokemon,
  width,
  height,
}: {
  pokemon: IPokemon;
  width: number;
  height: number;
}) => {
  const id = getPokemonId(pokemon.url);
  return (
    <ImageComponent
      src={`${BASE_POKEMON_IMAGE_URL}/${id}.png`}
      alt={pokemon.name}
      width={width}
      height={height}
    />
  );
};
