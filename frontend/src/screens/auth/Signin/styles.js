import {StyleSheet} from 'react-native';
import {colors} from '../../../utils/color';

export const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  agreeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  agreeText: {
    color: colors.blue,
    marginHorizontal: 13,
  },
  agreeTextBold: {
    fontWeight: 'bold',
  },
  button: {
    marginVertical: 16,
    paddingVertical: 12,
  },
  footerText: {
    color: colors.blue,
    marginTop: 16,
    textAlign: 'center',
  },
  footerLink: {
    fontWeight: 'bold',
  },
});
