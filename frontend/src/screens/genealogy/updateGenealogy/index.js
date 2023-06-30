import React, {useState} from 'react';
import {ScrollView, TouchableOpacity, Image, Text, View} from 'react-native';
import Input from '../../../components/Input';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import AuthHeader from '../../../components/AuthHeader';
import {useRoute} from '@react-navigation/native';

const UpdateGenealogy = ({navigation}) => {
  const route = useRoute();
  // Lấy familyId từ route.params (nếu không tồn tại, giá trị mặc định là null)
  const familyId = route.params?.familyId ?? null;
  console.log(familyId);
  
  const onBack = () => {
    navigation.goBack();
  };

  const handleUpdateGenealogy = () => {};

  const handleSaveChanges = () => {
    console.log('Ok lưu rồi');
  };

  

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <AuthHeader onBackPress={onBack} title="Chỉnh sửa gia phả" />
        <Input label="Tên gia phả*" placeholder="Nhập tên gia phả" />
        <Input
          label="Tên nhánh"
          placeholder="Tên riêng phân biệt các pha giả dòng họ"
        />
        <Input label="Địa chỉ" placeholder="Nhập địa chỉ" />
        <Input label="Gia sử dòng họ" placeholder="Nhập nội dung" />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
            <Image
              style={styles.icon}
              source={require('../../../assets/tabs/save_icon.png')}
            />
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateGenealogy;
