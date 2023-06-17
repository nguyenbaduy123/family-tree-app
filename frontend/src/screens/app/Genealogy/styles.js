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
    color: colors.white,
    fontWeight: 'bold',
  },
  button: {
    width: 80,
    height: 32,
    backgroundColor: colors.whiteGrey,
    marginHorizontal: 10,
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
  container: {
    padding: 16,
    height: '100%',
    flexGrow: 1,
  },
  contentContainer: {
    paddingBottom: 10,
  },

  //nếu có families
  infoGenealogyContainer: {
    width: '100%',
    height: 206,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 0,
    marginBottom: 100,
    flexGrow: 1,
  },
  view1: {
    width: '100%',
    height: 90,
    flexDirection: 'column',
    paddingLeft: 8,
    borderBottomWidth: 0.5,
    borderColor: colors.lightGrey,
  },
  view11: {
    width: '100%',
    height: 30,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  view12: {
    width: '100%',
    height: 25,
    fontSize: 16,
  },
  view13: {
    width: '100%',
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  view131: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon_small: {
    width: 18,
    height: 18,
    marginRight: 5,
    marginLeft: 3,
  },
  view132: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  view133: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  view2: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
    paddingLeft: 8,
    borderBottomWidth: 0.5,
    borderColor: colors.lightGrey,
  },
  view21: {
    marginRight: 10,
  },
  avatar: {
    width: 32,
    height: 32,
  },
  view22: {
    fontSize: 16,
  },

  view3: {
    width: '100%',
    height: 60,
    marginTop: 5,
    backgroundColor: colors.orange,
    paddingLeft: 8,
  },
  view31: {
    fontSize: 16,
  },
  view32: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  view321: {
    width: 28,
    height: 28,
    marginRight: 10,
  },
  view322: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  //nếu k có family
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
