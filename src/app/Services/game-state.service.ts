import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  // tslint:disable-next-line:variable-name
  public readonly tileArrayStream$ = new Observable<number>();
  chosenTileStream$ = new Observable<number>();

  constructor() {
    this.tileArrayStream$ = this.seedTileArray$();
  }

  seedTileArray$ = () => {
    const arr = [...Array(75).keys()];
    return from(arr);
  };

  chooseGameTiles = (tiles: number[], gameDifficulty: number) => {
    const chosenTiles: number[] = [];
    [...Array(gameDifficulty)].map((_, i) => {
      const x = Math.floor(Math.random() * tiles.length);
      chosenTiles.push(this.calculateRemainingIndex(x, chosenTiles, tiles));
    });

    return of(chosenTiles);
  };

  private calculateRemainingIndex = (
    index: number,
    tilesArray: number[],
    tiles: number[]
  ): any => {
    if (!tilesArray.includes(index)) {
      return index;
    } else {
      const newNumber = Math.floor(Math.random() * tiles.length);
      return this.calculateRemainingIndex(newNumber, tilesArray, tiles);
    }
  };
}
