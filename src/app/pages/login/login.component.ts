import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.loading = true;
    if (this.username && this.password) {
      this.authService.login(this.username, this.password).subscribe((res: any) => {
        this.router.navigate(['/productos'])
      }).add(() => {
        this.loading = false;
      })
    }
  }
}