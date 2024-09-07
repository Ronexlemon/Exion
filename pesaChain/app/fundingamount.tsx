import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import InputField from '@/components/InputPaymentDetails';
import { PrimaryFontMedium } from "@/components/PrimaryFontMedium";
import reusableStyles from '@/constants/ReusableStyles';
import NavBar from '@/components/NavBar';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { AddFund } from './Apiconfig/api';
import * as SecureStore from "expo-secure-store"
import { TOKEN_KEY } from './context/AuthContext';

export default function FundingAmount() {
    const [amount, setAmount] = useState('');
    const [error, setError] = useState(false);
    const [errorDescription, setErrorDescription] = useState('');
    const [token,setToken] =useState<string>("")
    const [makepayemnt,setMakePayment] = useState<boolean>(false)
    const params = useLocalSearchParams();
    const { id ,phoneNumber  } = params;

    const route = useRouter()
    

    const handleAccountNumberChange = (text: string) => {
        setAmount(text);
        setError(false)
    };

    const handleSubmit =async () => {
        // Trim any leading or trailing whitespace
        setMakePayment(true)
        try{
            let cleanedAmount = amount.trim();

        // Check if the input field is empty
        if (cleanedAmount === '' || id === "" || phoneNumber ==="") {
            setErrorDescription('Fields cannot be empty')
            setError(true)
            setMakePayment(false)
            return;
        }

        const res = await AddFund(token,parseInt(id as string),parseInt(cleanedAmount))
        console.log("the response is for Add is *********************************8",res)
        if(!res.errr){
            //replace with a toast
            setMakePayment(false)
           // route.push({ pathname: "/(tabs)"});

            
            }else{
                setErrorDescription(res.msg)
                setError(true)
                setMakePayment(false)
                }

        }catch(err){
            console.log(err)
            setMakePayment(false)

        }
        

        
        
    };
    useEffect(()=>{
        const token = async () => {
          const token = await SecureStore.getItemAsync(TOKEN_KEY);
         
          if(token){
            const parsedToken = JSON.parse(token);
            setToken(parsedToken.token)
            
            
           
    
    
          }
          
    
        }
        token()
    
      },[token])
    return (
        <View style={styles.container}>
            <NavBar title='Amount' onBackPress={() => route.push('/fundingmethod')} />
            <View style={[reusableStyles.paddingContainer, styles.flexContainer]}>
                <InputField
                    label="Enter the amount to send"
                    placeholder="Ksh"
                    onInputChange={handleAccountNumberChange}
                    error={error}
                    errorDescription={errorDescription}
                />
                <Pressable style={styles.button} onPress={handleSubmit}>
                    <PrimaryFontMedium style={styles.text}>{makepayemnt ? (
  <>
    <ActivityIndicator size="small" color="#0000ff" />
    {"Processing"}
  </>
) : (
  "Make Payment"
)}</PrimaryFontMedium>
                </Pressable>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    button: {
        backgroundColor: '#00C48F',
        padding: 10,
        borderRadius: 9,
        alignItems: 'center',
        paddingVertical: 18,
        width: '100%'
    },
    text: {
        color: '#fff',
        fontSize: 17,
        fontFamily: 'DMSansMedium'
    },
    flexContainer: {
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: 40
    }
});
