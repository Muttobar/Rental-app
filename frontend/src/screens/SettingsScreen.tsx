import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Switch, List } from 'react-native-paper';

export default function SettingsScreen() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  return (
    <View style={styles.container}>
      <List.Section>
        <List.Item
          title="Тёмная тема"
          right={() => (
            <Switch
              value={isDarkTheme}
              onValueChange={() => setIsDarkTheme(!isDarkTheme)}
            />
          )}
        />
      </List.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
