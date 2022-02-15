import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

//Instead of passing the authorization via httpOptions here, is passed through the request
// const httpOptions = {
//   headers: new HttpHeaders(
//     {
//       Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token
//     }
//   )
// }

//Services in Angular are Singleton which instantiates when a component needs the service
//As they're singleton they still alive until the application is closed.
//Therefore, services are good candidates to store the application state.
//There are in the market many state management solutions: Redux

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];

  constructor(private http:HttpClient) {    
   }

   getMembers() {
     
    if(this.members.length > 0) return of(this.members); //of operator returns the value as an observable
     return this.http.get<Member[]>(this.baseUrl + 'users')
     .pipe(
       map(members => { //map operator returns the value as an observable
         this.members = members;
         return members;
       })
     );
   }

   getMember(username: string) {
     const member = this.members.find(x => x.userName === username);
     if(member !== undefined) return of(member);
    return this.http.get<Member>(this.baseUrl + 'users/' + username/*, httpOptions*/);
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );
  }


}
