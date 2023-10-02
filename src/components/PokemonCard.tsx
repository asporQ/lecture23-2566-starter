import { Pokemon } from "@/types/Pokemon";
import { Badge, Group, Image, Paper, Stack, Text, Title } from "@mantine/core";
import { FC } from "react";

type Props = Pokemon;

// fc = function component
export const PokemonCard: FC<Props> = ({
  name,
  height,
  weight,
  types,
  imageUrl,
}) => {
  return (
    <Paper withBorder p="md">
      <Group>
        <Image src={imageUrl} alt={name} width={150} height={150} />
        <Stack gap="xs">
          <Title order={3}>{name}</Title>
          <Text c="gray">weight {weight / 10} kg</Text>
          <Text c="gray">height {height / 10} m</Text>
          <Group gap="xs">
            {types.map((type) => (
              <Badge>{type}</Badge>
            ))}
          </Group>
        </Stack>
      </Group>
    </Paper>
  );
};
