import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { GatewayAccessService } from '@app/api/gateway-access.service';
import { httpInterceptorProviders } from '@app/api/http-interceptors';
import { AuthService } from './auth.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [],
  providers: [httpInterceptorProviders, GatewayAccessService, AuthService],
})
export class ApiModule {}
