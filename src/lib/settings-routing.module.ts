import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CmsSettingsComponent } from './cms-settings.component';

const routes: Routes = [
  {
    path: 'settings', component: CmsSettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
