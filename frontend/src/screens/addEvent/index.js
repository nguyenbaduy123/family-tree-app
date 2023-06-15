import React, {useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {styles} from './styles';
import Input from '../../components/Input';
import {SafeAreaView} from 'react-native-safe-area-context';
import AuthHeader from '../../components/AuthHeader';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddEvent = ({navigation}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedValueEvent, setSelectedValueEvent] = useState('Khác');
  const [selectedValueGroup, setSelectedValueGroup] = useState('Khác');

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date !== undefined) {
      setSelectedDate(date);
    }
  };
  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const handleValueEventChange = itemValue => {
    setSelectedValueEvent(itemValue);
  };
  const handleValueGroupChange = itemValue => {
    setSelectedValueGroup(itemValue);
  };
  const onBack = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <AuthHeader onBackPress={onBack} title="Tạo sự kiện mới" />
        <Input label="Tên sự kiện*" placeholder="Nhập tên sự kiện" />
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
              source={require('../../assets/tabs/calendar_icon.jpg')}
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
        <Text style={styles.labelname}>Nhóm</Text>
        <View style={styles.selectContainer}>
          <Picker
            selectedValue={selectedValueGroup}
            onValueChange={handleValueGroupChange}
            style={styles.select}>
            <Picker.Item label="Bên nội" value="Bên nội" />
            <Picker.Item label="Bên ngoại" value="Bên ngoại" />
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
