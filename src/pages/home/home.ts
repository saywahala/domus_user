import {Component, ViewChild, ElementRef } from '@angular/core';
import {IonicPage, Modal, NavController, NavParams, ModalController} from 'ionic-angular';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';

import {BaseClass} from '../../app/base.class';
import {CommonHeaderComponent} from '../../components/common-header/common-header';

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})
export class HomePage extends BaseClass {
    public common_header: CommonHeaderComponent;
    /*
     * @fucntion construction
     * @access public
     * @return void
     */
    constructor(public navCtrl: NavController, public navParams: NavParams, public modal: ModalController, public authService: AuthServiceProvider) {
        super();
        /*if (!this.isLoggedIn()) {
            this.navigateTo("LoginPage");
        }*/
        this.setPageCategories();
    }
    /*
     * @funciton ionViewDidLoad
     * @access public 
     * @return void
     */
    ionViewDidLoad() {
        //do animation
    }

    /*
     * set the category title 
     * @access public 
     * @return void
     */
    public setPageCategories() {
    }
    ///

}
