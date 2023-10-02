import { PokemonApiResult } from "./PokemonApiResult";

//pick = copy api in result data
export type Pokemon = Pick<PokemonApiResult, "name" | "weight" | "height"> & {
  // พอดึง "name" | "weight" | "height" ให้ต่อด้วย url กับtypes
  imageUrl: string;
  types: string[];
};
