export interface menu {
  id?: string | undefined;
  label?: string | undefined;
}

export interface UserDataTypes {
  _id?: string | undefined;
  address?: string | undefined;
  createdAt?: string | undefined;
  email?: string | undefined;
  fullName?: string | undefined;
  role?: string | undefined;
  phone?: string | undefined;
  profilePicture?: string | undefined;
  gender?: string | undefined;
  birthday?: string | undefined;
}

export interface CategoryTypes {
  _id?: string | undefined;
  createdAt?: string | undefined;
  name?: string | undefined;
  updatedAt?: string | undefined;
}

export interface PromotionTypes {
  name?: string | undefined;
  image?: string | undefined;
  amount?: number;
  period?: {
    start?: string | undefined;
    end?: string | undefined;
  };
}

export interface ProductsTypes {
  _id?: string | undefined;
  name?: string | undefined;
  images?: any;
  description?: string | undefined;
  price?: number;
  duration?: number;
  materialProvider?: string | undefined;
  materialStock?: number;
  category?: string | undefined;
  favorite?: {
    _id?: string | undefined;
    customerId?: string | undefined;
    productId?: string | undefined;
  };
}

export interface RatingTypes {
  _id?: string | undefined;
  averageRating?: number;
  count?: number;
}
export interface AddressTypes {
  isDefault?: boolean;
  _id?: string | undefined;
  customerId?: string | undefined;
  name?: string | undefined;
  phone?: string | undefined;
  addressDetail?: string | undefined;
  postalCode?: number | string | undefined;
  __v?: number;
}
