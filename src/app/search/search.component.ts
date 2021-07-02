import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISearch } from '../shared/interface';
import { FindLocationService } from '../shared/find-location.service';
import { ILocation } from '../shared/interface';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {  
  @Output() searchEvent = new EventEmitter<ISearch>();
  menuFormGroup: FormGroup;
  location: ILocation;
  search: ISearch = {
    city: 'Seattle,WA',
    lat: 32.7668,
    lon: -96.7836,
    food: 'Sushi'
  };
  constructor(private _formBuilder: FormBuilder, private mapService: FindLocationService) { }

  ngOnInit(): void {
    this.menuFormGroup = this._formBuilder.group({
      city: ['Seattle,WA', [Validators.required]],
      food: ['Sushi', [Validators.required]]    
    });
  }

  findLatLon() {
    this.search.food = this.menuFormGroup.value.food;
    this.mapService.getLocation(this.menuFormGroup.value.city + ",US").subscribe({
      next: data => {
        this.location = data[0];
        this.search.city = this.location.name;
        this.search.lat = this.location.lat;
        this.search.lon = this.location.lon
        console.log(this.search);        
        this.searchEvent.emit(this.search);
      },
      error: err => console.log(err)
    });
  }
}
