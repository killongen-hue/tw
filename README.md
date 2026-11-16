# Tagwerk als Android-App (APK)

## APK bauen, ohne etwas zu installieren (empfohlen)
1. Kostenloses Konto auf github.com anlegen und ein neues Repository erstellen.
2. Den **gesamten Inhalt** dieses Ordners hochladen (inkl. des versteckten Ordners `.github`).
3. Im Repository auf **Actions → „APK bauen“** gehen (startet automatisch beim Hochladen, sonst „Run workflow“).
4. Nach ca. 5–8 Minuten unter dem fertigen Lauf den Download **Tagwerk-APK** öffnen, ZIP entpacken, `app-debug.apk` aufs Handy kopieren und installieren („Unbekannte Quellen“ erlauben).

## Lokal bauen (Node 22, JDK 21, Android Studio/SDK nötig)
```
npm install
npx cap add android
node scripts/patch-android.mjs
npx cap sync android
cd android && ./gradlew assembleDebug
```
APK: `android/app/build/outputs/apk/debug/app-debug.apk`

## Was an den Benachrichtigungen repariert wurde
Im Android-WebView gibt es die Browser-API `new Notification()` nicht, und JavaScript-Timer laufen bei geschlossener App nicht weiter. Jetzt:
- Alle Erinnerungen der nächsten 14 Tage (Termine, Aufgaben, Serien, 10-Min-Schlummern) werden als **echte Android-Alarme** vorgeplant (`@capacitor/local-notifications`), bei Änderungen automatisch neu.
- Sie kommen **auch bei geschlossener App** und nach einem Neustart des Handys.
- Beim ersten Start fragt die App nach der Mitteilungs-Erlaubnis (Android 13+); der Schalter „Systemmitteilungen“ in den Einstellungen funktioniert ebenfalls.
- Hinweis: Öffne die App mindestens alle 2 Wochen, damit weiter vorgeplant wird.
- In der Test-Erinnerung (Einstellungen) wird zusätzlich eine echte Systemmitteilung ausgelöst.

## Hinweise
- Die Daten liegen lokal im App-Speicher; bei Deinstallation sind sie weg.
- Schriftarten (IBM Plex) werden von Google geladen und fehlen offline; dann greift die Ersatzschrift.
- Akkusparmodi mancher Hersteller (Xiaomi, Huawei, Samsung) können Alarme verzögern: App dort von der Akkuoptimierung ausnehmen.
- Die Debug-APK ist direkt installierbar, aber nicht für den Play Store signiert.
