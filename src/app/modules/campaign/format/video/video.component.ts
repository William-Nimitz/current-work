import { Component, OnInit, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { ResourceSpec } from '../../../../classes/resource-spec';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import iro from '@jaames/iro';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  @ViewChild('imageCropper') imageCropper: ElementRef;

  @Output() closeFn = new EventEmitter();
  @Output() update = new EventEmitter();
  @Output() load = new EventEmitter();

  @Input() resource: ResourceSpec;
  @Input() title: string;
  @Input() data: any;

  bgColor: string;
  errorMessage = '';
  colorPicker: any;
  imageChangedEvent = '';

  constructor(
    private modalService: NgbModal,
    private translate: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.initColorPicker();
    this.bgColor = this.data[this.resource.settingsKeys[2]] ? this.data[this.resource.settingsKeys[2]] : '#F2F2F2';
  }

  updateFile(e: any): void {
    this.errorMessage = '';
    this.imageChangedEvent = e;
    const file: File = e.target.files[0];
    const reader = new FileReader();
    const img = new Image();
    img.src = window.URL.createObjectURL(file);
    reader.addEventListener('load', (event: any) => {
      img.onload = () => {
        if (img.width === this.resource.width &&
          img.height === this.resource.height &&
          e.target.files[0].size <= this.resource.maxWeight * 1060) {
          this.data[this.resource.settingsKeys[1]] = event.target.result;
          this.update.emit(this.resource);
          this.closeFn.emit();
        } else if (img.width >= this.resource.width && img.height >= this.resource.height) {
          // open image cropper
          this.modalService.open(this.imageCropper, { size: 'xl' });
        } else {
          this.errorMessage = this.translate.instant('ALERTS.IMAGE_SIZE_IS_TOO_SMALL');
        }
      };
    });
    reader.readAsDataURL(file);
  }
  updateVideoFile(e: any): void {

    this.errorMessage = '';
    const file: File = e.target.files[0];
    if ((file.size / 1024 / 1024) > this.resource.maxVideoSize) {
      this.errorMessage = this.translate.instant('ALERTS.MP4_TOO_BIG');
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.load.emit(reader.result);
        this.update.emit(this.resource);
        this.closeFn.emit();
      };
      reader.onerror = err => {
        console.log(err);
      };
    }
  }

  initColorPicker(): void {
    setTimeout(() => {
      const layoutArr = this.resource.alpha ? [
        { component: iro.ui.Wheel },
        { component: iro.ui.Slider },
        { component: iro.ui.Slider, options: { sliderType: 'alpha' } },
      ] : [{ component: iro.ui.Wheel }, { component: iro.ui.Slider }];
      this.colorPicker = iro.ColorPicker(`#colorPicker`, {
        width: 160,
        handleRadius: 5,
        sliderMargin: 5,
        sliderSize: 18,
        color: this.bgColor,
        layout: layoutArr
      });
      this.colorPicker.on('color:change', (color: any) => {
        this.update.emit(this.resource);
        this.data[this.resource.settingsKeys[2]] = this.resource.alpha ? color.hex8String : color.hexString;
        this.bgColor = this.resource.alpha ? color.hex8String : color.hexString;
      });
    }, 1);
  }

  updateHex(e: any): void {
    const regExp = /[0-9A-Fa-f]{6}/g;
    if (!regExp.test(e.target.value)) {
      return;
    }
    if (this.resource.alpha) {
      this.colorPicker.color.hex8String = e.target.value;
    } else {
      this.colorPicker.color.hexString = e.target.value;
    }
  }

  closeTrigger(): void {
    this.closeFn.emit();
  }

  setCroppedImage(baseImage: string, modal: NgbModalRef): void {
    this.data[this.resource.settingsKeys[1]] = baseImage;
    this.update.emit(this.resource);
    this.closeFn.emit();
    this.modalService.dismissAll();
  }
}

