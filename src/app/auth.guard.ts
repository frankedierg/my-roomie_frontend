import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Validar que 'window' está definido (estamos en navegador)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');

      if (!token) {
        // 🚫 Sin token: redirigir al login
        this.router.navigate(['/login']);
        return false;
      }
      // ✅ Token presente: permitir acceso
      return true;
    }

    // Si no estamos en navegador, bloqueamos acceso (por seguridad)
    this.router.navigate(['/login']);
    return false;
  }
}
