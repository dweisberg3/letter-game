import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HOST_API } from '../../utils/constants';
import { AuthResponse, ScoreTally, User } from '../../models/user.model';
import { GameParams, GameRecord } from '../../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = HOST_API;

  constructor(private http: HttpClient) { }

  login(formData: FormData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, formData);
  }

  getScoreboard(): Observable<ScoreTally[]> {
    return this.http.get<ScoreTally[]>(`${this.apiUrl}/scoreboard`);
  }

  sendGameData(data: GameParams): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/gameover`, data, { headers });
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/get_users`);
  }

  createUser(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/create_user`, formData);
  }

  getRecords(username: string): Observable<GameRecord[]> {
    return this.http.get<GameRecord[]>(`${this.apiUrl}/get_records?username=${encodeURIComponent(username)}`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  removeUser(username: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete(`${this.apiUrl}/remove_user`, {
      headers,
      body: { username }
    });
  }
}
