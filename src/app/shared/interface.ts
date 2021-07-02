export interface IRestaurantByMenu {
    address: {
        city: string;
        state: string;
        postal_code: string;
        street: string;
        formatted: string;
    }
    cuisines: string[];
    geo: {
        lat: string;
        lon: string;
    };
    item_id: string;
    menu_item_description: string;
    menu_item_name: string;
    menu_item_pricing: [
        {
            price: number;
            currency: string;
            priceString: string;
        }
    ];
    menu_item_price: number;
    price_range: string;
    last_updated: string;
    restaurant_hours: string;
    restaurant_id: number;
    restaurant_name: string;
    restaurant_phone: string;
    subsection: string;
    subsection_description: string;
}

export interface IRestaurant {
    success: boolean;
    address: string;    
    geo: {
        lat: string;
        lon: string;
    };
    menu: [
        {
            description: string;
            name: string;
            price: number;
        }    
    ]
    last_updated: string;
    restaurant_id: number;
    restaurant_name: string;
    restaurant_phone: string;    
}
export interface IResponseMenu{
    totalResults: number;
    page: number;
    total_pages: number;
    more_pages: boolean;
    data: IRestaurantByMenu[];
    numResults: number;
}

export interface ILocation {
    name: string;
    local_names: any;
    lat: number;
    lon: number;
    country: string;
    state?: string;
}

export interface IDialog {
    success: boolean;
    restaurant: IRestaurant;
}

export interface ISearch {
    city: string;
    lat: number;
    lon: number;
    food: string;
}