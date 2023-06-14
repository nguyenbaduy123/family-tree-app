import React from 'react';
import {ScrollView, TouchableOpacity, Image, Text, View} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import AuthHeader from '../../components/AuthHeader';

const UpdateGenealogy = ({navigation}) => {
  const onBack = () => {
    navigation.goBack();
  };
  const handleGuide = () => {
    console.log('Không có hướng dẫn đâu mà bấm');
  };
  const onCreatePeople = () => {
    navigation.navigate('AddPeople');
  };
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <AuthHeader onBackPress={onBack} title="Chỉnh sửa gia phả" />
        <View style={styles.headerContainer}>
          <Text style={styles.textHeader}>Tên gia phả</Text>
          <TouchableOpacity style={styles.buttonGuide} onPress={handleGuide}>
            <Image
              style={styles.icon}
              source={require('../../assets/tabs/guide_icon.png')}
            />
            <Text style={styles.textButton}>Hướng dẫn</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.buttonPeopleContainer} onPress={onCreatePeople}>
            <Image style={styles.avatarPeople} source={require('../../assets/tabs/avatar.jpg')} />
            <Text style={styles.textPeople}>Chưa cập nhật</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateGenealogy;
