import React, { useState } from 'react';
import { View, Text, Button, Image, ActivityIndicator, Alert } from 'react-native'; // Добавлен Alert
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

const API_URL = 'http://192.168.1.39:8082';

export default function DocumentUploadScreen() { // Удален параметр route
    const [document, setDocument] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const route = useRoute();
    const { propertyId } = route.params as { propertyId: number };

    const pickDocument = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets) {
            setDocument(result.assets[0].uri);
        }
    };

    const uploadDocument = async () => {
        if (!document) return;

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', {
                uri: document,
                name: 'document.jpg',
                type: 'image/jpeg'
            } as any);
            formData.append('propertyId', propertyId.toString());
            formData.append('type', 'contract');

            await axios.post(`${API_URL}/documents`, formData, { // Исправлены кавычки
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            Alert.alert('Успех', 'Документ загружен');
            setDocument(null);
        } catch (error) {
            Alert.alert('Ошибка', 'Ошибка загрузки');
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Button title="Выбрать документ" onPress={pickDocument} />
            
            {document && (
                <>
                    <Image 
                        source={{ uri: document }} 
                        style={{ width: 200, height: 200, marginVertical: 20 }} 
                    />
                    {uploading ? (
                        <ActivityIndicator size="large" />
                    ) : (
                        <Button title="Загрузить" onPress={uploadDocument} />
                    )}
                </>
            )}
        </View>
    );
}
