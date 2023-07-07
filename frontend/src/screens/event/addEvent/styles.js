import {StyleSheet} from 'react-native';
import {colors} from '../../../utils/color';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginRight: 0,
    marginBottom: 20,
  },
  button: {
    width: 90,
    height: 40,
    backgroundColor: colors.orange,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 14,
    marginBottom: 20,
  },
  icon: {
    width: 16,
    height: 16,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  labelname: {
    marginVertical: 4,
    color: colors.blue,
    fontSize: 14,
    fontWeight: '500',
  },
  selectContainer: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 14,
    marginBottom: 14,
  },
  select: {
    height: 50,
    fontWeight: 'bold',
  },
  buttonSelectDateContainer: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 14,
    width: '100%',
    height: 50,
    marginBottom: 10,
  },
  buttonSelectDate: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textSelectDate: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
    marginLeft: 12,
    marginTop: 10,
  },
  calendarIcon: {
    width: 30,
    height: 30,
    marginRight: 12,
    marginTop: 10,
  },
});
