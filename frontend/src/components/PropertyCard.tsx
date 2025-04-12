import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { format, differenceInDays } from 'date-fns';

export default function PropertyCard({ property, onPress }) {
  const getStatusColor = () => {
    const days = differenceInDays(new Date(property.nextPaymentDate), new Date());
    if (days > 15) return '#4CAF50';
    if (days >= 5) return '#FFEB3B';
    if (days >= 2) return '#FF9800';
    return '#F44336';
  };

  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Content>
        <Title>{property.address}</Title>
        <Paragraph style={{ color: getStatusColor() }}>
          {property.tenant?.name || 'Арендатор не указан'}
        </Paragraph>
        <Paragraph>
          Следующий платёж: {format(new Date(property.nextPaymentDate), 'dd.MM.yyyy')}
        </Paragraph>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
});