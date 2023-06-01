import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';

const Account = ({navigation}) => {
  const ViewProfile = () => {
    navigation.navigate('ViewProfile');
  };
  const handleLogout = () => {
    Alert.alert(
      'Xác nhận đăng xuất',
      'Bạn có chắc chắn muốn đăng xuất không?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Đồng ý',
          onPress: () => {
            navigation.navigate('Splash');
          },
        },
      ],
      {cancelable: false},
    );
  };
  const DeleteAccount = () => {
    Alert.alert(
      'Xác nhận xóa tài khoản',
      'Bạn có chắc chắn muốn xóa tài khoản này không? Nếu bạn xóa, tài khoản sẽ vĩnh viễn biến mất!',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Đồng ý',
          onPress: () => {
            console.log("Đã xóa tài khoản thành công!");
          },
        },
      ],
      {cancelable: false},
    );
  };
  return (
    <SafeAreaView>
      <View style={styles.headerContainer}></View>
      <View style={styles.mainContainer}>
        <TouchableOpacity style={styles.button} onPress={ViewProfile}>
          <Image
            style={styles.icon1}
            source={require('../../../assets/tabs/profile.jpg')}
          />
          <Text style={styles.buttonText}>Thông tin cá nhân</Text>
          <View style={styles.icon2Container}>
            <Image
              style={styles.icon2}
              source={require('../../../assets/tabs/arrow_right.png')}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Image
            style={styles.icon1}
            source={require('../../../assets/tabs/logout.png')}
          />
          <Text style={styles.buttonText}>Đăng xuất</Text>
          <View style={styles.icon2Container}>
            <Image
              style={styles.icon2}
              source={require('../../../assets/tabs/arrow_right.png')}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={DeleteAccount}>
          <Image
            style={styles.icon1}
            source={require('../../../assets/tabs/delete.png')}
          />
          <Text style={styles.buttonText}>Xóa tài khoản</Text>
          <View style={styles.icon2Container}>
            <Image
              style={styles.icon2}
              source={require('../../../assets/tabs/arrow_right.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default React.memo(Account);
