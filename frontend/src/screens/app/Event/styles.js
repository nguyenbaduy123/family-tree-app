import {StyleSheet} from 'react-native';
import {colors} from '../../../utils/color';

export const styles = StyleSheet.create({
  eventContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: colors.orange,
    width: '100%',
    height: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventText: {
    fontSize: 30,
    color: colors.white,
    fontWeight: 'bold',
  },
  button: {
    width: 120,
    height: 32,
    marginTop: 5,
    backgroundColor: colors.whiteGrey,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 14,
  },
  icon: {
    width: 16,
    height: 16,
  },
  buttonText: {
    fontWeight: 'bold',
  },
});
