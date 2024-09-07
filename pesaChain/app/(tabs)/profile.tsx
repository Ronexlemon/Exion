import { StyleSheet, View, Image, Pressable, ToastAndroid, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import userIcon from '@/assets/images/user.png';
import { PrimaryFontText } from '@/components/PrimaryFontText';
import { PrimaryFontBold } from '@/components/PrimaryFontBold';
import { PrimaryFontMedium } from '@/components/PrimaryFontMedium';
import reusableStyle from '@/constants/ReusableStyles';
import PrimaryButton from "@/components/PrimaryButton";
import ProfileOption from '@/components/ProfileOption';
import NavBar from '@/components/NavBar';
import Edit from '@/assets/icons/Edit';
import Lock from '@/assets/icons/Lock';
import Settings from '@/assets/icons/Settings';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as Clipboard from 'expo-clipboard';
import { useEffect, useState } from 'react';
import { TOKEN_KEY } from '../context/AuthContext';
import { UserDetails } from '@/types/datatypes';
import * as SecureStore from "expo-secure-store"
import { useAuth } from '../context/AuthContext';
import VerificationStatus from '@/components/VerificationStatus';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { GetProfile } from '../Apiconfig/api';
import { ProfileResponse } from '@/types/datatypes';


export default function Profile() {
  const route = useRouter()
  const { onLogout } = useAuth()

  const [userdetails, setUserDetails] = useState<ProfileResponse>()

  const copyToClipboard = () => {
    Clipboard.setStringAsync(userdetails?.data.wallet.publicKey as string);

    if (Platform.OS === 'android') {
      ToastAndroid.show('Text copied to clipboard!',
        ToastAndroid.SHORT);
    } else if (Platform.OS === 'ios') {
      alert('Text copied to clipboard!');
    }
  };
  useEffect(() => {
    const token = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);

      if (token) {
        const parsedToken = JSON.parse(token);
        const response = await GetProfile(parsedToken.token);
        setUserDetails(response)








      }


    }
    token()

  }, [userdetails])
  const handleLogout = async () => {
    await onLogout!()
  }

  const verified = false

  return (
    <View style={styles.container}>
      <StatusBar style={'dark'} />
      <NavBar title='Profile' onBackPress={() => route.push('/(tabs)')} />

      <View style={[styles.JustifyBetween, reusableStyle.paddingContainer, { marginTop: 30 }]}>
        <View style={styles.flexRow}>
          <Image source={userIcon} style={styles.userIcon} />
          <View>
            <View style={styles.flexRow}>
              <PrimaryFontBold style={{ fontSize: 19 }}>{userdetails?.data.userName}</PrimaryFontBold>
            </View>
            <PrimaryFontText style={{ fontSize: 15, color: '#79828E', marginTop: 5 }}>+{userdetails?.data.phoneNumber}</PrimaryFontText>
            
          </View>
        </View>

        {userdetails?.data.verified ?
          <VerificationStatus
            textOnButton="Verified"
            icon={<AntDesign name="checkcircleo" size={14} color="white" />}
            containerStyle={{ backgroundColor: '#00C48F' }}
          />
          :
          <VerificationStatus
            textOnButton="Not verified"
            icon={<Feather name="info" size={14} color="white" />}
            containerStyle={{ backgroundColor: '#FF0000' }}
            onPress={() => route.push('/verifyQrcode')}
          />}

      </View>

      <View style={[reusableStyle.paddingContainer, { flex: 1, justifyContent: 'space-between', backgroundColor: 'white', marginTop: 20, paddingBottom: 20 }]}>
        <View>
          <ProfileOption
            option="Edit profile"
            icon={<Edit />}
            containerStyle={{ backgroundColor: 'white', marginTop: 20 }}
            textStyle={{ fontSize: 17 }}
          />

          <ProfileOption
            option="Reset password"
            icon={<Lock />}
            containerStyle={{ backgroundColor: 'white' }}
            textStyle={{ fontSize: 17 }}
          />

          <ProfileOption
            option="Settings"
            icon={<Settings />}
            containerStyle={{ backgroundColor: 'white' }}
            textStyle={{ fontSize: 17 }}
          />

          <View style={styles.separator}></View>

          <PrimaryFontMedium style={{ fontSize: 15, color: '#3A3B3C' }}>Wallet address</PrimaryFontMedium>
          <PrimaryFontText style={{ fontSize: 18, color: '#79828E', marginTop: 10, marginBottom: 15 }}>{userdetails?.data.wallet.publicKey}</PrimaryFontText>
          <Pressable style={[styles.buttonContainer]} onPress={copyToClipboard}>
            <MaterialIcons name="content-copy" size={15} color="#00C48F" />
            <PrimaryFontMedium style={[styles.text]}>Tap to copy</PrimaryFontMedium>
          </Pressable>
        </View>
        <PrimaryButton onPress={() => handleLogout()!} textOnButton="Logout" route='/login' widthProp={reusableStyle.width100} />
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '100%',
    backgroundColor: '#ECECEC'
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  JustifyBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userIcon: {
    width: 46,
    height: 45,
    marginRight: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 11,
    paddingHorizontal: 16,
    paddingRight: 21,
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 0.8,
    borderColor: '#DFE4E5',
    width: 180
  },
  text: {
    color: '#00C48F',
    fontSize: 16,
    marginLeft: 5,
  }
});
