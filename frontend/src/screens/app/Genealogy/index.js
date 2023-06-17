import React from 'react';
import {Image, ScrollView, Text, View, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';

const Genealogy = ({navigation}) => {
  const onCreate = () => {
    navigation.navigate('AddGenealogy');
  };
  const handleGenealogyChange = () => {
    navigation.navigate('UpdateGenealogy');
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
        <TouchableOpacity style={styles.button} onPress={onCreate}>
          <Image
            style={styles.icon}
            source={require('../../../assets/tabs/plus.png')}
          />
          <Text style={styles.buttonText}>Tạo mới</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.infoGenealogyContainer}>
          <View style={styles.view1}>
            <Text style={styles.view11}>Tên gia phả - Tên nhánh</Text>
            <Text style={styles.view12}>
              Địa chỉ:
              <Text> Địa chỉ đây</Text>
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
                <Text>3 thành viên</Text>
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
                source={require('../../../assets/tabs/avatar.jpg')}
              />
            </View>
            <View style={styles.view22}>
              <Text>Người tạo:</Text>
              <Text>Người tạo đây</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.view3}
            onPress={handleGenealogyChange}>
            <Text style={styles.view31}>Chỉnh sửa với:</Text>
            <View style={styles.view32}>
              <Image
                style={styles.view321}
                source={require('../../../assets/tabs/family_tree_icon.png')}
              />
              <Text style={styles.view322}>CÂY PHẢ HỆ</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* <View>
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
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(Genealogy);
