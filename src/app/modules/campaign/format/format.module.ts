import { NgModule } from '@angular/core';
import { FormatRoutingModule } from './format-routing.module';
import { ListComponent } from './list/list.component';
import { F300x600Component } from './templates/f300x600/f300x600.component';
import { F300x250Component } from './templates/f300x250/f300x250.component';
import { F1800x1000Component } from './templates/f1800x1000/f1800x1000.component';
import { ResponsiveComponent } from './templates/responsive/responsive.component';
import { CustomComponent } from './templates/custom/custom.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormatListFilterPipe } from '../../../pipes/format-list-filter.pipe';
import { F300x600splitComponent } from './templates/f300x600split/f300x600split.component';
import { F300x600splitImageComponent } from './templates/f300x600split-image/f300x600split-image.component';
import { F300x600splitVideoComponent } from './templates/f300x600split-video/f300x600split-video.component';
import { F300x600introImageComponent } from './templates/f300x600intro-image/f300x600intro-image.component';
import { F300x600introVideoComponent } from './templates/f300x600intro-video/f300x600intro-video.component';
import { EditComponent } from './edit/edit.component';
import { ComposeComponent } from './compose/compose.component';
import { CampaignModule } from '../campaign.module';
import { ColorComponent } from './color/color.component';
import { VideoComponent } from './video/video.component';
import { CheckListComponent } from './check-list/check-list.component';
import { ImageComponent } from './image/image.component';
import { ClipboardModule } from '@angular/cdk/clipboard';

@NgModule({
  declarations: [
    ListComponent,
    F300x600Component,
    F300x250Component,
    F1800x1000Component,
    ResponsiveComponent,
    CustomComponent,
    FormatListFilterPipe,
    F300x600splitComponent,
    F300x600splitImageComponent,
    F300x600splitVideoComponent,
    F300x600introImageComponent,
    F300x600introVideoComponent,
    EditComponent,
    ComposeComponent,
    ColorComponent,
    VideoComponent,
    CheckListComponent,
    ImageComponent
  ],
  exports: [
    ColorComponent
  ],
  imports: [
    FormatRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    CampaignModule,
    ClipboardModule
  ]
})
export class FormatModule {
}
