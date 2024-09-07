import { Text as DefaultText, TextProps as DefaultTextProps, StyleSheet } from 'react-native';

type TextProps = DefaultTextProps

export function PrimaryFontText(props: TextProps) {
    const { style, ...otherProps } = props;
    return <DefaultText style={[style, { fontFamily: 'DMSansRegular' }]} {...otherProps} />;
}