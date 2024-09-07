import React from 'react';
import { View, Image, FlatList, StyleSheet, Pressable } from 'react-native';
import reusableStyle from '@/constants/ReusableStyles'
import { PrimaryFontText } from '@/components/PrimaryFontText';
import { PrimaryFontMedium } from '@/components/PrimaryFontMedium';
import { useRouter } from 'expo-router';
import { BalanceData,ResponseBalance } from '@/app/(tabs)';

//Logo sources for each token
const logoSources: Record<string, any> = {
    Celo: require('@/assets/logos/celo.png'),
    cUSD: require('@/assets/logos/cusd.png'),
    cKes: require('@/assets/logos/ckes.png'),
    usdc: require('@/assets/logos/usdc.png'),
    cEUR: require('@/assets/logos/ceur.png'),
    MATIC: require('@/assets/logos/ceur.png'),
};

//token ids
const tokenId: Record<string, number> = {
    MATIC: 0,
    usdc: 1,
    // cKes: 2,
    // usdc: 3,
    // cEUR: 4,
};
interface TokenListProps {
    response: ResponseBalance;
}

// Sample response
const response = {
    balance: {
        celo: { usd: 2, ksh: 150, token: 5 },
        cusd: { usd: 3, ksh: 200, token: 6 },
        ckes: { usd: 2, ksh: 50, token: 5 },
        usdc: { usd: 3, ksh: 200, token: 6 },
    },
};



export default function TokenList({ response }: TokenListProps) {
    const route = useRouter()
    const handleTokenSelect = (id:number) => {
        // route.push('/fundingmethod')
        route.push({ pathname: "/fundingmethod", params: { id} });
    }
    const tokens = Object.keys(response.balance).map((key) => {
        const tokenKey = key as keyof typeof response.balance;
        return {
            tokenName: key,
            fullName: key == 'Celo' ? 'Celo' : key == 'cUSD' ? 'Celo Dollar' : key == 'cKes' ? 'Celo Kenyan Shilling' : key == 'usdc' ? 'USDC' : key == 'cEUR' ? 'Celo Europe':key == 'MATIC' ? 'MATIC':'Other Name',
            balance: response.balance[tokenKey].token,
            ksh: response.balance[tokenKey].kes,
            logo: logoSources[tokenKey],
            id: tokenId[tokenKey],
        };
    });
    return (
        <FlatList
            data={tokens}
            keyExtractor={(item) => item.tokenName}
            renderItem={({ item }) => (
                <Pressable style={[styles.container, reusableStyle.paddingContainer]} onPress={()=>handleTokenSelect(item.id)}>
                    <Image source={item.logo} style={styles.logo} />
                    <View style={styles.textContainer}>
                        <PrimaryFontMedium style={styles.tokenName}>{item.tokenName.toUpperCase()}</PrimaryFontMedium>
                        <PrimaryFontText style={styles.fullName}>{item.fullName}</PrimaryFontText>
                    </View>
                    <View style={styles.balanceContainer}>
                        <PrimaryFontMedium style={styles.balance}>{(item.balance).toFixed(4)} {item.tokenName.toUpperCase()}</PrimaryFontMedium>
                        <PrimaryFontText style={styles.ksh}>{parseFloat(item.ksh).toFixed(2)} Ksh</PrimaryFontText>
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
        paddingHorizontal: 23
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
        marginTop: 6
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
        marginTop: 6
    },
});