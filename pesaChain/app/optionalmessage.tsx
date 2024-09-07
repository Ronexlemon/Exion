import { useState } from 'react'
import { StyleSheet, View, Animated, TextInput, Button } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import NavBar from '@/components/NavBar';
import { PrimaryFontMedium } from "@/components/PrimaryFontMedium";
import { PrimaryFontText } from "@/components/PrimaryFontText";
import reusableStyles from '@/constants/ReusableStyles';
import { PrimaryFontBold } from '@/components/PrimaryFontBold';
import PrimaryButton from '@/components/PrimaryButton';
// import Toast from '@/components/Toast';

export default function OptionalMessage() {
    const route = useRouter()
    const [message, setMessage] = useState('');
    const { name, phoneNumber, amount } = useLocalSearchParams();
    const maxLength = 70;
    const userInitial = name.slice(0, 1)


    // How to show and hide Toast, do not delete👇👇
    //Button at the end with title 'Show Toast' is used to manually show toast but you can call these functions 
    //e.g showToast when sending a request and hide it with hideToast when response is received. 
    //You can reuse the Toast, just modify the statusText

    // const [toastVisible, setToastVisible] = useState(false);
    // const slideAnim = useState(new Animated.Value(-100))[0];

    // const showToast = () => {
    //     setToastVisible(true);
    //     Animated.timing(slideAnim, {
    //         toValue: 0,
    //         duration: 500,
    //         useNativeDriver: true,
    //     }).start();

    //     setTimeout(() => {
    //         hideToast();
    //     }, 3000);
    // };

    // const hideToast = () => {
    //     Animated.timing(slideAnim, {
    //         toValue: -100, // Move it back up
    //         duration: 500,
    //         useNativeDriver: true,
    //     }).start(() => {
    //         setToastVisible(false);
    //     });
    // };





    return (
        <View style={styles.container}>
            <StatusBar style={'dark'} />
            <NavBar title={`Sending $${amount}`} onBackPress={() => route.push('/keyboard')} />

            <View style={reusableStyles.paddingContainer}>
                <View style={[styles.flexRow, reusableStyles.paddingContainer, { marginTop: 10 }]}>
                    <View style={styles.initialContainer}>
                        <PrimaryFontBold style={{ fontSize: 23 }}>{userInitial}</PrimaryFontBold>
                    </View>

                    <View>
                        <PrimaryFontMedium style={{ fontSize: 19 }}>{name}</PrimaryFontMedium>
                        <PrimaryFontText style={{ fontSize: 15, color: '#79828E', marginTop: 5 }}>{phoneNumber}</PrimaryFontText>
                    </View>
                </View>

                <View style={{ marginTop: 35, marginBottom: 35 }}>
                    <View style={styles.labelContainer}>
                        <PrimaryFontText style={styles.label}>Add a message (Optional)</PrimaryFontText>
                        <PrimaryFontText style={styles.charCount}>{`${message.length}/${maxLength}`}</PrimaryFontText>
                    </View>
                    <TextInput
                        style={styles.textArea}
                        multiline
                        numberOfLines={4}
                        maxLength={maxLength}
                        placeholder="Type your message..."
                        placeholderTextColor="#D2D2D2"
                        value={message}
                        onChangeText={setMessage}
                    />
                </View>

                <PrimaryButton textOnButton='Proceed' widthProp={reusableStyles.width100} />
                {/* <Button title="Show Toast" onPress={showToast} />
                {toastVisible && <Toast
                    animationSource={require('@/assets/icons/loading.json')}
                    statusText="Please wait..."
                    visible={toastVisible}
                />} */}

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'white'
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.6,
        borderColor: '#00C48F',
        paddingVertical: 15,
        borderRadius: 12,
        backgroundColor: '#F4FFF6'
    },
    initialContainer: {
        borderColor: '#D9D9D9',
        borderWidth: 1,
        marginRight: 10,
        backgroundColor: '#CDFFCA',
        height: 48,
        width: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    label: {
        fontSize: 18,
        color: '#79828E',
    },
    charCount: {
        fontSize: 15,
        color: '#79828E',
    },
    textArea: {
        height: 150,
        borderRadius: 10,
        padding: 12,
        fontSize: 19,
        textAlignVertical: 'top',
        backgroundColor: '#F3F5F9',
        color: '#000',
        fontFamily: 'DMSansRegular'
    },
});
