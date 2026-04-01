import { Stack } from "expo-router";
import { LanguageProvider } from "../hooks/useLanguage";

export default function RootLayout() {
  return (
    <LanguageProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </LanguageProvider>
  );
}
