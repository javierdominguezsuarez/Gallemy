import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User, UserCredential } from '@angular/fire/auth';
import { LoginData } from '../interfaces/login-data.interface';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor( private auth: Auth,private user:UserService) { }

  login({email,password}: LoginData):Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth,email,password)
    .then((userCredential: UserCredential) => {
      const user = userCredential.user;
      this.user.setUser(user)
      return userCredential;
    })
  }
  register({ email, password }: LoginData) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    this.user.setUser(null)
    return signOut(this.auth)

  }
}
