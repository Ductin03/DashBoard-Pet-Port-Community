import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User, AuthState } from './auth.type';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://localhost:4000/api/v1';
  private AUTH_URL = `${this.API_URL}/auth`;
  
  private state = new BehaviorSubject<AuthState>({
    user: this.getStoredUser(),
    isAuthenticated: this.getStoredIsAuthenticated(),
    role: this.getStoredRole(),
    token: this.getStoredToken(),
    refreshToken: this.getStoredRefreshToken(),
    error: null,
    isLoading: false,
    message: null
  });

  state$ = this.state.asObservable();
  user$ = new BehaviorSubject<User | null>(this.getStoredUser());
  isAuthenticated$ = new BehaviorSubject<boolean>(this.getStoredIsAuthenticated());
  token$ = new BehaviorSubject<string | null>(this.getStoredToken());
  isRefreshing = false;
  refreshTokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {
    this.setupHttpDefaults();
  }

  private setupHttpDefaults() {
    const defaultOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true
    };
    return defaultOptions;
  }

  private getStoredUser(): User | null {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  private getStoredIsAuthenticated(): boolean {
    const storedIsAuthenticated = localStorage.getItem('isAuthenticated');
    return storedIsAuthenticated ? JSON.parse(storedIsAuthenticated) : false;
  }

  private getStoredRole(): string[] {
    const storedRole = localStorage.getItem('role');
    return storedRole ? storedRole.split(',') : [];
  }

  private getStoredToken(): string | null {
    return localStorage.getItem('token');
  }

  private getStoredRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  isTokenExpired(token: string): boolean {
    if (!token) return true;
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const decodedPayload = JSON.parse(window.atob(base64));
      const currentTime = Date.now() / 1000;
      return decodedPayload.exp < currentTime;
    } catch (error) {
      console.error('Error decoding token:', error);
      return true;
    }
  }

  setUserInfo(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.user$.next(user);
    this.updateState({ user });
  }

  login(email: string, password: string): Observable<any> {
    this.updateState({ isLoading: true, error: null });

    return this.http.post(`${this.AUTH_URL}/login`, { email, password }, this.setupHttpDefaults()).pipe(
      tap((response: any) => {
        const { user, token, refreshToken } = response;
        const role = user.role;


        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('role', role);
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);


        this.updateState({
          user,
          role,
          token,
          refreshToken,
          isAuthenticated: true,
          isLoading: false,
          error: null
        });


        this.user$.next(user);
        this.isAuthenticated$.next(true);
        this.token$.next(token);
      }),
      catchError(error => {
        const errorMessage = error.response?.data?.message || 'Error logging in';
        this.updateState({ error: errorMessage, isLoading: false });
        return throwError(() => error);
      })
    );
  }

  logout(): Observable<any> {
    this.updateState({ isLoading: true, error: null });

    return this.http.post(`${this.AUTH_URL}/logout`, {}, this.setupHttpDefaults()).pipe(
      tap(() => {
        this.clearAuth();
      }),
      catchError(error => {
        this.updateState({ error: 'Error logging out', isLoading: false });
        this.clearAuth(); 
        return throwError(() => error);
      })
    );
  }

  private clearAuth(): void {
    localStorage.clear();

    const initialState: AuthState = {
      user: null,
      isAuthenticated: false,
      role: [],
      token: null,
      refreshToken: null,
      error: null,
      isLoading: false,
      message: null
    };
    
    this.updateState(initialState);
    
    this.user$.next(null);
    this.isAuthenticated$.next(false);
    this.token$.next(null);
  }

  verifyEmail(code: string): Observable<any> {
    this.updateState({ isLoading: true, error: null });

    return this.http.post(`${this.AUTH_URL}/verify-email`, { code }, this.setupHttpDefaults()).pipe(
      tap((response: any) => {
        const { user } = response;
        const role = user.role;

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('role', role);

        this.updateState({
          user,
          role,
          isAuthenticated: true,
          isLoading: false
        });
        
        this.user$.next(user);
        this.isAuthenticated$.next(true);
      }),
      catchError(error => {
        const errorMessage = error.response?.data?.message || 'Error verifying email';
        this.updateState({ error: errorMessage, isLoading: false });
        return throwError(() => error);
      })
    );
  }

  forgotPassword(email: string): Observable<any> {
    this.updateState({ isLoading: true, error: null });

    return this.http.post(`${this.AUTH_URL}/forgot-password`, { email }, this.setupHttpDefaults()).pipe(
      tap((response: any) => {
        this.updateState({ 
          message: response.message, 
          isLoading: false 
        });
      }),
      catchError(error => {
        const errorMessage = error.response?.data?.message || 'Error sending reset password email';
        this.updateState({ error: errorMessage, isLoading: false });
        return throwError(() => error);
      })
    );
  }

  resetPassword(token: string, password: string): Observable<any> {
    this.updateState({ isLoading: true, error: null });

    return this.http.post(`${this.AUTH_URL}/reset-password/${token}`, { password }, this.setupHttpDefaults()).pipe(
      tap((response: any) => {
        this.updateState({ 
          message: response.message, 
          isLoading: false 
        });
      }),
      catchError(error => {
        const errorMessage = error.response?.data?.message || 'Error resetting password';
        this.updateState({ error: errorMessage, isLoading: false });
        return throwError(() => error);
      })
    );
  }

  refreshToken(): Observable<any> {
    return this.http.post(`${this.AUTH_URL}/refresh-token`, {}, {
      withCredentials: true
    }).pipe(
      tap((response: any) => {
        const newToken = response.token;
        localStorage.setItem('token', newToken);
        this.token$.next(newToken);
        this.refreshTokenSubject.next(newToken);
        return newToken;
      }),
      catchError(error => {
        this.clearAuth();
        return throwError(() => error);
      })
    );
  }

  private updateState(partialState: Partial<AuthState>): void {
    this.state.next({
      ...this.state.value,
      ...partialState
    });
  }
  getUserNameFromToken():string|null{
    const tokenDecode:any=JSON.parse( localStorage.getItem('user'));
    return tokenDecode;
  }
}

