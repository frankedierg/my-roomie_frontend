import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // 👈 Importar esto
import { NavbarComponent } from '../../components/navbar/navbar.component'; // ajusta la ruta si es necesario

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent,HttpClientModule], // 👈 Agregado aquí
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  user = {
  name: '',
  email: '',
  university: '',
  preferences: '',
  password: ''
  };

  message = '';

  constructor(private http: HttpClient) {}

  registerUser() {
    this.http.post('http://localhost:5000/api/users', this.user)
      .subscribe({
        next: (res) => {
          this.message = 'Usuario registrado exitosamente 🎉';
          this.user = { name: '', email: '', university: '', preferences: '',password: '' };
        },
        error: (err) => {
          this.message = '❌ Error al registrar: ' + (err.error?.error || 'Error desconocido');
        }
      });
  }
}
