import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';

const Event = ({navigation}) => {
  const onCreate = () => {
    navigation.navigate('AddEvent');
  };
  return (
    <SafeAreaView>
      <View style={styles.eventContainer}>
        <Text style={styles.eventText}>Sự kiện</Text>
        <TouchableOpacity style={styles.button} onPress={onCreate}>
          <Image
            style={styles.icon}
            source={require('../../../assets/tabs/plus.png')}
          />
          <Text style={styles.buttonText}>Tạo sự kiện</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container}></ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(Event);
