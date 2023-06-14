import {StyleSheet} from 'react-native';
import {colors} from '../../../utils/color';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const styles = StyleSheet.create({
  eventContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: colors.orange,
    width: '100%',
    height: '71%',
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: 12,
  },
  timerText: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    fontSize: 16,
    marginVertical: 5,
  },
  timerNumber: {
    color: colors.orange,
  },
  textFontsize: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  calender: {
    marginTop: 15,
    backgroundColor: 'white',
    height: '50%',
    borderRadius: 20,
  },
  calenderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 20,
  },
  calenderMain: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  calenderFontLastLine: {
    fontSize: 8,
  },
  calenderText: {
    alignItems: 'center',
  },
  calenderMainDay: {
    marginBottom: 5,
  },
});
