export interface Address {
  name: string;
  postalCode: number;
  address: string;
  phoneNumber: number;
  city: string;
  defaultAddress: boolean;
}

export default interface IAddress {
  userId: string;
  address: Address[];
}
  