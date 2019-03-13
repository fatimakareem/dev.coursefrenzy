import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css'],
})

export class ModelComponent {
  position = 'after';

  animal: string;
  name: string;

  constructor(public dialog: MatDialog) {}

}


