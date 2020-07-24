import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import SearchMeals from './SearchMeals';
import MealPlan from './MealPlan';

const AddMealModal = props => {
  const [tabView, setTabView] = useState(null);

  useEffect(() => {
    setTabView(<SearchMeals />);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => props.hideModal(false)}>
      <View style={styles.centeredView}>
        <TouchableWithoutFeedback>
          <View style={styles.modalView}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => setTabView(<SearchMeals />)}>
                <Text style={styles.modalText}>Search meal</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setTabView(<MealPlan />)}>
                <Text style={styles.modalText}>My plan</Text>
              </TouchableOpacity>
            </View>
            {tabView}
            <TouchableHighlight
              style={{
                ...styles.openButton,
                backgroundColor: '#2196F3',
                marginTop: 30,
              }}
              onPress={() => props.hideModal(false)}>
              <Text style={styles.textStyle}>Close</Text>
            </TouchableHighlight>
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
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '80%',
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
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
});

export default AddMealModal;
