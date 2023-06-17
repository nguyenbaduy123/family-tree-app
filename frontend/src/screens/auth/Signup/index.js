import React, { useState } from 'react';
import { ScrollView, Text, View, Alert } from 'react-native';
import { styles } from './styles';
import AuthHeader from '../../../components/AuthHeader';
import Input from '../../../components/Input';
import Checkbox from '../../../components/Checkbox';
import Button from '../../../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { BASE_URL } from '../../../../env_variable';

const Signup = ({ navigation }) => {
  const [checked, setChecked] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onBack = () => {
    navigation.goBack();
  };

  const onSignIn = () => {
    navigation.navigate('Signin');
  };

  const handleSignUp = async () => {
    if (!username || !email || !password || !checked) {
      // Hiển thị thông báo lỗi khi thiếu thông tin
      Alert.alert(
        'Thông báo',
        'Vui lòng điền đầy đủ thông tin để đăng ký tài khoản!',
        [{ text: 'OK' }],
        { cancelable: false },
      );
      return;
    }
    try {
      const response = await axios.post(`${BASE_URL}/users`, {


        username: username,
        email: email,
        password: password,
      });
      Alert.alert(
        'Thông báo',
        'Đăng ký tài khoản thành công, vui lòng trở lại trang đăng nhập để sử dụng dịch vụ!',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Signin');
            },
          },
        ],
        { cancelable: false },
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <AuthHeader onBackPress={onBack} title="Sign Up" />

        <Input
          label="Username"
          placeholder="Enter your username"
          onChangeText={value => setUsername(value)}
        />
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

        <View style={styles.agreeRow}>
          <Checkbox checked={checked} onCheck={setChecked} />
          <Text style={styles.agreeText}>
            I agree with <Text style={styles.agreeTextBold}> Terms </Text> &
            <Text style={styles.agreeTextBold}> Privacy</Text>
          </Text>
        </View>

        <Button
          style={styles.button}
          onPress={() => handleSignUp()}
          title="Sign Up"
        />

        <Text style={styles.footerText}>
          Already have an account?
          <Text onPress={onSignIn} style={styles.footerLink}>
            Sign In
          </Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Signup;
