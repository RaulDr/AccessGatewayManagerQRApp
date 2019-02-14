import { Component, OnInit, VERSION, ViewChild } from '@angular/core';

import { ZXingScannerComponent } from '@zxing/ngx-scanner';

import { GatewayAccessService } from '@app/api/gateway-access.service';
import { AccessLogResponse } from '@app/model/access-log-response';
import { Result } from '@zxing/library';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-gateway-access',
  templateUrl: './gateway-access.component.html',
  styleUrls: ['./gateway-access.component.less'],
})
export class GatewayAccessComponent implements OnInit {
  @ViewChild('scanner') scanner: ZXingScannerComponent;

  hasCameras = false;
  hasPermission: boolean;

  availableDevices: MediaDeviceInfo[];
  selectedDevice: MediaDeviceInfo;

  constructor(private gatewayAccessService: GatewayAccessService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.hasCameras = true;
      console.log('Devices: ', devices);
      this.availableDevices = devices;
      // selects the devices's back camera by default
      for (const device of devices) {
        if (/back|rear|environment/gi.test(device.label)) {
          this.scanner.changeDevice(device);
          this.selectedDevice = device;
          break;
        }
      }
    });

    this.scanner.camerasNotFound.subscribe((devices: MediaDeviceInfo[]) => {
      console.error('An error has occurred when trying to enumerate your video-stream-enabled devices.');
    });

    this.scanner.permissionResponse.subscribe((answer: boolean) => {
      this.hasPermission = answer;
    });
  }

  handleQrCodeResult(resultString: string) {
    this.gatewayAccessService.requestGatewayAccess(JSON.parse(resultString)).subscribe((log: AccessLogResponse) => {
      if (log.allowed) {
        this.messageService.add({ severity: 'success', summary: log.data });
      } else {
        this.messageService.add({ severity: 'error', summary: log.data });
      }
    });
  }

  onDeviceSelectChange(selectedValue: string) {
    console.log('Selection changed: ', selectedValue);
    this.selectedDevice = this.scanner.getDeviceById(selectedValue);
  }
}
