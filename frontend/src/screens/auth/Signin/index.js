import React from 'react';
import {ScrollView, Text} from 'react-native';
import {styles} from './styles';
import AuthHeader from '../../../components/AuthHeader';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';

const Signin = ({navigation}) => {
  const onBack = () => {
    navigation.goBack();
  };

  const onSignUp = () => {
    navigation.navigate('Signup');
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <AuthHeader onBackPress={onBack} title="Sign In" />

        <Input label="E-mail" placeholder="Enter your e-mail" />
        <Input isPassword label="Password" placeholder="Enter your password" />

        <Button style={styles.button} title="Sign In" />

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
