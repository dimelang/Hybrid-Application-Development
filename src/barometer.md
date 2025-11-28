# Barometer

Merupakan sensor yang mampu mengukur tekanan udara (air pressure) di sekitar perangkat. Sensor ini berguna untuk mendeteksi perubahan cuaca, altitud relatif (terutama di iOS), atau konteks lingkungan (misalnya aplikasi cuaca, altimeter, atau log tekanan udara).

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

## API Dasar Barometer
| Method                                                | Deskripsi                                                                                                                                                                                                                                               |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `addListener(listener)`                               | Daftarkan **listener** untuk menerima pembaruan data dari barometer. Listener menerima argumen berupa objek `BarometerMeasurement`. Mengembalikan objek `Subscription` dengan metode `.remove()` untuk menghentikan listener.|
| `removeSubscription(subscription)`                    | Hentikan listener tertentu agar tidak menerima update lagi.|
| `removeAllListeners()`                                | Hapus semua listener barometer yang aktif.|
| `setUpdateInterval(intervalMs: number)`               | Atur interval pembaruan data sensor (dalam milidetik). Perhatikan bahwa pada Android 12+ (API 31), ada batas minimal frekuensi sensor. |
| `isAvailableAsync()`                                  | Mengecek apakah perangkat mendukung sensor barometer. Mengembalikan `Promise<boolean>`. Disarankan memanggil ini dulu sebelum men-subscribe.|
| `getPermissionsAsync()` & `requestPermissionsAsync()` | (Jika diperlukan) memeriksa atau meminta izin akses sensor.|
| `getListenerCount()`                                  | Mendapatkan jumlah listener aktif saat ini (angka).|
| `hasListeners()`                                      | Cek apakah ada listener yang terdaftar (boolean).|

---

## Contoh Penggunaan Barometer
```tsx
import { useEffect, useState } from "react";
import { View, Text, Button, Platform, Alert, TouchableOpacity } from "react-native";
import { Barometer } from "expo-sensors";

export default function BarometerContainer() {
    const [{ pressure, relativeAltitude }, setData] = useState<{ pressure: number; relativeAltitude?: number }>({
        pressure: 0,
        relativeAltitude: undefined
    });
    const [subscription, setSubscription] = useState<any>(null);
    const [available, setAvailable] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAvailability = async () => {
            const isAvail = await Barometer.isAvailableAsync();
            setAvailable(isAvail);
        };
        checkAvailability();

        return () => {
            subscription?.remove();
        };
    }, [subscription]);

    const setSlowInterval = () => Barometer.setUpdateInterval(1000);
    const setFastInterval = () => Barometer.setUpdateInterval(500);

    const startBarometer = () => {
        if (!available) {
            Alert.alert("Sensor Barometer tidak tersedia di perangkat ini");
            return;
        }

        const sub = Barometer.addListener(data => {
            setData(data);
        });
        setSubscription(sub);
    };

    const stopBarometer = () => {
        subscription?.remove();
        setSubscription(null);
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Barometer Example</Text>

            <Text>Pressure: {pressure.toFixed(2)} hPa</Text>
            {Platform.OS === "ios" && relativeAltitude != null && (
                <Text>Relative Altitude: {relativeAltitude.toFixed(2)} m</Text>
            )}

            <View style={{ flexDirection: "row", marginTop: 20 }}>
                <Button title="Start" onPress={startBarometer} />
                <View style={{ width: 20 }} />
                <Button title="Stop" onPress={stopBarometer} />
            </View>

            <Text style={{ marginTop: 20 }}>
                Sensor tersedia: {available === null ? "Memeriksa..." : available ? "Ya" : "Tidak"}
            </Text>

            <View style={{ flexDirection: "row", gap: 10, marginTop: 14 }}>
                <TouchableOpacity
                    onPress={setSlowInterval}
                    style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#eee", padding: 10 }}
                >
                    <Text>Slow</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={setFastInterval}
                    style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#eee", padding: 10 }}
                >
                    <Text>Fast</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
```