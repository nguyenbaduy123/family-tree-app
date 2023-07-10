import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {styles} from './styles';
import Input from '../../../components/Input';
import {SafeAreaView} from 'react-native-safe-area-context';
import AuthHeader from '../../../components/AuthHeader';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../../../env_variable';
import ImagePicker from 'react-native-image-crop-picker';

const UpdateProfile = ({navigation}) => {
  const onBack = () => {
    navigation.goBack();
  };

  //xử lý chọn avatar
  const handleSelectImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        mediaType: 'photo',
        compressImageMaxWidth: 500,
        compressImageMaxHeight: 500,
        compressImageQuality: 0.5,
        cropping: true,
      });

      const {path, mime} = image;
      const file = {
        uri: path,
        type: mime,
        name: 'image.png',
      };
      handleChangeAvatar(file);
    } catch (error) {
      console.log(error);
    }
  };
  const [url, setUrl] = useState(null);
  const handleChangeAvatar = async file => {
    const token = await AsyncStorage.getItem('token');
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post(`${BASE_URL}/uploads`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setUrl(response.data.url);
      setUpdateData(prevData => ({
        ...prevData,
        avatar: response.data.url, // Cập nhật giá trị avatar trong updateData
      }));
    } catch (error) {
      console.log(error);
    }
  };

  //xử lý chọn giới tính
  const handleGenderChange = itemValue => {
    setUpdateData(prevData => ({
      ...prevData,
      gender: itemValue,
    }));
  };

  //xử lý chọn ngày sinh
  const [showDatePicker, setShowDatePicker] = useState(false);
  const openDatePicker = () => {
    setShowDatePicker(true);
  };
  const handleBirthdayChange = (event, date) => {
    setShowDatePicker(false);
    if (date !== undefined) {
      setUpdateData(prevData => ({
        ...prevData,
        birthday: date,
      }));
    }
  };

  //call api lấy thông tin user
  const fetchUser = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await axios.get(`${BASE_URL}/users/${user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = response.data.user;
      setUpdateData(prevData => ({
        ...prevData,
        avatar: userData.avatar,
        full_name: userData.full_name,
        phone: userData.phone,
        gender: userData.gender,
        birthday: userData.birthday,
      }));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const [updateData, setUpdateData] = useState({
    avatar: '',
    full_name: '',
    phone: '',
    birthday: '',
    gender: '',
  });
  const handleUpdateProfile = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('token');
    try {
      const {avatar, full_name, phone, birthday, gender} = updateData;
      const response = await axios.put(
        `${BASE_URL}/users?user_id=${user_id}`,
        {
          avatar,
          full_name,
          phone,
          birthday,
          gender,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      Alert.alert(
        'Chúc mừng',
        'Bạn đã cập nhật thông tin cá nhân thành công!',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Tài khoản');
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
        <AuthHeader onBackPress={onBack} title="Cập nhật thông tin cá nhân" />
        <View style={styles.avatarHandleContainer}>
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source={
                updateData.avatar !== ''
                  ? {uri: updateData.avatar}
                  : url === null
                  ? require('../../../assets/tabs/avatar.jpg')
                  : {uri: url}
              }
            />
          </View>
          <Text style={styles.textChangeAvatar} onPress={handleSelectImage}>
            Thay đổi ảnh đại diện
          </Text>
        </View>

        <Input
          label="Fullname:"
          placeholder="Full name"
          value={updateData.full_name}
          onChangeText={value =>
            setUpdateData({...updateData, full_name: value})
          }
        />
        <Input
          label="Số điện thoại"
          placeholder="Số điện thoại"
          value={updateData.phone}
          onChangeText={value => setUpdateData({...updateData, phone: value})}
        />
        <Text style={styles.labelname}>Giới tính</Text>
        <View style={styles.selectSex}>
          <Picker
            selectedValue={updateData.gender}
            onValueChange={handleGenderChange}
            style={styles.select}>
            <Picker.Item label="Nam" value="Nam" />
            <Picker.Item label="Nữ" value="Nữ" />
            <Picker.Item label="Khác" value="Khác" />
          </Picker>
        </View>
        <Text style={styles.labelname}>Ngày sinh</Text>
        <View style={styles.selectBirthdayContainer}>
          <TouchableOpacity
            style={styles.buttonSelectBirthday}
            onPress={openDatePicker}>
            <Text style={styles.textSelectBirthday}>
              {updateData.birthday
                ? new Date(updateData.birthday).toLocaleDateString()
                : 'Chọn ngày sinh'}
            </Text>
            <Image
              style={styles.calendarIcon}
              source={require('../../../assets/tabs/calendar_icon.jpg')}
            />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={
                updateData.birthday ? new Date(updateData.birthday) : new Date()
              }
              mode="date"
              display="default"
              onChange={handleBirthdayChange}
            />
          )}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Image
              style={styles.icon}
              source={require('../../../assets/tabs/save_icon.png')}
            />
            <Text
              style={styles.buttonText}
              onPress={() => handleUpdateProfile()}>
              Save Changes
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateProfile;
