import {StyleSheet} from 'react-native';
import {colors} from '../../utils/color';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  headerContainer: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: colors.black,
  },
  textHeader: {
    fontSize: 18,
  },
  buttonGuide: {
    width: 130,
    height: 35,
    backgroundColor: colors.whiteGrey,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 14,
  },
  icon: {
    width: 30,
    height: 30,
  },
  textButton: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonPeopleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  avatarPeople: {
    width: 30,
    height: 30,
  },
  textPeople: {
    fontSize: 12,
  },
});
