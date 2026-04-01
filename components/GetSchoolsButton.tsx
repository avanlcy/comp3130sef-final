import { Button, View } from 'react-native';

type GetSchoolsButtonProps = {
  onPress: () => void;
  title?: string;
};

const GetSchoolsButton = ({ onPress, title }: GetSchoolsButtonProps) => {
  return (
    <View style={{ width: 200, alignSelf: "center" }}>
      <Button title={title || 'Get Schools'} onPress={onPress} />
    </View>
  );
}

export default GetSchoolsButton;
