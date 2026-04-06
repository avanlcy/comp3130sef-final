import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import GetSchoolsButton from '../components/GetSchoolsButton';
import Pill from '../components/Pill';
import SchoolItem from '../components/SchoolItem';
import SearchBar from '../components/SearchBar';
import TopBar from '../components/TopBar';
import { colours } from '../constants/colours';
import { useFavourites } from '../hooks/useFavourites';
import { useLanguage } from '../hooks/useLanguage';
import { useSchools } from '../hooks/useSchools';
import { t } from '../i18n/translations';

type SortField = 'name' | 'district' | 'category';

const SORT_KEYS: { field: SortField; translationKey: 'sortName' | 'sortDistrict' | 'sortCategory' }[] = [
  { field: 'name', translationKey: 'sortName' },
  { field: 'district', translationKey: 'sortDistrict' },
  { field: 'category', translationKey: 'sortCategory' },
];

const MainPage = () => {
  const router = useRouter();
  const { language } = useLanguage();
  const { schools, loading, error, loadSchools } = useSchools(language);
  const { isFavourite } = useFavourites();

  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortField>('name');
  const [showFavourites, setShowFavourites] = useState(false);

  const filteredSchools = useMemo(() => {
    const query = search.toLowerCase();
    let filtered = schools.filter((s) =>
      s.name.toLowerCase().includes(query) ||
      s.district.toLowerCase().includes(query) ||
      s.category.toLowerCase().includes(query)
    );
    if (showFavourites) {
      filtered = filtered.filter((s) => isFavourite(s.schoolNo));
    }
    return filtered.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
  }, [schools, search, sortBy, showFavourites, isFavourite]);

  return (
    <View style={styles.screen}>
      <TopBar
        title={t('appTitle', language)}
        onRightPress={() => router.push('/languageChange')}
        rightLabel={language === 'en' ? t('langEn', language) : t('langZh', language)}
      />
      {loading && <ActivityIndicator style={styles.loader} size="large" />}
      {error && <Text style={styles.error}>{error}</Text>}
      {schools.length > 0 && (
        <>
          <SearchBar
            value={search}
            onChangeText={setSearch}
            placeholder={t('searchPlaceholder', language)}
          />
          <View style={styles.pillRow}>
            {SORT_KEYS.map((opt) => (
              <Pill
                key={opt.field}
                label={t(opt.translationKey, language)}
                active={sortBy === opt.field}
                onPress={() => setSortBy(opt.field)}
              />
            ))}
            <Pill
              label={t('favourites', language)}
              active={showFavourites}
              activeColour={colours.orange}
              onPress={() => setShowFavourites((v) => !v)}
            />
          </View>
          <FlatList
            data={filteredSchools}
            keyExtractor={(item) => item.schoolNo.toString()}
            renderItem={({ item }) => (
              <SchoolItem
                school={item}
                isFavourite={isFavourite(item.schoolNo)}
                onPress={() => router.push({ pathname: '/schoolDetail', params: item as any })}
              />
            )}
            style={styles.list}
          />
        </>
      )}
      {!loading && (
        <View style={styles.buttonContainer}>
          <GetSchoolsButton
            onPress={loadSchools}
            title={t('updateSchools', language)}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colours.background,
  },
  loader: {
    marginTop: 20,
  },
  error: {
    color: colours.danger,
    textAlign: 'center',
    marginTop: 20,
  },
  pillRow: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    gap: 8,
    marginBottom: 6,
    flexWrap: 'wrap',
  },
  list: {
    flex: 1,
  },
  buttonContainer: {
    paddingVertical: 10,
    paddingBottom: 40,
  },
});

export default MainPage;
