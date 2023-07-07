import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  View,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Input from '../../../components/Input';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import AuthHeader from '../../../components/AuthHeader';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../../../env_variable';

const UpdateEvent = ({navigation}) => {
  const route = useRoute();
  // Lấy familyId từ route.params (nếu không tồn tại, giá trị mặc định là null)
  const familyId = route.params?.familyId ?? null;

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

  //call api update event
  const handleUpdateEvent = async () => {
    console.log('ok lưu luôn');
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <AuthHeader onBackPress={onBack} title="Chỉnh sửa sự kiện" />
        <Input label="Tên sự kiện*" placeholder="Nhập tên sự kiện" />
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

        <Input label="Mô tả" placeholder="Nhập mô tả sự kiện" />
        <Input
          label="Địa điểm diễn ra"
          placeholder="Nhập địa điểm diễn ra sự kiện"
        />
        <Input label="Thêm ghi chú" placeholder="Nhập ghi chú" />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleUpdateEvent}>
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

export default UpdateEvent;
