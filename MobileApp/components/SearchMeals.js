import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const SearchMeals = () => {
  const [searchValue, setSearchValue] = useState('');
  const [meals, setMeals] = useState([]);

  const searchMeals = () => {
    if (searchValue == '') return;

    Axios.get(`http://10.0.2.2:8080/search-meals/${searchValue}`)
      .then(response => setMeals(response.data.results))
      .catch(error => alert(error));
  };

  const submitMeal = async id => {
    const value = await AsyncStorage.getItem('access_token');
    if (value !== null) {
      Axios.post(
        `http://10.0.2.2:8080/add`,
        {
          id: id,
        },
        {
          headers: {'X-Auth-Token': value},
        },
      )
        .then(response => props.addMealToList(response.data))
        .catch(error => alert(error));
    }
  };
  return (
    <>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 10,
        }}>
        <TextInput
          placeholder="Search meals..."
          value={searchValue}
          onChangeText={value => setSearchValue(value)}
          style={styles.input}
        />
        <TouchableOpacity onPress={searchMeals}>
          <Icon name="search" size={25} color="#353535" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.mealList} horizontal={true}>
        {meals.map((meal, index) => (
          <ImageBackground
            key={index}
            style={styles.searchItem}
            source={{uri: meal.image}}>
            <Text style={styles.mealTitle}>{meal.title}</Text>
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => submitMeal(meal)}>
                <Icon name="add" size={25} color="white" />
                <Text style={{color: 'white'}}>Add</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#fafafa',
    borderRadius: 50,
    padding: 10,
  },
  searchItem: {
    width: 200,
    height: 200,
    margin: 10,
    elevation: 3,
  },
  mealList: {},
  mealTitle: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 5,
    textAlign: 'center',
    color: 'white',
    fontSize: 17,
  },
  actions: {
    marginTop: 'auto',
  },
  addButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});

export default SearchMeals;
