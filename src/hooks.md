# Hooks

Hooks adalah fungsi khusus yang memungkinkan kita untuk menggunakan fitur `React` seperti `state`, `lifecycle`, atau `context` ke dalam `function component`. Semua hook memiliki aturan yang sama:

- Selalu dipanggil di level atas `function component`.
- Tidak dapat digunakan di dalam loop atau kondisi.
- Selalu diawali dengan kata `use`.

Di dalam hook terdapat beberapa konsep inti yang perlu dipahami:

1. [**State Management dengan `useState`**](state.md)
    - Konsep: menyimpan dan mengubah data di dalam komponen.
    - Setiap kali state berubah, komponen akan re-*render*.
    - Contoh: menyimpan teks input, toggle boolean, counter.


2. [**Side Effects dengan `useEffect`**](side-effects.md)
    - Konsep: menjalankan efek samping setelah render. 
    - Penting karena React Native sifatnya declarative, dan `useEffect` dipakai untuk hal yang tidak langsung berhubungan dengan tampilan.
    - Contoh: memanggil `API`, mengatur timer, event listener, dan unsubscribe.

3. [**Context dengan `useContext`**](context.md)
    - Konsep: berbagi data global antar komponen tanpa harus terus menerus menggunakan `props`.
    - Misalnya: tema aplikasi (dark/light), autentikasi user, bahasa.

4. [**Reference dengan `useRef`**](reference.md)
    - Konsep: menyimpan nilai yang tidak memicu re-*render* ketika berubah.
    - Contoh: menyimpan nilai sementara (misalnya previous value) dan akses langsung ke komponen (misalnya TextInput focus).

5. [**Reducer dengan `useReducer`**](reducer.md)
    - Konsep: alternatif dari `useState` untuk state yang lebih kompleks.
    - Contoh: cocok untuk logika yang melibatkan banyak aksi (misalnya form dengan banyak field).

<!-- 6. [**Custom Hooks**](custom-hooks.md)
    - Konsep: membuat hook sendiri untuk mengabstraksi logika agar dapat digunakan ulang.
    - Contoh: `useAuth()`, `useFetch()`, `useOrientation()`. -->



