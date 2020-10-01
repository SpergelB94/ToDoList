import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'confirmdialog',
  templateUrl: './confirmdialog.component.html',
  styleUrls: ['./confirmdialog.component.css']

})

export class ConfirmDialogComponent {

  constructor(private route: ActivatedRoute, public confirmDialog: MatDialogRef<ConfirmDialogComponent>) { }

  ngOnInit(): void { }

  cancel(): void {
    this.confirmDialog.close();
  }

}
