import { StyleSheet, Text, View } from 'react-native';

type BadgeProps = {
  label: string;
  variant?: 'primary' | 'secondary' | 'favourite';
};

const Badge = ({ label, variant = 'secondary' }: BadgeProps) => {
  return (
    <View style={[styles.badge, variantStyles[variant]]}>
      <Text style={[styles.text, variantTextStyles[variant]]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  text: {
    fontSize: 11,
  },
});

const variantStyles = StyleSheet.create({
  primary: { backgroundColor: '#e6f0ff' },
  secondary: { backgroundColor: '#f0f0f0' },
  favourite: { backgroundColor: '#FF9500' },
});

const variantTextStyles = StyleSheet.create({
  primary: { color: '#007AFF' },
  secondary: { color: '#555' },
  favourite: { color: '#fff', fontWeight: '600', fontSize: 10 },
});

export default Badge;
