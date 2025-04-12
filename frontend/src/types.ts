export type StackParamList = {
    Properties: undefined;
    AddProperty: undefined;
    PaymentDetails: { propertyId: number };
  };
  
  export type DrawerParamList = {
    Main: undefined;
    Settings: undefined;
  };
  export type RootStackParamList = {
    Properties: undefined;
    AddProperty: undefined;
    Payments: { propertyId: string };
    PaymentDetails: { propertyId: number };
};

  