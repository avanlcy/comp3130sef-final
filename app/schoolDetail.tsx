import * as Clipboard from 'expo-clipboard';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';
import TopBar from '../components/TopBar';
import { useLanguage } from '../hooks/useLanguage';
import { School } from '../models/School';

const SchoolDetail = () => {
  const router = useRouter();
  const { language } = useLanguage();
  const params = useLocalSearchParams();
  const isEn = language === 'en';

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
    { label: isEn ? 'School No.' : '學校編號', value: school.schoolNo.toString() },
    { label: isEn ? 'Category' : '類別', value: school.category },
    { label: isEn ? 'Address' : '地址', value: school.address },
    { label: isEn ? 'District' : '分區', value: school.district },
    { label: isEn ? 'School Level' : '學校類型', value: school.schoolLevel },
    { label: isEn ? 'Finance Type' : '資助種類', value: school.financeType },
    { label: isEn ? 'Session' : '授課時間', value: school.session },
    { label: isEn ? 'Gender' : '學生性別', value: school.gender },
    { label: isEn ? 'Religion' : '宗教', value: school.religion },
    { label: isEn ? 'Telephone' : '電話', value: school.telephone },
    { label: isEn ? 'Fax' : '傳真', value: school.fax },
    { label: isEn ? 'Website' : '網頁', value: school.website },
  ];

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
    <View style={{ flex: 1 }}>
      <TopBar
        title={isEn ? 'Details' : '詳情'}
        onRightPress={() => router.back()}
        rightLabel={isEn ? 'Back' : '返回'}
      />
      <ScrollView style={{ flex: 1, padding: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>
          {school.name}
        </Text>
        {rows.map((row) => (
          <View key={row.label} style={{
            flexDirection: 'row',
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#eee',
          }}>
            <Text style={{ fontSize: 14, fontWeight: '600', width: 120, color: '#555' }}>
              {row.label}
            </Text>
            <Text style={{ fontSize: 14, flex: 1 }}>{row.value}</Text>
          </View>
        ))}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
            {isEn ? 'Location' : '位置'}
          </Text>
          <TouchableOpacity
            onPress={() => {
              Clipboard.setStringAsync(`${school.latitude}, ${school.longitude}`);
              Alert.alert(isEn ? 'Copied' : '已複製', `${school.latitude}, ${school.longitude}`);
            }}
            style={{
              marginLeft: 10,
              paddingVertical: 4,
              paddingHorizontal: 10,
              backgroundColor: '#007AFF',
              borderRadius: 6,
            }}
          >
            <Text style={{ color: '#fff', fontSize: 12 }}>{isEn ? 'Copy Coords' : '複製座標'}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 450, borderRadius: 8, overflow: 'hidden', marginBottom: 30 }}>
          <WebView
            source={{ html: mapHtml }}
            style={{ flex: 1 }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default SchoolDetail;
