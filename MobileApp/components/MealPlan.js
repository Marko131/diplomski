import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';

const MealPlan = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    getMeals();
  });

  const getMeals = async () => {
    const value = await AsyncStorage.getItem('access_token');
    if (value !== null) {
      Axios.get(`http://10.0.2.2:8080/meal-plan`, {
        headers: {'X-Auth-Token': value},
      })
        .then(response => setMeals(response.data))
        .catch(error => alert(error));
    }
  };

  return (
    <View>
      <Text>My plan</Text>
    </View>
  );
};

export default MealPlan;
