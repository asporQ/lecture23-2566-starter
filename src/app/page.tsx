"use client";

import { PokemonCard } from "@/components/PokemonCard";
import { Pokemon } from "@/types/Pokemon";
import { PokemonApiResult } from "@/types/PokemonApiResult";
import {
  Button,
  Container,
  Group,
  Loader,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import axios, { AxiosError } from "axios";
import { useState } from "react";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  // กำหนดtypeให้ useState เป็นpokemonหรือnullก็ได้
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loadingPokemon, setLoadingPokemon] = useState(false);

  const callLoadPokemon = async () => {
    setLoadingPokemon(true);
    setPokemon(null);
    try {
      const resp = await axios.get<PokemonApiResult>(
        `https://pokeapi.co/api/v2/pokemon/${searchText}`
      );
      const result = resp.data;
      const computedResult: Pokemon = {
        name: result.name,
        height: result.height,
        weight: result.weight,
        imageUrl: result.sprites.other["official-artwork"].front_default,
        types: result.types.map((x) => x.type.name),
      };

      setPokemon(computedResult);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) alert("Cannot find any pokemon");
      }
    }
    setLoadingPokemon(false);
  };

  return (
    <Container size="xs">
      <Stack gap="xs">
        <Title ta="center">Pokémon</Title>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            callLoadPokemon();
          }}
        >
          <Group preventGrowOverflow wrap="nowrap">
            <TextInput
              placeholder="Search with name or Pokédex number"
              w="100%"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
            />
            <Button type="submit" disabled={loadingPokemon}>
              Search
            </Button>
          </Group>
        </form>
        {loadingPokemon && <Loader type="bars" mx="auto" size="xl" />}
        {/* name={pokemon.name} = {...pokemon} แต่เป็นทุกข้อมูลที่มี*/}
        {pokemon && <PokemonCard {...pokemon} />}
      </Stack>
    </Container>
  );
}
