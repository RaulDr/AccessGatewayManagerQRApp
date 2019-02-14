import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ApiModule } from '@app/api/api.module';
import { PagesGuard } from '@app/pages/pages.guard';
import { ClarityModule } from '@clr/angular';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ChartModule } from 'primeng/chart';
import { MessageService } from 'primeng/components/common/messageservice';
import { GrowlModule } from 'primeng/growl';
import { AccessLogComponent } from './access-log/access-log.component';
import { GatewayAccessComponent } from './gateway-access/gateway-access.component';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    // DEPS
    ZXingScannerModule,
    GrowlModule,
    ChartModule,
    // ACGM
    ApiModule,
    PagesRoutingModule,
  ],
  declarations: [PagesComponent, GatewayAccessComponent, AccessLogComponent],
  providers: [PagesGuard, MessageService],
})
export class PagesModule {}
