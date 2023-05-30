import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import Input from '../../components/Input';
import {SafeAreaView} from 'react-native-safe-area-context';
import AuthHeader from '../../components/AuthHeader';

const AddGenealogy = ({navigation}) => {
  const onBack = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <AuthHeader onBackPress={onBack} title="Tạo gia phả mới" />
        <Input label="Tên gia phả" placeholder="Nhập tên gia phả" />
        <Input
          label="Tên nhánh"
          placeholder="Tên riêng phân biệt các pha giả dòng họ"
        />
        <Input label="Người tạo" placeholder="Người tạo" />
        <Input label="Địa chỉ" placeholder="Nhập địa chỉ" />
        <Input label="Gia sử dòng họ" placeholder="Nhập nội dung" />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Image
              style={styles.icon}
              source={require('../../assets/tabs/save_icon.png')}
            />
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddGenealogy;
