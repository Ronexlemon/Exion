import React from 'react';
import { Pressable, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useRouter, Href } from 'expo-router';
import { PrimaryFontMedium } from './PrimaryFontMedium';

type ButtonProps = {
    route?: Href<string | object>;
    textOnButton: string;
    icon: React.ReactNode;
    containerStyle?: ViewStyle;
    textStyle?: TextStyle;
    onPress? : () => void;
};

export default function VerificationStatus({
    route,
    textOnButton,
    icon,
    containerStyle,
    textStyle,
    onPress
}: ButtonProps) {
    const router = useRouter();

    const handlePress = () => {
        if (route) {
            router.push(route);
        }
        if (onPress) {
            onPress();
        }
    };

    return (
        <Pressable style={[styles.container, containerStyle]} onPress={handlePress}>
            {icon}
            <PrimaryFontMedium style={[styles.text, textStyle]}>{textOnButton}</PrimaryFontMedium>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        paddingHorizontal: 6,
        paddingRight: 9,
        backgroundColor: '#00C48F',
        borderRadius: 20,
    },
    text: {
        color: 'white',
        fontSize: 13.5,
        marginLeft: 3,
    },
});
