// Ergänzt nach "cap add android" die Berechtigungen und das Mitteilungs-Symbol.
import fs from 'node:fs';
const mf = 'android/app/src/main/AndroidManifest.xml';
let x = fs.readFileSync(mf, 'utf8');
const perms = [
  'android.permission.POST_NOTIFICATIONS',   // Android 13+: Mitteilungen anzeigen
  'android.permission.USE_EXACT_ALARM',      // Kalender-/Erinnerungs-App: pünktliche Alarme ohne Extra-Dialog
  'android.permission.RECEIVE_BOOT_COMPLETED', // Alarme nach Neustart wiederherstellen
  'android.permission.VIBRATE',
  'android.permission.WAKE_LOCK'
];
for (const p of perms) {
  if (!x.includes(`"${p}"`)) x = x.replace('<application', `<uses-permission android:name="${p}" />\n    <application`);
}
fs.writeFileSync(mf, x);

const dir = 'android/app/src/main/res/drawable';
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(`${dir}/ic_stat_tagwerk.xml`, `<?xml version="1.0" encoding="utf-8"?>
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="24dp" android:height="24dp" android:viewportWidth="24" android:viewportHeight="24">
    <path android:pathData="M6,9a6,6 0,1 1,12 0c0,5 2,6.5 2,6.5H4S6,14 6,9z"
        android:fillColor="#00000000" android:strokeColor="#FFFFFF" android:strokeWidth="2.2"
        android:strokeLineJoin="round" android:strokeLineCap="round"/>
    <path android:pathData="M10,19a2,2 0,0 0,4 0"
        android:fillColor="#00000000" android:strokeColor="#FFFFFF" android:strokeWidth="2.2"
        android:strokeLineCap="round"/>
</vector>
`);
console.log('Android-Projekt angepasst.');
