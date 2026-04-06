import { Text, TouchableOpacity, View } from 'react-native';
import { School } from '../models/School';

type SchoolItemProps = {
    school: School;
    onPress?: () => void;
    isFavourite?: boolean;
};

const SchoolItem = ({ school, onPress, isFavourite }: SchoolItemProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={{
            paddingHorizontal: 14,
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: '#ddd',
            backgroundColor: isFavourite ? '#fff8f0' : '#fff',
        }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333', flex: 1 }}>{school.name}</Text>
                {isFavourite && (
                    <View style={{
                        backgroundColor: '#FF9500',
                        paddingVertical: 2,
                        paddingHorizontal: 8,
                        borderRadius: 4,
                    }}>
                        <Text style={{ fontSize: 10, color: '#fff', fontWeight: '600' }}>FAV</Text>
                    </View>
                )}
            </View>
            <Text style={{ fontSize: 13, color: '#666', marginTop: 6 }} numberOfLines={2}>
                {school.address}
            </Text>
            <View style={{ flexDirection: 'row', marginTop: 8, gap: 8 }}>
                <View style={{ backgroundColor: '#e6f0ff', paddingVertical: 3, paddingHorizontal: 8, borderRadius: 4 }}>
                    <Text style={{ fontSize: 11, color: '#007AFF' }}>{school.district}</Text>
                </View>
                <View style={{ backgroundColor: '#f0f0f0', paddingVertical: 3, paddingHorizontal: 8, borderRadius: 4 }}>
                    <Text style={{ fontSize: 11, color: '#555' }}>{school.schoolLevel}</Text>
                </View>
                <View style={{ backgroundColor: '#f0f0f0', paddingVertical: 3, paddingHorizontal: 8, borderRadius: 4 }}>
                    <Text style={{ fontSize: 11, color: '#555' }}>{school.telephone}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default SchoolItem;
