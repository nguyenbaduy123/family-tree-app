import React, { useState } from 'react';
import { ScrollView, Text, Alert } from 'react-native';
import { styles } from './styles';
import AuthHeader from '../../../components/AuthHeader';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../../../env_variable';

const Signin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onBack = () => {
    navigation.goBack();
  };

  const onSignUp = () => {
    navigation.navigate('Signup');
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      // Hiển thị thông báo lỗi khi thiếu thông tin
      Alert.alert(
        'Thông báo',
        'Vui lòng điền đầy đủ thông tin để đăng nhập!',
        [{ text: 'OK' }],
        { cancelable: false },
      );
      return;
    }
    try {

      const response = await axios.post(`${BASE_URL}/users/login`, {
        email: email,
        password: password,
      });

      if (response.data?.token) {
        AsyncStorage.setItem('user_id', response.data.user.id);
        AsyncStorage.setItem('token', response.data.token);
        navigation.navigate('Tabs');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Alert.alert(
          'Thông báo',
          'Bạn nhập sai tài khoản rồi. Vui lòng nhập lại để sử dụng dịch vụ!',
          [
            {
              text: 'OK',
            },
          ],
          { cancelable: false },
        );
      } else {
        console.error(error);
      }
    }
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <AuthHeader onBackPress={onBack} title="Sign In" />
        <Input
          label="E-mail"
          placeholder="Enter your e-mail"
          onChangeText={value => setEmail(value)}
        />
        <Input
          isPassword
          label="Password"
          placeholder="Enter your password"
          onChangeText={value => setPassword(value)}
        />
        <Button
          onPress={() => handleSignIn()}
          style={styles.button}
          title="Sign In"
        />
        <Text style={styles.footerText}>
          Don't have an account?
          <Text onPress={onSignUp} style={styles.footerLink}>
            Sign Up
          </Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Signin;
