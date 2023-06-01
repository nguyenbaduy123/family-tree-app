import React, {useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {styles} from './styles';
import Input from '../../components/Input';
import {SafeAreaView} from 'react-native-safe-area-context';
import AuthHeader from '../../components/AuthHeader';

const ViewProfile = ({navigation}) => {
  const onBack = () => {
    navigation.goBack();
  };
  const [selectedValue, setSelectedValue] = useState('Khác');
  const handleValueChange = itemValue => {
    setSelectedValue(itemValue);
  };
  const [selectedDay, setSelectedDay] = useState('Chọn ngày sinh');
  const handleDayChange = itemValue => {
    setSelectedDay(itemValue);
  };
  const [selectedMonth, setSelectedMonth] = useState('');
  const handleMonthChange = itemValue => {
    setSelectedMonth(itemValue);
  };
  const [selectedYear, setSelectedYear] = useState('');
  const handleYearChange = itemValue => {
    setSelectedYear(itemValue);
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <AuthHeader onBackPress={onBack} title="Thông tin cá nhân" />
        <Input label="Họ*" placeholder="Họ" />
        <Input label="Tên đệm" placeholder="Tên đệm" />
        <Input label="Tên*" placeholder="Tên" />
        <Input
          label="Biệt danh, tên gợi nhớ"
          placeholder="Nhập biệt danh, tên ở nhà"
        />
        <Input label="Số điện thoại" placeholder="Số điện thoại" />
        <Input label="Email*" placeholder="Email đã đăng ký tài khoản" />
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
        <View style={styles.selectBirthday}>
          <View style={styles.selectDay}>
            <Picker
              selectedValue={selectedDay}
              onValueChange={handleDayChange}
              style={styles.select}>
              <Picker.Item label="Chọn ngày sinh" value="Chọn ngày sinh" />
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="6" value="6" />
              <Picker.Item label="7" value="7" />
              <Picker.Item label="8" value="8" />
              <Picker.Item label="9" value="9" />
              <Picker.Item label="10" value="10" />
              <Picker.Item label="11" value="11" />
              <Picker.Item label="12" value="12" />
              <Picker.Item label="13" value="13" />
              <Picker.Item label="14" value="14" />
              <Picker.Item label="15" value="15" />
              <Picker.Item label="16" value="16" />
              <Picker.Item label="17" value="17" />
              <Picker.Item label="18" value="18" />
              <Picker.Item label="19" value="19" />
              <Picker.Item label="20" value="20" />
              <Picker.Item label="21" value="21" />
              <Picker.Item label="22" value="22" />
              <Picker.Item label="23" value="23" />
              <Picker.Item label="24" value="24" />
              <Picker.Item label="25" value="25" />
              <Picker.Item label="26" value="26" />
              <Picker.Item label="27" value="27" />
              <Picker.Item label="28" value="28" />
              <Picker.Item label="29" value="29" />
              <Picker.Item label="30" value="30" />
              <Picker.Item label="31" value="31" />
            </Picker>
          </View>
          <View style={styles.selectMonth}>
            <Picker
              selectedValue={selectedMonth}
              onValueChange={handleMonthChange}
              style={styles.select}>
              <Picker.Item label="Chọn tháng sinh" value="Chọn tháng sinh" />
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="6" value="6" />
              <Picker.Item label="7" value="7" />
              <Picker.Item label="8" value="8" />
              <Picker.Item label="9" value="9" />
              <Picker.Item label="10" value="10" />
              <Picker.Item label="11" value="11" />
              <Picker.Item label="12" value="12" />
            </Picker>
          </View>
          <View style={styles.selectYear}>
            <Picker
              selectedValue={selectedValue}
              onValueChange={handleValueChange}
              style={styles.select}>
              <Picker.Item label="Chọn năm sinh" value="Chọn năm sinh" />
              <Picker.Item label="2023" value="2023" />
              <Picker.Item label="2022" value="2022" />
              <Picker.Item label="2021" value="2021" />
              <Picker.Item label="2020" value="2020" />
              <Picker.Item label="2019" value="2019" />
              <Picker.Item label="2018" value="2018" />
              <Picker.Item label="2017" value="2017" />
              <Picker.Item label="2016" value="2016" />
              <Picker.Item label="2015" value="2015" />
              <Picker.Item label="2014" value="2014" />
              <Picker.Item label="2013" value="2013" />
              <Picker.Item label="2012" value="2012" />
              <Picker.Item label="2011" value="2011" />
              <Picker.Item label="2010" value="2010" />
              <Picker.Item label="2009" value="2009" />
              <Picker.Item label="2008" value="2008" />
              <Picker.Item label="2007" value="2007" />
              <Picker.Item label="2006" value="2006" />
              <Picker.Item label="2005" value="2005" />
              <Picker.Item label="2004" value="2004" />
              <Picker.Item label="2003" value="2003" />
              <Picker.Item label="2002" value="2002" />
            </Picker>
          </View>
        </View>
        <Input label="Địa chỉ" placeholder="Nhập địa chỉ của bạn" />
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

export default ViewProfile;
