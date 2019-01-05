import {Component} from '@angular/core';
import {IonicPage, Modal, ModalController, ViewController, NavController, NavParams, AlertController} from 'ionic-angular';
import {AuthServiceProvider} from '../providers/auth-service/auth-service';

export abstract class BaseClass {

    public navCtrl: NavController;
    public navParams: NavParams;
    public modal: ModalController;
    public user: any;

    public user_location: any;
    public categories: any;
    public cities: any;
    public authService: AuthServiceProvider

    public responseData: any;
    public error_html: any;

    public show_error_message = false;
    public view: ViewController;
    public alertCtrl: AlertController;

    public doingSearch = false;
    /*
     * @function constructor
     * @access public
     * @return void
     */
    constructor() {
    }

    /*
     * @function setCategoriess
     * @access public
     * @return mixed
     */
    public getCategories() {
        this.categories = localStorage.getItem("categories");
        this.setUserDetails();

        this.categories = JSON.parse(localStorage.getItem('categories'));
        if (this.categories) {
            var expire_time = JSON.parse(localStorage.getItem("categories_expires_in"));
            var current_time = new Date().getTime();
            if (typeof (expire_time) !== 'undefined' && expire_time !== "" && expire_time !== null && expire_time > current_time) {
                return this.categories;
            }
        }

        //get categories from the sytem
        var tdata = {"access_token": this.user.access_token, "user_id": this.user.id};
        this.authService.postData(tdata, 'categories').then((result) => {
            this.responseData = result;
            if (this.responseData.error) {
                this.error_html = this.responseData.error.message;
                this.show_error_message = true;
            }
            else if (this.responseData.categories) {
                //login successful
                localStorage.setItem('categories', JSON.stringify(this.responseData.categories));

                var expire_time = new Date().getTime() + 30 * 60000;
                localStorage.setItem('categories_expires_in', JSON.stringify(expire_time));

                this.categories = JSON.parse(localStorage.getItem('categories'));
                return this.categories;
            }
            else {
                this.error_html = "There was an error completing your request.";
                this.show_error_message = true;
                return [];
            }
        }, (err) => {
            //Connection Failed
            return [];
        });

        return [];
    }

    /*
     * @function getCities
     * @access public
     * @return mixed
     */
    public getCities() {
        this.cities = localStorage.getItem("cities");
        this.setUserDetails();
        this.user_location = JSON.parse(localStorage.getItem('user_location'));

        /*this.cities = JSON.parse(localStorage.getItem('cities'));
        if (this.cities) {
            var expire_time = JSON.parse(localStorage.getItem("cities_expires_in"));
            var current_time = new Date().getTime();
            if (typeof (expire_time) !== 'undefined' && expire_time !== "" && expire_time !== null && expire_time > current_time) {
                return this.cities;
            }
        }*/

        //get categories from the sytem
        var tdata: any = {};
        tdata["access_token"] = this.user.access_token;
        tdata['user_id'] = this.user.id;
        if (this.user_location) {
            tdata['city_id'] = this.user_location.id;
        }
        this.authService.postData(tdata, 'cities').then((result) => {
            this.responseData = result;
            if (this.responseData.error) {
                this.error_html = this.responseData.error.message;
                this.show_error_message = true;
            }
            else if (this.responseData.cities) {
                //login successful
                localStorage.setItem('cities', JSON.stringify(this.responseData.cities));

                var expire_time = new Date().getTime() + 30 * 60000;
                localStorage.setItem('cities_expires_in', JSON.stringify(expire_time));

                this.cities = JSON.parse(localStorage.getItem('cities'));
                return this.cities;
            }
            else {
                this.error_html = "There was an error completing your request.";
                this.show_error_message = true;
                return [];
            }
        }, (err) => {
            //Connection Failed
            return [];
        });

        return [];
    }

    /*
     * @function getAccessTotken
     * @access private
     * @return JSON
     */
    public setUserDetails() {
        this.user = JSON.parse(localStorage.getItem('user_data'));
    }

    /*
     * @function getCategoryDetails
     * @access public
     * @return void
     */
    public getCategoryDetails(id, callbackFunction) {
        this.setUserDetails();
        var tdata = {"access_token": this.user.access_token, "user_id": this.user.id};
        var url_query = this.encodeQueryData({"id": id});
        this.authService.postData(tdata, 'categories/details?' + url_query).then((result) => {
            this.responseData = result;
            if (this.responseData.error) {
                console.log(this.responseData.error.message);
            }
            else if (this.responseData.category) {
                //login successful
                var category = this.responseData.category;
                if (this[callbackFunction]) {
                    this[callbackFunction](category);
                }
            }
            else {
                console.log("category does not exists");
            }
        }, (err) => {
            //Connection Failed
            console.log("connection failed");
        });

    }


    /*
     * @function getLocationDetails
     * @access public
     * @return void
     */
    public getLocationDetails(id, callbackFunction) {
        this.setUserDetails();
        var tdata = {"access_token": this.user.access_token, "user_id": this.user.id};
        var url_query = this.encodeQueryData({"id": id});
        this.authService.postData(tdata, 'cities/details?' + url_query).then((result) => {
            this.responseData = result;
            if (this.responseData.error) {
                console.log(this.responseData.error);
            }
            else if (this.responseData.city) {
                //login successful
                var city = this.responseData.city;
                if (this[callbackFunction]) {
                    this[callbackFunction](city);
                }
            }
            else {
                console.log("city does not exists");
            }
        }, (err) => {
            //Connection Failed
            console.log("connection failed");
        });

    }

    /*
     * @function encodeQueryData
     * creates url val=key 
     * @access public
     * @return string
     */
    public encodeQueryData(data) {
        let ret = [];
        for (let d in data)
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
        return ret.join('&');
    }
    /*
     * @function navigateTo
     * @var string pageName 
     * @return void
     */
    public navigateTo(pageName: any, passedData = {}) {
        this.navCtrl.push(pageName, passedData);
    }

    /*
     * @functio presentAlert
     * shows alert
     * @access public
     * @return void
     */
    public presentAlert($title, $message) {
        let alert = this.alertCtrl.create({
            title: $title,
            subTitle: $message,
            buttons: ['Close']
        });
        alert.present();
    }
    /*
         * @function openCategories
         * @access protected
         * @return void
         */
    openModal(modalName, afterFunction = "", modalData = "") {
        const myModal: Modal = this.modal.create(modalName, modalData);
        myModal.present();
        myModal.onDidDismiss(data => {
            if (this[afterFunction]) {
                this[afterFunction](data);
            }
        });

        //this.catTextRef.nativeElement.innerHTML('8jufis');
    }
    /*
     * @function close Modal
     * closes the modal
     * @return void
     */
    public closeModal() {
        this.view.dismiss();
    }
    /*
     * @function showLoading
     * @access public
     * @return void
     */
    public showLoading() {
        this.doingSearch = true;
    }
    /*
     * @function hideLoading
     * @access public
     * @return void
     */
    public hideLoading() {
        this.doingSearch = false;
    }
    /*
     * @function doLogout
     * @access public
     * @return void
     */
    public doLogout() {
        localStorage.clear();
        setTimeout(this.navigateTo("WelcomePage"), 1500)
    }
    /*
     * @function checkLogin
     * checks if the user is logged
     * @access pbulic
     * @return void
     */
    public isLoggedIn() {
        if (localStorage.getItem("user_data")) {
            //user is logged in
            this.setUserDetails();
            return true;

        } else {
            return false;
        }
    }

    /*
     * @function hasLocation
     * checks if the user has selected a country
     * @access pbulic
     * @return void
     */
    public hasLocation() {
        if (localStorage.getItem("user_location")) {
            //user is has set country 
            this.user_location = JSON.parse(localStorage.getItem('user_location'))
            return true;

        } else {
            return false;
        }
    }

    /*
     * @function setUserLocation
     * sets user location after results is gotten from database
     * @access pbulic
     * @return void
     */
    public setUserLocation(city) {
        localStorage.setItem('user_location', JSON.stringify(city));
        this.user_location = JSON.parse(localStorage.getItem('user_location'))
    }

}

