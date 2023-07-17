import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Alert,
} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import CalendarStrip from 'react-native-calendar-strip';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../../../../env_variable';

const Event = ({navigation}) => {
  const onCreateEvent = () => {
    navigation.navigate('AddEvent');
  };
  const [calendar, setCalendar] = useState(false);
  let date = new Date().getDate(); //Current Date
  let month = new Date().getMonth() + 1; //Current Month
  let year = new Date().getFullYear(); //Current Year
  let hours = new Date().getHours(); //Current Hours
  let min = new Date().getMinutes();
  const [showModal, setShowModal] = useState(false);
  const minplus = () => {
    if (min < 10) {
      return '0' + min;
    } else {
      return min;
    }
  };
  let minplus1 = minplus();

  //call api hiển thị danh sách các event
  const [countEvent, setCountEvent] = useState(0);
  const [events, setEvents] = useState([]);
  const fetchEvents = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await axios.get(
        `${BASE_URL}/events?user_id=${user_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setEvents(response.data.events);
      setCountEvent(response.data.events.length);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchEvents();
    });
    return unsubscribe;
  }, [navigation]);

  //call api lấy thông tin của 1 family nào đó
  const [family, setFamily] = useState({});
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
      const nameFamily = response.data.family.name;
      setFamily(prevData => ({
        ...prevData,
        [family_id]: nameFamily,
      }));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    events.forEach(event => {
      fetchFamily(event.family_id);
    });
  }, [events]);

  //xử lý update event
  const handleUpdateEvent = eventId => {
    navigation.navigate('UpdateEvent', {eventId});
  };

  //call api delete event
  const [deletedEventId, setDeletedEventId] = useState(null);
  useEffect(() => {
    if (deletedEventId) {
      setEvents(prevData =>
        prevData.filter(event => event.id !== deletedEventId),
      );
      setDeletedEventId(null);
    }
  }, [deletedEventId]);

  const preHandleDeleteEvent = id => {
    Alert.alert(
      'Xác nhận',
      'Bạn có muốn xóa sự kiện này không?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Có',
          onPress: () => {
            handleDeteleEvent(id);
          },
        },
      ],
      {cancelable: false},
    );
  };
  const handleDeteleEvent = async id => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await axios.delete(`${BASE_URL}/events/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDeletedEventId(id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.eventContainer}>
        <View style={styles.header}>
          <Text style={styles.eventText}>Sự kiện</Text>
          <TouchableOpacity style={styles.button} onPress={onCreateEvent}>
            <Image
              style={styles.icon}
              source={require('../../../assets/tabs/plus.png')}
            />
            <Text style={styles.buttonText}>Tạo sự kiện</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.calendarContainer}>
          <View style={styles.timer}>
            <View style={styles.timerHour}>
              <Text style={{fontSize: 18}}>Giờ</Text>
              <Text style={{color: '#FF7E06', fontSize: 16}}>
                {hours} : {min}
              </Text>
            </View>
            <View style={styles.timerDate}>
              <Text style={{fontSize: 18}}>Ngày</Text>
              <Text style={{color: '#FF7E06', fontSize: 16}}>{date}</Text>
            </View>
            <View style={styles.timerMonth}>
              <Text style={{fontSize: 18}}>Tháng</Text>
              <Text style={{color: '#FF7E06', fontSize: 16}}>{month}</Text>
            </View>
            <View style={styles.timerYear}>
              <Text style={{fontSize: 18}}>Năm</Text>
              <Text style={{color: '#FF7E06', fontSize: 16}}>{year}</Text>
            </View>
          </View>
          <View style={styles.viewCalendar}>
            <CalendarStrip
              style={styles.calendar}
              calendarColor={'#FFF3D6'}
              calendarHeaderStyle={{color: 'black', paddingBottom: 20}}
              dateNumberStyle={{color: 'black'}}
              dateNameStyle={{color: 'black'}}
              iconContainer={{flex: 0.0}}
              calendarAnimation={{type: 'sequence', duration: 50}}
              daySelectionAnimation={{
                type: 'background',
                highlightColor: '#FFBF00',
              }}
            />
          </View>
        </View>
      </View>
      {/* <View style={styles.footer}></View> */}
      <View style={styles.view0}>
        <Text style={styles.view01}>Tất cả các sự kiện</Text>
      </View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        {countEvent > 0 ? (
          events.map(event => (
            <View style={styles.showEventContainer} key={event.id}>
              <View style={styles.view1}>
                <Text style={styles.view11}>Tên sự kiện:</Text>
                <Text style={styles.view11}>{event.name}</Text>
                <View style={styles.view12}>
                  <TouchableOpacity
                    style={styles.view12_button}
                    onPress={() => handleUpdateEvent(event.id)}>
                    <Image
                      style={styles.view12_icon}
                      source={require('../../../assets/tabs/edit_icon.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.view12_button}
                    onPress={() => preHandleDeleteEvent(event.id)}>
                    <Image
                      style={styles.view12_icon}
                      source={require('../../../assets/tabs/delete_icon.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.view2}>
                <Text style={styles.view21}>Thời gian diễn ra: </Text>
                <Text style={styles.view21}>{event.time}</Text>
              </View>
              <View style={styles.view3}>
                <Text style={styles.view21}>Gia đình: </Text>
                <Text style={styles.view21}>{family[event.family_id]}</Text>
              </View>
              <View style={styles.view4}>
                <Text style={styles.view21}>Loại sự kiện: </Text>
                <Text style={styles.view21}>{event.type}</Text>
              </View>
              <View style={styles.view5}>
                <Text style={styles.view21}>Địa điểm: </Text>
                <Text style={styles.view21}>{event.location}</Text>
              </View>
              <View style={styles.view6}>
                <Text style={styles.view21}>Mô tả: </Text>
                <Text style={styles.view21}>{event.description}</Text>
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

export default React.memo(Event);
