import {StyleSheet} from 'react-native';
import {colors} from '../../utils/color';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  label: {
    marginVertical: 4,
    color: colors.blue,
    fontSize: 14,
    fontWeight: '500',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flex: 1,
  },
  eye: {
    width: 20,
    height: 20,
    marginHorizontal: 16,
  },
});
