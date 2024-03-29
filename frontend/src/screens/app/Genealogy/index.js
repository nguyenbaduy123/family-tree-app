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
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../../../env_variable';

const Genealogy = ({navigation}) => {
  const onCreateGenealogy = () => {
    navigation.navigate('AddGenealogy');
  };

  const onScanCodeQR = () => {
    console.log('Làm méo gì có chức năng này =)))');
  };

  const onFamilyTree = familyId => {
    navigation.navigate('FamilyTree', {familyId});
  };

  const onDetailFamily = familyId => {
    navigation.navigate('DetailFamily', {familyId});
  };

  //call api hiển thị các family
  const [countFamilies, setCountFamilies] = useState(0);
  const [familiesData, setFamiliesData] = useState([]);
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
      setFamiliesData(response.data.families);
      setCountFamilies(response.data.families.length);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchFamilies();
    });
    return unsubscribe;
  }, [navigation]);

  //call api lấy dữ liệu của user
  const [user, setUser] = useState('');
  const fetchUser = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await axios.get(`${BASE_URL}/users/${user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.user);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchUser();
    });
    return unsubscribe;
  }, [navigation]);

  //call api lấy dữ liệu của family
  const [totalPeople, setTotalPeople] = useState('');
  const fetchFamily = async family_id => {
    const user_id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await axios.get(
        `${BASE_URL}/families/${family_id}?user_id=${user_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // console.log(response.data.people_family.length);
      const sumPeople = response.data.people_family.length;
      setTotalPeople(prevData => ({
        ...prevData,
        [family_id]: sumPeople,
      }));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    familiesData.forEach(family => {
      fetchFamily(family.id);
    });
  }, [familiesData]);

  //call api delete family
  const [deletedFamilyId, setDeletedFamilyId] = useState(null);
  useEffect(() => {
    if (deletedFamilyId) {
      setFamiliesData(prevData =>
        prevData.filter(family => family.id !== deletedFamilyId),
      );
      setDeletedFamilyId(null);
    }
  }, [deletedFamilyId]);
  const preHandleDeleteGenealogy = id => {
    Alert.alert(
      'Xác nhận',
      'Bạn có muốn xóa gia phả này không?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Có',
          onPress: () => {
            handleDeteleGenealogy(id);
          },
        },
      ],
      {cancelable: false},
    );
  };
  const handleDeteleGenealogy = async id => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await axios.delete(`${BASE_URL}/families/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDeletedFamilyId(id);
    } catch (error) {
      console.error(error);
    }
  };

  //handle update family
  const handleUpdateGenealogy = familyId => {
    navigation.navigate('UpdateGenealogy', {familyId});
  };
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.titleHeader}>Gia Phả</Text>
        <TouchableOpacity style={styles.button} onPress={onScanCodeQR}>
          <Image
            style={styles.icon}
            source={require('../../../assets/tabs/QR_code.png')}
          />
          <Text style={styles.buttonText}>Quét</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onCreateGenealogy}>
          <Image
            style={styles.icon}
            source={require('../../../assets/tabs/plus.png')}
          />
          <Text style={styles.buttonText}>Tạo mới</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        {countFamilies > 0 ? (
          familiesData.map(family => (
            <View style={styles.infoGenealogyContainer} key={family.id}>
              <View style={styles.view1}>
                <View style={styles.view11}>
                  <Text style={styles.view111}>
                    {family.name} - {family.branch_name}
                  </Text>
                  <View style={styles.view112}>
                    <TouchableOpacity
                      style={styles.view112Button}
                      onPress={() => handleUpdateGenealogy(family.id)}>
                      <Image
                        style={styles.view112_icon}
                        source={require('../../../assets/tabs/edit_icon.png')}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.view112Button}
                      onPress={() => preHandleDeleteGenealogy(family.id)}>
                      <Image
                        style={styles.view112_icon}
                        source={require('../../../assets/tabs/delete_icon.png')}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={styles.view12}>
                  Địa chỉ:
                  <Text> {family.address}</Text>
                </Text>
                <View style={styles.view13}>
                  <View style={styles.view131}>
                    <Image
                      style={styles.icon_small}
                      source={require('../../../assets/tabs/account.png')}
                    />
                    <Text>1 đời</Text>
                  </View>
                  <View style={styles.view132}>
                    <Image
                      style={styles.icon_small}
                      source={require('../../../assets/tabs/member_icon.png')}
                    />
                    <Text>{totalPeople[family.id]} thành viên</Text>
                  </View>
                  <View style={styles.view133}>
                    <Image
                      style={styles.icon_small}
                      source={require('../../../assets/tabs/clock_icon.jpg')}
                    />
                    <Text>14/06/2023</Text>
                  </View>
                </View>
              </View>
              <View style={styles.view2}>
                <View style={styles.view21}>
                  <Image
                    style={styles.avatar}
                    source={
                      user.avatar !== null
                        ? {uri: user.avatar}
                        : require('../../../assets/tabs/avatar.jpg')
                    }
                  />
                </View>
                <View style={styles.view22}>
                  <Text>Người tạo:</Text>
                  <Text>{user.username}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.view3}
                onPress={() => onFamilyTree(family.id)}>
                <Text style={styles.view31}>Chỉnh sửa với:</Text>
                <View style={styles.view32}>
                  <Image
                    style={styles.view321}
                    source={require('../../../assets/tabs/family_tree_icon.png')}
                  />
                  <Text style={styles.view322}>CÂY PHẢ HỆ</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.view4}
                onPress={() => onDetailFamily(family.id)}>
                <Image
                  style={styles.view41}
                  source={require('../../../assets/tabs/detail_icon.png')}
                />
                <Text style={styles.view42}>Chi tiết về gia phả</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View>
            <Image
              style={styles.image}
              source={require('../../../assets/tabs/family.png')}
            />
            <Text style={styles.text}>
              Bạn chưa tạo cây gia phả nào, nhấn vào nút
              <Text onPress={onCreateGenealogy} style={styles.textLink}>
                [+ Thêm]
              </Text>
              để bắt đầu tạo cây gia phả ngay thôi!
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(Genealogy);
