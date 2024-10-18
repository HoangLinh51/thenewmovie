import { Component } from '@angular/core';
import { AuthService } from 'src/app/data/service/auth.service';
import { StorageService } from 'src/app/data/service/localstorage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  user: any;
  constructor(
    private storageService: StorageService,
    private authService: AuthService
  ) {
    this.user = this.storageService.get('user');
  }

  logout() {
    this.authService.logout();
  }
}
