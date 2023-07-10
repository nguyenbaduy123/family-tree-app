import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import Input from '../../../components/Input';
import {SafeAreaView} from 'react-native-safe-area-context';
import AuthHeader from '../../../components/AuthHeader';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../../../env_variable';

const ViewProfile = ({navigation}) => {
  const onBack = () => {
    navigation.goBack();
  };

  const [data, setData] = useState('');
  const fetchUser = async () => {
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
    fetchUser();
  }, []);

  const onUpdateProfile = () => {
    navigation.navigate('UpdateProfile');
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <AuthHeader onBackPress={onBack} title="Thông tin cá nhân" />
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={
              data.avatar !== null
                ? {uri: data.avatar}
                : require('../../../assets/tabs/avatar.jpg')
            }
          />
        </View>
        <Input
          label="Username:"
          placeholder="User name"
          value={data.username}
        />
        <Input
          label="Email*"
          placeholder="Email đã đăng ký tài khoản"
          value={data.email}
        />
        <Input
          label="Fullname:"
          placeholder="Full name"
          value={data.full_name}
        />
        <Input
          label="Số điện thoại"
          placeholder="Số điện thoại"
          value={data.phone}
        />
        <Input label="Giới tính" placeholder="Giới tính" value={data.gender} />
        <Input
          label="Ngày sinh"
          placeholder="Ngày sinh"
          value={data.birthday}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text onPress={onUpdateProfile} style={styles.buttonText}>
              Click vào đây để cập nhật thông tin cá nhân.
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewProfile;
