import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ContactsList from '@/components/Contacts';
import NavBar from '@/components/NavBar';
import { useRouter } from 'expo-router';

export default function Contacts() {
const route = useRouter()
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
        <StatusBar style={'dark'}/>
        <NavBar title='Who are you sending to?' onBackPress={() => route.push('/(tabs)')} />
        <ContactsList/>
    </View>
  );
}
