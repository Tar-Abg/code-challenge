import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { concatMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private userId: string;
  private groupId: string;

  constructor(private http: HttpClient) { 
  }

  getLists(){
    return this.http.get(`${environment.domain}user/taron_abgaryan`)
    .pipe(
      tap(res => this.userId = res['userId']),
      concatMap((res: { timeout: number }) => this.http.get(`${environment.domain}group/taron_abgaryan`)),
      tap(res => this.groupId = res['groupId']),
      concatMap((res: { timeout: number }) => this.http.get(`${environment.domain}proscons/group/${this.groupId}/user/${this.userId}`)),
    )
  }

  updateList(body){
    return this.http.put(`${environment.domain}proscons/group/${this.groupId}/user/${this.userId}`, body);
  }

}
