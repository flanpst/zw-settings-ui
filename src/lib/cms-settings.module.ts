import { LOCALE_ID, ModuleWithProviders, NgModule } from '@angular/core';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NZ_I18N, pt_BR } from 'ng-zorro-antd/i18n';
import { SettingsRoutingModule } from './settings-routing.module';
import { CmsSettingsService } from './cms-settings.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CmsSettingsComponent } from './cms-settings.component';


const antdModule = [
  NzCardModule,
  NzButtonModule,
  NzRadioModule,
  NzFormModule,
  NzSwitchModule,
  NzUploadModule,
  NzInputModule,
  NzSelectModule,
  NzMessageModule
]

@NgModule({
  declarations: [
    CmsSettingsComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NzIconModule,
    ...antdModule,
    SettingsRoutingModule
  ],
  exports: [
    CmsSettingsComponent
  ],
  providers: [
    {
      provide: NZ_I18N,
      useValue: pt_BR,
  },
  {
      provide: LOCALE_ID,
      useValue: 'pt'
  },
  {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
  },
  ]

})

export class CmsSettingsModule {

  static forRoot(environment): ModuleWithProviders<any> {

    return {
        ngModule: CmsSettingsModule,
        providers: [
            CmsSettingsService,
            {
                provide: 'env', // you can also use InjectionToken
                useValue: environment
            }
        ]
    };
  }
}

