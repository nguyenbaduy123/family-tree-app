import {StyleSheet} from 'react-native';
import {colors} from '../../../utils/color';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  containerAddButton: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 20,
    marginRight: 0,
  },
  addButton: {
    width: 200,
    height: 50,
    backgroundColor: colors.whiteGrey,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 30,
    height: 30,
    margin: 10,
  },
  textChangeAvatar: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerContainer: {
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: colors.black,
  },
  textHeader1: {
    fontSize: 18,
  },
  textHeader2: {
    fontSize: 20,
    fontStyle: 'italic',
  },

  //css phần hiển thị people
  infoPeopleContainer: {
    height: 210,
    borderWidth: 0.25,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 50,
    flexGrow: 1,
  },
  view1: {
    width: '95%',
    height: 40,
    marginLeft: 10,
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  view11: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  view12: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  view12_button: {
    width: 25,
    height: 25,
    marginHorizontal: 6,
  },
  view12_icon: {
    width: 20,
    height: 20,
  },
  view2: {
    flexDirection: 'row',
    marginLeft: 10,
    marginVertical: 5,
  },
  view21: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
