import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import AuthHeader from '../../../components/AuthHeader';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../../../env_variable';

const DetailFamily = ({navigation}) => {
  const route = useRoute();
  // Lấy familyId từ route.params (nếu không tồn tại, giá trị mặc định là null)
  const familyId = route.params?.familyId ?? null;

  const onBack = () => {
    navigation.goBack();
  };

  //xử lý thêm thành viên
  const onCreatePeople = familyId => {
    navigation.navigate('AddPeople', {familyId});
  };

  //call api lấy thông tin của family
  const [family, setFamily] = useState('');
  const [people, setPeople] = useState([]);
  const [countPeople, setCountPeople] = useState(0);
  const [namePerson, setNamePerson] = useState({});
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
      setFamily(response.data.family);
      setPeople(response.data.people_family);
      setCountPeople(response.data.people_family.length);

      const people = response.data.people_family;
      const nameData = {};
      people.forEach(person => {
        nameData[person.person_id] = person.full_name;
      });
      setNamePerson(nameData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchFamily();
    });
    return unsubscribe;
  }, [navigation]);

  //xử lý update people
  const handleUpdatePeople = (familyId, peopleId) => {
    navigation.navigate('UpdatePeople', {familyId, peopleId});
  };

  //call api delete people
  const [deletedPeopleId, setDeletedPeopleId] = useState(null);
  useEffect(() => {
    if (deletedPeopleId) {
      setPeople(prevData =>
        prevData.filter(people => people.person_id !== deletedPeopleId),
      );
      setDeletedPeopleId(null);
    }
  }, [deletedPeopleId]);

  const preHandleDeletePeople = id => {
    Alert.alert(
      'Xác nhận',
      'Bạn có muốn xóa thành viên này khỏi gia phả không?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Có',
          onPress: () => {
            handleDetelePeople(id);
          },
        },
      ],
      {cancelable: false},
    );
  };
  const handleDetelePeople = async id => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await axios.delete(`${BASE_URL}/people/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDeletedPeopleId(id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <AuthHeader onBackPress={onBack} title="Chi tiết gia phả" />
        <View style={styles.containerAddButton}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => onCreatePeople(familyId)}>
            <Image
              style={styles.avatar}
              source={require('../../../assets/tabs/plus.png')}
            />
            <Text style={styles.textAddButton}>Thêm thành viên</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.textHeader1}>
            Danh sách các thành viên trong gia phả
            <Text style={styles.textHeader2}> {family.name} </Text>
            là:
          </Text>
        </View>
        {countPeople > 0 ? (
          people.map(people => (
            <View style={styles.infoPeopleContainer} key={people.person_id}>
              <View style={styles.view1}>
                <Text style={styles.view11}>Full name: </Text>
                <Text style={styles.view11}>{people.full_name}</Text>
                <View style={styles.view12}>
                  <TouchableOpacity
                    style={styles.view12_button}
                    onPress={() =>
                      handleUpdatePeople(familyId, people.person_id)
                    }>
                    <Image
                      style={styles.view12_icon}
                      source={require('../../../assets/tabs/edit_icon.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.view12_button}
                    onPress={() => preHandleDeletePeople(people.person_id)}>
                    <Image
                      style={styles.view12_icon}
                      source={require('../../../assets/tabs/delete_icon.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.view2}>
                <Text style={styles.view21}>Họ tên cha: </Text>
                <Text style={styles.view21}>
                  {namePerson[people.father_id] || 'Không có'}
                </Text>
              </View>
              <View style={styles.view2}>
                <Text style={styles.view21}>Họ tên mẹ: </Text>
                <Text style={styles.view21}>
                  {namePerson[people.mother_id] || 'Không có'}
                </Text>
              </View>
              <View style={styles.view2}>
                <Text style={styles.view21}>Giới tính: </Text>
                <Text style={styles.view21}>{people.gender}</Text>
              </View>
              <View style={styles.view2}>
                <Text style={styles.view21}>Ngày sinh: </Text>
                <Text style={styles.view21}>{people.date_of_birth}</Text>
              </View>
              <View style={styles.view2}>
                <Text style={styles.view21}>Tình trạng hiện nay: </Text>
                <Text style={styles.view21}>
                  {people.is_alive ? 'Còn sống' : 'Đã chết'}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <View>
            <Text>Khong co chi het</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailFamily;
