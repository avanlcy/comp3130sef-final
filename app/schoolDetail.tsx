import * as Clipboard from 'expo-clipboard';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';
import TopBar from '../components/TopBar';
import { colours } from '../constants/colours';
import { useFavourites } from '../hooks/useFavourites';
import { useLanguage } from '../hooks/useLanguage';
import { t } from '../i18n/translations';
import { School } from '../models/School';

const SchoolDetail = () => {
  const router = useRouter();
  const { language } = useLanguage();
  const { isFavourite, toggleFavourite } = useFavourites();
  const params = useLocalSearchParams();

  const school: School = {
    schoolNo: Number(params.schoolNo),
    category: params.category as string,
    name: params.name as string,
    address: params.address as string,
    longitude: Number(params.longitude),
    latitude: Number(params.latitude),
    gender: params.gender as string,
    session: params.session as string,
    district: params.district as string,
    financeType: params.financeType as string,
    schoolLevel: params.schoolLevel as string,
    telephone: params.telephone as string,
    fax: params.fax as string,
    website: params.website as string,
    religion: params.religion as string,
  };

  const rows: { label: string; value: string }[] = [
    { label: t('schoolNo', language), value: school.schoolNo.toString() },
    { label: t('category', language), value: school.category },
    { label: t('address', language), value: school.address },
    { label: t('district', language), value: school.district },
    { label: t('schoolLevel', language), value: school.schoolLevel },
    { label: t('financeType', language), value: school.financeType },
    { label: t('session', language), value: school.session },
    { label: t('gender', language), value: school.gender },
    { label: t('religion', language), value: school.religion },
    { label: t('telephone', language), value: school.telephone },
    { label: t('fax', language), value: school.fax },
    { label: t('website', language), value: school.website },
  ];

  const favourited = isFavourite(school.schoolNo);

  const mapHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        html, body { margin: 0; padding: 0; height: 100%; width: 100%; }
        iframe { width: 100%; height: 100%; border: 0; display: block; }
      </style>
    </head>
    <body>
      <iframe
        src="https://maps.google.com/maps?q=${school.latitude},${school.longitude}&z=14&output=embed"
        allowfullscreen>
      </iframe>
    </body>
    </html>
  `;

  return (
    <View style={styles.screen}>
      <TopBar
        title={t('details', language)}
        onRightPress={() => router.back()}
        rightLabel={t('back', language)}
      />
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>{school.name}</Text>
        <TouchableOpacity
          onPress={() => toggleFavourite(school.schoolNo)}
          style={[styles.favButton, { backgroundColor: favourited ? colours.danger : colours.primary }]}
        >
          <Text style={styles.favButtonText}>
            {favourited ? t('removeFromFavourites', language) : t('addToFavourites', language)}
          </Text>
        </TouchableOpacity>
        {rows.map((row) => (
          <View key={row.label} style={styles.row}>
            <Text style={styles.rowLabel}>{row.label}</Text>
            <Text style={styles.rowValue}>{row.value}</Text>
          </View>
        ))}
        <View style={styles.locationHeader}>
          <Text style={styles.locationTitle}>{t('location', language)}</Text>
          <TouchableOpacity
            onPress={() => {
              Clipboard.setStringAsync(`${school.latitude}, ${school.longitude}`);
              Alert.alert(t('copied', language), `${school.latitude}, ${school.longitude}`);
            }}
            style={styles.copyButton}
          >
            <Text style={styles.copyButtonText}>{t('copyCoords', language)}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mapContainer}>
          <WebView source={{ html: mapHtml }} style={styles.map} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  favButton: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
    marginBottom: 16,
  },
  favButtonText: {
    color: colours.white,
    fontSize: 14,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colours.borderLight,
  },
  rowLabel: {
    fontSize: 14,
    fontWeight: '600',
    width: 120,
    color: colours.textSecondary,
  },
  rowValue: {
    fontSize: 14,
    flex: 1,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  copyButton: {
    marginLeft: 10,
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: colours.primary,
    borderRadius: 6,
  },
  copyButtonText: {
    color: colours.white,
    fontSize: 12,
  },
  mapContainer: {
    height: 450,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 30,
  },
  map: {
    flex: 1,
  },
});

export default SchoolDetail;
