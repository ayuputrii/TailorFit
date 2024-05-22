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
  name: string;
  images: any;
  description: string;
  price: number;
  duration: number;
  materialProvider: string;
  materialStock: number;
  category: string;
}
