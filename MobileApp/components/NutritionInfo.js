import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const NutritionInfo = ({nutritionInfo}) => {
  return (
    <View>
      <Text style={styles.calorieText}>CALORIES: {nutritionInfo.calories}</Text>
      <View style={styles.macroContainer}>
        <Text>P: {nutritionInfo.protein}</Text>
        <Text>C: {nutritionInfo.carbs}</Text>
        <Text>F: {nutritionInfo.fat}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  calorieText: {
    textAlign: 'center',
  },
  macroContainer: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default NutritionInfo;
