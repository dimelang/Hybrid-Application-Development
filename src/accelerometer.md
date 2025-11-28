# Accelerometer

Merupakan sensor yang mengukur percepatan perangkat pada tiga sumbu (x, y, z). Sensor ini sering digunakan untuk:
- Mendeteksi orientasi perangkat (portrait/landscape)
- Membuat fitur shake atau tilt
- Game yang memanfaatkan gerakan perangkat
- Fitness tracker (menghitung gerakan tubuh)

## Instalasi
Expo:
```bash
npx expo install expo-sensors
```

React Native CLI:
```bash
npm install expo-sensors
cd ios && pod install && cd ..
```

## API Dasar Accelerometer
| Method | Deskripsi |
|--------|-----------|
| `addListener(listener)` | Daftarkan **listener** untuk menerima update percepatan perangkat. `listener` menerima objek `AccelerometerMeasurement` setiap kali ada pembaruan sensor, metode ini mengembalikan `Subscription` yang memiliki metode `.remove()` untuk berhenti mendengarkan.|
| `removeSubscription(subscription)` | Menghentikan subscription yang spesifik — artinya listener tidak akan menerima update lagi. |
| `removeAllListeners()` | Menghapus semua listener yang terdaftar sekaligus.|
| `setUpdateInterval(intervalMs: number)` | Mengatur interval atau kecepatan (dalam milidetik) pembacaan data sensor. |
| `isAvailableAsync()` | Mengecek apakah sensor accelerometer tersedia pada perangkat. Mengembalikan `Promise<boolean>`. Disarankan untuk dipanggil sebelum mencoba menggunakan sensor, terutama untuk mendukung berbagai platform (Android / iOS / Web).|
| `requestPermissionsAsync()` & `getPermissionsAsync()` | Untuk platform/web yang membutuhkan izin akses sensor: `requestPermissionsAsync()` meminta izin ke pengguna, sedangkan `getPermissionsAsync()` memeriksa status izin. Keduanya mengembalikan `Promise<PermissionResponse>`.|
| `getListenerCount()` | Mengembalikan jumlah listener saat ini yang aktif. Berguna untuk debugging atau manajemen listener.|
| `hasListeners()` | Mengembalikan boolean: apakah ada listener yang terdaftar saat ini.|

---

## Tipe Data — `AccelerometerMeasurement`

Ketika listener dipanggil, ia menerima objek `AccelerometerMeasurement` dengan properti:

- `x: number` — percepatan sepanjang sumbu X, dalam satuan “g” (di mana 1g ≈ gravitasi bumi ≈ 9.81 m/s²)
- `y: number` — percepatan sepanjang sumbu Y
- `z: number` — percepatan sepanjang sumbu Z
- `timestamp: number` — waktu pengukuran (dalam detik, relatif) saat pembacaan terjadi.

---

## Contoh Penggunaan Accelerometer
```tsx
import { useEffect, useState } from "react";
import { View, Text, Button, Alert, TouchableOpacity } from 'react-native';
import { Accelerometer } from "expo-sensors";

export default function AccelerometerContainer() {
    const [{ x, y, z }, setData] = useState({
        x: 0,
        y: 0,
        z: 0
    });
    const [subscription, setSubscription] = useState<any>(null);
    const [available, setAvailable] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAvailability = async () => {
            const isAvailable = await Accelerometer.isAvailableAsync();
            setAvailable(isAvailable);
        };

        checkAvailability();
    }, []);

    const _slow = () => Accelerometer.setUpdateInterval(1000);
    const _fast = () => Accelerometer.setUpdateInterval(16);

    const startAccelerometer = async () => {
        if (!available) {
            Alert.alert("Sensor Accelerometer tidak tersedia di perangkat ini");
            return;
        }
        const sub = Accelerometer.addListener(accelData => {
            setData(accelData);
        });
        setSubscription(sub);
    }

    const stopAccelerometer = () => {
        subscription?.remove();
        setSubscription(null);
    }


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Accelerometer Example</Text>

            <Text style={{ marginTop: 20 }}>
                Sensor tersedia: {available === null ? 'Memeriksa...' : available ? 'Ya' : 'Tidak'}
            </Text>

            <Text>X: {x.toFixed(2)}</Text>
            <Text>Y: {y.toFixed(2)}</Text>
            <Text>Z: {z.toFixed(2)}</Text>

            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <Button title="Start" onPress={startAccelerometer} />
                <View style={{ width: 20 }} />
                <Button title="Stop" onPress={stopAccelerometer} />
            </View>

            <View style={{ flexDirection: 'row', gap: 10, marginTop: 14 }}>
                <TouchableOpacity onPress={_slow} style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#eee',
                    padding: 10,
                }}>
                    <Text>Slow</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_fast} style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#eee',
                    padding: 10,
                }}>
                    <Text>Fast</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
```


## Alur Penggunaan API

1. Panggil `Accelerometer.isAvailableAsync()` dulu — untuk memastikan sensor tersedia.  
2. (Jika perlu) panggil `Accelerometer.requestPermissionsAsync()` untuk meminta akses ke sensor.  
3. Atur interval update dengan `Accelerometer.setUpdateInterval(...)`.  
4. Pasang listener dengan `Accelerometer.addListener(...)`.  
5. Ketika sudah tidak diperlukan (misalnya komponen unmount), panggil `subscription.remove()` atau `Accelerometer.removeAllListeners()`.

---