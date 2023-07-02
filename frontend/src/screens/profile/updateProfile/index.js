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

const UpdateProfile = ({navigation}) => {
  const onBack = () => {
    navigation.goBack();
  };
  const handleChangeAvatar = () => {
    console.log('Ok đang thay đổi ảnh đại diện cho mày đây');
  };
  const [selectedValue, setSelectedValue] = useState('Khác');
  const handleValueChange = itemValue => {
    setSelectedValue(itemValue);
  };

  const [selectedBirthday, setSelectedBirthday] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleBirthdayChange = (event, date) => {
    setShowDatePicker(false);
    if (date !== undefined) {
      setSelectedBirthday(date);
    }
  };
  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  //update
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await axios.get(`${BASE_URL}/users/${user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.user);
      setUpdateData({
        full_name: response.data.user.full_name,
        phone: response.data.user.phone,
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [updateData, setUpdateData] = useState({
    full_name: '',
    phone: '',
  });
  const handleUpdateProfile = async () => {
    try {
      const {full_name, phone} = updateData;
      const user_id = await AsyncStorage.getItem('user_id');
      const token = await AsyncStorage.getItem('token');
      await axios.put(
        `${BASE_URL}/users?user_id=${user_id}`,
        {
          full_name,
          phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setUpdateData({
        ...updateData,
        full_name: full_name,
        phone: phone,
      });
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
              source={require('../../../assets/tabs/avatar.jpg')}
            />
          </View>
          <Text style={styles.textChangeAvatar} onPress={handleChangeAvatar}>
            Thay đổi ảnh đại diện
          </Text>
        </View>
        <Input
          label="Username:"
          placeholder="User name"
          value={data.username}
        />
        <Input
          label="Email*"
          placeholder="Email đã đăng ký tài khoản"
          value={data.email}
        />
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
            selectedValue={selectedValue}
            onValueChange={handleValueChange}
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
              {selectedBirthday
                ? selectedBirthday.toLocaleDateString()
                : 'Chọn ngày sinh'}
            </Text>
            <Image
              style={styles.calendarIcon}
              source={require('../../../assets/tabs/calendar_icon.jpg')}
            />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={selectedBirthday || new Date()}
              mode="date"
              display="default"
              onChange={handleBirthdayChange}
            />
          )}
        </View>
        <Input label="Địa chỉ" placeholder="Nhập địa chỉ của bạn" />
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
