import React, {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {styles} from './styles';
import AuthHeader from '../../../components/AuthHeader';
import Input from '../../../components/Input';
import Checkbox from '../../../components/Checkbox';
import Button from '../../../components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';

const Signup = ({navigation}) => {
  const [checked, setChecked] = useState(false);

  const onBack = () => {
    navigation.goBack();
  };

  const onSignIn = () => {
    navigation.navigate('Signin');
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <AuthHeader onBackPress={onBack} title="Sign Up" />

        <Input label="Name" placeholder="Enter your name" />
        <Input label="E-mail" placeholder="Enter your e-mail" />
        <Input isPassword label="Password" placeholder="Enter your password" />

        <View style={styles.agreeRow}>
          <Checkbox checked={checked} onCheck={setChecked} />
          <Text style={styles.agreeText}>
            I agree with <Text style={styles.agreeTextBold}> Terms </Text> &
            <Text style={styles.agreeTextBold}> Privacy</Text>
          </Text>
        </View>

        <Button style={styles.button} title="Sign Up" />

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
