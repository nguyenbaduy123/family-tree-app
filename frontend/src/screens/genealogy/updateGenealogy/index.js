import React, {useState, useEffect} from 'react';
import {ScrollView, TouchableOpacity, Image, Text, View, Alert} from 'react-native';
import Input from '../../../components/Input';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import AuthHeader from '../../../components/AuthHeader';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../../../env_variable';

const UpdateGenealogy = ({navigation}) => {
  const route = useRoute();
  // Lấy familyId từ route.params (nếu không tồn tại, giá trị mặc định là null)
  const familyId = route.params?.familyId ?? null;

  const onBack = () => {
    navigation.goBack();
  };

  const fetchData = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await axios.get(
        `${BASE_URL}/families/${familyId}?user_id=${user_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setUpdateData({
        name: response.data.family.name,
        branch_name: response.data.family.branch_name,
        address: response.data.family.address,
        story: response.data.family.story,
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [updateData, setUpdateData] = useState({
    name: '',
    branch_name: '',
    address: '',
    story: '',
  });
  const handleUpdateGenealogy = async () => {
    try {
      const {name, branch_name, address, story} = updateData;
      const token = await AsyncStorage.getItem('token');
      await axios.put(
        `${BASE_URL}/families/${familyId}`,
        {
          name,
          branch_name,
          address,
          story,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setUpdateData({
        ...updateData,
        name: name,
        branch_name: branch_name,
        address: address,
        story: story,
      });
      Alert.alert(
        'Chúc mừng',
        'Bạn đã cập nhật thông tin gia phả thành công!',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Gia phả');
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
        <AuthHeader onBackPress={onBack} title="Chỉnh sửa gia phả" />
        <Input
          label="Tên gia phả*"
          placeholder="Nhập tên gia phả"
          value={updateData.name}
          onChangeText={value => setUpdateData({...updateData, name: value})}
        />
        <Input
          label="Tên nhánh"
          placeholder="Tên riêng phân biệt các pha giả dòng họ"
          value={updateData.branch_name}
          onChangeText={value =>
            setUpdateData({...updateData, branch_name: value})
          }
        />
        <Input
          label="Địa chỉ"
          placeholder="Nhập địa chỉ"
          value={updateData.address}
          onChangeText={value => setUpdateData({...updateData, address: value})}
        />
        <Input
          label="Gia sử dòng họ"
          placeholder="Nhập nội dung"
          value={updateData.story}
          onChangeText={value =>
            setUpdateData({...updateData, story: value})
          }
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleUpdateGenealogy}>
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
