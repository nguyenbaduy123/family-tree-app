import React, {useState, useEffect} from 'react';
import {ScrollView, TouchableOpacity, Image, Text, View} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import AuthHeader from '../../../components/AuthHeader';
import {useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../../../../env_variable';

const FamilyTree = ({navigation}) => {
  const route = useRoute();
  // Lấy familyId từ route.params (nếu không tồn tại, giá trị mặc định là null)
  const familyId = route.params?.familyId ?? null;
  AsyncStorage.setItem('familyId', familyId);

  const onBack = () => {
    navigation.goBack();
    AsyncStorage.removeItem('familyId');
  };
  const handleGuide = () => {
    console.log('Không có hướng dẫn đâu mà bấm');
  };

  const onCreatePeople = () => {
    navigation.navigate('AddPeople');
  };

  //call api lấy thông tin của family
  const [family, setFamily] = useState('');
  const fetchFamily = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('token');
    const family_id = await AsyncStorage.getItem('familyId');
    try {
      const response = await axios.get(
        `${BASE_URL}/families/${family_id}?user_id=${user_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setFamily(response.data.family);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchFamily();
  }, []);

  //code cây gia phả
  // const [familyTree, setFamilyTree] = useState([
  //   {
  //     id: 1,
  //     info: 'Chưa cập nhật',
  //     children: [],
  //   },
  // ]);
  // const addPerson = (parentId, direction) => {
  //   const newPerson = {
  //     id: Date.now(),
  //     children: [],
  //     direction: direction,
  //   };
  //   setFamilyTree(prevTree => {
  //     const updateTree = tree => {
  //       return tree.map(person => {
  //         if (person.id === parentId) {
  //           return {
  //             ...person,
  //             children: [...person.children, newPerson],
  //           };
  //         }
  //         return {
  //           ...person,
  //           children: updateTree(person.children),
  //         };
  //       });
  //     };
  //     return updateTree(prevTree);
  //   });
  // };
  // const renderTree = tree => {
  //   return tree.map(person => (
  //     <View key={person.id} style={styles.person}>
  //       <TouchableOpacity
  //         style={styles.buttonPeopleContainer}
  //         onPress={onCreatePeople}>
  //         <Image
  //           style={styles.avatarPeople}
  //           source={require('../../../assets/tabs/avatar.jpg')}
  //         />
  //         <Text style={styles.textPeople}>Chưa cập nhật</Text>
  //       </TouchableOpacity>
  //       {person.children.length > 0 ? (
  //         <View style={styles.childrenContainer}>
  //           {renderTree(person.children)}
  //         </View>
  //       ) : (
  //         <TouchableOpacity onPress={() => addPerson(person.id)}>
  //           <Text style={styles.addButton}>+</Text>
  //         </TouchableOpacity>
  //       )}
  //     </View>
  //   ));
  // };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <AuthHeader onBackPress={onBack} title="Chỉnh sửa cây phả hệ" />
        <View style={styles.headerContainer}>
          <Text style={styles.textHeader}>{family.name}</Text>
          <TouchableOpacity style={styles.buttonGuide} onPress={handleGuide}>
            <Image
              style={styles.icon}
              source={require('../../../assets/tabs/guide_icon.png')}
            />
            <Text style={styles.textButton}>Hướng dẫn</Text>
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity
          style={styles.buttonPeopleContainer}
          onPress={onCreatePeople}>
          <Image
            style={styles.avatarPeople}
            source={require('../../../assets/tabs/avatar.jpg')}
          />
          <Text style={styles.textPeople}>Chưa cập nhật</Text>
        </TouchableOpacity> */}
        <View style={styles.treeContainer}>
          <View style={styles.generation1}>
            <TouchableOpacity
              style={styles.buttonPeopleContainer}
              onPress={onCreatePeople}>
              <Image
                style={styles.avatarPeople}
                source={require('../../../assets/tabs/avatar.jpg')}
              />
              <Text style={styles.textPeople}>Ông</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonPeopleContainer}
              onPress={onCreatePeople}>
              <Image
                style={styles.avatarPeople}
                source={require('../../../assets/tabs/avatar.jpg')}
              />
              <Text style={styles.textPeople}>Bà</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.generation2}>
            <View style={styles.couple1}>
              <TouchableOpacity
                style={styles.buttonPeopleContainer}
                onPress={onCreatePeople}>
                <Image
                  style={styles.avatarPeople}
                  source={require('../../../assets/tabs/avatar.jpg')}
                />
                <Text style={styles.textPeople}>1</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonPeopleContainer}
                onPress={onCreatePeople}>
                <Image
                  style={styles.avatarPeople}
                  source={require('../../../assets/tabs/avatar.jpg')}
                />
                <Text style={styles.textPeople}>2</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.couple2}>
              <TouchableOpacity
                style={styles.buttonPeopleContainer}
                onPress={onCreatePeople}>
                <Image
                  style={styles.avatarPeople}
                  source={require('../../../assets/tabs/avatar.jpg')}
                />
                <Text style={styles.textPeople}>3</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonPeopleContainer}
                onPress={onCreatePeople}>
                <Image
                  style={styles.avatarPeople}
                  source={require('../../../assets/tabs/avatar.jpg')}
                />
                <Text style={styles.textPeople}>4</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.couple3}>
              <TouchableOpacity
                style={styles.buttonPeopleContainer}
                onPress={onCreatePeople}>
                <Image
                  style={styles.avatarPeople}
                  source={require('../../../assets/tabs/avatar.jpg')}
                />
                <Text style={styles.textPeople}>5</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonPeopleContainer}
                onPress={onCreatePeople}>
                <Image
                  style={styles.avatarPeople}
                  source={require('../../../assets/tabs/avatar.jpg')}
                />
                <Text style={styles.textPeople}>6</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.generation3}>
            <View style={styles.children1}>
              <TouchableOpacity
                style={styles.buttonPeopleContainer}
                onPress={onCreatePeople}>
                <Image
                  style={styles.avatarPeople}
                  source={require('../../../assets/tabs/avatar.jpg')}
                />
                <Text style={styles.textPeople}>c1</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonPeopleContainer}
                onPress={onCreatePeople}>
                <Image
                  style={styles.avatarPeople}
                  source={require('../../../assets/tabs/avatar.jpg')}
                />
                <Text style={styles.textPeople}>c1</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.children2}>
              <TouchableOpacity
                style={styles.buttonPeopleContainer}
                onPress={onCreatePeople}>
                <Image
                  style={styles.avatarPeople}
                  source={require('../../../assets/tabs/avatar.jpg')}
                />
                <Text style={styles.textPeople}>c2</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonPeopleContainer}
                onPress={onCreatePeople}>
                <Image
                  style={styles.avatarPeople}
                  source={require('../../../assets/tabs/avatar.jpg')}
                />
                <Text style={styles.textPeople}>c2</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonPeopleContainer}
                onPress={onCreatePeople}>
                <Image
                  style={styles.avatarPeople}
                  source={require('../../../assets/tabs/avatar.jpg')}
                />
                <Text style={styles.textPeople}>c2</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.children3}>
              <TouchableOpacity
                style={styles.buttonPeopleContainer}
                onPress={onCreatePeople}>
                <Image
                  style={styles.avatarPeople}
                  source={require('../../../assets/tabs/avatar.jpg')}
                />
                <Text style={styles.textPeople}>c3</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonPeopleContainer}
                onPress={onCreatePeople}>
                <Image
                  style={styles.avatarPeople}
                  source={require('../../../assets/tabs/avatar.jpg')}
                />
                <Text style={styles.textPeople}>c3</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* <View style={styles.familyTree}>{renderTree(familyTree)}</View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FamilyTree;
