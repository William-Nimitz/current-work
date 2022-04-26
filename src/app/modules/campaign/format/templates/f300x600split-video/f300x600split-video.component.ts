import { Component, Input, OnInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';

import { Format } from '../../../../../classes/format';
import { ResourceSpec } from '../../../../../classes/resource-spec';

@Component({
  selector: 'app-f300x600split-video',
  templateUrl: './f300x600split-video.component.html',
  styleUrls: ['./f300x600split-video.component.scss']
})
export class F300x600splitVideoComponent implements OnInit {

  @ViewChild('logoHeader') public logoHeader: NgbPopover;
  @ViewChild('backgroundRef') public backgroundRef: NgbPopover;
  @ViewChild('conversationRef') public conversationRef: NgbPopover;
  @ViewChild('rightAvatarRef') public rightAvatarRef: NgbPopover;
  @ViewChild('leftAvatarRef') public leftAvatarRef: NgbPopover;
  @ViewChild('confirmModal', { read: TemplateRef }) public confirmModal: TemplateRef<any>;

  @ViewChild('video') videoPlayer: ElementRef;
  @ViewChild('videoSource') videoSource: ElementRef;

  @Input() format: Format;
  @Input() edited: any = [];
  @Input() server: any = [];
  @Input() formatData: any = [];

  videoStatus: boolean = false;
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
  popoverOverHidden(): void {
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
    const key = this.getResource(4).settingsKeys[0];
    this.formatData[key] = videoString;

    this.videoSource.nativeElement.setAttribute('src', videoString);
    this.videoPlayer.nativeElement.load();

  }
  videoControll(): void {

    if (this.videoPlayer.nativeElement.paused) {
        this.videoPlayer.nativeElement.play(); 
    } else {
      this.videoPlayer.nativeElement.pause(); 
    } 
    this.videoStatus = !this.videoStatus;
  }
  vidEnded(): void {
    this.videoStatus = false;
  }
  parentPopoverTrigger(eve: PointerEvent): void {
    const element: HTMLElement = eve.target as HTMLElement;
    if (element.className.search('noStopPropagation') < 0) {
      eve.stopPropagation();
    }
  }

  popoverClose(): void {
    this.logoHeader.close();
    this.backgroundRef.close();
    this.conversationRef.close();
    this.rightAvatarRef.close();
    this.leftAvatarRef.close();
  }
  openModal(content: TemplateRef<any>): void {
    this.modalService.open(content, { windowClass: 'confirm-modal' }).result.then((result) => {
      // console.log('result', result);
    }, (reason) => {
      // console.log('reason', reason);
    });
  }
}
