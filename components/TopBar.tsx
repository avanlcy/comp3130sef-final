import { Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colours } from '../constants/colours';

type TopBarProps = {
  title?: string;
  onRightPress?: () => void;
  rightLabel?: string;
};

const TopBar = ({ title, onRightPress, rightLabel }: TopBarProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title || 'COMP3130SEF School Finder'}
      </Text>
      {onRightPress && (
        <TouchableOpacity onPress={onRightPress}>
          <Text style={styles.rightLabel}>
            {rightLabel || 'Lang'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.primary,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 40) + 10 : 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: colours.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  rightLabel: {
    color: colours.white,
    fontSize: 14,
  },
});

export default TopBar;
