import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cow } from '../models/cow.models';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CowService {
  private baseUrl = `${environment.apiBaseUrl}/cow`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<Cow[]> {
    return this.http.get<Cow[]>(this.baseUrl);
  }

  getById(id: number): Observable<Cow> {
    return this.http.get<Cow>(`${this.baseUrl}/${id}`);
  }

  create(cow: Cow): Observable<Cow> {
    return this.http.post<Cow>(this.baseUrl, cow);
  }

  update(cow: Cow): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${cow.id}`, cow);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
