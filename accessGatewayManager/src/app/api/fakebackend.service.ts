import {
  BaseRequestOptions,
  Http,
  RequestMethod,
  RequestOptions,
  Response,
  ResponseOptions,
  XHRBackend,
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { filter } from 'rxjs/operator/filter';

// utils
function uuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions, realBackend: XHRBackend) {
  const filtersMockDb: any[] = [];
  filtersMockDb.push({});
  // configure fake backend
  backend.connections.subscribe((connection: MockConnection) => {
    // wrap in timeout to simulate server api call
    setTimeout(() => {
      // authenticate
      if (connection.request.url.endsWith('/api/login/') && connection.request.method === RequestMethod.Post) {
        // get parameters from post request
        const params = JSON.parse(connection.request.getBody());
        console.log(params);

        if (params.username === 'demo' && params.password === 'anaare1234') {
          connection.mockRespond(
            new Response(
              new ResponseOptions({
                status: 200,
                body: {
                  idUser: 3,
                  username: params.username,
                  token: 'eyJhbGciOiJIUzUxMiJ9dseyJzdWIi',
                },
              }),
            ),
          );
        } else {
          connection.mockError(new Error('Username or password is incorrect'));
        }
        return;
      }
      if (
        connection.request.url.endsWith('/api/checkIsAuthenticated') &&
        connection.request.method === RequestMethod.Get
      ) {
        const jwtToken = connection.request.headers.get('Authorization');
        console.log(jwtToken);

        if (jwtToken === 'Bearer eyJhbGciOiJIUzUxMiJ9dseyJzdWIi') {
          connection.mockRespond(
            new Response(
              new ResponseOptions({
                status: 200,
              }),
            ),
          );
        } else {
          // else return 400 bad request
          connection.mockError(new Error('Username or password is incorrect'));
        }
        return;
      }
      // end  authenticate

      // import
      if (connection.request.url.endsWith('api/import/') && connection.request.method === RequestMethod.Post) {
        // get parameters from post request
        const params = connection.request.getBody();
        connection.mockRespond(
          new Response(
            new ResponseOptions({
              status: 200,
              body: { data: 'Files successfully imported' },
            }),
          ),
        );
        return;
      }
      // end import

      // filter-management

      // get configuration
      if (connection.request.url.endsWith('api/configuration/') && connection.request.method === RequestMethod.Get) {
        // get parameters from post request
        const params = connection.request.getBody();
        connection.mockRespond(
          new Response(
            new ResponseOptions({
              status: 200,
              // tslint:disable-next-line:max-line-length
              body: `{"data":[{"attributeKeys":[{"name":"Sachnummer","code":"snr","type":"string","options":null},{"name":"Y-Nummer","code":"ynr","type":"string","options":null},{"name":"ATS","code":"ats","type":"date","options":null}],"name":"Unique identifire configuration","code":"unique_identifier","tableName":"unique_identifier"},{"attributeKeys":[{"name":"Erwarteter Liefertermin","code":"expectedDeliveryDate_icl","type":"date","options":null},{"name":"Beschaffungsmenge","code":"procurementQuantity_icl","type":"number","options":null},{"name":"Level 2","code":"level2_icl","type":"string","options":null},{"name":"Anlieferadresse","code":"deliveryAddress_icl","type":"string","options":null},{"name":"AI","code":"ai_icl","type":"number","options":null},{"name":"Derivatsgruppen","code":"derivatGroups_icl","type":"string","options":null},{"name":"Komponente","code":"component_icl","type":"string","options":null},{"name":"Eigentümergruppe","code":"ownerGroup_icl","type":"string","options":null},{"name":"Sachnummer","code":"snr","type":"string","options":null},{"name":"I-Stufe","code":"iStep_icl","type":"string","options":null},{"name":"Beschaffungsstatus","code":"procurementStatus_icl","type":"string","options":null},{"name":"Mast Status","code":"mast_status_icl","type":"category","options":[{"name":"inProgress","value":"inProgress"},{"name":"done","value":"done"}]},{"name":"Umrüstnummer","code":"conversionNumber_icl","type":"string","options":null},{"name":"Ansprechpartner","code":"contactPerson_icl","type":"string","options":null},{"name":"Y-Nummer","code":"ynr","type":"string","options":null},{"name":"ATS","code":"ats","type":"date","options":null},{"name":"Level 1","code":"level1_icl","type":"string","options":null}],"name":"ICL configuration","code":"icl","tableName":"icl_data"},{"attributeKeys":[{"name":"Umrüstnummer PEP-PDM","code":"conversionNumberPepPdm_evr_care_dialog","type":"string","options":null},{"name":"Materialkurztext","code":"materialShortText_evr_care_dialog","type":"string","options":null},{"name":"Bedarfsmenge","code":"requiredAmount_evr_care_dialog","type":"number","options":null},{"name":"Dispohinweis","code":"dispoNote_evr_care_dialog","type":"string","options":null}],"name":"Everest care dialog","code":"everest_care_dialog","tableName":"everest_care_dialog_data"}]}`,
            }),
          ),
        );
        return;
      }

      // get user filters
      if (connection.request.url.endsWith('api/filter/3') && connection.request.method === RequestMethod.Get) {
        // get parameters from post request
        const params = connection.request.getBody();
        connection.mockRespond(
          new Response(
            new ResponseOptions({
              status: 200,
              body: { data: filtersMockDb },
            }),
          ),
        );
        return;
      }

      // save filter
      if (connection.request.url.endsWith('api/filter/') && connection.request.method === RequestMethod.Post) {
        // get parameters from post request
        const params = JSON.parse(connection.request.getBody());
        params.id = uuid();
        filtersMockDb.push(params);
        connection.mockRespond(
          new Response(
            new ResponseOptions({
              status: 200,
              body: { data: 'Filter saved' },
            }),
          ),
        );
        return;
      }

      // pass through any requests not handled above
      const realHttp = new Http(realBackend, options);
      const requestOptions = new RequestOptions({
        method: connection.request.method,
        headers: connection.request.headers,
        body: connection.request.getBody(),
        url: connection.request.url,
        withCredentials: connection.request.withCredentials,
        responseType: connection.request.responseType,
      });
      realHttp.request(connection.request.url, requestOptions).subscribe(
        (response: Response) => {
          connection.mockRespond(response);
        },
        (error: any) => {
          connection.mockError(error);
        },
      );
    }, 100);
  });

  return new Http(backend, options);
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: Http,
  useFactory: fakeBackendFactory,
  deps: [MockBackend, BaseRequestOptions, XHRBackend],
};
