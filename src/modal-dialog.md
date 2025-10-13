# Modal Dialog

Komponen `Modal` di React Native digunakan untuk menampilkan konten sementara yang muncul di atas layar utama. Biasanya dipakai untuk popup, konfirmasi, form input, atau pesan penting.

## Modal Dasar
```javascript
import React, { useState } from 'react';
import { Modal, View, Text, Button } from 'react-native';

export default function App() {
  const [visible, setVisible] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Tampilkan Modal" onPress={() => setVisible(true)} />

      <Modal
        visible={visible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setVisible(false)} // untuk Android back button
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)'
        }}>
          <View style={{
            width: 300,
            padding: 20,
            backgroundColor: 'white',
            borderRadius: 10
          }}>
            <Text style={{ fontSize: 18, marginBottom: 20 }}>Halo, ini modal!</Text>
            <Button title="Tutup" onPress={() => setVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
```
Komponen ini memiliki beberapa property penting:
- `visible`: kontrol apakah modal muncul atau tidak.
- `transparent`: jika true, background luar modal bisa transparan.
- `animationType`: animasi saat modal muncul/hilang (none, slide, fade).
- `onRequestClose`: dipanggil ketika user tekan back button di Android.
