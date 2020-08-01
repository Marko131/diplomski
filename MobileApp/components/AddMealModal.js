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
  const [active, setActive] = useState(0);

  useEffect(() => {
    setTabView(
      <SearchMeals
        addMealToList={props.addMealToList}
        closeModal={() => props.hideModal(false)}
      />,
    );
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => props.hideModal(false)}>
      <View style={styles.centeredView}>
        <TouchableWithoutFeedback>
          <View style={styles.modalView}>
            <View style={styles.header}>
              <TouchableOpacity
                style={active === 0 ? styles.activeTab : null}
                onPress={() => {
                  setTabView(
                    <SearchMeals
                      addMealToList={props.addMealToList}
                      closeModal={() => props.hideModal(false)}
                    />,
                  );
                  setActive(0);
                }}>
                <Text
                  style={[
                    styles.modalText,
                    active === 0 ? styles.activeTabText : null,
                  ]}>
                  Search meal
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={active === 1 ? styles.activeTab : null}
                onPress={() => {
                  setTabView(
                    <MealPlan
                      closeModal={() => props.hideModal(false)}
                      addMealToList={props.addMealToList}
                    />,
                  );
                  setActive(1);
                }}>
                <Text
                  style={[
                    styles.modalText,
                    active === 1 ? styles.activeTabText : null,
                  ]}>
                  My plan
                </Text>
              </TouchableOpacity>
            </View>
            {tabView}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => props.hideModal(false)}>
              <Text>Close</Text>
            </TouchableOpacity>
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
    fontSize: 15,
  },
  activeTabText: {
    fontWeight: 'bold',
  },
  activeTab: {
    borderBottomColor: 'rgb(0, 255, 152)',
    borderBottomWidth: 2,
  },
  closeButton: {
    elevation: 4,
    backgroundColor: 'white',
    marginTop: 30,
    padding: 10,
    borderRadius: 30,
  },
});

export default AddMealModal;
