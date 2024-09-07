import React, { useState } from "react";
import PrimaryButton from "@/components/PrimaryButton";
import NavBar from "@/components/NavBar";
import { StyleSheet, ScrollView, View, ImageBackground, TextInput, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { FormDescription } from "@/components/FormDescription";
import { StatusBar } from "expo-status-bar";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import reusableStyles from '@/constants/ReusableStyles';
import { PrimaryFontText } from "@/components/PrimaryFontText";
import { PrimaryFontMedium } from "@/components/PrimaryFontMedium";
const signupBackground = require('@/assets/images/SignupBackground.png');
import { useAuth } from "./context/AuthContext";

export default function Signup() {
    const route = useRouter()
    const {onLogin,onRegister} = useAuth()
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleRegister = async () => {
        console.log("Starting registration process");
        try {
            const res = await onRegister!(phoneNumber, password, username);
            console.log("Register response:", res);
            if (res) {
                console.log("Registration successful, navigating to login");
                route.push('/login');
            }
        } catch (error) {
            console.error("Registration error:", error);
        }
    };
    

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    const title = 'Create Account'
    const description = 'Enter the details below to create an account'
    return (
        <ScrollView>
            <View style={styles.container}>
                <NavBar title='Sign Up' onBackPress={() => route.push('/login')} />

                <ImageBackground style={styles.background} source={signupBackground}>
                    <FormDescription title={title} description={description} />
                    <View style={styles.formView}>
                        <View style={styles.formContainer}>
                            <PrimaryFontMedium style={styles.label}>Phone Number</PrimaryFontMedium>
                            <TextInput
                                style={styles.input}
                                placeholder="+254701234567"
                                placeholderTextColor="#D2D2D2"
                                keyboardType="phone-pad"
                                onChangeText={setPhoneNumber}
                                value={phoneNumber}
                            />

                            <PrimaryFontMedium style={styles.label}>Username</PrimaryFontMedium>
                            <TextInput
                                style={styles.input}
                                placeholder="@don_carter"
                                placeholderTextColor="#D2D2D2"
                                keyboardType="default"
                                onChangeText={setUsername}
                                value={username}
                            />

                            <PrimaryFontMedium style={styles.label}>Password</PrimaryFontMedium>
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    style={styles.passwordInput}
                                    placeholder="Password"
                                    placeholderTextColor="#D2D2D2"
                                    secureTextEntry={!passwordVisible}
                                    onChangeText={setPassword}
                                    value={password}
                                />
                                <TouchableOpacity onPress={togglePasswordVisibility}>
                                    <MaterialIcons
                                        name={passwordVisible ? "visibility" : "visibility-off"}
                                        size={24}
                                        color="#A5A5A5"
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={[reusableStyles.width100, { alignItems: 'center', marginBottom: 15, marginTop: 25 }]}>
                                <PrimaryFontText style={{ fontSize: 16, color: '#008662', textAlign: 'center' }}>By pressing continue you agree to our terms of service and privacy policy</PrimaryFontText>
                            </View>
                            <PrimaryButton onPress={()=>handleRegister()}  textOnButton="Create Account"   widthProp={reusableStyles.width100} />
                        </View>
                    </View>
                </ImageBackground>
                <StatusBar style={'dark'} />
            </View >
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        backgroundColor: '#fff'
    },
    formView: {
        height: 590,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 55,
    },
    background: {
        height: '100%',
        resizeMode: 'cover',
        width: '100%',
    },
    formContainer: {
        height: '60%',
        padding: 18,
        width: '100%',
        paddingTop: 40
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#79828E',
    },
    input: {
        height: 55,
        borderColor: '#D4D4D4',
        borderWidth: 0.7,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        fontSize: 16,
        color: '#000',
        backgroundColor: '#F8F8F8',
        fontFamily: 'DMSansRegular'
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#D4D4D4',
        borderWidth: 0.7,
        borderRadius: 5,
        marginBottom: 14,
        paddingHorizontal: 10,
        height: 55,
        backgroundColor: '#F8F8F8'
    },
    passwordInput: {
        flex: 1,
        fontSize: 16,
        color: '#000',
        fontFamily: 'DMSansRegular'
    }
})