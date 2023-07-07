import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import CalendarStrip from 'react-native-calendar-strip';

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
  const fetchEvents = async () => {};

  //call api update event
  const handleUpdateEvent = () => {
    navigation.navigate('UpdateEvent');
  };

  //call api delete event
  const handleDeleteEvent = async () => {
    console.log('delete');
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
      <View style={styles.showEventContainer}>
        <View style={styles.view1}>
          <Text style={styles.view11}>Ten su kien</Text>
          <View style={styles.view12}>
            <TouchableOpacity
              style={styles.view12_button}
              onPress={handleUpdateEvent}>
              <Image
                style={styles.view12_icon}
                source={require('../../../assets/tabs/edit_icon.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.view12_button}
              onPress={handleDeleteEvent}>
              <Image
                style={styles.view12_icon}
                source={require('../../../assets/tabs/delete_icon.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.view2}>
          <Text style={styles.view21}>Thoi gian dien ra</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default React.memo(Event);
