import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user = new BehaviorSubject<User | null>(null)
  setUser(user: User | null) {
    this.user.next(user)
  }
  getUser() {
    return this.user.asObservable();
  }
}
