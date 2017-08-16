import { MIN_CARDS, MAX_CARDS, MIN_PLAYERS, MAX_PLAYERS } from "../constants";

export const calculateTotalRounds = numPlayers => {
  const totalCards =
    numPlayers === MIN_PLAYERS || numPlayers === MAX_PLAYERS
      ? MIN_CARDS
      : MAX_CARDS;

  return totalCards / numPlayers;
};
