import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import NavBar from '@/components/NavBar';
import { useRouter } from 'expo-router';
import reusableStyle from '@/constants/ReusableStyles';
import * as SecureStore from "expo-secure-store"
import { TOKEN_KEY } from './context/AuthContext';
import { GetQRCodeDetails } from './Apiconfig/api';
import { RequestData } from '@/types/datatypes';
import QRCodeComponent from '@/components/qrcode';

export default function VerifyQrcode() {
  const [tokens,setTokens] =useState<string>("")
  const [qrCodeDetails,setQrCodeDetails] =useState<RequestData>()
  const handleGetQRCODEData =async()=>{
    try{
      const res = await GetQRCodeDetails(tokens)
      console.log(res)

    }catch(err){
      console.log(err)

    }

  }
  useEffect(() => {
    const token = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);

      if (token) {
        const parsedToken = JSON.parse(token);
        setTokens(parsedToken.token)
        const res = await GetQRCodeDetails(tokens)
        setQrCodeDetails(res)
        console.log(res)







      }


    }
    token()

  }, [])
  
const route = useRouter()
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
        <StatusBar style={'dark'}/>
        <NavBar title='Verify country of residence' onBackPress={() => route.push('/profile')} />

        {/* <View style={[reusableStyle.paddingContainer, styles.qrContainer]}>
            <Text>Scan QR Code</Text>
        </View> */}
        <QRCodeComponent data={qrCodeDetails} />
    </View>
  );
}


const styles = StyleSheet.create({
    qrContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})