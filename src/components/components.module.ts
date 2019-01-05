import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {IonicPageModule} from "ionic-angular";
import {CommonHeaderComponent} from './common-header/common-header';

@NgModule({
    declarations: [CommonHeaderComponent],
    imports: [IonicPageModule.forChild(CommonHeaderComponent)],
    exports: [CommonHeaderComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ComponentsModule {}
