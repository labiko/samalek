import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,ReactiveFormsModule,FormsModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
