// TODO: Would be nice to use a tuple here for [number, number, number]
export type MapBounds = readonly number[];

export type Mappings = readonly MapBounds[];

export type Almanac = {
  seedToSoil: Mappings;
  soilToFertilizer: Mappings;
  fertilizerToWater: Mappings;
  waterToLight: Mappings;
  lightToTemperature: Mappings;
  temperatureToHumidity: Mappings;
  humidityToLocation: Mappings;
};

const chunkToMappingArrays = (chunk: string): number[][] =>
  chunk
    // Ignore title
    .split(":\n")[1]
    .split("\n")
    .map((s) => s.split(" "))
    // Within each nested array, turn the strings into numbers
    .map((arr) => arr.map((s) => parseInt(s)));

export const parseInput = (
  almanac: string,
): { seeds: number[]; almanac: Almanac } => {
  const [seedsChunk, ...mapChunks] = almanac.split("\n\n");

  const seedStr = seedsChunk.split(":")[1].trim();
  const seeds = seedStr.split(" ").map((s) => parseInt(s));

  const [
    seedToSoil,
    soilToFertilizer,
    fertilizerToWater,
    waterToLight,
    lightToTemperature,
    temperatureToHumidity,
    humidityToLocation,
  ] = mapChunks.map((chunk) => chunkToMappingArrays(chunk));

  return {
    seeds,
    almanac: {
      seedToSoil,
      soilToFertilizer,
      fertilizerToWater,
      waterToLight,
      lightToTemperature,
      temperatureToHumidity,
      humidityToLocation,
    },
  };
};

export const getMapped = (mappings: Mappings, n: number) => {
  const relevantBounds = mappings.find((mapBounds) => {
    const [, sourceStart, range] = mapBounds;

    return n >= sourceStart && n < sourceStart + range;
  });

  if (relevantBounds) {
    const [destinationStart, sourceStart] = relevantBounds;
    const diff = n - sourceStart;
    return destinationStart + diff;
  }

  return n;
};

// TODO: Very repetitive, would be nice to generalise
export const seedToLocationNumber = (
  {
    seedToSoil,
    soilToFertilizer,
    fertilizerToWater,
    waterToLight,
    lightToTemperature,
    temperatureToHumidity,
    humidityToLocation,
  }: Almanac,
  seed: number,
): number => {
  const soil = getMapped(seedToSoil, seed);
  const fertilizer = getMapped(soilToFertilizer, soil);
  const water = getMapped(fertilizerToWater, fertilizer);
  const light = getMapped(waterToLight, water);
  const temperature = getMapped(lightToTemperature, light);
  const humidity = getMapped(temperatureToHumidity, temperature);
  const location = getMapped(humidityToLocation, humidity);

  return location;
};

export const findLowestLocation = (
  seeds: number[],
  almanac: Almanac,
): number => {
  const locations = seeds.map((seed) => seedToLocationNumber(almanac, seed));

  const closest = locations.reduce((prev, curr) => Math.min(prev, curr));

  return closest;
};
