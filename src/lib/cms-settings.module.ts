import { LOCALE_ID, ModuleWithProviders, NgModule } from '@angular/core';
import { CmsSettingsComponent } from './cms-settings.component';

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
import { SharedModule } from 'src/app/shared/shared.module';
import { NZ_I18N, pt_BR } from 'ng-zorro-antd/i18n';
import { SettingsRoutingModule } from './settings-routing.module';
import { CmsSettingsService } from './cms-settings.service';


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
    SharedModule,
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

