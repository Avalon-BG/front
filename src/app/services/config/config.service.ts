import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Rules } from '../../types';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  players: { name: string, avatar_index: number, team?: string, roles?: string }[];
  roles: { name: string, team: string }[];

  constructor(private http: HttpClient) {
    this.players = [];
    this.roles = [];
  }

  getRules(): Observable<Rules> {
    return this.http.get<Rules>(`${environment.apiUrl}rules`);
  }

}
