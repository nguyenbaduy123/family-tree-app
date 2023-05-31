import {StyleSheet} from 'react-native';
import {colors} from '../../utils/color';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  labelname: {
    marginVertical: 4,
    color: colors.blue,
    fontSize: 14,
    fontWeight: '500',
  },
  selectSex: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 14,
    marginBottom: 14,
  },
  select: {
    height: 50,
    fontWeight: 'bold',
  },
  selectBirthday: {},
  selectDay: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 14,
    marginBottom: 14,
  },
  selectMonth: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 14,
    marginBottom: 14,
  },
  selectYear: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 14,
    marginBottom: 14,
  },

  buttonContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 30,
    marginRight: 0,
  },
  button: {
    width: 90,
    height: 40,
    backgroundColor: colors.orange,
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
    fontSize: 18,
  },
});