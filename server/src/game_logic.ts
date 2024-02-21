function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function rollOneDice(): number {
  const result: number = getRandomInt(1, 7);
  return result;
}

export function playRound() {
  const dice1: number = rollOneDice();
  const dice2: number = rollOneDice();
  const sum_dice: number = dice1 + dice2;
  if (sum_dice === 7) {
    const victory = {
      dice1: dice1,
      dice2: dice2,
      sum_dice: sum_dice,
      result: true,
    };
    return victory;
  } else {
    const loss = {
      dice1: dice1,
      dice2: dice2,
      sum_dice: sum_dice,
      result: false,
    };
    return loss;
  }
}
