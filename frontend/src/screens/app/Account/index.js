import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View, Alert} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../../../env_variable';

const Account = ({navigation}) => {
  const [data, setData] = useState('');
  const fetchData = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await axios.get(`${BASE_URL}/users/${user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.user);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, [navigation]);

  const ViewProfile = () => {
    navigation.navigate('ViewProfile');
  };
  const handleLogout = () => {
    Alert.alert(
      'Bạn có muốn đăng xuất?',
      'Tài khoản của bạn sẽ được đăng xuất khỏi ứng dụng trên thiết bị này',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Đồng ý',
          onPress: async () => {
            await AsyncStorage.removeItem('user_id');
            await AsyncStorage.removeItem('token');
            navigation.navigate('Splash');
          },
        },
      ],
      {cancelable: false},
    );
  };
  const DeleteAccount = () => {
    Alert.alert(
      'Bạn muốn xóa tài khoản vĩnh viễn?',
      'Yêu cầu của bạn sẽ được thực hiện trong 7 ngày. Trong quá trình này bạn vẫn có thể truy xuất dữ liệu để thực hiện sao chép thủ công trước khi quá trình xóa tài khoản hoàn tất. Bạn có thể hủy yêu cầu xóa tài khoản trong thời gian chờ.',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Đồng ý',
          onPress: () => {
            console.log('Đã xóa tài khoản thành công!');
          },
        },
      ],
      {cancelable: false},
    );
  };
  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={require('../../../assets/tabs/avatar.jpg')}
          />
        </View>
        <View style={styles.textInfoContainer}>
          <Text style={styles.textInfoName}>UserName: {data.username}</Text>
          <Text style={styles.textInfoOther}>{data.full_name} 21 tuổi</Text>
        </View>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.shareInfoContainer}>
          <View style={styles.shareTextContainer}>
            <Text style={styles.shareText}>Mã kết bạn</Text>
            <Text style={styles.shareCode}>N R Q B P</Text>
          </View>
          <View style={styles.shareButtonContainer}>
            <TouchableOpacity style={styles.shareButton}>
              <Image
                style={styles.icon3}
                source={require('../../../assets/tabs/share_icon.png')}
              />
              <Text style={styles.shareButtonText}>Chia sẻ</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonContainer}>
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
      </View>
    </SafeAreaView>
  );
};

export default React.memo(Account);
