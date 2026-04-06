import { Stack } from "expo-router";
import { FavouritesProvider } from "../hooks/useFavourites";
import { LanguageProvider } from "../hooks/useLanguage";

export default function RootLayout() {
  return (
    <LanguageProvider>
      <FavouritesProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </FavouritesProvider>
    </LanguageProvider>
  );
}
