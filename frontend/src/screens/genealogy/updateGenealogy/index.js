import React, {useState} from 'react';
import {ScrollView, TouchableOpacity, Image, Text, View} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import AuthHeader from '../../../components/AuthHeader';

const UpdateGenealogy = ({navigation}) => {
  const onBack = () => {
    navigation.goBack();
  };
  const handleGuide = () => {
    console.log('Không có hướng dẫn đâu mà bấm');
  };
  const onCreatePeople = () => {
    navigation.navigate('AddPeople');
  };

  const [familyTree, setFamilyTree] = useState([
    {
      id: 1,
      info: 'Chưa cập nhật',
      children: [],
    },
  ]);
  const addPerson = (parentId, direction) => {
    const newPerson = {
      id: Date.now(),
      children: [],
      direction: direction,
    };
    setFamilyTree(prevTree => {
      const updateTree = tree => {
        return tree.map(person => {
          if (person.id === parentId) {
            return {
              ...person,
              children: [...person.children, newPerson],
            };
          }
          return {
            ...person,
            children: updateTree(person.children),
          };
        });
      };
      return updateTree(prevTree);
    });
  };
  const renderTree = tree => {
    return tree.map(person => (
      <View key={person.id} style={styles.person}>
        <TouchableOpacity
          style={styles.buttonPeopleContainer}
          onPress={onCreatePeople}>
          <Image
            style={styles.avatarPeople}
            source={require('../../../assets/tabs/avatar.jpg')}
          />
          <Text style={styles.textPeople}>Chưa cập nhật</Text>
        </TouchableOpacity>
        {person.children.length > 0 ? (
          <View style={styles.childrenContainer}>
            {renderTree(person.children)}
          </View>
        ) : (
          <TouchableOpacity onPress={() => addPerson(person.id)}>
            <Text style={styles.addButton}>+</Text>
          </TouchableOpacity>
        )}
      </View>
    ));
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <AuthHeader onBackPress={onBack} title="Chỉnh sửa gia phả" />
        <View style={styles.headerContainer}>
          <Text style={styles.textHeader}>Tên gia phả</Text>
          <TouchableOpacity style={styles.buttonGuide} onPress={handleGuide}>
            <Image
              style={styles.icon}
              source={require('../../../assets/tabs/guide_icon.png')}
            />
            <Text style={styles.textButton}>Hướng dẫn</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.familyTree}>{renderTree(familyTree)}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateGenealogy;
