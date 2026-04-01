import { Platform, StatusBar, Text, TouchableOpacity, View } from 'react-native';

type TopBarProps = {
  title?: string;
  onRightPress?: () => void;
  rightLabel?: string;
};

const TopBar = ({ title, onRightPress, rightLabel }: TopBarProps) => {
  return (
    <View style={{
      backgroundColor: '#007AFF',
      paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 40) + 10 : 50,
      paddingBottom: 15,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
        {title || 'COMP3130SEF School Finder'}
      </Text>
      {onRightPress && (
        <TouchableOpacity onPress={onRightPress}>
          <Text style={{ color: '#fff', fontSize: 14 }}>
            {rightLabel || 'Lang'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default TopBar;
