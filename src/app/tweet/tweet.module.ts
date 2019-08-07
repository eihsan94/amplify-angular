import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TweetComponent } from './tweet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatStepperModule,
  MatRadioModule,
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MatButtonModule,
  MatChipsModule,
  MatSidenavModule,
  MatDividerModule,
  MatDialogModule,
  MatTableModule,
  MatSortModule,
  MatIconModule,
  MatCheckboxModule,
} from '@angular/material';

@NgModule({
  declarations: [TweetComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatStepperModule,
    MatRadioModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatSidenavModule,
    MatDividerModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatCheckboxModule,
  ]
})
export class TweetModule {}
