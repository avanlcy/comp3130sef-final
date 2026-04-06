import TopBar from '@/components/TopBar';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import GetSchoolsButton from '../components/GetSchoolsButton';
import SchoolItem from '../components/SchoolItem';
import { useFavourites } from '../hooks/useFavourites';
import { useLanguage } from '../hooks/useLanguage';
import { useSchools } from '../hooks/useSchools';

type SortField = 'name' | 'district' | 'category';

const MainPage = () => {
  const router = useRouter();
  const { language } = useLanguage();
  const { schools, loading, error, loadSchools } = useSchools(language);
  const { isFavourite } = useFavourites();

  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortField>('name');
  const [showFavourites, setShowFavourites] = useState(false);

  const isEn = language === 'en';

  const sortOptions: { field: SortField; label: string }[] = [
    { field: 'name', label: isEn ? 'Name' : '名稱' },
    { field: 'district', label: isEn ? 'District' : '分區' },
    { field: 'category', label: isEn ? 'Category' : '類別' },
  ];

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
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <TopBar
        title={isEn ? 'COMP3130SEF School Finder' : 'COMP3130SEF 香港學校'}
        onRightPress={() => router.push('/languageChange')}
        rightLabel={isEn ? 'ENG' : '中文'}
      />
      {loading && <ActivityIndicator style={{ marginTop: 20 }} size="large" />}
      {error && <Text style={{ color: 'red', textAlign: 'center', marginTop: 20 }}>{error}</Text>}
      {schools.length > 0 && (
        <>
          <TextInput
            style={{
              margin: 10,
              padding: 10,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 8,
              fontSize: 16,
            }}
            placeholder={isEn ? 'Search schools...' : '搜尋學校...'}
            value={search}
            onChangeText={setSearch}
          />
          <View style={{ flexDirection: 'row', paddingHorizontal: 10, gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
            {sortOptions.map((opt) => (
              <TouchableOpacity
                key={opt.field}
                onPress={() => setSortBy(opt.field)}
                style={{
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                  borderRadius: 16,
                  backgroundColor: sortBy === opt.field ? '#007AFF' : '#eee',
                }}
              >
                <Text style={{ fontSize: 13, color: sortBy === opt.field ? '#fff' : '#333' }}>
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => setShowFavourites((v) => !v)}
              style={{
                paddingVertical: 6,
                paddingHorizontal: 12,
                borderRadius: 16,
                backgroundColor: showFavourites ? '#FF9500' : '#eee',
              }}
            >
              <Text style={{ fontSize: 13, color: showFavourites ? '#fff' : '#333' }}>
                {isEn ? 'Favourites' : '收藏'}
              </Text>
            </TouchableOpacity>
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
            style={{ flex: 1 }}
          />
        </>
      )}
      {!loading && (
        <View style={{ paddingVertical: 10, paddingBottom: 40 }}>
          <GetSchoolsButton
            onPress={loadSchools}
            title={isEn ? 'Update Schools' : '更新學校'}
          />
        </View>
      )}
    </View>
  );
}

export default MainPage;
