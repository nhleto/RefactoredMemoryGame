import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  tileArrayStream$ = new Observable<number>();
  chosenTileStream$ = new Observable<number>();

  constructor() {
    this.tileArrayStream$ = this.seedTileArray$();
  }

  seedTileArray$ = () => {
    const arr = [...Array(75).keys()];
    return from(arr);
  }



}
