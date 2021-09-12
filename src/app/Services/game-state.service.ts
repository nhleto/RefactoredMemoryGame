import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  // tslint:disable-next-line:variable-name
  private _tileArrayStream = new BehaviorSubject<number>(0);
  public readonly tileArrayStream$ = this._tileArrayStream.asObservable();
  chosenTileStream$ = new Observable<number>();

  constructor() {
    this.seedTileArray$();
  }

  seedTileArray$ = () => {
    const arr = [...Array(75).keys()];
    arr.forEach(x => this._tileArrayStream.next(x));
  }

  chooseGameTiles = (tiles: number[], gameDifficulty: number) => {
    const chosenTiles: number[] = [];
    [...Array(gameDifficulty)].map((_, i) => {
      const x = Math.floor(Math.random() * tiles.length);
      chosenTiles.push(this.calculateRemainingIndex(x, chosenTiles, tiles));
    });
    console.log(chosenTiles);
  }

  private calculateRemainingIndex = (index: number, tilesArray: number[], tiles: number[]): any => {
    if (!tilesArray.includes(index)) {
      return index;
    } else {
      const newNumber = Math.floor(Math.random() * tiles.length);
      return this.calculateRemainingIndex(newNumber, tilesArray, tiles);
    }
  }

}
