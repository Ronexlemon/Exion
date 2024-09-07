import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { Redirect,useRouter } from "expo-router";
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { AuthProvider, useAuth } from './context/AuthContext';


import { useColorScheme } from '@/components/useColorScheme';



//const Stack = createNativeStackNavigator();
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'landing',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    SpaceGrotesk: require('../assets/fonts/SpaceGrotesk-Bold.ttf'),
    DMSansMedium: require('../assets/fonts/DMSans-Medium.ttf'),
    DMSansRegular: require('../assets/fonts/DMSans-Regular.ttf'),
    DMSansBold: require('../assets/fonts/DMSans-Bold.ttf'),
    ...FontAwesome.font,
  });
  
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

function RootLayoutNav() {
  const route = useRouter()
  const colorScheme = useColorScheme();
   const {authState,onLogout} = useAuth()
   useEffect(()=>{
   
    if(!authState?.authenticated){     
      
route.push("/landing")
      
      

   }else{
    route.push("/(tabs)")

   }
  },[authState])

        
          
        
    

  return (
      <Stack>
        <Stack.Screen name="landing" options={{ headerShown: false  }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        <Stack.Screen name="login" options={{ headerShown: false  }} />
        <Stack.Screen name="signup" options={{ headerShown: false  }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="makepayment" options={{ headerShown: false }} />
        <Stack.Screen name="keyboard" options={{ headerShown: false }} />
        <Stack.Screen name="contacts" options={{ headerShown: false }} />
        <Stack.Screen name="optionalmessage" options={{ headerShown: false }} />
        <Stack.Screen name="tillnumber" options={{ headerShown: false }} />
        <Stack.Screen name="sendmoney" options={{ headerShown: false }} />
        <Stack.Screen name="paybillbusinessnumber" options={{ headerShown: false }} />
        <Stack.Screen name="paybillaccountnumber" options={{ headerShown: false }} />
        <Stack.Screen name="fundingmethod" options={{ headerShown: false }} />
        <Stack.Screen name="fundingamount" options={{ headerShown: false }} />
        <Stack.Screen name="verifyQrcode" options={{ headerShown: false }} />
      </Stack>
  );
}



