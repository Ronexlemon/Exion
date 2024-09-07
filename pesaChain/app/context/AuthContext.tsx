import { createContext,useCallback,useState,useEffect,useContext } from "react";

import axios from "axios";
import * as SecureStore from "expo-secure-store"
import { PESACHAIN_URL } from "@/constants/urls";
import { UserData } from "@/types/datatypes";
import { Use } from "react-native-svg";

interface  AuthProps{
    authState?: {token:string |null; authenticated:boolean|null},
    onLogin?: (phoneNumber: string, password: string) => Promise<any>,
    onLogout?: () => Promise<any>,
    onRegister?: (phoneNumber: string, password: string, userName: string) => Promise<any>,
}

export const TOKEN_KEY ="PesaChain"  // to be moved to <div className="env"
const AuthContext = createContext<AuthProps>({});
export  const useAuth=()=>{
    return useContext(AuthContext);
}
export const AuthProvider = ({children}:any) => {
    const [authState,setAuthstate] = useState<{
        token: string | null;
        authenticated:boolean |null;
        data: UserData |null
    }>({
        token: null,
        authenticated:null,
        data:null

    })

    useEffect(()=>{
        // const refreshToken = async()=>{
        //     try {
        //         const token = await SecureStore.getItemAsync(TOKEN_KEY);
        //         if (token) {
        //             const parsedToken = JSON.parse(token);
        //             const response = await axios.post(`${PESACHAIN_URL}/authtoken/refresh`);
        //                 const {token: newToken} = response.data;
        //                 setAuthstate({token:newToken,authenticated:true,data:parsedToken.data});
        //                 SecureStore.setItemAsync(TOKEN_KEY, newToken);
        //                 }
        //                 } catch (error) {
        //                     console.error(error);
        //                     setAuthstate({token:null,authenticated:false,data:null});
        //                     }
        // }

        const loadToken = async()=>{
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            console.log("Retrieved token:", token); 
    
            
           
            if(token){
                // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                // setAuthstate({token:token,authenticated:true})
                const parsedToken = JSON.parse(token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${parsedToken.token}`;
                setAuthstate({
                    token: parsedToken.token,
                    authenticated: true,
                    data: parsedToken.data,
                });


            }
            //else back to login screen
        }
        loadToken()
        //refreshToken()
    },[])

    const register = async(phoneNumber:string,password:string,username:string)=>{
        try{
            return await axios.post(`${PESACHAIN_URL}/auth/create`,{phoneNumber,username,password})

        }catch(e:any){
            return {error:true,msg: e.response.data.message}

        }

    }
    const login = async(phoneNumber:string,pass:string)=>{
        try{
            const result =await  axios.post(`${PESACHAIN_URL}/auth/signin`,{phoneNumber,
                pass});
                const userData: UserData = result.data;

            setAuthstate({
                token: userData.token,
                authenticated: true,
                data: userData
            });
                axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;
                SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(result.data));
                
                return result;


        }catch(e:any){
            return {error:true,msg: e.response.data.message}

        }

    }

const logout = async()=>{
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    setAuthstate({
        token: null,
        authenticated: false,
        data: null
        });
        axios.defaults.headers.common['Authorization'] = "";
}
const value:AuthProps ={
    onRegister:register,
    onLogin:login,
    onLogout:logout,
    authState
}
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
    
