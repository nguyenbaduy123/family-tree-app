import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {styles} from './styles';
import Input from '../../../components/Input';
import {SafeAreaView} from 'react-native-safe-area-context';
import AuthHeader from '../../../components/AuthHeader';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../../../env_variable';

const AddGenealogy = ({navigation}) => {
  const [name, setName] = useState('');
  const [branch_name, setBranch_name] = useState('');
  const [address, setAddress] = useState('');
  const [story, setStory] = useState('');

  const onBack = () => {
    navigation.goBack();
  };
  const handleCreateFamily = async () => {
    if (!name || !branch_name || !address || !story) {
      // Hiển thị thông báo lỗi khi thiếu thông tin
      Alert.alert(
        'Thông báo',
        'Vui lòng điền đầy đủ thông tin để tạo gia phả!',
        [{text: 'OK'}],
        {cancelable: false},
      );
      return;
    }
    try {
      const user_id = await AsyncStorage.getItem('user_id');
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post(
        `${BASE_URL}/families?user_id=${user_id}`,
        {
          name: name,
          branch_name: branch_name,
          address: address,
          story: story,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      Alert.alert(
        'Chúc mừng',
        'Bạn đã tạo gia phả thành công!',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Tabs');
            },
          },
        ],
        {cancelable: false},
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <AuthHeader onBackPress={onBack} title="Tạo gia phả mới" />
        {/* <Input
          label="Người tạo*"  
          placeholder="Người tạo"
          onChangeText={value => setOwner_id(value)}
        /> */}
        <Input
          label="Tên gia phả*"
          placeholder="Nhập tên gia phả"
          onChangeText={value => setName(value)}
        />
        <Input
          label="Tên nhánh"
          placeholder="Tên riêng phân biệt các pha giả dòng họ"
          onChangeText={value => setBranch_name(value)}
        />
        <Input
          label="Địa chỉ"
          placeholder="Nhập địa chỉ"
          onChangeText={value => setAddress(value)}
        />
        <Input
          label="Gia sử dòng họ"
          placeholder="Nhập nội dung"
          onChangeText={value => setStory(value)}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleCreateFamily()}>
            <Image
              style={styles.icon}
              source={require('../../../assets/tabs/save_icon.png')}
            />
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddGenealogy;
