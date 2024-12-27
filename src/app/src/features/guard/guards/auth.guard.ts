import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/src/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.isAuthenticated$.pipe(
      map(isAuthenticated => {
        const expectedRole = next.data['role']; // Expected role from route data
        const userRole = this.authService.getStoredRole(); // Get user role from local storage

        // Check if the user is authenticated and has the correct role
        if (!isAuthenticated || (expectedRole && !userRole.includes(expectedRole))) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }
}
