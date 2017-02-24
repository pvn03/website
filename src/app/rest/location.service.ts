import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Location } from './location';

@Injectable()

export class LocationService {
  private locationUrl = 'http://iot.andrew.cmu.edu:10010/api/location';  // URL to web API
  
  constructor (private http: Http) {

  }
  
  getRootLocation (): Observable<Location> {
    return this.http.get(this.locationUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getLocationById(id: string): Observable<Location> {
    return this.http.get(this.locationUrl + "/" + id)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getChildrenLocations(children: Array<string>): Array<Observable<Location>> {
    var self = this;
    var childLocations = children.map(function(x) {
      return self.http.get(self.locationUrl + "/" + x).map(self.extractData).catch(self.handleError);
    });
    return childLocations;
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}