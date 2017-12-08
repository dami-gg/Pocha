import gql from "graphql-tag";

export const ALL_GAMES_QUERY = gql`
  query AllGamesQuery {
    allGames {
      id
      createdAt
      players {
        id
      }
      rounds {
        id
      }
      playersScores {
        id
      }
    }
  }
`;

export const ALL_PLAYERS_QUERY = gql`
  query AllPlayersQuery {
    allPlayers {
      id
      name
    }
  }
`;

export const CREATE_GAME = gql`
  mutation CreateGameMutation {
    createGame {
      id
      players {
        id
      }
    }
  }
`;

export const CREATE_PLAYER = gql`
  mutation CreatePlayerMutation($name: String!) {
    createPlayer(name: $name) {
      id
      name
    }
  }
`;

export const CREATE_GAME_CONFIGURATION = gql`
  mutation CreateGameConfigurationMutation(
    $gameId: ID
    $initialDealerId: ID
    $allDealOneCard: Boolean
    $upAndDown: Boolean
  ) {
    createGameConfiguration(
      gameId: $gameId
      initialDealerId: $initialDealerId
      allDealOneCard: $allDealOneCard
      upAndDown: $upAndDown
    ) {
      id
    }
  }
`;

export const CREATE_ROUND = gql`
  mutation CreateRoundMutation($gameId: ID) {
    createRound(gameId: $gameId) {
      id
      numCards
      bets {
        id
      }
      scores {
        id
      }
    }
  }
`;

export const ADD_PLAYER_TO_GAME = gql`
  mutation AddPlayerToGameMutation($gameId: ID!, $playerId: ID!) {
    addToPlayerGames(gamesGameId: $gameId, playersPlayerId: $playerId) {
      gamesGame {
        players {
          id
        }
      }
      playersPlayer {
        games {
          id
        }
      }
    }
  }
`;

export const ADD_ROUND_TO_GAME = gql`
  mutation AddRoundToGame($gameId: ID, $roundId: ID) {
    addToGameRounds(gameGameId: $gameId, roundsRoundId: $roundId) {
      gameGame {
        rounds
      }
    }
  }
`;
