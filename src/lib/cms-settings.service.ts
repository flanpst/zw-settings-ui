import { Inject, Injectable } from '@angular/core';
import { Settings } from './class/settings';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CrudService } from './abstract/crud.service';

@Injectable({
  providedIn: 'root'
})
export class CmsSettingsService extends CrudService<Settings, number>{

  constructor(
    @Inject('env') protected environment,
    protected _http: HttpClient

  ) {
    super(environment, _http)
  }

  getResourceUrl(): string {
    return '/setting'
  }

  updateConfig(t: Settings): Observable<Settings>{
    return this._http.post<Settings>(`${this.environment.server_url}` + this.getResourceUrl() + '/', t, {});
  }
}
