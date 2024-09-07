import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import InputField from '@/components/InputPaymentDetails';
import { PrimaryFontMedium } from "@/components/PrimaryFontMedium";
import reusableStyles from '@/constants/ReusableStyles';
import NavBar from '@/components/NavBar';
import { useRouter } from 'expo-router';

export default function SendMoney() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState(false);
    const [errorDescription, setErrorDescription] = useState('');

    const route = useRouter()

    const handlePhoneNumberChange = (text: string) => {
        setPhoneNumber(text);
        setError(false)
    };

    const handleSubmit = () => {
        // Trim any leading or trailing whitespace
        let cleanedNumber = phoneNumber.trim();

        // Check if the input field is empty
        if (cleanedNumber === '') {
            setErrorDescription('Phone number cannot be empty')
            setError(true)
            return;
        }

        // Ensure the phone number has 10 digits or more
        if (cleanedNumber.length < 10) {
            setErrorDescription('Enter a valid phone number')
            setError(true)
            return;
        }

        // Ensure the phone number starts with 0, + or 2
        if (!cleanedNumber.startsWith('0') && !cleanedNumber.startsWith('+') && !cleanedNumber.startsWith('2')) {
            setErrorDescription('Enter a valid phone number');
            setError(true);
            return;
        }

        // Replace "07" with "+254" if the number starts with "07"
        if (cleanedNumber.startsWith('07')) {
            cleanedNumber = '+254' + cleanedNumber.slice(1);
        }

        console.log('Cleaned Phone Number:', cleanedNumber);

        route.push({
            pathname: '/keyboard',
            params: {
                phoneNumber: cleanedNumber,
                source: 'sendmoney'
            }
        });
    };

    return (
        <View style={styles.container}>
            <NavBar title='Send money' onBackPress={() => route.push('/makepayment')} />
            <View style={[reusableStyles.paddingContainer, styles.flexContainer]}>
                <InputField
                    label="Please enter the phone number"
                    placeholder="+254701234567"
                    onInputChange={handlePhoneNumberChange}
                    error={error}
                    errorDescription={errorDescription}
                />
                <Pressable style={styles.button} onPress={handleSubmit}>
                    <PrimaryFontMedium style={styles.text}>Continue</PrimaryFontMedium>
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
