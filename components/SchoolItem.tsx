import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colours } from '../constants/colours';
import { School } from '../models/School';
import Badge from './Badge';

type SchoolItemProps = {
  school: School;
  onPress?: () => void;
  isFavourite?: boolean;
};

const SchoolItem = ({ school, onPress, isFavourite }: SchoolItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, isFavourite && styles.favouriteContainer]}
    >
      <View style={styles.nameRow}>
        <Text style={styles.name} numberOfLines={2}>{school.name}</Text>
        {isFavourite && <Badge label="FAV" variant="favourite" />}
      </View>
      <Text style={styles.address} numberOfLines={2}>
        {school.address}
      </Text>
      <View style={styles.badgeRow}>
        <Badge label={school.district} variant="primary" />
        <Badge label={school.schoolLevel} />
        <Badge label={school.telephone} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colours.border,
    backgroundColor: colours.cardBackground,
  },
  favouriteContainer: {
    backgroundColor: colours.favouriteBackground,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colours.textPrimary,
    flex: 1,
  },
  address: {
    fontSize: 13,
    color: colours.textMuted,
    marginTop: 6,
  },
  badgeRow: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 8,
  },
});

export default SchoolItem;
