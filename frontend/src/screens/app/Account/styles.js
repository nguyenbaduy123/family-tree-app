import {StyleSheet} from 'react-native';
import {colors} from '../../../utils/color';

export const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.orange,
    width: '100%',
    height: '40%',
  },
  mainContainer: {
    padding: 20,
    backgroundColor: colors.opalescent,
    width: '100%',
    height: '60%',
  },
  button: {
    width: '100%',
    height: 60,
    marginVertical: 10,
    backgroundColor: colors.opalescent,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
  },
  icon1: {
    width: 24,
    height: 24,
    paddingHorizontal: 10,
    marginHorizontal: 15,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  icon2Container: {
    flex: 1,
    alignItems: 'flex-end',
  },
  icon2: {
    width: 16,
    height: 16,
    marginRight: 10,
  },
});
