import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
} from "@angular/router";
import { TokenStorageService } from "src/app/service/token-storage.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuarduser implements CanActivate {
  constructor(private router: Router, private tokenStorage: TokenStorageService) { }
  canActivate(): boolean {
    // Check if user is logged in
    if (!this.tokenStorage.getToken()) {
      // If not logged in, redirect to login page
      this.router.navigate(["/authentication/signinuser"]);
      return false;
    }
    return true;
  }

}