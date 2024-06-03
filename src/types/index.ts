export interface menu {
  id: number;
  label: string;
}

export interface UserDataTypes {
  _id: string;
  address: string;
  createdAt: string;
  email: string;
  fullName: string;
  role: string;
  phone: string;
  profilePicture: string;
}

export interface CategoryTypes {
  _id: string;
  createdAt: string;
  name: string;
  updatedAt: string;
}

export interface PromotionTypes {
  name: string;
  image: string;
  amount: number;
  period: {
    start: string;
    end: string;
  };
}

export interface ProductsTypes {
  _id: string;
  name: string;
  images: any;
  description: string;
  price: number;
  duration: number;
  materialProvider: string;
  materialStock: number;
  category: string;
  favorite: {
    _id: string;
    customerId: string;
    productId: string;
  };
}

export interface RatingTypes {
  _id: string;
  averageRating: number;
  count: number;
}
export interface AddressTypes {
  isDefault: boolean;
  _id: string;
  customerId: string;
  name: string;
  phone: string;
  addressDetail: string;
  postalCode: number | string;
  __v: number;
}
