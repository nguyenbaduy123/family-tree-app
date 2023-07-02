import { StyleSheet } from 'react-native';
import { colors } from '../../../utils/color';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export const styles = StyleSheet.create({
  eventContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: colors.orange,
    flexDirection: 'column',
    marginBottom: 0,
    height: 240,
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
    flex: 1
  },
  calendarContainer: {
    borderRadius: 20,
    flex: 3,
  },
  footer: {
    backgroundColor: "#FFF3D6",
    flex: 1
  },
  calendar: {
    height: 150,
    paddingTop: 10,
    paddingBottom: 20,
    height: 70,
    borderRadius: 20,
  },
  timer: {
    width: '100%',
    height: 60,
    backgroundColor: '#FFF3D6',
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 8,
  },
  timerText: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5
  },
  timerHour: {
    alignItems: 'center',
  },
  timerDate: {
    alignItems: 'center'
  },
  timerMonth: {
    alignItems: 'center'
  },
  timerYear: {
    alignItems: 'center'
  },
  viewCalendar: {
    backgroundColor: '#FFF3D6',
    padding: 10,
    borderRadius: 10
  }
});
