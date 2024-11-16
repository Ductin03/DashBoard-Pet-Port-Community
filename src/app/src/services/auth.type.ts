export interface User {
    role: string[];
  }
  
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    role: string[];
    token: string | null;
    refreshToken: string | null;
    error: string | null;
    isLoading: boolean;
    message: string | null;
  }