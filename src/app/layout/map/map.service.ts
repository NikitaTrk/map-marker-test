import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MapService {
  constructor(private readonly httpClient: HttpClient) {}

  getPlaces() {
    return this.httpClient.get<ReadonlyArray<ServerPlace>>('assets/data/places.json');
  }

  getUserMarkers() {
    return this.httpClient.get<ReadonlyArray<ServerUser>>('https://jsonplaceholder.typicode.com/users');
  }
}

interface ServerPlace {
  readonly id: number;
  readonly name: string;
  readonly type: string;
  readonly coordinates: [number, number];
}

interface ServerUser {
  readonly id: number;
  readonly name: string;
  readonly username: string;
  readonly email: string;
  readonly address: {
    readonly street: string;
    readonly suite: string;
    readonly city: string;
    readonly zipcode: string;
    readonly geo: {
      readonly lat: string;
      readonly lng: string;
    };
  };
  readonly phone: string;
  readonly website: string;
  readonly company: {
    readonly name: string;
    readonly catchPhrase: string;
    readonly bs: string;
  };
}
