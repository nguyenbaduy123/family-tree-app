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
import {useRoute} from '@react-navigation/native';
import {RadioButton, Checkbox} from 'react-native-paper';
import axios from 'axios';
import {BASE_URL} from '../../../../env_variable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';

const UpdatePeople = ({navigation}) => {
  const route = useRoute();
  // Lấy eventId từ route.params (nếu không tồn tại, giá trị mặc định là null)
  const familyId = route.params?.familyId ?? null;
  const peopleId = route.params?.peopleId ?? null;

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
        image_url: response.data.url, // Cập nhật giá trị avatar trong updateData
      }));
    } catch (error) {
      console.log(error);
    }
  };

  //xử lý thay đổi giới tính
  const handleGenderChange = itemValue => {
    setUpdateData(prevData => ({
      ...prevData,
      gender: itemValue,
    }));
  };

  //xử lý thay đổi nhóm máu
  const handleBloodGroupChange = itemValue => {
    setUpdateData(prevData => ({
      ...prevData,
      blood_group: itemValue,
    }));
  };

  //xử lý thay đổi ngày sinh
  const [showBirthdayPicker, setShowBirthdayPicker] = useState(false);
  const openBirthdayPicker = () => {
    setShowBirthdayPicker(true);
  };
  const handleBirthdayChange = (event, date) => {
    setShowBirthdayPicker(false);
    if (date !== undefined) {
      setUpdateData(prevData => ({
        ...prevData,
        date_of_birth: date,
      }));
    }
  };

  //xử lý thay đổi ngày mất
  const [showDateOfDeathPicker, setShowDateOfDeathPicker] = useState(false);
  const [initialStatus, setInitialStatus] = useState(''); //lưu giữ trạng thái sống/chết ban đầu
  const handleStatusChange = value => {
    setInitialStatus(value);
    setUpdateData(prevData => ({
      ...prevData,
      is_alive: value === 'dead' ? false : true,
    }));
    // if (value === 'dead') {
    //   setUpdateData(prevData => ({
    //     ...prevData,
    //     is_alive: false,
    //   }));
    // } else {
    //   setUpdateData(prevData => ({
    //     ...prevData,
    //     is_alive: true,
    //     date_of_death: null,
    //   }));
    // }
  };
  const handleDateOfDeathChange = (event, date) => {
    setShowDateOfDeathPicker(false);
    if (date !== undefined) {
      setUpdateData(prevData => ({
        ...prevData,
        date_of_death: date,
      }));
    }
    // else {
    //   setUpdateData(prevData => ({
    //     ...prevData,
    //     date_of_death: null,
    //   }));
    // }
  };
  const openDateOfDeathPicker = () => {
    setShowDateOfDeathPicker(true);
  };

  //call api lấy thông tin của people
  const fetchFamily = async () => {
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
      const people = response.data.people_family;
      const person = people.find(person => person.person_id === peopleId);
      if (person) {
        setUpdateData(prevData => ({
          ...prevData,
          image_url:person.image_url,
          full_name: person.full_name,
          gender: person.gender,
          citizen_id: person.citizen_id,
          role_in_family: person.role_in_family,
          blood_group: person.blood_group,
          date_of_birth: person.date_of_birth,
          home_address: person.home_address,
          current_address: person.current_address,
          phone: person.phone,
          is_alive: person.is_alive,
          date_of_death: person.is_alive ? null : person.date_of_death,
          generation: person.generation,
          story: person.story,
        }));
        setInitialStatus(person.is_alive ? 'alive' : 'dead');
      } else {
        console.log('Không tìm thấy người này trong gia đình.');
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchFamily();
  }, []);

  //call api update people
  const [updateData, setUpdateData] = useState({
    image_url:'',
    full_name: '',
    gender: '',
    citizen_id: '',
    role_in_family: '',
    blood_group: '',
    date_of_birth: '',
    home_address: '',
    current_address: '',
    phone: '',
    is_alive: '',
    date_of_death: '',
    generation: '',
    story: '',
  });
  const handleUpdatePeople = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('token');
    try {
      if (initialStatus === 'dead') {
        const {
          image_url,
          full_name,
          gender,
          citizen_id,
          role_in_family,
          blood_group,
          date_of_birth,
          home_address,
          current_address,
          phone,
          is_alive,
          date_of_death,
          generation,
          story,
        } = updateData;
        const response = await axios.put(
          `${BASE_URL}/people/${peopleId}?user_id=${user_id}`,
          {
            image_url,
            full_name,
            gender,
            citizen_id,
            role_in_family,
            blood_group,
            date_of_birth,
            home_address,
            current_address,
            phone,
            is_alive,
            date_of_death,
            generation,
            story,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        Alert.alert(
          'Chúc mừng',
          'Bạn đã cập nhật thông tin thành viên thành công!',
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
      } else {
        const {
          image_url,
          full_name,
          gender,
          citizen_id,
          role_in_family,
          blood_group,
          date_of_birth,
          home_address,
          current_address,
          phone,
          is_alive,
          generation,
          story,
        } = updateData;
        const response = await axios.put(
          `${BASE_URL}/people/${peopleId}?user_id=${user_id}`,
          {
            image_url,
            full_name,
            gender,
            citizen_id,
            role_in_family,
            blood_group,
            date_of_birth,
            home_address,
            current_address,
            phone,
            is_alive,
            generation,
            story,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        Alert.alert(
          'Chúc mừng',
          'Bạn đã cập nhật thông tin thành viên thành công!',
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
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <AuthHeader onBackPress={onBack} title="Cập nhật người trong gia phả" />
        <Text style={styles.labelname}>Thông tin cá nhân:</Text>
        <View style={styles.avatarHandleContainer}>
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source={
                updateData.image_url !== ''
                  ? {uri: updateData.image_url}
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
          label="Họ và tên:"
          placeholder="Họ tên..."
          value={updateData.full_name}
          onChangeText={value =>
            setUpdateData({...updateData, full_name: value})
          }
        />

        <Text style={styles.labelname}>Giới tính:</Text>
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

        <Input
          label="Số CCCD/CMND:"
          placeholder="Vui lòng nhập số cccd..."
          value={updateData.citizen_id}
          onChangeText={value =>
            setUpdateData({...updateData, citizen_id: value})
          }
        />
        <Input
          label="Vai trò, vị trí trong gia đình:"
          placeholder="Nhập vai trò, vị trí..."
          value={updateData.role_in_family}
          onChangeText={value =>
            setUpdateData({...updateData, role_in_family: value})
          }
        />

        <Text style={styles.labelname}>Nhóm máu:</Text>
        <View style={styles.selectBloodGroup}>
          <Picker
            selectedValue={updateData.blood_group}
            onValueChange={handleBloodGroupChange}
            style={styles.select}>
            <Picker.Item label="A" value="A" />
            <Picker.Item label="B" value="B" />
            <Picker.Item label="O" value="O" />
            <Picker.Item label="AB" value="AB" />
            <Picker.Item label="Khác" value="Khác" />
          </Picker>
        </View>

        <Text style={styles.labelname}>Ngày sinh:</Text>
        <View style={styles.selectBirthdayContainer}>
          <TouchableOpacity
            style={styles.buttonSelectBirthday}
            onPress={openBirthdayPicker}>
            <Text style={styles.textSelectBirthday}>
              {updateData.date_of_birth
                ? new Date(updateData.date_of_birth).toLocaleDateString()
                : 'Chọn ngày sinh'}
            </Text>
            <Image
              style={styles.calendarIcon}
              source={require('../../../assets/tabs/calendar_icon.jpg')}
            />
          </TouchableOpacity>
          {showBirthdayPicker && (
            <DateTimePicker
              value={
                updateData.date_of_birth
                  ? new Date(updateData.date_of_birth)
                  : new Date()
              }
              mode="date"
              display="default"
              onChange={handleBirthdayChange}
            />
          )}
        </View>

        <Input
          label="Địa chỉ thường trú:"
          placeholder="Nhập địa chỉ thường trú..."
          value={updateData.home_address}
          onChangeText={value =>
            setUpdateData({...updateData, home_address: value})
          }
        />
        <Input
          label="Địa chỉ hiện tại:"
          placeholder="Nhập địa chỉ hiện tại..."
          value={updateData.current_address}
          onChangeText={value =>
            setUpdateData({...updateData, current_address: value})
          }
        />
        <Input
          label="Số điện thoại:"
          placeholder="Nhập số điện thoại..."
          value={updateData.phone}
          onChangeText={value => setUpdateData({...updateData, phone: value})}
        />

        <Text style={styles.labelname}>Tình trạng hiện nay:</Text>
        <View>
          <RadioButton.Group
            onValueChange={handleStatusChange}
            value={initialStatus}>
            <View style={styles.radioButtonContainer}>
              <View style={styles.abc}>
                <Text>Còn sống</Text>
                <RadioButton value="alive" />
              </View>
              <View style={styles.abc}>
                <Text>Đã mất</Text>
                <RadioButton value="dead" />
              </View>
            </View>
          </RadioButton.Group>
          {initialStatus === 'dead' && (
            <View>
              <Text style={styles.labelname}>Ngày mất:</Text>
              <View style={styles.selectBirthdayContainer}>
                <TouchableOpacity
                  style={styles.buttonSelectBirthday}
                  onPress={openDateOfDeathPicker}>
                  <Text style={styles.textSelectBirthday}>
                    {updateData.date_of_death
                      ? new Date(updateData.date_of_death).toLocaleDateString()
                      : 'Ngày mất'}
                  </Text>
                  <Image
                    style={styles.calendarIcon}
                    source={require('../../../assets/tabs/calendar_icon.jpg')}
                  />
                </TouchableOpacity>
                {showDateOfDeathPicker && (
                  <DateTimePicker
                    value={
                      updateData.date_of_death
                        ? new Date(updateData.date_of_death)
                        : new Date()
                    }
                    mode="date"
                    display="default"
                    onChange={handleDateOfDeathChange}
                  />
                )}
              </View>
            </View>
          )}
        </View>

        <Input
          label="Story:"
          placeholder="Nhập story của bạn..."
          value={updateData.story}
          onChangeText={value => setUpdateData({...updateData, story: value})}
        />
        <Input
          label="Thế hệ:"
          placeholder="Nhập thế hệ của bạn trong gia phả..."
          value={updateData.generation.toString()}
          onChangeText={value =>
            setUpdateData({...updateData, generation: value})
          }
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleUpdatePeople}>
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

export default UpdatePeople;
