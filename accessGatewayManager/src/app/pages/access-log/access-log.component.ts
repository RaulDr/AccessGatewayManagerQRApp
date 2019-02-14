import { Component, OnInit } from '@angular/core';
import { GatewayAccessService } from '@app/api/gateway-access.service';
import { AccessLog } from '@app/model/access-log';
import * as _ from 'lodash';

@Component({
  selector: 'app-access-log',
  templateUrl: './access-log.component.html',
  styleUrls: ['./access-log.component.less'],
})
export class AccessLogComponent implements OnInit {
  accesslogs: AccessLog[] = [];
  accesslog: AccessLog = { inTimestamp: '', outTimestamp: '' };
  timezone = new Date().toString().match(/([-\+][0-9]+)\s/)[1];
  workrecord: any;
  workrecordready = false;
  constructor(private gatewayAccessService: GatewayAccessService) {}

  ngOnInit() {
    this.workrecord = {
      labels: [],
      datasets: [
        {
          label: 'Work Record',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [],
        },
      ],
    };
    this.gatewayAccessService.requestGatewayAccessLog().subscribe((accesslogs: AccessLog[]) => {
      if (!_.isUndefined(accesslogs) || !_.isNull(accesslogs)) {
        accesslogs.forEach((accesslog: AccessLog) => {
          const outtime = new Date(accesslog.outTimestamp);
          const intime = new Date(accesslog.inTimestamp);
          const diff = outtime.getTime() - intime.getTime();
          const workhours = Math.round(diff / 60000 / 60);
          this.workrecord.labels.push(outtime.getDate());
          this.workrecord.datasets[0].data.push(workhours);
        });
        this.workrecordready = true;
      }
    });
    this.gatewayAccessService
      .requestTodayGatewayAccessLog()
      .subscribe((accesslog: AccessLog) => (this.accesslog = accesslog));
  }
}
