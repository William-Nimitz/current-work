import { Component, Input, OnInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';

import { Format } from '../../../../../classes/format';
import { ResourceSpec } from '../../../../../classes/resource-spec';

@Component({
  selector: 'app-f300x600intro-video',
  templateUrl: './f300x600intro-video.component.html',
  styleUrls: ['./f300x600intro-video.component.scss'],
})
export class F300x600introVideoComponent implements OnInit {
  @ViewChild('logoHeader') public logoHeader: NgbPopover;
  @ViewChild('backgroundRef') public backgroundRef: NgbPopover;
  @ViewChild('introductionVideoRef') public introductionVideoRef: NgbPopover;
  @ViewChild('rightAvatarRef') public rightAvatarRef: NgbPopover;
  @ViewChild('leftAvatarRef') public leftAvatarRef: NgbPopover;
  @ViewChild('confirmModal', { read: TemplateRef }) public confirmModal: TemplateRef<any>;

  @ViewChild('video') videoplayer: ElementRef;
  @ViewChild('videoSource') videoSource: ElementRef;

  @Input() format: Format;
  @Input() edited: any = [];
  @Input() server: any = [];
  @Input() formatData: any = [];

  slideNo = true;

  constructor( private modalService: NgbModal ) {}

  ngOnInit(): void {
  }

  /**
   * Give a resource by his ID
   * @param id number
   */
  getResource(id: number): ResourceSpec {
    const resource = this.format.formatSpec.resourceSpec.filter(e => {
      return e.id === id;
    });
    return resource[0];
  }

  checkCompleted(): void{
    const completed = this.format.formatSpec.resourceSpec.every((ele: ResourceSpec) => (this.edited[ele.id] || this.server[ele.id]));
    if (completed) {
      this.openModal(this.confirmModal);
    }
  }

  checkCompletedOnlyRequired(): void {
    const completed = this.format.formatSpec.resourceSpec.every(
      (ele: ResourceSpec) => ((ele.mandatory === true) ? (this.edited[ele.id] || this.server[ele.id]) : true));
    if (completed) {
      this.openModal(this.confirmModal);
    }
  }

  popverOverHidden(): void {
    this.checkCompleted();
    // this.checkCompletedOnlyRequired();
  }

  /**
   * Used to indicate recorded datas to user
   * @param resource any
   */
  updateResource(resource: any): void {
    this.edited[resource.id] = true;
    this.server[resource.id] = true;
  }
  videoLoad(videoString: any): void {
    const _key = this.getResource(1).settingsKeys[0];
    this.formatData[_key] = videoString;

    this.videoSource.nativeElement.setAttribute('src', videoString);
    this.videoplayer.nativeElement.load();

  }
  videoPlay(): void {


    // this.videoSource.nativeElement.play();

  }
  popoverClose(): void {
    this.logoHeader.close();
    if (this.slideNo){
      this.introductionVideoRef.close();
    } else {
      this.backgroundRef.close();
      this.rightAvatarRef.close();
      this.leftAvatarRef.close();
    }
  }

  openModal(content: TemplateRef<any>): void {
    this.modalService.open(content, { windowClass: 'confirm-modal' }).result.then((result) => {
      // console.log('result', result);
    }, (reason) => {
      // console.log('reason', reason);
    });
  }

  changeSlide(v: boolean): void{
    this.slideNo = v;
  }

}
