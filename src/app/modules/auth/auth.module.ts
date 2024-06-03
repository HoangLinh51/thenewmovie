import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ShareModule } from "src/app/share/share.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";


@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ShareModule,
  ],
})
export class AuthModule { }
