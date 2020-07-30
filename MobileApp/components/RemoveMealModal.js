import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const RemoveMealModal = props => {
  const removeMeal = async id => {
    const value = await AsyncStorage.getItem('access_token');
    if (value !== null)
      Axios.delete(`http://10.0.2.2:8080/meal/${id}`, {
        headers: {'X-Auth-Token': value},
      }).then(() => {
        props.hideModal();
        props.refresh();
      });
  };
  return (
    <TouchableWithoutFeedback onPress={() => props.hideModal()}>
      <View style={styles.centeredView}>
        <TouchableWithoutFeedback>
          <View style={styles.modalView}>
            <Text style={styles.header}>
              Are you sure you want to remove this meal?{' '}
            </Text>
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => removeMeal(props.mealId)}>
                <View style={styles.iconContainer}>
                  <Icon name="delete-outline" size={25} color="#e53935" />
                  <Text>Remove</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => props.hideModal()}>
                <View style={styles.iconContainer}>
                  <Icon name="close" size={25} />
                  <Text>Cancel</Text>
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
  actions: {
    margin: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  actionButton: {
    elevation: 3,
    backgroundColor: 'white',
    padding: 10,
    margin: 5,
    borderRadius: 30,
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RemoveMealModal;
