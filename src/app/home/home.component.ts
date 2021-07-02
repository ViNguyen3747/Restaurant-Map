import { Component, OnInit } from '@angular/core';
import { icon, latLng, LayerGroup, Map, marker } from 'leaflet';
import { MatDialog } from '@angular/material/dialog';

import { ISearch } from '../shared/interface';
import { ContentComponent } from './content/content.component';
import { FindRestaurantsService } from '../shared/find-restaurants.service';
import { IRestaurant, IRestaurantByMenu, IDialog } from '../shared/interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public searchE: ISearch;
  private map: Map;
  private zoom: number;
  marker: any;
  popupcontent: any;
  markers: any;
  loading: boolean;

  constructor(private dialog: MatDialog, private restaurantService: FindRestaurantsService) { }

  ngOnInit() {
  }
  
  private markerIcon = icon({
    iconSize: [ 40, 40 ],
    iconUrl: 'https://img.icons8.com/emoji/48/000000/cooking-pot-emoji.png',
    });

  receiveMap(map: Map) {    
    this.map = map;
    this.markers = new LayerGroup().addTo(this.map);
  }

  receiveZoom(zoom: number) {
    this.zoom = zoom;
  }

  searchEventHander($event: ISearch) {
    this.loading = true;
    this.searchE = $event;
    if(this.markers) {
      this.markers.clearLayers();
    }
    this.map.flyTo([this.searchE.lat,this.searchE.lon], 12);
    //restaurants API call
    this.restaurantService.getRestaurantByFood(this.searchE.lat.toString(),this.searchE.lon.toString(),this.searchE.food).subscribe({
      next: data => {        
        this.getRestaurants(data, this.searchE.city.toLowerCase());
      },
      error: err => console.log(err)
    });
  }
  
  getRestaurants(restaurants: IRestaurantByMenu[], city: string) {
    let restaurantList: IRestaurant[] = [];
    let i = 0;
    let tempID: number = 0;
    
    restaurants.forEach((a) => {
      if(city.includes(a.address.city.toLowerCase())) {
        let restaurant = this.restaurantIntialize();
        let menu = this.menuInitialize();
        restaurant.success = true;
        restaurant.address = a.address.formatted;
        restaurant.geo = a.geo;
        restaurant.last_updated = a.last_updated;
        restaurant.restaurant_id = a.restaurant_id;
        restaurant.restaurant_name = a.restaurant_name;
        restaurant.restaurant_phone = a.restaurant_phone;        
        menu.description = a.menu_item_description;
        menu.name = a.menu_item_name;
        menu.price = a.menu_item_price;
        if(tempID == restaurant.restaurant_id) {        
          i--;
          restaurantList[i].menu.push(menu);
        } else {
          restaurant.menu[0] = menu;
          restaurantList.push(restaurant);
        } 
        i++;     
        tempID = restaurant.restaurant_id;
      }      
    });
    console.log(restaurantList);
    this.addMarkers(restaurantList);      
}
  addMarkers(restaurants: IRestaurant[]) {
    if(restaurants.length == 0) {
      console.log("fail");
      this.openDialog(this.restaurantIntialize());
    } else {
      this.loading = false;
      restaurants.forEach((restaurant) => {
        this.marker = marker(latLng(+restaurant.geo.lat,+restaurant.geo.lon),{icon: this.markerIcon}).addTo(this.markers)
                            .on('click', () => {
                            this.openDialog(restaurant);
                            });
        //add Pop Up                      
        this.marker.on('mouseover', function(e) {
          e.target.bindPopup(
            `<div>Restaurant name: ${ restaurant.restaurant_name }</div>` +
            `<div>Click for more information</div>`
          ).openPopup();
          
        });
        this.marker.on('mouseout', function(e) {
          e.target.closePopup();
        });
      });
    }    
  }

  openDialog(restaurant: IRestaurant) {
    this.dialog.open(ContentComponent, {
      data: restaurant
    });
  }

  restaurantIntialize(): IRestaurant {
    return {
      success: false,
      address: "",    
      geo: {
          lat: "",
          lon: "",
      },
      menu: [
          {
              description: "",
              name: "",
              price: 0
          }    
      ],
      last_updated: "",
      restaurant_id: 0,
      restaurant_name: "",
      restaurant_phone: ""
    };
  }
  menuInitialize () {
    return {
      description: "",
      name: "",
      price: 0
    };
  }
}