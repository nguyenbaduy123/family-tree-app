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
      name: 'Người 1',
      rightPerson: null,
      belowPerson: null,
    },
  ]);

  const addPerson = (parentId, position) => {
    const newPerson = {
      id: Date.now(),
      name: `Người ${parentId}.${position + 1}`,
      rightPerson: null,
      belowPerson: null,
    };

    setFamilyTree(prevTree => {
      const updateTree = tree => {
        return tree.map(person => {
          if (person.id === parentId) {
            return {
              ...person,
              [position]: newPerson,
            };
          } else {
            const updatedPerson = {
              ...person,
              rightPerson: person.rightPerson
                ? updateTree([person.rightPerson])
                : null,
              belowPerson: person.belowPerson
                ? updateTree([person.belowPerson])
                : null,
            };
            return updatedPerson;
          }
        });
      };

      return updateTree(prevTree);
    });
  };

  const deletePerson = (parentId, position) => {
    setFamilyTree(prevTree => {
      const updateTree = tree => {
        return tree.map(person => {
          if (person.id === parentId) {
            return {
              ...person,
              [position]: null,
            };
          } else {
            const updatedPerson = {
              ...person,
              rightPerson: person.rightPerson
                ? updateTree(person.rightPerson)
                : null,
              belowPerson: person.belowPerson
                ? updateTree(person.belowPerson)
                : null,
            };
            return updatedPerson;
          }
        });
      };
      return updateTree(prevTree);
    });
  };

  const renderTree = tree => {
    return tree.map(person => (
      <View key={person.id} style={styles.person}>
        <Text style={styles.personName}>{person.name}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => addPerson(person.id, 'right')}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => addPerson(person.id, 'below')}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deletePerson(person.id, 'right')}>
            <Text style={styles.buttonText}>X</Text>
          </TouchableOpacity>
        </View>
        {person.rightPerson && (
          <View style={styles.childrenContainer}>
            {renderTree([person.rightPerson])}
          </View>
        )}
        {person.belowPerson && (
          <View style={styles.childrenContainer}>
            {renderTree([person.belowPerson])}
          </View>
        )}
      </View>
    ));
  };

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

  // const renderTree = tree => {
  //   return tree.map(person => (
  //     <View key={person.id} style={styles.person}>
  //       <TouchableOpacity
  //         style={styles.buttonPeopleContainer}
  //         onPress={() => onCreatePeople(person.id, 'right')}>
  //         <Image
  //           style={styles.avatarPeople}
  //           source={require('../../../assets/tabs/avatar.jpg')}
  //         />
  //         <Text style={styles.textPeople}>Chưa cập nhật</Text>
  //       </TouchableOpacity>
  //       {person.direction === 'right' && (
  //         <View style={styles.addButtonContainer}>
  //           <TouchableOpacity
  //             style={[styles.addButton, styles.addButtonRight]}
  //             onPress={() => onCreatePeople(person.id, 'right')}>
  //             <Text style={styles.addButtonText}>+</Text>
  //           </TouchableOpacity>
  //           <TouchableOpacity
  //             style={[styles.addButton, styles.addButtonDown]}
  //             onPress={() => onCreatePeople(person.id, 'down')}>
  //             <Text style={styles.addButtonText}>+</Text>
  //           </TouchableOpacity>
  //         </View>
  //       )}
  //       {person.children.length > 0 && (
  //         <View style={styles.childrenContainer}>
  //           {renderTree(person.children)}
  //         </View>
  //       )}
  //     </View>
  //   ));
  // };

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
        <View style={styles.containerr}>{renderTree(familyTree)}</View>
        {/* <View style={styles.familyTree}>{renderTree(familyTree)}</View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateGenealogy;
