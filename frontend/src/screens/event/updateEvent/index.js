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
  // Lấy eventId từ route.params (nếu không tồn tại, giá trị mặc định là null)
  const eventId = route.params?.eventId ?? null;
  const onBack = () => {
    navigation.goBack();
  };

  //call api lấy dữ liệu của các family
  // const [families, setFamilies] = useState([]);
  // const fetchFamilies = async () => {
  //   const user_id = await AsyncStorage.getItem('user_id');
  //   const token = await AsyncStorage.getItem('token');
  //   try {
  //     const response = await axios.get(
  //       `${BASE_URL}/families?user_id=${user_id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );
  //     setFamilies(response.data.families);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // useEffect(() => {
  //   fetchFamilies();
  // }, []);

  //call api lấy thông tin của event
  const fetchEvent = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await axios.get(`${BASE_URL}/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const eventData = response.data.event;
      setUpdateData(prevData => ({
        ...prevData,
        name: eventData.name,
        // family_id: eventData.family_id,
        time: eventData.time,
        type: eventData.type,
        description: eventData.description,
        location: eventData.location,
        note: eventData.note,
      }));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchEvent();
  }, []);

  //call api update event
  const [updateData, setUpdateData] = useState({
    name: '',
    time: '',
    type: '',
    description: '',
    location: '',
    note: '',
  });
  const handleUpdateEvent = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const {name, time, type, description, location, note} =
        updateData;
      const response = await axios.put(
        `${BASE_URL}/events/${eventId}`,
        {
          name,
          time,
          type,
          description,
          location,
          note,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      Alert.alert(
        'Chúc mừng',
        'Bạn đã cập nhật thông tin sự kiện thành công!',
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

  // const handleFamilyChange = itemValue => {
  //   setUpdateData(prevData => ({
  //     ...prevData,
  //     family_id: itemValue.toString(),
  //   }));
  // };

  const [showDatePicker, setShowDatePicker] = useState(false);
  const openDatePicker = () => {
    setShowDatePicker(true);
  };
  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date !== undefined) {
      setUpdateData(prevData => ({
        ...prevData,
        time: date,
      }));
    }
  };

  const handleValueEventChange = itemValue => {
    setUpdateData(prevData => ({
      ...prevData,
      type: itemValue,
    }));
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <AuthHeader onBackPress={onBack} title="Chỉnh sửa sự kiện" />
        <Input
          label="Tên sự kiện*"
          placeholder="Nhập tên sự kiện"
          value={updateData.name}
          onChangeText={value => setUpdateData({...updateData, name: value})}
        />
        {/* <Text style={styles.labelname}>
          Chọn gia đình tổ chức sự kiện cùng:
        </Text>
        <View style={styles.selectContainer}>
          <Picker
            selectedValue={updateData.family_id}
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
        </View> */}
        <Text style={styles.labelname}>Thời gian</Text>
        <View style={styles.buttonSelectDateContainer}>
          <TouchableOpacity
            style={styles.buttonSelectDate}
            onPress={openDatePicker}>
            <Text style={styles.textSelectDate}>
              {updateData.time
                ? new Date(updateData.time).toLocaleDateString()
                : 'Chọn thời gian diễn ra sự kiện'}
            </Text>
            <Image
              style={styles.calendarIcon}
              source={require('../../../assets/tabs/calendar_icon.jpg')}
            />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={updateData.time ? new Date(updateData.time) : new Date()}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>
        <Text style={styles.labelname}>Loại sự kiện</Text>
        <View style={styles.selectContainer}>
          <Picker
            selectedValue={updateData.type}
            onValueChange={handleValueEventChange}
            style={styles.select}>
            <Picker.Item label="Sinh nhật" value="Sinh nhật" />
            <Picker.Item label="Giỗ" value="Giỗ" />
            <Picker.Item label="Họp Họ" value="Họp Họ" />
            <Picker.Item label="Khác" value="Khác" />
          </Picker>
        </View>

        <Input
          label="Mô tả"
          placeholder="Nhập mô tả sự kiện"
          value={updateData.description}
          onChangeText={value =>
            setUpdateData({...updateData, description: value})
          }
        />
        <Input
          label="Địa điểm diễn ra"
          placeholder="Nhập địa điểm diễn ra sự kiện"
          value={updateData.location}
          onChangeText={value =>
            setUpdateData({...updateData, location: value})
          }
        />
        <Input
          label="Thêm ghi chú"
          placeholder="Nhập ghi chú"
          value={updateData.note}
          onChangeText={value => setUpdateData({...updateData, note: value})}
        />

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
