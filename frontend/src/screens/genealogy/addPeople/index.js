import React, {useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {styles} from './styles';
import Input from '../../../components/Input';
import {SafeAreaView} from 'react-native-safe-area-context';
import AuthHeader from '../../../components/AuthHeader';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddPeople = ({navigation}) => {
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
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <AuthHeader onBackPress={onBack} title="Cập nhật người trong gia phả" />
        <Text style={styles.labelname}>Thông tin cá nhân:</Text>
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
          label="Vai vế (hiện trên phả hệ)"
          placeholder="Ông, Cụ, Bà, Chi trưởng, Thủy tổ, Thứ..."
        />
        <Input label="Họ và tên" placeholder="Họ tên" />
        <Input label="Tên khác(nếu có)" placeholder="Biệt danh, hiệu..." />
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
        <Input label="Trình độ" placeholder="Học vấn, kỹ năng..." />
        <Input label="Nghề nghiệp" placeholder="Nghề, chức..." />
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
        <Input label="Nguyên quán" placeholder="Nhập nguyên quán" />
        <Input label="Địa chỉ hiện tại" placeholder="Nhập địa chỉ hiện tại" />
        <Input label="Số điện thoại" placeholder="Nhập số điện thoại" />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
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
