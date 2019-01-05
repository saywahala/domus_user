import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

import {BaseClass} from '../../app/base.class';

@IonicPage()
@Component({
    selector: 'page-welcome',
    templateUrl: 'welcome.html',
})
export class WelcomePage extends BaseClass {

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        super();
        this.navigateTo("HomePage");
    }

    ionViewDidLoad() {
    }
}
