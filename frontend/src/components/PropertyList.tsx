import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, useTheme } from 'react-native-paper';
import { format, differenceInDays } from 'date-fns';

interface Property {
  id: number;
  address: string;
  tenant: {
    name: string;
  };
  nextPaymentDate: string;
}

const PropertyList = ({ properties }: { properties: Property[] }) => {
  const { colors } = useTheme();

  const getStatusColor = (date: string) => {
    const days = differenceInDays(new Date(date), new Date());
    if (days > 15) return colors.success;
    if (days >= 5) return colors.warning;
    if (days >= 2) return colors.orange;
    return colors.error;
  };

  return (
    <View style={styles.container}>
      {properties.map((property) => (
        <Card key={property.id} style={styles.card}>
          <Card.Content>
            <Title>{property.address}</Title>
            <Paragraph style={{ color: getStatusColor(property.nextPaymentDate) }}>
              Арендатор: {property.tenant.name}
            </Paragraph>
            <Paragraph>
              Следующий платёж: {format(new Date(property.nextPaymentDate), 'dd.MM.yyyy')}
            </Paragraph>
          </Card.Content>
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: { marginBottom: 16, backgroundColor: '#fff' },
});

export default PropertyList;
