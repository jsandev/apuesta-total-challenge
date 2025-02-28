export interface ICategory {
  damage_relations: DamageRelations;
  game_indices: GameIndex[];
  generation: Generation;
  id: number;
  move_damage_class: Generation;
  moves: Generation[];
  name: string;
  names: Name[];
  past_damage_relations: PastDamageRelation[];
  pokemon: Pokemon[];
  sprites: Sprites;
}

interface DamageRelations {
  double_damage_from: Generation[];
  double_damage_to: Generation[];
  half_damage_from: Generation[];
  half_damage_to: Generation[];
  no_damage_from: any[];
  no_damage_to: any[];
}

interface Generation {
  name: string;
  url: string;
}

interface GameIndex {
  game_index: number;
  generation: Generation;
}

interface Name {
  language: Generation;
  name: string;
}

interface PastDamageRelation {
  damage_relations: DamageRelations;
  generation: Generation;
}

interface Pokemon {
  pokemon: Generation;
  slot: number;
}

interface Sprites {
  "generation-iii": GenerationIii;
  "generation-iv": GenerationIv;
  "generation-ix": GenerationIx;
  "generation-v": GenerationV;
  "generation-vi": { [key: string]: Colosseum };
  "generation-vii": GenerationVii;
  "generation-viii": GenerationViii;
}

interface GenerationIii {
  colosseum: Colosseum;
  emerald: Colosseum;
  "firered-leafgreen": Colosseum;
  "ruby-saphire": Colosseum;
  xd: Colosseum;
}

interface Colosseum {
  name_icon: string;
}

interface GenerationIv {
  "diamond-pearl": Colosseum;
  "heartgold-soulsilver": Colosseum;
  platinum: Colosseum;
}

interface GenerationIx {
  "scarlet-violet": Colosseum;
}

interface GenerationV {
  "black-2-white-2": Colosseum;
  "black-white": Colosseum;
}

interface GenerationVii {
  "lets-go-pikachu-lets-go-eevee": Colosseum;
  "sun-moon": Colosseum;
  "ultra-sun-ultra-moon": Colosseum;
}

interface GenerationViii {
  "brilliant-diamond-and-shining-pearl": Colosseum;
  "legends-arceus": Colosseum;
  "sword-shield": Colosseum;
}
