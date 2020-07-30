import React, {useState} from 'react';
import {Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import RemoveMealModal from './RemoveMealModal';

const Meal = props => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onLongPress={() => setModalVisible(true)}>
        <Text style={styles.header}>{props.meal.name}</Text>
        <Text style={styles.calorieText}>{props.meal.calories}</Text>
      </TouchableOpacity>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <RemoveMealModal
          hideModal={() => setModalVisible(false)}
          mealId={props.meal.id}
          refresh={props.refresh}
        />
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, .2)',
    borderRadius: 20,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  header: {
    color: 'white',
    fontSize: 20,
    flex: 1,
  },
  calorieText: {
    color: 'rgb(0, 190, 89)',
    fontWeight: 'bold',
  },
});
export default Meal;
