import { StyleSheet, Pressable, Text, StyleProp, ViewStyle, Button, PressableProps, GestureResponderEvent } from "react-native";
import { useRouter, Href } from 'expo-router';
import { PrimaryFontMedium } from "./PrimaryFontMedium";

interface ButtonProps extends PressableProps  {
    route?: Href<string | object>;
    textOnButton: string,
    widthProp?: StyleProp<ViewStyle>;
}
export default function PrimaryButton({ route, textOnButton, widthProp,onPress }: ButtonProps) {
    const router = useRouter();
    const handlePress = (event: GestureResponderEvent) => {
        if (onPress) {
            onPress(event); // Execute the custom onPress function if provided
        }
        if (route) {
            router.push(route); // Navigate if a route is provided
        }
    };
    return (
        <Pressable style={[styles.container, widthProp]} onPress={handlePress}>
            <PrimaryFontMedium style={styles.text}>{textOnButton}</PrimaryFontMedium>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#00C48F',
        padding: 10,
        borderRadius: 9,
        alignItems: 'center',
        paddingVertical: 18,
        width: '92%'
    },
    text: {
        color: '#fff',
        fontSize: 17,
        fontFamily: 'DMSansRegular'
    }
});