import { MIN_CARDS, MAX_CARDS, MIN_PLAYERS, MAX_PLAYERS, SCORE_FOR_RIGHT_BET, POINT_VALUE } from "../constants";

export const calculateTotalRounds = numPlayers => {
  const totalCards =
    numPlayers === MIN_PLAYERS || numPlayers === MAX_PLAYERS
      ? MIN_CARDS
      : MAX_CARDS;

  return totalCards / numPlayers;
};

export const calculateScore = (bet, points) => {
  if (bet === points) {
    return SCORE_FOR_RIGHT_BET + bet * POINT_VALUE;
  }
  else {
    return -1 * POINT_VALUE * Math.abs(bet - points);
  }
};
