import {StyleSheet} from 'react-native';
import {colors} from '../../../utils/color';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  avatarHandleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    marginHorizontal: 10,
  },
  avatar: {
    width: 90,
    height: 90,
  },
  textChangeAvatar: {
    fontSize: 18,
    textDecorationLine: 'underline',
    marginTop: 40,
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
  selectBirthdayContainer: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 14,
    width: '100%',
    height: 50,
    marginBottom: 10,
  },
  buttonSelectBirthday: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textSelectBirthday: {
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
  buttonContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 30,
    marginRight: 0,
  },
  button: {
    width: 150,
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
