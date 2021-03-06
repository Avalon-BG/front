export interface PutPlayerBody {
  players: { name: string, avatar_index: number }[];
  roles: string[];
}

export interface Player {
  id: string;
  ind_player: number;
  name: string;
  role: string;
  team: string;
  avatar_index: number;
  assassin?: boolean;
}

export interface GameResult {
  status: boolean;
  guess_merlin_id?: string;
}

export interface Game {
  id: string;
  players: Player[];
  current_id_player: string;
  current_quest: number;
  quests: Quest[];
  nb_quest_unsend: number;
  result?: GameResult;
  loadingUnsend?: boolean;
  loadingSend?: boolean;
  loadingVote?: boolean;
}

export interface Quest {
  id: string;
  nb_votes_to_fail: number;
  nb_players_to_send: number;
  votes?: { [playerId: string]: boolean }[];
  status?: boolean;
}

export interface QuestResult {
  votes: boolean[];
  status: boolean;
}

export interface Rule {
  blue: number;
  red: number;
  quests: {
    nb_votes_to_fail: number,
    nb_players_to_send: number
  }[];
}

export interface Rules {
  [nbPlayers: number]: Rule;
}
