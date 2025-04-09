export type StackParamList = {
  Tenants: undefined;
  AddTenant: undefined;
  Properties: undefined;
  AddProperty: undefined;
  Payments: { tenantId: number };
  DocumentUpload: { propertyId: number };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackParamList {}
  }
}