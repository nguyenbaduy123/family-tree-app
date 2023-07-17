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
import {useRoute} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {RadioButton, Checkbox} from 'react-native-paper';
import axios from 'axios';
import {BASE_URL} from '../../../../env_variable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';

const AddPeople = ({navigation}) => {
  const route = useRoute();
  // Lấy familyId từ route.params (nếu không tồn tại, giá trị mặc định là null)
  const familyId = route.params?.familyId ?? null;

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
    } catch (error) {
      console.log(error);
    }
  };
  // const handleChangeAvatar = () => {
  //   console.log('Ok đang thay đổi ảnh đại diện cho mày đây');
  // };

  //xử lý select cha
  const [selectedFather, setSelectedFather] = useState('');
  const handleFatherChange = itemValue => {
    setSelectedFather(itemValue);
  };

  //xử lý select mẹ
  const [selectedMother, setSelectedMother] = useState('');
  const handleMotherChange = itemValue => {
    setSelectedMother(itemValue);
  };

  //xử lý select giới tính
  const [selectedGender, setSelectedGender] = useState('Khác');
  const handleGenderChange = itemValue => {
    setSelectedGender(itemValue);
  };

  //xử lý select nhóm máu
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('Khác');
  const handleBloodGroupChange = itemValue => {
    setSelectedBloodGroup(itemValue);
  };

  //xử lý select ngày sinh
  const [selectedBirthday, setSelectedBirthday] = useState(null);
  const [showBirthdayPicker, setShowBirthdayPicker] = useState(false);
  const handleBirthdayChange = (event, date) => {
    setShowBirthdayPicker(false);
    if (date !== undefined) {
      setSelectedBirthday(date);
    }
  };
  const openBirthdayPicker = () => {
    setShowBirthdayPicker(true);
  };

  //xử lý select ngày mất
  const [selectedDateOfDeath, setSelectedDateOfDeath] = useState(null);
  const [showDateOfDeathPicker, setShowDateOfDeathPicker] = useState(false);
  const [status, setStatus] = useState('alive'); // Lưu trạng thái sống/chết
  const [is_alive, setIs_alive] = useState(true);
  const handleStatusChange = value => {
    setStatus(value);
    if (value === 'dead') {
      setSelectedDateOfDeath(null); // Reset ngày đã chết khi chọn lại trạng thái sống
    }
  };
  useEffect(() => {
    setIs_alive(status === 'alive');
  }, [status]);
  const handleDateOfDeathChange = (event, date) => {
    setShowDateOfDeathPicker(false);
    if (date !== undefined) {
      setSelectedDateOfDeath(date);
    }
  };
  const openDateOfDeathPicker = () => {
    setShowDateOfDeathPicker(true);
  };

  //call api lấy dữ liệu của family
  const [father, setFather] = useState([]);
  const [mother, setMother] = useState([]);

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
      // Lọc danh sách người trong gia đình theo giới tính nam
      const fatherList = response.data.people_family.filter(
        person => person.gender === 'Nam',
      );
      setFather(fatherList.length > 0 ? fatherList : 'Không có');

      // Lọc danh sách người trong gia đình theo giới tính nữ
      const motherList = response.data.people_family.filter(
        person => person.gender === 'Nữ',
      );
      setMother(motherList.length > 0 ? motherList : 'Không có');
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchFamily();
  }, []);

  //call api create people
  const [full_name, setFull_name] = useState('');
  const [citizen_id, setCitizen_id] = useState('');
  const [role_in_family, setRole_in_family] = useState('');
  const [home_address, setHome_address] = useState('');
  const [current_address, setCurrent_address] = useState('');
  const [phone, setPhone] = useState('');
  const [story, setStory] = useState('');
  const [generation, setGeneration] = useState();

  const handleAddPeople = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('token');

    try {
      if (status === 'dead') {
        const response = await axios.post(
          `${BASE_URL}/people?user_id=${user_id}`,
          {
            image_url: url,
            full_name: full_name,
            gender: selectedGender,
            citizen_id: citizen_id,
            role_in_family: role_in_family,
            blood_group: selectedBloodGroup,
            date_of_birth: selectedBirthday,
            home_address: home_address,
            current_address: current_address,
            phone: phone,
            is_alive: is_alive,
            date_of_death: selectedDateOfDeath,
            story: story,
            family_id: familyId,
            father_id: selectedFather,
            mother_id: selectedMother,
            generation: generation,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        Alert.alert(
          'Chúc mừng',
          'Bạn đã thêm thành viên trong gia phả thành công!',
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
        const response = await axios.post(
          `${BASE_URL}/people?user_id=${user_id}`,
          {
            image_url: url,
            full_name: full_name,
            gender: selectedGender,
            citizen_id: citizen_id,
            role_in_family: role_in_family,
            blood_group: selectedBloodGroup,
            date_of_birth: selectedBirthday,
            home_address: home_address,
            current_address: current_address,
            phone: phone,
            is_alive: is_alive,
            story: story,
            family_id: familyId,
            father_id: selectedFather,
            mother_id: selectedMother,
            generation: generation,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        Alert.alert(
          'Chúc mừng',
          'Bạn đã thêm thành viên trong gia phả thành công!',
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
            <Image style={styles.avatar} source={{uri: url}} />
          </View>
          <Text style={styles.textChangeAvatar} onPress={handleSelectImage}>
            Thay đổi ảnh đại diện
          </Text>
        </View>

        <Input
          label="Họ và tên:"
          placeholder="Họ tên..."
          onChangeText={value => setFull_name(value)}
        />

        <Text style={styles.labelname}>Bố của bạn:</Text>
        <View style={styles.selectSex}>
          <Picker
            selectedValue={selectedFather}
            onValueChange={handleFatherChange}
            style={styles.select}>
            {father.map(father => (
              <Picker.Item
                key={father?.person_id}
                label={father?.full_name}
                value={father?.person_id}
              />
            ))}
            <Picker.Item label="Đã mất" value="Đã mất" />
          </Picker>
        </View>

        <Text style={styles.labelname}>Mẹ của bạn:</Text>
        <View style={styles.selectSex}>
          <Picker
            selectedValue={selectedMother}
            onValueChange={handleMotherChange}
            style={styles.select}>
            {mother.map(mother => (
              <Picker.Item
                key={mother?.person_id}
                label={mother?.full_name}
                value={mother?.person_id}
              />
            ))}
            <Picker.Item label="Đã mất" value="Đã mất" />
          </Picker>
        </View>

        <Text style={styles.labelname}>Giới tính:</Text>
        <View style={styles.selectSex}>
          <Picker
            selectedValue={selectedGender}
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
          onChangeText={value => setCitizen_id(value)}
        />
        <Input
          label="Vai trò, vị trí trong gia đình:"
          placeholder="Nhập vai trò, vị trí..."
          onChangeText={value => setRole_in_family(value)}
        />

        <Text style={styles.labelname}>Nhóm máu:</Text>
        <View style={styles.selectBloodGroup}>
          <Picker
            selectedValue={selectedBloodGroup}
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
              {selectedBirthday
                ? selectedBirthday.toLocaleDateString()
                : 'Chọn ngày sinh'}
            </Text>
            <Image
              style={styles.calendarIcon}
              source={require('../../../assets/tabs/calendar_icon.jpg')}
            />
          </TouchableOpacity>
          {showBirthdayPicker && (
            <DateTimePicker
              value={selectedBirthday || new Date()}
              mode="date"
              display="default"
              onChange={handleBirthdayChange}
            />
          )}
        </View>

        <Input
          label="Địa chỉ thường trú:"
          placeholder="Nhập địa chỉ thường trú..."
          onChangeText={value => setHome_address(value)}
        />
        <Input
          label="Địa chỉ hiện tại:"
          placeholder="Nhập địa chỉ hiện tại..."
          onChangeText={value => setCurrent_address(value)}
        />
        <Input
          label="Số điện thoại:"
          placeholder="Nhập số điện thoại..."
          onChangeText={value => setPhone(value)}
        />

        <Text style={styles.labelname}>Tình trạng hiện nay:</Text>
        <View>
          <RadioButton.Group onValueChange={handleStatusChange} value={status}>
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
          {status === 'dead' && (
            <View>
              <Text style={styles.labelname}>Ngày mất:</Text>
              <View style={styles.selectBirthdayContainer}>
                <TouchableOpacity
                  style={styles.buttonSelectBirthday}
                  onPress={openDateOfDeathPicker}>
                  <Text style={styles.textSelectBirthday}>
                    {selectedDateOfDeath
                      ? selectedDateOfDeath.toLocaleDateString()
                      : 'Ngày mất'}
                  </Text>
                  <Image
                    style={styles.calendarIcon}
                    source={require('../../../assets/tabs/calendar_icon.jpg')}
                  />
                </TouchableOpacity>
                {showDateOfDeathPicker && (
                  <DateTimePicker
                    value={selectedDateOfDeath || new Date()}
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
          onChangeText={value => setStory(value)}
        />
        <Input
          label="Thế hệ:"
          placeholder="Nhập thế hệ của bạn trong gia phả..."
          onChangeText={value => setGeneration(value)}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleAddPeople}>
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

export default AddPeople;
