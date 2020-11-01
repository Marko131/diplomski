import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {api_url} from './config/Config';
import {Picker} from '@react-native-community/picker';

const SearchMeals = props => {
  const [searchValue, setSearchValue] = useState('');
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [opening, setOpening] = useState(false);
  const [mealEnum, setMealEnum] = useState('BREAKFAST');

  const searchMeals = () => {
    if (searchValue == '') return;
    setLoading(true);
    Axios.get(`${api_url}/search-meals/${searchValue}`)
      .then(response => {
        setMeals(response.data.results);
        console.log(response.data.results);
        setLoading(false);
      })
      .catch(error => alert(error));
  };

  const submitMeal = async meal => {
    const value = await AsyncStorage.getItem('access_token');
    if (value !== null) {
      Axios.post(
        `${api_url}/add`,
        {
          id: meal.id,
          title: meal.title,
          mealEnum: mealEnum,
        },
        {
          headers: {'X-Auth-Token': value},
        },
      )
        .then(response => {
          props.addMealToList(response.data);
          props.closeModal();
        })
        .catch(error => alert(error));
    }
  };

  const openInBrowser = id => {
    setOpening(true);
    Axios.get(`${api_url}/info/${id}`)
      .then(response => {
        setOpening(false);
        Linking.canOpenURL(response.data.sourceUrl).then(supported => {
          if (supported) Linking.openURL(response.data.sourceUrl);
        });
      })
      .catch(error => alert(error));
  };

  const showMeals = () =>
    meals.map((meal, index) => (
      <ImageBackground
        key={index}
        style={styles.searchItem}
        source={{uri: meal.image}}>
        <TouchableOpacity
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.4)',
            padding: 5,
          }}
          onPress={() => openInBrowser(meal.id)}
          disabled={opening}>
          {opening ? (
            <ActivityIndicator color="white" />
          ) : (
            <Icon name="open-in-browser" color="white" size={20} />
          )}
          <Text style={styles.mealTitle}>{meal.title}</Text>
        </TouchableOpacity>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => submitMeal(meal)}>
            <Icon name="add" size={20} color="white" />
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
              ADD
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    ));
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

        <TouchableOpacity onPress={searchMeals} disabled={loading}>
          <Icon name="search" size={25} color="#353535" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.mealList} horizontal={true}>
        {loading ? (
          <ActivityIndicator
            style={{marginTop: 10}}
            size="large"
            color="black"
          />
        ) : (
          showMeals()
        )}
      </ScrollView>
      <View style={{width: '100%'}}>
        <Picker
          selectedValue={mealEnum}
          onValueChange={(itemValue, itemIndex) => setMealEnum(itemValue)}>
          <Picker.Item label="Breakfast" value="BREAKFAST" />
          <Picker.Item label="Lunch" value="LUNCH" />
          <Picker.Item label="Dinner" value="DINNER" />
        </Picker>
      </View>
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
    marginTop: 10,
    elevation: 3,
  },
  mealList: {},
  mealTitle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 17,
    marginHorizontal: 5,
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
    padding: 5,
  },
});

export default SearchMeals;
