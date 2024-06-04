import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/data/service/auth.service';
import { StorageService } from 'src/app/data/service/localstorage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  user: any
  constructor(private storageService: StorageService, private router: Router){
    this.user = this.storageService.get('user')
  }

  logout(){
    this.storageService.remove('user')
    this.storageService.remove('credentials')
    this.router.navigate(['/sign-in']).then(()=>
      window.location.reload()
    )
  }
}
``