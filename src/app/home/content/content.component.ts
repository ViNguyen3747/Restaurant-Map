import { Component, OnInit, NgZone, HostListener, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IRestaurant } from 'src/app/shared/interface';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  restaurant: IRestaurant;
  constructor(public dialogRef: MatDialogRef<ContentComponent>, private ngZone: NgZone,
             @Inject(MAT_DIALOG_DATA) public data: IRestaurant) {               
              ngZone.run(() => {
                this.restaurant = data;
                console.log(this.restaurant);
              });
             };
  
  ngOnInit() {
  }
  
  close() {
    this.ngZone.run(() => this.dialogRef.close());    
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }
}