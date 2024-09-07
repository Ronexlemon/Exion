import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RequestData } from '@/types/datatypes';
import QRCode from 'react-native-qrcode-svg';



interface QRCodeProps {
  data: RequestData | undefined;
}

const QRCodeComponent: React.FC<QRCodeProps> = ({ data }) => {
  
  const qrData = JSON.stringify(data);

  return (
    <View style={styles.container}>
      <QRCode
        value={qrData}
        size={300} 
        color="black"
        backgroundColor="white"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default QRCodeComponent;
