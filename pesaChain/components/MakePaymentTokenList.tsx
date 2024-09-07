import React from 'react';
import { View, Image, FlatList, StyleSheet, Pressable } from 'react-native';
import reusableStyle from '@/constants/ReusableStyles';
import { PrimaryFontText } from '@/components/PrimaryFontText';
import { PrimaryFontMedium } from '@/components/PrimaryFontMedium';
import { ResponseBalance } from '@/app/(tabs)';

const logoSources: Record<string, any> = {
    Celo: require('@/assets/logos/celo.png'),
    cUSD: require('@/assets/logos/cusd.png'),
    cKes: require('@/assets/logos/ckes.png'),
    usdc: require('@/assets/logos/usdc.png'),
    cEUR: require('@/assets/logos/ceur.png'),
};

const tokenId: Record<string, number> = {
    Celo: 0,
    cUSD: 1,
    cKes: 2,
    usdc: 3,
    cEUR: 4,
};

export interface Token {
    tokenName: string;
    fullName: string;
    balance: number;
    ksh: string;
    logo: any;
    id: number;
}

interface TokenListProps {
    response: ResponseBalance;
    onSelectToken: (id: number, token: Token) => void;
    // onClose: () => void;
}

export default function TokenListPayment({ response, onSelectToken }: TokenListProps) {
    const tokens = Object.keys(response.balance).map((key) => {
        const tokenKey = key as keyof typeof response.balance;
        return {
            tokenName: key,
            fullName: key === 'Celo' ? 'Celo' :
                     key === 'cUSD' ? 'Celo Dollar' :
                     key === 'cKes' ? 'Celo Kenyan Shilling' :
                     key === 'usdc' ? 'USDC' :
                     key === 'cEUR' ? 'Celo Europe' : 'Other Name',
            balance: response.balance[tokenKey].token,
            ksh: response.balance[tokenKey].kes,
            logo: logoSources[tokenKey],
            id: tokenId[tokenKey],
        };
    });

    const handleTokenSelect = (id: number, token: Token) => {
        onSelectToken(id, token);
        
    };

    return (
        <FlatList
            data={tokens}
            keyExtractor={(item) => item.tokenName}
            renderItem={({ item }) => (
                <Pressable 
                    style={[styles.container, reusableStyle.paddingContainer]} 
                    onPress={() => handleTokenSelect(item.id, item)}
                >
                    <Image source={item.logo} style={styles.logo} />
                    <View style={styles.textContainer}>
                        <PrimaryFontMedium style={styles.tokenName}>
                            {item.tokenName.toUpperCase()}
                        </PrimaryFontMedium>
                        <PrimaryFontText style={styles.fullName}>
                            {item.fullName}
                        </PrimaryFontText>
                    </View>
                    <View style={styles.balanceContainer}>
                        <PrimaryFontMedium style={styles.balance}>
                            {item.balance.toFixed(4)} {item.tokenName.toUpperCase()}
                        </PrimaryFontMedium>
                        <PrimaryFontText style={styles.ksh}>
                            {parseFloat(item.ksh).toFixed(2)} Ksh
                        </PrimaryFontText>
                    </View>
                </Pressable>
            )}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 18.5,
        paddingHorizontal: 23,
    },
    logo: {
        width: 38,
        height: 38,
    },
    textContainer: {
        flex: 1,
        marginLeft: 13,
    },
    tokenName: {
        fontSize: 17,
    },
    fullName: {
        fontSize: 16,
        color: '#79828E',
        marginTop: 6,
    },
    balanceContainer: {
        alignItems: 'flex-end',
    },
    balance: {
        fontSize: 16,
    },
    ksh: {
        fontSize: 15,
        color: '#555',
        marginTop: 6,
    },
});
