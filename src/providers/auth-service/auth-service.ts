import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

let apiUrl = "http://127.0.0.1/domus_mapp/api/";
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

    constructor(public http: Http) {
    }

    /*
     * @function postData
     * posts data to server
     * @access public
     * @return any
     */
    postData(credentials, type) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();

            this.http.post(apiUrl + type, JSON.stringify(credentials), {headers: headers})
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });

    }

    /*
     * @function getData
     * gets data to server
     * @access public
     * @return any
     */
    getData(credentials, type) {
        return new Promise((resolve, reject) => {
            this.http.get(apiUrl + type, JSON.stringify(credentials))
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }

}
