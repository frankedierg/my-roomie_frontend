import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../app/components/navbar/navbar.component'; // ajusta la ruta si es necesario

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };

  message = '';

  constructor(private http: HttpClient, private router: Router) {}

  loginUser() {
  this.http.post<any>('http://localhost:5000/api/users/login', this.credentials)
    .subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));

        this.message = '✅ Inicio de sesión exitoso';
        this.credentials = { email: '', password: '' };

        this.router.navigate(['/users']); // ✅ redirección
      },
      error: (err) => {
        this.message = '❌ Error: ' + (err.error?.error || 'Credenciales incorrectas');
      }
    });
}
}

