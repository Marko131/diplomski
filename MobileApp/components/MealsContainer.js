import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
} from 'react-native';
import Meal from './Meal';
import AddMealModal from './AddMealModal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import GenerateMealPlanModal from './GenerateMealPlanModal';

const MealsContainer = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [meals, setMeals] = useState([]);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    showMeals();
  }, [props]);

  const showMeals = () => {
    if (!props.day.mealRecipes) return;
    let mealsComponent = props.day.mealRecipes.map((m, index) => (
      <Meal
        key={index}
        meal={m}
        imageUrl={
          'https://www.thegraciouspantry.com/wp-content/uploads/2018/08/clean-eating-lunch-box-burritos-v-1-.jpg'
        }
      />
    ));
    setMeals(mealsComponent);
  };

  const addToList = meal => {
    setMeals([
      ...meals,
      <Meal
        key={meals.length + 1}
        meal={meal}
        imageUrl={
          'https://www.thegraciouspantry.com/wp-content/uploads/2018/08/clean-eating-lunch-box-burritos-v-1-.jpg'
        }
      />,
    ]);
    props.refresh();
  };

  const showAddMealModal = () => {
    setModalContent(
      <AddMealModal hideModal={setModalVisible} addMealToList={addToList} />,
    );
  };

  const showGenerateMealPlanModal = () => {
    setModalContent(<GenerateMealPlanModal hideModal={setModalVisible} />);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <Text style={styles.header}> MEALS </Text>
      {meals.length > 0 && <ScrollView>{meals}</ScrollView>}

      {meals.length === 0 && (
        <>
          <TouchableOpacity
            style={styles.generateButton}
            onPress={() => {
              showGenerateMealPlanModal();
              setModalVisible(true);
            }}>
            <View style={styles.generateView}>
              <Icon
                style={styles.generateIcon}
                name="restaurant-menu"
                size={50}
                color="white"
              />
              <Text style={styles.generateText}> Generate meal plan</Text>
            </View>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity
        style={styles.addMealButton}
        onPress={() => {
          showAddMealModal();
          setModalVisible(true);
        }}>
        <Text style={styles.addMealText}>Add meal</Text>
      </TouchableOpacity>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        {modalContent}
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    padding: 10,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  text: {
    color: 'white',
  },
  addMealButton: {
    backgroundColor: '#353535',
    paddingVertical: 10,
    marginTop: 'auto',
  },
  addMealText: {
    color: 'white',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  generateButton: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    borderRadius: 10,
  },
  generateView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  generateText: {
    textAlign: 'center',
    color: 'rgba(0, 255, 152, 1)',
    //color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textTransform: 'uppercase',
  },
  generateIcon: {
    backgroundColor: '#353535',
    borderRadius: 50,
    padding: 20,
    color: 'rgba(0, 255, 152, 1)',
    marginBottom: 20,
  },
});

export default MealsContainer;
