import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import MealCard from './MealCard';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Picker} from '@react-native-community/picker';

const MealPlan = props => {
  const [meals, setMeals] = useState([]);
  const [mealEnum, setMealEnum] = useState('BREAKFAST');

  useEffect(() => {
    getMeals();
  }, []);

  const getMeals = async () => {
    const value = await AsyncStorage.getItem('access_token');

    if (value !== null) {
      Axios.get(`http://10.0.2.2:8080/meal-plan`, {
        headers: {'X-Auth-Token': value},
      })
        .then(response => {
          setMeals(response.data);
          console.log(response.data);
        })
        .catch(error => alert(error));
    }
  };

  const addMeal = async meal => {
    const value = await AsyncStorage.getItem('access_token');
    if (value !== null) {
      Axios.post(
        `http://10.0.2.2:8080/add`,
        {id: meal.id, title: meal.title, mealEnum: mealEnum},
        {headers: {'X-Auth-Token': value}},
      )
        .then(response => {
          props.addMealToList(response.data);
          props.closeModal();
        })
        .catch(error => console.log(error));
    }
  };

  const mealCards = () => {
    if (meals.length === 0) return;
    return meals.map(meal => (
      <View key={meal.id} style={styles.container}>
        <MealCard meal={meal} />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => addMeal(meal)}>
          <Icon name="add" size={25} />
        </TouchableOpacity>
      </View>
    ));
  };

  return (
    <View style={{width: '100%'}}>
      {meals?.length > 0 ? (
        <>
          {mealCards()}
          <Picker
            selectedValue={mealEnum}
            onValueChange={(itemValue, itemIndex) => setMealEnum(itemValue)}>
            <Picker.Item label="Breakfast" value="BREAKFAST" />
            <Picker.Item label="Lunch" value="LUNCH" />
            <Picker.Item label="Dinner" value="DINNER" />
          </Picker>
        </>
      ) : (
        <Text style={styles.text}>You don't have meal plan for today</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    elevation: 5,
    backgroundColor: 'white',
    padding: 5,
    margin: 5,
    borderRadius: 10,
  },
  text: {
    textAlign: 'center',
    margin: 20,
  },
});

export default MealPlan;
