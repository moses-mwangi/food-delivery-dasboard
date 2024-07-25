import { SetStateAction } from "react";

export interface User {
  data: {
    data: {
      id: string;
      email: string;
      role: string;
      name: string;
      photo?: string;
      city: string;
      address: string;
      country: string;
      _id: string;
    }[];
  };
}

export interface FoodList {
  _id: string;
  description: string;
  price: number;
  image: string;
  type: string;
  rating: number;
  quantity: number;
}

export interface TypeRestaurant {
  data: {
    data: {
      _id: string;
      image: string;
      restName: string;
      location: string;
      deliveryPrice: number;
      food_lists: FoodList[];
    }[];
  };
}

export interface Order {
  _id: string;
  status: string;
  totalAmount: number;
  date: Date;
  payment: boolean;
  address: {
    _id: string;
    name: string;
    email: string;
    country: string;
    city: string;
    address: string;
  };
  items: [
    {
      _id: string;

      type: string;
      description: string;
      rating: number;
      price: number;
    }
  ];
}

export interface Orders {
  data: {
    order: {
      _id: string;
      status: string;
      totalAmount: number;
      date: Date;
      payment: boolean;
      address: {
        _id: string;
        name: string;
        email: string;
        country: string;
        city: string;
        address: string;
      };
      items: [
        {
          _id: string;

          type: string;
          description: string;
          rating: number;
          price: number;
        }
      ];
    }[];
  };
}
