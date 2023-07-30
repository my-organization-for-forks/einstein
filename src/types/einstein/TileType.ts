export const TileType = ['H', 'T', 'P', 'F'] as const;

export type TileType = (typeof TileType)[number];
