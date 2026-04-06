import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TopBar from '../components/TopBar';
import { colours } from '../constants/colours';
import { useLanguage } from '../hooks/useLanguage';
import { t } from '../i18n/translations';
import { Language } from '../models/Language';

const languages: { code: Language; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'zh', label: '繁體中文 (香港)' },
];

const LanguageChange = () => {
  const router = useRouter();
  const { language, setLanguage } = useLanguage();

  return (
    <View style={styles.screen}>
      <TopBar
        title={t('languages', language)}
        onRightPress={() => router.back()}
        rightLabel={t('back', language)}
      />
      <FlatList
        data={languages}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.item, item.code === language && styles.selectedItem]}
            onPress={() => {
              setLanguage(item.code);
              router.back();
            }}
          >
            <Text style={styles.itemText}>{item.label}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colours.borderLight,
    backgroundColor: colours.cardBackground,
  },
  selectedItem: {
    backgroundColor: colours.selectedBackground,
  },
  itemText: {
    fontSize: 18,
  },
});

export default LanguageChange;
