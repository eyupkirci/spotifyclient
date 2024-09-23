// SearchInput.tsx
import React, {useContext} from 'react';
import {
  View,
  TextInput,
  Pressable,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import {AppContext} from '../context';

interface SearchInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  placeholderTextColor?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  value,
  onChangeText,
  onClear,
  placeholderTextColor = 'gray',
}) => {
  const {colors} = useContext(AppContext);
  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.backgorund,
            color: colors.text,
            borderColor: colors.text,
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={value}
        onChangeText={onChangeText}
      />
      <Pressable style={styles.clearButton} onPress={onClear}>
        {value === '' ? (
          <Image source={require('../assets/feather_search.png')} />
        ) : (
          <Text style={[styles.clearText, {color: colors.text}]}>Clear</Text>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignSelf: 'center',
    width: '96%',
    margin: 10,
  },
  input: {
    marginVertical: 5,
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  clearButton: {
    position: 'absolute',
    top: 14,
    right: 10,
  },
  clearText: {
    paddingTop: 2,
  },
});

export default SearchInput;
