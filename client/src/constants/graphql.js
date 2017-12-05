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

export const CREATE_GAME_MUTATION = gql`
  mutation CreateGameMutation {
    createGame {
      id
    }
  }
`;

export const CREATE_PLAYER_MUTATION = gql`
  mutation CreatePlayerMutation($name: String!) {
    createPlayer(name: $name) {
      id
      name
    }
  }
`;

export const CREATE_GAME_CONFIGURATION_MUTATION = gql`
  mutation CreateGameConfigurationMutation(
    $allDealOneCard: Boolean
    $upAndDown: Boolean
  ) {
    createGameConfiguration(
      allDealOneCard: $allDealOneCard
      upAndDown: $upAndDown
    ) {
      id
    }
  }
`;

export const ADD_PLAYER_TO_GAME = gql`
  mutation AddPlayerToGameMutation($gameId: ID, $playerId: ID) {
    addToPlayerGames(gamesGameId: $gameId, playersPlayerId: $playerId) {
      gamesGame {
        id
        createdAt
        players {
          id
        }
      }
      playersPlayer {
        id
        games {
          id
        }
      }
    }
  }
`;
