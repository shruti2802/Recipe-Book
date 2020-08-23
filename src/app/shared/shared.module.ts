import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InvalidRouteComponent} from './component/invalid-route/invalid-route.component';
import {DropdownDirective} from './directive/dropdown.directive';
import { ProgressSpinnerComponent } from './component/progress-spinner/progress-spinner.component';
import { ErrorControlComponent } from './component/error-control/error-control.component';
import { SnackbarComponent } from './component/snackbar/snackbar.component';
import { TransformerPipe } from './pipe/transformer.pipe';
import { TruncatePipe } from './pipe/truncate.pipe';
import { InputBoxComponent } from './component/input-box/input-box.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    InvalidRouteComponent,
    DropdownDirective,
    ProgressSpinnerComponent,
    ErrorControlComponent,
    SnackbarComponent,
    TransformerPipe,
    TruncatePipe,
    InputBoxComponent
  ],
    exports: [DropdownDirective, InvalidRouteComponent, ProgressSpinnerComponent, ErrorControlComponent, SnackbarComponent, TransformerPipe, TruncatePipe, InputBoxComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ]
})
export class SharedModule { }
