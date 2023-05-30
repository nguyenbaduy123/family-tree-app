import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';

const Profile = ({navigation}) => {
  const Logout = () => {
    navigation.navigate('Splash');
  };
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Text>Profile</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={Logout}>
            <Image
              style={styles.icon}
              source={require('../../../assets/tabs/logout.jpg')}
            />
            <Text style={styles.buttonText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(Profile);
