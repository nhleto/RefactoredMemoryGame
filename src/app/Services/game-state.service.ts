import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  constructor() {
  }

  seedTileArray$ = () => {
    const arr = [...Array(75).keys()];
    return from(arr);
  }
}
