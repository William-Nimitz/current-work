import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(
    private http: HttpClient) {
  }

  uploadFile(file: File): any {

    const video = new FormData();
    video.append("video", file, file.name);

    // live url : environment.apiUrl
    // tester url: localhost
    const path = "http://localhost/imageUploader/db/ajax.php";

    return this.http.post(path, video);
    // this.http.post<any>(environment.apiUrl + '/format/create', data);
    // return this.http.post<Format>(environment.apiUrl + '/format/create', data);
  }
  deleteFile(): void {
    // coming soon, functionality that file existed will be deleted
  }
  updateFile(): void {
    // coming soon => functionality that file existed will be deleted 
    // and upload new file instead of old file
  }

}
