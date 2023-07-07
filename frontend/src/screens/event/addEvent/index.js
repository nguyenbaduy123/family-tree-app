import React, {useState, useEffect} from 'react';
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
import {BASE_URL} from '../../../../env_variable';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddEvent = ({navigation}) => {
  const onBack = () => {
    navigation.goBack();
  };

  //xử lý chọn family tổ chức sự kiện
  const [selectedFamily, setSelectedFamily] = useState('');
  const handleFamilyChange = itemValue => {
    setSelectedFamily(itemValue);
  };

  //xử lý chọn thời gian sự kiện
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date !== undefined) {
      setSelectedDate(date);
    }
  };
  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  //xử lý chọn loại sự kiện
  const [selectedValueEvent, setSelectedValueEvent] = useState('Khác');
  const handleValueEventChange = itemValue => {
    setSelectedValueEvent(itemValue);
  };

  //xử lý chọn nhóm
  // const [selectedValueGroup, setSelectedValueGroup] = useState('Khác');
  // const handleValueGroupChange = itemValue => {
  //   setSelectedValueGroup(itemValue);
  // };

  //call api lấy dữ liệu của các family
  const [families, setFamilies] = useState([]);
  const fetchFamilies = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await axios.get(
        `${BASE_URL}/families?user_id=${user_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setFamilies(response.data.families);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchFamilies();
  }, []);

  //call api create event
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [note, setNote] = useState('');
  const handleCreateEvent = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await axios.post(
        `${BASE_URL}/events?user_id=${user_id}`,
        {
          family_id: selectedFamily,
          name: name,
          time: selectedDate,
          type: selectedValueEvent,
          description: description,
          location: location,
          note: note,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      Alert.alert(
        'Chúc mừng',
        'Bạn đã thêm sự kiện thành công!',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Sự kiện');
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
        <AuthHeader onBackPress={onBack} title="Tạo sự kiện mới" />
        <Input
          label="Tên sự kiện*"
          placeholder="Nhập tên sự kiện"
          onChangeText={value => setName(value)}
        />

        <Text style={styles.labelname}>
          Chọn gia đình tổ chức sự kiện cùng:
        </Text>
        <View style={styles.selectContainer}>
          <Picker
            selectedValue={selectedFamily}
            onValueChange={handleFamilyChange}
            style={styles.select}>
            {families.map(family => (
              <Picker.Item
                key={family?.id}
                label={family?.name}
                value={family?.id}
              />
            ))}
          </Picker>
        </View>

        <Text style={styles.labelname}>Thời gian</Text>
        <View style={styles.buttonSelectDateContainer}>
          <TouchableOpacity
            style={styles.buttonSelectDate}
            onPress={openDatePicker}>
            <Text style={styles.textSelectDate}>
              {selectedDate
                ? selectedDate.toLocaleDateString()
                : 'Chọn thời gian diễn ra sự kiện'}
            </Text>
            <Image
              style={styles.calendarIcon}
              source={require('../../../assets/tabs/calendar_icon.jpg')}
            />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate || new Date()}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>
        <Text style={styles.labelname}>Loại sự kiện</Text>
        <View style={styles.selectContainer}>
          <Picker
            selectedValue={selectedValueEvent}
            onValueChange={handleValueEventChange}
            style={styles.select}>
            <Picker.Item label="Sinh nhật" value="Sinh nhật" />
            <Picker.Item label="Giỗ" value="Giỗ" />
            <Picker.Item label="Họp Họ" value="Họp Họ" />
            <Picker.Item label="Khác" value="Khác" />
          </Picker>
        </View>
        {/* <Text style={styles.labelname}>Nhóm</Text>
        <View style={styles.selectContainer}>
          <Picker
            selectedValue={selectedValueGroup}
            onValueChange={handleValueGroupChange}
            style={styles.select}>
            <Picker.Item label="Bên nội" value="Bên nội" />
            <Picker.Item label="Bên ngoại" value="Bên ngoại" />
            <Picker.Item label="Khác" value="Khác" />
          </Picker>
        </View> */}
        <Input
          label="Mô tả"
          placeholder="Nhập mô tả sự kiện"
          onChangeText={value => setDescription(value)}
        />
        <Input
          label="Địa điểm diễn ra"
          placeholder="Nhập địa điểm diễn ra sự kiện"
          onChangeText={value => setLocation(value)}
        />
        <Input
          label="Thêm ghi chú"
          placeholder="Nhập ghi chú"
          onChangeText={value => setNote(value)}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleCreateEvent}>
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

export default AddEvent;
