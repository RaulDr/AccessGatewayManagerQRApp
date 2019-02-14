import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccessLog } from '@app/model/access-log';
import { AccessLogResponse } from '@app/model/access-log-response';
import { User } from '@app/model/user';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import * as _ from 'lodash';
import { MessageService } from 'primeng/components/common/messageservice';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class GatewayAccessService {
  constructor(private http: HttpClient, private storage: AsyncLocalStorage, private messageService: MessageService) {}

  requestGatewayAccess(qrEncrypted: any): Observable<any> {
    if (_.isUndefined(qrEncrypted) || _.isNull(qrEncrypted)) {
      throw new Error('qrcode null or undefined');
    }
    return new Observable<any>((observer) => {
      this.storage.getItem('user').subscribe((user: User) => {
        const accessrequest = {
          idUser: user.id,
          gateName: qrEncrypted.gateName,
        };
        this.http.post('gateway/access/', accessrequest).subscribe(
          (log: AccessLogResponse) => {
            observer.next(log);
          },
          (err) => {
            this.messageService.add({ severity: 'error', summary: 'http error' });
          },
        );
      });
    });
  }

  requestTodayGatewayAccessLog(): Observable<any> {
    return new Observable<any>((observer) => {
      this.storage.getItem('user').subscribe((user: User) => {
        this.http.get(`gateway/access/log/${user.id}/today`).subscribe((accesslog: AccessLog) => {
          observer.next(accesslog);
        });
      });
    });
  }

  requestGatewayAccessLog(): Observable<any> {
    return new Observable<any>((observer) => {
      this.storage.getItem('user').subscribe((user: User) => {
        this.http.get(`gateway/access/log/${user.id}`).subscribe((accesslogs: AccessLog[]) => {
          observer.next(accesslogs);
        });
      });
    });
  }
}
