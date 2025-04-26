import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, useTheme } from 'react-native-paper';
import { format, differenceInDays } from 'date-fns';
import { theme } from '../theme';
import { Property } from '../types';

interface Props {
  properties: Property[];
}

const PropertyList = ({ properties }: Props) => {
  const { colors } = useTheme();

  const getStatusColor = (dueDate: string) => {
    const days = differenceInDays(new Date(dueDate), new Date());
    if (days > 15) return theme.colors.success;
    if (days >= 5) return theme.colors.warning;
    if (days >= 2) return theme.colors.orange;
    return colors.primary;
  };

  return (
    <View style={styles.container}>
      {properties.map((property) => (
        <Card key={property.id} style={styles.card}>
          <Card.Content>
            <Title>{property.address}</Title>
            <Paragraph style={{ color: getStatusColor(property.nextPaymentDate) }}>
              Арендатор: {property.tenant?.name || "Не указан"}
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
  container: { 
    padding: 16 
  },
  card: { 
    marginBottom: 16, 
    backgroundColor: theme.colors.surface 
  },
});

export default PropertyList;