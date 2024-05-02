import { Card, CardFactory, Grid, GridFactory } from './CardLogic';

function generatePermutation(n: number): number[] {
  const permutation: number[] = Array.from({ length: n }, (_, i) => i);

  for (let i = 0; i < n; i++) {
    const j = Math.floor(Math.random() * n - i) + i;
    const temp = permutation[i];
    permutation[i] = permutation[j];
    permutation[j] = temp;
  }
  return permutation;
}

function initializeCards(width: number, height: number, emojis: Array<string>): Grid {

  const permutationLength = width * height;
  const permutation = generatePermutation(permutationLength);
  const cards = [];
  for (let i = 0; i < width * height; i++) {

    let emojiIndex = permutation[i]
    if (emojiIndex >= permutationLength / 2) emojiIndex = emojiIndex-(permutationLength /2);
    const emoji = emojis[emojiIndex];
    const x = i % width;
    const y = Math.floor(i / width);
    const over = false;
    cards.push(CardFactory(x, y, emoji, over));
  }

  return GridFactory(width, height, cards);
}

type ChooseState = {
  choicesLeft: () => number,
  setNextCard: (_: Card) => boolean,
  getChoices: () => Card[],
  clearChoices: () => void,
}

function ChooseStateFactory(first: Card | null = null, second: Card | null = null): ChooseState {

  function choicesLeft(): number {
    if (first) {
      return second ? 0 : 1;
    } else {
      return second ? 1 : 2;
    }
  }

  function setNextCard(card: Card): boolean {
    if (choicesLeft()) {
      if (first) {
        second = card;
      } else {
        first = card;
      }
      return true;
    } 
    else {
      return false;
    }
  }

  function getChoices(): Card[] {
    if (first && second) return [first, second];
    if (first) return [first];
    if (second) return [second];
    return [];
  }

  function clearChoices() {
    first = null;
    second = null;
  }

  return {
    choicesLeft,
    setNextCard,
    getChoices,
    clearChoices,
  } as ChooseState;
}

export type GameState = {
  getWidth: () => number,
  getHeight: () => number,
  getCard: (x: number, y: number) => Card,
  tryChoice: (x: number, y: number) => boolean,
  getChoices: () => Card[],
  choicesFull: () => boolean,
  evaluateChoice: () => boolean,
  checkWinCondition: () => boolean,
  matchChoices: () => boolean,
  rollbackChoices: () => boolean,
  getMistakes: () => number,
}
export function GameFactory(width: number, height: number, emojis: Array<string>): GameState {

  let choiceState: ChooseState = ChooseStateFactory();
  let grid: Grid = initializeCards(width, height, emojis);
  let mistakes = 0;

  let cardsLeft = width * height;

  function getWidth(): number {
    return width;
  }
  function getHeight(): number {
    return height;
  }
  function getCard(x: number, y: number): Card {
    return grid.getCard(x, y);
  }

  function choicesFull():boolean {
    const ccs = choiceState.getChoices();
    return ccs.length == 2;
  }
  function tryChoice(x: number, y: number): boolean {
    const card = grid.getCard(x,y);
    const status = choiceState.setNextCard(card);
    if (status) card.setOver(true);
    return status;
  }

  function checkSameTypeCard(card1: Card, card2: Card): boolean {
    return card1.compare(card2);
  }
  function evaluateChoice(): boolean {
    if (choiceState.getChoices().length === 2) {
      const [first, second] = choiceState.getChoices();
      if (checkSameTypeCard(first, second)) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }
  
  function checkWinCondition(): boolean {
    return cardsLeft === 0;
  }

  function matchChoices(): boolean {
    if (choiceState.getChoices().length === 2) {
      const [first, second] = choiceState.getChoices();
      cardsLeft -= 2;
      first.setOver(true);
      second.setOver(true);
      choiceState.clearChoices();
      return true;
    }
    return false;
  }

  function rollbackChoices(): boolean {
    if (choiceState.getChoices().length === 2) {
      const [first, second] = choiceState.getChoices();
      first.setOver(false);
      second.setOver(false);
      choiceState.clearChoices();
      mistakes += 1;
      return true;
    }
    return false;
  }

  function getChoices() {
    return choiceState.getChoices();
  }
  
  function getMistakes() {
    return mistakes;
  }
  return {
    getWidth,
    getHeight,
    getCard,
    tryChoice,
    getChoices,
    choicesFull,
    evaluateChoice,
    checkWinCondition,
    matchChoices,
    rollbackChoices,
    getMistakes,
  } as GameState;
}