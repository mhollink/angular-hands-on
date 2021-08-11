import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, tap} from "rxjs/operators";
import {Observable, of} from "rxjs";

type Credentials = {
  username: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  login({username, password}: Credentials) {
    return this.http.post<any>('/api/users/authenticate', {username, password})
      .pipe(tap(response => {
        localStorage.setItem('user', username)
        localStorage.setItem('token', response.token)
      }))
  }

  createUser({username, password}: Credentials) {
    return this.http.post('/api/users/register', {username, password})
  }

  isLoggedIn(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) return of(false)

    return this.getUsername()
      .pipe(
        map((user) => !!user),
        catchError(err => {
          if (err.status === 401) localStorage.removeItem('token');
          return of(false)
        }))
  }

  getUsername() {
    const token = localStorage.getItem('token');
    return this.http.get('/api/users/current', {headers: {authorization: 'Bearer ' + token}})
  }
}
