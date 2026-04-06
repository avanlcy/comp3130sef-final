import { StyleSheet, TextInput } from 'react-native';
import { colours } from '../constants/colours';

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

const SearchBar = ({ value, onChangeText, placeholder }: SearchBarProps) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: colours.inputBorder,
    borderRadius: 8,
    fontSize: 16,
  },
});

export default SearchBar;
