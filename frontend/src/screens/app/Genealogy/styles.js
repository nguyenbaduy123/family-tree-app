import {StyleSheet} from 'react-native';
import {colors} from '../../../utils/color';

export const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.orange,
    width: '100%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleHeader: {
    fontSize: 30,
    marginHorizontal: 25,
  },
  button: {
    width: 80,
    height: 32,
    backgroundColor: colors.whiteGrey,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-evenly',
    borderRadius: 14,
  },
  icon: {
    width: 16,
    height: 16,
  },
  buttonText: {
    fontWeight: 'bold',
  },
  container: {
    padding: 16,
    marginTop: 28,
    height: '100%',
  },

  image: {
    width: '100%',
    height: 300,
  },
  text: {
    textAlign: 'center',
  },
  textLink: {
    fontWeight: 'bold',
  },
});
