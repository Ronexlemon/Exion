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
const loginBackground = require('@/assets/images/LoginBackground.png');
import { useAuth } from "./context/AuthContext";

export default function Login() {
    const route = useRouter()
    const {onLogin}= useAuth()
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async () => {
        console.log("Starting login process");
        try {
            const res = await onLogin!(phoneNumber,password);
            console.log("login response:", res);
            if (res && res.success) {
                console.log("login successful, navigating to dashboard");
                route.push('/(tabs)');
            }else{
                console.error("Login failed:", res.msg);
            }
        } catch (error) {
            console.error("Registration error:", error);
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    const title = 'Welcome Back!'
    const description = 'Please enter your phone number and password to continue'
    return (
        <ScrollView>
            <View style={styles.container}>
                <NavBar title='Login' onBackPress={() => route.push('/landing')} />
                <FormDescription title={title} description={description} />
                <ImageBackground style={styles.background} source={loginBackground}>
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
                            <View style={[reusableStyles.width100, { alignItems: 'flex-end', marginBottom: 15 }]}>
                                <TouchableOpacity>
                                    <PrimaryFontMedium style={{fontSize: 16, color: '#008662'}}>Forgot password?</PrimaryFontMedium>
                                </TouchableOpacity>
                            </View>
                            <PrimaryButton onPress={()=>handleLogin()}  textOnButton="Login"  widthProp={reusableStyles.width100} />
                        </View>
                        <PrimaryFontText style={{ fontSize: 18 }}>
                            Don't have an account?{' '}
                            <Text style={{ fontSize: 18, color: '#008662', fontFamily: 'DMSansRegular' }} onPress={() => route.push('/signup')}>Sign Up</Text>
                        </PrimaryFontText>
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
        height: 650,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 50,
    },
    background: {
        height: '100%',
        resizeMode: 'cover',
        width: '100%',
        marginTop: -60
    },
    formContainer: {
        height: '60%',
        padding: 18,
        width: '100%',
        paddingTop: 95
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