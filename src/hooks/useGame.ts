import React from 'react';
import { Card } from '../logic/CardLogic';
import { GameState, GameFactory } from '../logic/GameLogic';


export type useGameHookType = {
  getWidth: () => number,
  getHeight: () => number,
  getCard: (x: number, y: number) => Card,
  getChoices: () => Card[],
  tryChoice: (x: number, y: number) => boolean,
  choicesFull: () => boolean,
  evaluateChoice: () => boolean,
  matchChoices: () => boolean,
  rollbackChoices: () => boolean,
  getMistakes: () => number,
  checkWinCondition: () => boolean,
  restart: () => void,
}

function useGame(width: number, height: number, emojis: Array<string>):useGameHookType  {

  const [game, setGame] = React.useState<GameState>(GameFactory(width, height, emojis));

  function tryChoice(x: number, y: number): boolean {
    const choiceMade = game.tryChoice(x, y);

    if (choiceMade) {
      // we need to update the state,
      setGame({
        ...game
      });
    }
    return choiceMade;
  }

  function choicesFull(): boolean {
    return game.choicesFull();
  }

  function evaluateChoice(): boolean {

    const match = game.evaluateChoice();

    setGame({
      ...game
    });

    return match;
  }

  function matchChoices(): boolean {

    const match = game.matchChoices();
    setGame({
      ...game
    })
    return match;
  }

  function rollbackChoices(): boolean {
    const rollback = game.rollbackChoices();
    console.log(rollback);
    setGame({
      ...game
    })
    return rollback;
  }

  function getCard(x: number, y: number) {
    return game.getCard(x, y);
  }
  
  function getMistakes() {
    return game.getMistakes(); 
  }
  function checkWinCondition() {
    return game.checkWinCondition();
  }
  
  function restart() {
    setGame(GameFactory(width, height, emojis));
  }
  
  return {
    getWidth: () => game.getWidth(),
    getHeight: () => game.getHeight(),
    getCard,
    getChoices: () => game.getChoices(),
    tryChoice,
    choicesFull,
    evaluateChoice,
    matchChoices,
    rollbackChoices,
    getMistakes,
    checkWinCondition,
    restart,
  }  as useGameHookType
  
}

export default useGame;