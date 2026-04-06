import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colours } from '../constants/colours';

type PillProps = {
  label: string;
  active: boolean;
  activeColour?: string;
  onPress: () => void;
};

const Pill = ({ label, active, activeColour = colours.primary, onPress }: PillProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.pill, { backgroundColor: active ? activeColour : colours.pillBackground }]}
    >
      <Text style={[styles.text, { color: active ? colours.white : colours.textPrimary }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pill: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  text: {
    fontSize: 13,
  },
});

export default Pill;
