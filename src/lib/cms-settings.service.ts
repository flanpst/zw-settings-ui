import { Inject, Injectable } from '@angular/core';
import { Settings } from './class/settings';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CrudService } from './abstract/crud.service';
import { ENVIRONMENT } from './cms-settings.module';

@Injectable({
  providedIn: 'root'
})
export class CmsSettingsService extends CrudService<Settings, number>{

  constructor(
    @Inject(ENVIRONMENT) protected environment,
    protected _http: HttpClient

  ) {
    super(environment, _http)
  }

  getResourceUrl(): string {
    return '/setting'
  }

  updateConfig(t: Settings): Observable<Settings>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
    return this._http.post<Settings>(`${this.environment.server_url}` + this.getResourceUrl() + '/', t, {headers: headers});
  }
}
