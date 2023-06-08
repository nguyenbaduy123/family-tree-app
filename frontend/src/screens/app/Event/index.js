import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';

const Event = ({navigation}) => {
  const onCreate = () => {
    navigation.navigate('AddEvent');
  };
  return (
    <SafeAreaView>
      <View style={styles.eventContainer}>
        <View style={styles.header}>
          <Text style={styles.eventText}>Sự kiện</Text>
          <TouchableOpacity style={styles.button} onPress={onCreate}>
            <Image
              style={styles.icon}
              source={require('../../../assets/tabs/plus.png')}
            />
            <Text style={styles.buttonText}>Tạo sự kiện</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity activeOpacity={1} style={styles.timer}>
              <View style={styles.timerText}>
                <Text style={styles.textFontsize}>Gio</Text>
                <Text style={styles.timerNumber}>12 : 25</Text>
                <Text>Mau Ty</Text>
              </View>
              <View style={styles.timerText}>
                <Text style={styles.textFontsize}>Ngay</Text>
                <Text style={styles.timerNumber}>10</Text>
                <Text>Binh Tuat</Text>
              </View>
              <View style={styles.timerText}>
                <Text style={styles.textFontsize}>Thang</Text>
                <Text style={styles.timerNumber}>4</Text>
                <Text>Dinh Ty</Text>
              </View>
              <View style={styles.timerText}>
                <Text style={styles.textFontsize}>Nam</Text>
                <Text style={styles.timerNumber}>2023</Text>
                <Text>Quy Mao</Text>
              </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.calender}>
            <View style={styles.calenderHeader}>
              <Image style={[styles.icon, {transform: [{scaleX: -1}]}]} source={require('../../../assets/tabs/arrow_right.png')}>
              </Image>
              <Text style={{fontSize: 18}}>
                05 / 2023
              </Text>
              <Image style={[styles.icon]} source={require('../../../assets/tabs/arrow_right.png')}>
              </Image>
            </View>
            <View style={styles.calenderMain}>
              <View style={styles.calenderText}>
                <Text style={styles.calenderMainDay}>CN</Text>
                <Text>28</Text>
                <Text style={styles.calenderFontLastLine}>10</Text>
              </View>
              <View style={styles.calenderText}>
                <Text style={styles.calenderMainDay}>T2</Text>
                <Text>29</Text>
                <Text style={styles.calenderFontLastLine}>11</Text>
              </View> 
              <View style={styles.calenderText}>
                <Text style={styles.calenderMainDay}>T3</Text>
                <Text>30</Text>
                <Text style={styles.calenderFontLastLine}>12</Text>
              </View> 
              <View style={styles.calenderText}>
                <Text style={styles.calenderMainDay}>T4</Text>
                <Text>31</Text>
                <Text style={styles.calenderFontLastLine}>13</Text>
              </View> 
              <View style={styles.calenderText}>
                <Text style={styles.calenderMainDay}>T5</Text>
                <Text>1</Text>
                <Text style={styles.calenderFontLastLine}>14</Text>
              </View> 
              <View style={styles.calenderText}>
                <Text style={styles.calenderMainDay}>T6</Text>
                <Text>2</Text>
                <Text style={styles.calenderFontLastLine}>15</Text>
              </View> 
              <View style={styles.calenderText}>
                <Text style={styles.calenderMainDay}>T7</Text>
                <Text>3</Text>
                <Text style={styles.calenderFontLastLine}>16</Text>
              </View> 
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.flexibleView}>
        <Text></Text>
      </View>
    </SafeAreaView>
  );
};

export default React.memo(Event);
