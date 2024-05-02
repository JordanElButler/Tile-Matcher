export type Grid = {
  getCard: (x: number, y: number) => Card,
  getWidth: () => number,
  getHeight: () => number,
}
export function GridFactory(width: number, height: number, cards: Card[]): Grid {
  
    if (cards.length !== width * height) {
        throw new Error(`Invalid number of cards: expected ${width*height}, got ${cards.length}`);
    }

  function getCard(x: number, y: number): Card {
    return cards[y * width + x];
  }

  function getWidth(): number {
    return width;
  }
  function getHeight(): number {
    return height;
  }

  return {
    getCard,
    getWidth,
    getHeight,
  } as Grid;
  
}


export type Card = {
  getX: () => number,
  getY: () => number,
  getEmoji: () => string,
  getOver: () => boolean,
  compare: (_: Card) => boolean,
  setOver: (_: boolean) => void,
}

export function CardFactory(x: number, y: number, emoji: string, over: boolean): Card {

  function getX(): number {
    return x;
  }
  function getY(): number {
    return y;
  }
  function getEmoji(): string {
    return emoji;
  }
  function getOver(): boolean {
    return over;
  }
  function compare(card: Card): boolean {
    return card.getEmoji() === emoji;
  }
  function setOver(_over: boolean) {
    over = _over;
  }

  return {
    getX,
    getY,
    getEmoji,
    getOver,
    compare,
    setOver,
  } as Card;
}