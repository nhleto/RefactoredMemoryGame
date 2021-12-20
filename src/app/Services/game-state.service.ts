import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  public readonly tileStream$ = new Observable<number>();

  constructor() {
    this.tileStream$ = this.seedTileArray$();
  }

  // Create initial grid size for game
  seedTileArray$ = () => {
    const arr = [...Array(75).keys()];
    return from(arr);
  }

  // Choose clickable tiles based on game difficulty
  chooseGameTiles = (tiles: number[], gameDifficulty: number) => {
    const chosenTiles: number[] = [];
    [...Array(gameDifficulty)].map((_, i) => {
      const x = Math.floor(Math.random() * tiles.length);
      chosenTiles.push(this.calculateRemainingIndex(x, chosenTiles, tiles));
    });

    return from(chosenTiles);
  };

  // Checks index of current tile against chosen tile array and returns whether
  // or not that specific tile was chosen
  checkIndexOfTile(tileIndex: number, tiles: number[]): boolean {
    console.log(tileIndex, tiles)
    return tiles.includes(tileIndex);
  }

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
  }
}
