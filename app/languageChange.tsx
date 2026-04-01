import { useRouter } from 'expo-router';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import TopBar from '../components/TopBar';
import { useLanguage } from '../hooks/useLanguage';
import { Language } from '../models/Language';

const languages: { code: Language; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'zh', label: '繁體中文 (香港)' },
];

const LanguageChange = () => {
  const router = useRouter();
  const { language, setLanguage } = useLanguage();
  const isEn = language === 'en';

  return (
    <View style={{ flex: 1 }}>
      <TopBar
        title={isEn ? 'Languages' : '語言'}
        onRightPress={() => router.back()}
        rightLabel={isEn ? 'Back' : '返回'}
      />
      <FlatList
        data={languages}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              padding: 16,
              borderBottomWidth: 1,
              borderBottomColor: '#eee',
              backgroundColor: item.code === language ? '#e6f0ff' : '#fff',
            }}
            onPress={() => {
              setLanguage(item.code);
              router.back();
            }}
          >
            <Text style={{ fontSize: 18 }}>{item.label}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default LanguageChange;
