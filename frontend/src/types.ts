import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';


export type PropertiesScreenNavigationProp = StackNavigationProp<
  RootStackParamList, 
  'Properties'
>;

export type PaymentDetailsRouteProp = RouteProp<
  RootStackParamList, 
  'PaymentDetails'
>;

export interface Property {
  id: number;
  address: string;
  nextPaymentDate: string;
  tenant?: {
    name: string;
  };
}

export type RootStackParamList = {
  Properties: undefined;
  AddProperty: undefined;
  PaymentDetails: { propertyId: number };
};

export type StackParamList = {
    Properties: undefined;
    AddProperty: undefined;
    PaymentDetails: { propertyId: number };
  };
  
  export type DrawerParamList = {
    Main: undefined;
    Settings: undefined;
  };
  

  