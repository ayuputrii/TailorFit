import {StylePropsWithArrayTransform} from 'react-native-reanimated/lib/typescript/reanimated2/layoutReanimation/animationBuilder/commonTypes';
import {Asset} from 'react-native-image-picker';
export interface menu {
  [x: string]: any;
  id?: string | undefined;
  label?: string | undefined;
  content?: string | undefined;
  title?: string | undefined;
  value?: string | undefined;
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
  icon?: string | undefined;
  value?: string | undefined;
  label: string | undefined;
  favorite?: {
    _id?: string | undefined;
    userId?: string | undefined;
    productId?: string | undefined;
  };
  total?: string | undefined;
  quantity?: number;
  quality?: 'REGULAR' | 'MEDIUM' | 'PREMIUM';
  size?: 'CUSTOM' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
  type?: 'STANDARD' | 'BODYFIT' | 'SLIMTFIT';
  products?: [];
  productId?: {
    duration: string;
    materialProvider: string;
  };
  slug?: string | undefined;
}

export interface RatingTypes {
  _id?: string | undefined;
  averageRating?: number;
  count?: number;
}
export interface AddressTypes {
  isDefault?: boolean;
  _id?: string | undefined;
  userId?: string | undefined;
  name?: string | undefined;
  phone?: string | undefined;
  addressDetail?: string | undefined;
  postalCode?: number | string | undefined;
  __v?: number;
}
interface SizeAttribute {
  label: string;
  value: number;
}
export interface Size {
  _id: string;
  name: string;
  sizeDetail: {
    neck: SizeAttribute;
    shoulder: SizeAttribute;
    bust: SizeAttribute;
    sleeveLength: SizeAttribute;
    armHole: SizeAttribute;
    waist: SizeAttribute;
    hip: SizeAttribute;
    thigh: SizeAttribute;
    knee: SizeAttribute;
    length: SizeAttribute;
  };
}

export interface Cart {
  userId: string;
  productId: string | ProductsTypes;
  quantity: number;
  quality: string;
  type: string;
  size: string;
  active: boolean;
  references: (Asset | string)[];
  sizeDetail: SizeDetail;
  _id: string;
  materialProvider: string;
}

export interface Order {
  _id: string;
  userId: string;
  addressId: AddressTypes;
  status:
    | 'UNPAID'
    | 'MATERIAL_PICKUP'
    | 'SEWING_PROCESS'
    | 'ON_DELIVERY'
    | 'RETURN'
    | 'COMPLETED'
    | 'CANCELED';
  workingStatus: 'PENDIING' | 'WORKING' | 'DONE';
  snapUrl: string;
  token: string;
  paymentType: 'GOPAY' | 'BCA';
  amount: number;
  totalAmount: number;
  trxId: string;
  products: Cart[];
  isReceived: boolean;
  reviewedProduct: string[];
  expiredAt: Date;
  isFullPayment: boolean;
}

interface SizeDetail {
  neck: Attribute;
  shoulder: Attribute;
  bust: Attribute;
  sleeveLength: Attribute;
  armHole: Attribute;
  waist: Attribute;
  hip: Attribute;
  thigh: Attribute;
  knee: Attribute;
  length: Attribute;
}

interface Attribute {
  label: string;
  value: number;
}

export type OrderParam = Order & {
  products: Cart[];
  orderId: string;
  isReceived: boolean;
  reviewedProduct: string[];
};
