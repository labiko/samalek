import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  signal_app_id: string = "29f94e62-614c-41e7-a912-d60b485858ff"
  firebase_id: string = "419310645747"
  public BaseUrl: string = 'http://localhost:2913'
  Module_Samalek: string = '/Samalek'
  PlayerId: any
  constructor(private http: HttpClient) { }
}
