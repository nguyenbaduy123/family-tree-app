import {StyleSheet} from 'react-native';
import {colors} from '../../../utils/color';

export const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.orange,
    width: '100%',
    height: '35%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {},
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  textInfoContainer: {
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInfoName: {
    fontSize: 24,
  },
  textInfoOther: {
    fontSize: 16,
  },

  mainContainer: {
    padding: 20,
    backgroundColor: colors.opalescent,
    width: '100%',
    height: '65%',
  },
  shareInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderRadius: 8,
    width: '100%',
    height: 80,
    borderColor: colors.black,
  },
  shareTextContainer: {
    marginHorizontal: 14,
  },
  shareText: {
    fontSize: 16,
  },
  shareCode: {
    fontSize: 32,
  },
  shareButtonContainer: {
    marginHorizontal: 14,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.black,
    borderRadius: 12,
    width: 120,
    height: 40,
    backgroundColor: colors.white,
  },
  icon3: {
    width: 24,
    height: 24,
    marginRight: 3,
  },
  shareButtonText: {
    fontSize: 20,
    marginLeft: 3,
    fontWeight: 'bold',
  },

  buttonContainer: {
    marginTop: 10,
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
