import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import MealCard from './MealCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const GenerateMealPlanModal = props => {
  const [mealPlan, setMealPlan] = useState(null);

  useEffect(() => {
    console.log('MOUNTED');
    getMealPlan();
  }, []);

  const mealCards = () => {
    if (!mealPlan) return;
    return mealPlan.meals.map(meal => <MealCard key={meal.id} meal={meal} />);
  };

  const getMealPlan = async () => {
    const mealPlan = await AsyncStorage.getItem('meal_plan');
    if (mealPlan) {
      setMealPlan(JSON.parse(mealPlan));
      return;
    }
    generateMealPlan();
  };

  const generateMealPlan = async () => {
    const token = await AsyncStorage.getItem('access_token');
    if (token !== null) {
      Axios.get(`http://10.0.2.2:8080/generate-meal-plan`, {
        headers: {'X-Auth-Token': token},
      })
        .then(response => {
          setMealPlan(response.data);
          AsyncStorage.setItem('meal_plan', JSON.stringify(response.data));
        })
        .catch(error => alert(error));
    }
  };

  const acceptMealPlan = async () => {
    const token = await AsyncStorage.getItem('access_token');
    if (token !== null) {
      const mealIds = mealPlan.meals.map(meal => meal.id);
      Axios.post(
        `http://10.0.2.2:8080/meal-plan`,
        {
          mealIds: mealIds,
        },
        {
          headers: {'X-Auth-Token': token},
        },
      )
        .then(response => {
          AsyncStorage.removeItem('meal_plan');
          props.hideModal(false);
        })
        .catch(error => alert(error));
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => props.hideModal(false)}>
      <View style={styles.centeredView}>
        <TouchableWithoutFeedback>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Recommended meals</Text>
            {mealCards()}
            <View style={styles.actionsView}>
              <TouchableOpacity
                onPress={() => acceptMealPlan()}
                style={styles.actionButton}>
                <View style={styles.actionButtonContainer}>
                  <Icon name="check" size={25} color="#4caf50" />
                  <Text style={styles.actionButtonText}>Accept</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => generateMealPlan()}
                style={styles.actionButton}>
                <View style={styles.actionButtonContainer}>
                  <Icon name="refresh" size={25} color="#1e88e5" />
                  <Text style={styles.actionButtonText}>Refresh</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.hideModal(false)}
                style={styles.actionButton}>
                <View style={styles.actionButtonContainer}>
                  <Icon name="close" size={25} color="#e53935" />
                  <Text style={styles.actionButtonText}>Cancel</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, .4)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '90%',
  },
  modalText: {
    fontSize: 23,
    marginBottom: 15,
    textAlign: 'center',
  },
  actionsView: {
    display: 'flex',
    flexDirection: 'row',
  },
  actionButtonText: {
    color: 'black',
    fontSize: 15,
    marginHorizontal: 5,
  },
  actionButton: {
    padding: 10,
    margin: 5,
    borderRadius: 20,
    backgroundColor: 'white',
    elevation: 2,
  },
  actionButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default GenerateMealPlanModal;
