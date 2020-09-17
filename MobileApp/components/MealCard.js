import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Axios from 'axios';
import NutritionInfo from './NutritionInfo';
import {api_url} from './config/Config';
import {WebView} from 'react-native-webview';

const MealCard = ({meal}) => {
  const [details, setDetails] = useState(null);
  const [ref, setRef] = useState(null);

  const showDetails = id => {
    Axios.get(`${api_url}/nutrition-info/${id}`).then(response => {
      const nutritionInfo = response.data;
      setDetails(<NutritionInfo nutritionInfo={nutritionInfo} />);
    });
  };

  const openInBrowser = () => {
    console.log(meal.sourceUrl);
    Linking.canOpenURL(meal.sourceUrl).then(supported => {
      if (supported) Linking.openURL(meal.sourceUrl);
    });
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => openInBrowser()}>
        <MaterialIcon
          name="open-in-browser"
          size={20}
          color="rgb(0, 190, 89)"
        />
        <Text style={styles.title}>{meal.title}</Text>
      </TouchableOpacity>

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
