import React from 'react';
import {Image, ScrollView, Text, View, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import addGenealogy from '../../addGenealogy';

const Genealogy = ({navigation}) => {
  const onCreate = () => {
    navigation.navigate('AddGenealogy');
  };
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.titleHeader}>Gia Phả</Text>
        <TouchableOpacity style={styles.button}>
          <Image
            style={styles.icon}
            source={require('../../../assets/tabs/QR_code.png')}
          />
          <Text style={styles.buttonText}>Quét</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Image
            style={styles.icon}
            source={require('../../../assets/tabs/plus.png')}
          />
          <Text style={styles.buttonText}>Tạo mới</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container}>
        <Image
          style={styles.image}
          source={require('../../../assets/tabs/family.png')}
        />
        <Text style={styles.text}>
          Bạn chưa tạo cây gia phả nào, nhấn vào nút
          <Text onPress={onCreate} style={styles.textLink}>
            [+ Thêm]
          </Text>
          để bắt đầu tạo cây gia phả ngay thôi!
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(Genealogy);
