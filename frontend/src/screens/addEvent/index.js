import React, {useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {styles} from './styles';
import Input from '../../components/Input';
import {SafeAreaView} from 'react-native-safe-area-context';
import AuthHeader from '../../components/AuthHeader';

const AddEvent = ({navigation}) => {
  const [selectedValue, setSelectedValue] = useState('Khác');
  const handleValueChange = itemValue => {
    setSelectedValue(itemValue);
  };
  const onBack = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <AuthHeader onBackPress={onBack} title="Tạo sự kiện mới" />
        <Input label="Tên sự kiện*" placeholder="Nhập tên sự kiện" />
        <Text style={styles.labelname}>Loại sự kiện</Text>
        <View style={styles.selectContainer}>
          <Picker
            selectedValue={selectedValue}
            onValueChange={handleValueChange}
            style={styles.select}>
            <Picker.Item label="Sinh nhật" value="Sinh nhật" />
            <Picker.Item label="Giỗ" value="Giỗ" />
            <Picker.Item label="Họp Họ" value="Họp Họ" />
            <Picker.Item label="Khác" value="Khác" />
          </Picker>
        </View>
        <Input label="Mô tả" placeholder="Nhập mô tả sự kiện" />
        <Input
          label="Địa điểm diễn ra"
          placeholder="Nhập địa điểm diễn ra sự kiện"
        />
        <Input label="Thêm ghi chú" placeholder="Nhập ghi chú" />

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

export default AddEvent;
