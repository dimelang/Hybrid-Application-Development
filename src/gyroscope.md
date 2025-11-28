# Gyroscope

Merupakan sensor yang dapat mengukur kecepatan rotasi perangkat pada tiga sumbu (x, y, z) dalam satuan radian per detik. Sensor ini berbeda dari accelerometer yang mengukur percepatan linear, gyroscope lebih fokus pada rotasi. Beberapa penggunaan umum gyroscope:
- Mengukur putaran perangkat dalam game (contoh: mengendalikan karakter atau kamera).
- AR/VR tracking untuk gerakan kepala
- Gesture berbasis rotasi (misalnya memutar ponsel untuk undo/redo)
- Meningkatkan akurasi orientasi perangkat saat digabungkan dengan accelerometer

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

## API Dasar Gyroscope
| Method                                                | Deskripsi                                                                                                                                                                                             |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `addListener(listener)`                               | Mendaftarkan **listener** untuk menerima data rotasi dari gyroscope. Listener memanggil fungsi dengan parameter `GyroscopeMeasurement`. Mengembalikan objek `Subscription` dengan metode `.remove()`. |
| `removeSubscription(subscription)`                    | Menghapus listener tertentu dari gyroscope.                                                                                                                                                           |
| `removeAllListeners()`                                | Menghapus semua listener yang aktif. Berguna saat reset sensor atau unmount.                                                                                                                          |
| `setUpdateInterval(intervalMs: number)`               | Menentukan seberapa sering data sensor diperbarui (dalam milidetik).                                                                                                                                  |
| `isAvailableAsync()`                                  | Mengecek apakah sensor gyroscope tersedia pada perangkat. Mengembalikan `Promise<boolean>`.                                                                                                           |
| `requestPermissionsAsync()` & `getPermissionsAsync()` | Memeriksa dan meminta izin akses sensor. Dibutuhkan pada platform tertentu.                                                                                                                           |
| `getListenerCount()`                                  | Mengembalikan jumlah listener aktif saat ini.                                                                                                                                                         |
| `hasListeners()`                                      | Menentukan apakah ada listener yang sedang aktif.                                                                                                                                                     |

## Tipe Data — GyroscopeMeasurement

Listener gyroscope menerima data berupa objek:
- x: number — kecepatan rotasi pada sumbu X (radian/detik)
- y: number — kecepatan rotasi pada sumbu Y (radian/detik)
- z: number — kecepatan rotasi pada sumbu Z (radian/detik)
- timestamp: number — waktu pengambilan data (detik, relatif)


## Contoh Penggunaan Gyroscope
```tsx
import { useEffect, useState } from "react";
import { View, Text, Button, Alert, TouchableOpacity } from "react-native";
import { Gyroscope } from "expo-sensors";

export default function GyroscopeContainer() {
    const [{ x, y, z }, setData] = useState({
        x: 0,
        y: 0,
        z: 0
    });
    const [subscription, setSubscription] = useState<any>(null);
    const [available, setAvailable] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAvailability = async () => {
            const isAvailable = await Gyroscope.isAvailableAsync();
            setAvailable(isAvailable);
        };

        checkAvailability();

        // cleanup listener saat komponen unmount
        return () => {
            subscription?.remove();
        };
    }, [subscription]);

    const setSlowInterval = () => Gyroscope.setUpdateInterval(1000);
    const setFastInterval = () => Gyroscope.setUpdateInterval(16);

    const startGyroscope = () => {
        if (!available) {
            Alert.alert("Sensor Gyroscope tidak tersedia di perangkat ini");
            return;
        }

        const sub = Gyroscope.addListener(gyroData => {
            setData(gyroData);
        });

        setSubscription(sub);
    };

    const stopGyroscope = () => {
        subscription?.remove();
        setSubscription(null);
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Gyroscope Example</Text>

            <Text style={{ marginTop: 20 }}>
                Sensor tersedia: {available === null ? "Memeriksa..." : available ? "Ya" : "Tidak"}
            </Text>

            <Text>X: {x.toFixed(2)}</Text>
            <Text>Y: {y.toFixed(2)}</Text>
            <Text>Z: {z.toFixed(2)}</Text>

            <View style={{ flexDirection: "row", marginTop: 20 }}>
                <Button title="Start" onPress={startGyroscope} />
                <View style={{ width: 20 }} />
                <Button title="Stop" onPress={stopGyroscope} />
            </View>

            <View style={{ flexDirection: "row", gap: 10, marginTop: 14 }}>
                <TouchableOpacity
                    onPress={setSlowInterval}
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#eee",
                        padding: 10
                    }}
                >
                    <Text>Slow</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={setFastInterval}
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#eee",
                        padding: 10
                    }}
                >
                    <Text>Fast</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
```

## Alur Penggunaan API

- Panggil `Gyroscope.isAvailableAsync()` untuk memastikan sensor tersedia.
- (Jika diperlukan) panggil `Gyroscope.requestPermissionsAsync()` untuk mendapatkan izin.
- Atur interval update menggunakan `Gyroscope.setUpdateInterval(...)`.
- Daftarkan listener menggunakan `Gyroscope.addListener(...)`.
- Ketika komponen di-unmount atau sensor tidak diperlukan, panggil `.remove()` atau `Gyroscope.removeAllListeners()`.