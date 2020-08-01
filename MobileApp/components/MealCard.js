import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Axios from 'axios';
import NutritionInfo from './NutritionInfo';
import {api_url} from './config/Config';

const MealCard = ({meal}) => {
  const [details, setDetails] = useState(null);

  const showDetails = id => {
    Axios.get(`${api_url}/nutrition-info/${id}`).then(response => {
      const nutritionInfo = response.data;
      setDetails(<NutritionInfo nutritionInfo={nutritionInfo} />);
    });
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{meal.title}</Text>
      {details}
      {details === null ? (
        <TouchableOpacity onPress={() => showDetails(meal.id)}>
          <Icon style={styles.chevron} name="chevron-down" size={30} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => setDetails(null)}>
          <Icon style={styles.chevron} name="chevron-up" size={30} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3,
  },
  title: {
    textAlign: 'center',
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  chevron: {
    textAlign: 'center',
  },
});
export default MealCard;
