import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  ActivityIndicator,
  Modal,
  TouchableHighlight,
  Icon,
  DatePickerAndroid,
  Dimensions,
  FlatList
} from 'react-native';

import { 
  Header,
  Button,
  Left,
  Right,
  Body,
  Title
} from 'native-base';

class Profile extends Component {

state={
  isLoading: true;
  category:'';
}


componentDidMount() {
  return fetch('http://210.19.254.111/project/CategoriesForProfile.php')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
              isLoading: false,
              dataSource:responseJson;
            });
        })
        .catch((error) => {
          console.error(error);
        });
   
}

render(){
  if(this.state.isLoading){
       return(
        <View style={{flex: 1, padding: 20}}>
           <ActivityIndicator size="large"/>
        </View>
      )
  } 

  return (
    <View>
      <Flatlist  
        data={this.state.dataSource}
        renderItem={(item)=> <Text>{item.id}, {item.category}</Text>}
        keyExtractor={(item, index) => index}
      />
    </View>
    ); 

}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
});

export default Profile;