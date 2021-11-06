./src/app/components/image-cropper/image-cropper.component.ts //20598
import {Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnChanges} from '@angular/core';
import Cropper from 'cropperjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import 'cropperjs/dist/cropper.css';
import {TranslateService} from '@ngx-translate/core';

@Component({
selector: 'app-image-cropper',
templateUrl: './image-cropper.component.html',
styleUrls: ['./image-cropper.component.scss']
})
export class ImageCropperComponent implements OnInit, OnChanges {

@Input() imageChangedEvent: any;
@Input() cropBoxWidth: number;
@Input() cropBoxHeight: number;
@Input() maxSize: number;
@Output() setCroppedImage = new EventEmitter<string>();

@ViewChild('image', { static: false })
public imageElement: ElementRef;

croppedImage = '';
scale = 50;
originalImgWidth: number;
originalImgHeight: number;
imgFileType = '';

private cropper: Cropper;
imageSource: string;

constructor(
private snackBar: MatSnackBar,
private translate: TranslateService
) { }

ngOnChanges(): void {
const file: File = this.imageChangedEvent?.target.files[0];
this.imgFileType = file.type !== '' ? file.type : 'image/jpeg';
const reader = new FileReader();
reader.addEventListener('load', (event: any) => {
const img = new Image();
// img.src = window.URL.createObjectURL(file);
img.src = reader.result as string;
img.onload = () => {
this.imageSource = event.target.result;
this.originalImgWidth = img.width;
this.originalImgHeight = img.height;
if (img.width < this.cropBoxWidth || img.height < this.cropBoxHeight) {
this.openSnackBar(this.translate.instant('ALERTS.IMAGE_SIZE_IS_TOO_SMALL'), 'X');
}
setTimeout(() => {
this.cropperInit();
}, 1);
};
});
reader.readAsDataURL(file);
}

ngOnInit(): void {
this.croppedImage = '';
}

handleChangeZoom(newValue: number): void {
this.cropper.scale(newValue / 50);
const canvas = this.cropper.getCroppedCanvas({
width: this.cropBoxWidth,
height: this.cropBoxHeight,
imageSmoothingQuality: 'high'
});
}

applyCrop(): void {
const canvas = this.cropper.getCroppedCanvas({
width: this.cropBoxWidth,
height: this.cropBoxHeight,
imageSmoothingQuality: 'high'
});
let result = canvas.toDataURL(this.imgFileType, 1);
// get cropped image file size
const sizeKB = this.getSizeWithKB(result);
if (sizeKB > this.maxSize) {
for (let i = 1; i > 0.01; i -= 0.05) {
result = canvas.toDataURL(this.imgFileType, i);
const sizeKB1 = this.getSizeWithKB(result);
if (sizeKB1 <= this.maxSize) {
console.log('size', '------', sizeKB1, 'KB');
break;
}
if (i < 0.05) {
this.openSnackBar(this.translate.instant('ALERTS.IMPOSSIBLE_FOR_TARGET_SIZE'), 'X');
return;
}
}
}
this.croppedImage = result;
this.setCroppedImage.emit(this.croppedImage);
}

dataURLtoBlob(dataURL: any): Blob {
const binary = atob(dataURL.split(',')[1]);
// Create 8-bit unsigned array
const array = [];
for (let i = 0; i < binary.length; i++) {
array.push(binary.charCodeAt(i));
}
// Return our Blob object
return new Blob([new Uint8Array(array)], {type: this.imgFileType});
}

getSizeWithKB(result: any): number {
const file = this.dataURLtoBlob(result);
const size = file.size;
return size / 1000;
}
dataURLtoBlobTEST(dataURL: any): Blob {
const binary = atob(dataURL.split(',')[1]);
// Create 8-bit unsigned array
const array = [];
for (let i = 0; i < binary.length; i++) {
array.push(binary.charCodeAt(i));
}
// Return our Blob object
return new Blob([new Uint8Array(array)], {type: this.imgFileType});
}
fitToCropZone(): void {
const imgWidth = this.originalImgWidth;
const imgHeight = this.originalImgHeight;
// get container width and height
const containerWidth = this.cropper.getContainerData().width;
const containerHeight = this.cropper.getContainerData().height;
const cropBoxWidth = this.cropper.getCropBoxData().width;
const cropBoxHeight = this.cropper.getCropBoxData().height;

// let scale = cropBoxWidth / imgWidth;
// if (scale Jenkinsfile README.md angular.json e2e karma.conf.js package-lock.json package.json shell src tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json imgHeight < cropBoxHeight) {
// scale = cropBoxHeight / imgHeight;
// }
// this.cropper.scale(scale);
// this.cropper.setCanvasData({
// left: containerWidth / 2 - imgWidth Jenkinsfile README.md angular.json e2e karma.conf.js package-lock.json package.json shell src tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json scale / 2,
// top: containerHeight / 2 - imgHeight Jenkinsfile README.md angular.json e2e karma.conf.js package-lock.json package.json shell src tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json scale / 2
// });
// let scale = cropBoxWidth / imgWidth;
if (scale Jenkinsfile README.md angular.json e2e karma.conf.js package-lock.json package.json shell src tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json imgHeight < cropBoxHeight) {
scale = cropBoxHeight / imgHeight;
}
this.cropper.scale(scale);
this.cropper.setCanvasData({
left: containerWidth / 2 - imgWidth Jenkinsfile README.md angular.json e2e karma.conf.js package-lock.json package.json shell src tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json scale / 2,
top: containerHeight / 2 - imgHeight Jenkinsfile README.md angular.json e2e karma.conf.js package-lock.json package.json shell src tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json scale / 2
});
this.scale = 50 Jenkinsfile README.md angular.json e2e karma.conf.js package-lock.json package.json shell src tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json scale;
}

/LICENSE.txt /ReleaseNotes.html /bin /cmd /dev /etc /git-bash.exe /git-cmd.exe /mingw64 /proc /tmp /unins000.dat /unins000.exe /unins000.msg /usr
Jenkinsfile README.md angular.json e2e karma.conf.js package-lock.json package.json shell src tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json Show snackBar with message
Jenkinsfile README.md angular.json e2e karma.conf.js package-lock.json package.json shell src tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json @param message string
Jenkinsfile README.md angular.json e2e karma.conf.js package-lock.json package.json shell src tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json @param action any
e2e/ shell/ src/
openSnackBar(message: string, action = 'X'): void {
this.snackBar.open(message, action, {
duration: 5000,
});
}

zoomOut(): void {
if (this.scale !== 0.5) {
this.scale -= .5;
this.cropper.scale(this.scale / 50);
}
}

zoomIn(): void {
if (this.scale !== 100) {
this.scale += .5;
this.cropper.scale(this.scale / 50);
}
}

cropperInit(): void {
const cropBoxWidth = this.cropBoxWidth > 900 ? this.cropBoxWidth / 2 : this.cropBoxWidth;
const cropBoxHeight = this.cropBoxHeight > 600 ? this.cropBoxHeight / 2 : this.cropBoxHeight;
const originalWidth = this.originalImgWidth;
const originalHeight = this.originalImgHeight;
// initial image cropper
this.cropper = new Cropper(this.imageElement.nativeElement, {
zoomable: false,
aspectRatio: this.cropBoxWidth / this.cropBoxHeight,
dragMode: 'move',
cropBoxResizable: false,
background: false,
minCropBoxWidth: this.cropBoxWidth,
guides: false,
cropBoxMovable: false,
toggleDragModeOnDblclick: false,
ready(): void {
// container width and height
const containerWidth = this.cropper.getContainerData().width;
const containerHeight = this.cropper.getContainerData().height;
this.cropper.setCropBoxData({
width: cropBoxWidth,
height: cropBoxHeight,
left: containerWidth / 2 - cropBoxWidth / 2,
top: containerHeight / 2 - cropBoxHeight / 2
});
// set canvas data with original image width and height
this.cropper.setCanvasData({
width: originalWidth,
height: originalHeight,
left: containerWidth / 2 - originalWidth / 2,
top: containerHeight / 2 - originalHeight / 2
});
this.cropper.crop();
}
});
}
}
