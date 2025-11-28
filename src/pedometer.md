# Pedometer

Sensor pedometer memungkinkan aplikasi untuk memantau jumlah langkah pengguna menggunakan sensor bawaan perangkat (Android) atau layanan Core Motion (iOS).

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

## API Dasar Pedometer
| Method / Fungsi                                                           | Deskripsi                                                                                                                                                                    |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Pedometer.isAvailableAsync()`                                            | Mengecek apakah pedometer tersedia di perangkat. Mengembalikan `Promise<boolean>`.|
| `Pedometer.getPermissionsAsync()` / `Pedometer.requestPermissionsAsync()` | Memeriksa atau meminta izin akses pedometer (jika diperlukan).|
| `Pedometer.getStepCountAsync(start: Date, end: Date)`                     | (iOS) Mengambil jumlah langkah antara dua tanggal. Mengembalikan `Promise<PedometerResult>` yang berisi `{ steps: number }`.|
| `Pedometer.watchStepCount(callback)`                                      | Berlangganan update langkah secara real-time. Callback menerima `PedometerResult`. Mengembalikan `Subscription` dengan `.remove()` untuk berhenti.|

Catatan: getStepCountAsync hanya tersedia di iOS. Pada Android cukup gunakan `watchStepCount`.

## Contoh Penggunaan Pedometer
```tsx
import { useEffect, useState } from "react";
import { View, Text, Button, Alert, Platform } from "react-native";
import { Pedometer } from "expo-sensors";

export default function PedometerContainer() {
    const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
    const [currentSteps, setCurrentSteps] = useState(0);
    const [pastSteps, setPastSteps] = useState<number | null>(null);
    const [subscription, setSubscription] = useState<any>(null);

    useEffect(() => {
        async function init() {
            const perm = await Pedometer.getPermissionsAsync();
            console.log("Permission status:", perm);


            // cek ketersediaan sensor
            const available = await Pedometer.isAvailableAsync();
            setIsAvailable(available);

            if (!available) {
                Alert.alert("Pedometer tidak tersedia di perangkat ini");
                return;
            }

            // cek permission
            const { status } = await Pedometer.requestPermissionsAsync();

            if (status !== "granted") {
                Alert.alert("Izin pedometer ditolak");
                return;
            }

            // Ambil histori langkah hanya jika iOS
            if (Platform.OS === "ios") {
                const end = new Date();
                const start = new Date();
                start.setDate(end.getDate() - 1); // 24 jam lalu

                try {
                    const result = await Pedometer.getStepCountAsync(start, end);
                    setPastSteps(result.steps);
                } catch (e) {
                    console.warn("Error getStepCountAsync:", e);
                    setPastSteps(null);
                }
            } else {
                setPastSteps(null); // Android tidak mendukung
            }

            // subscribe real-time
            const sub = Pedometer.watchStepCount((result) => {
                setCurrentSteps(result.steps);
            });

            setSubscription(sub);
        }

        init();

        return () => {
            subscription?.remove();
        };
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
                Pedometer Example
            </Text>

            <Text>Pedometer tersedia: {isAvailable ? "Ya" : "Tidak"}</Text>

            <Text style={{ marginTop: 20, fontSize: 16 }}>
                Langkah (real-time): {currentSteps}
            </Text>

            <Text style={{ marginTop: 10, fontSize: 16 }}>
                Langkah 24 jam terakhir:
                {Platform.OS === "ios"
                    ? pastSteps ?? "Memuat..."
                    : "Tidak didukung di Android"}
            </Text>

            <Button
                title="Reset Real-Time Counter"
                onPress={() => setCurrentSteps(0)}
            />
        </View>
    );
}
```
Saat mengembangkan aplikasi React Native menggunakan Expo, sensor pedometer tidak berfungsi ketika dijalankan melalui Expo Go di Android. Sedangkan pada iOS, sensor pedometer dapat berfungsi melalui Expo Go.

Agar sensor pedometer berjalan di Android, aplikasi harus memiliki permission Activity Recognition dan di-build menggunakan Dev Client atau APK, bukan Expo Go.
Tambahkan ke `app.json`:
```bash
{
  "expo": {
    "android": {
      "permissions": ["android.permission.ACTIVITY_RECOGNITION"]
    },
    "plugins": [
      [
        "expo-sensors",
        {
          "motionPermission": "Aplikasi membutuhkan akses untuk menghitung langkah."
        }
      ]
    ]
  }
}
```
Hubungkan perangkat fisik Android lalu lakukan rebuild:
```bash
npx expo run:android
```

Atau build menggunakan Dev Client
```bash
npx expo prebuild
npx expo run:android
```