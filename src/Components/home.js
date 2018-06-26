
// import React from 'react';
import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  AsyncStorage
} from 'react-native';

import {connect} from 'react-redux'
import { getUserData, getCurrentLocation } from '../Actions/actions';
import { NavigationActions } from "react-navigation";
//import { getCurrentLocation } from '../Actions/actions';



class Home extends Component {
  
componentDidMount() {
    this.props.dispatch(getUserData());
    //this.interval = setInterval(()=>{
       this.props.dispatch(getCurrentLocation());
    // }, 3000);
    
   // setTimeout(()=> {
   //  this.sendLocation()
   //  } , 3000);   
    //console.log(Object.keys(this.props.region).length);
      //console.log(this.props.region);     
}

static navigationOptions = {
    header:null
  }; 

componentWillUnmount(){
  //clearInterval(this.interval);
  this.logout();
}

UNSAFE_componentWillReceiveProps(nextProps){
  if(this.props.region && nextProps.region !== this.props.region){
    console.log('next', nextProps.region);
    this.sendLocation();
  }
}

logout(){
   AsyncStorage.removeItem('user', (error)=>{
    if(error){
    console.log('fail to remove', error);
     } else {
      console.log('removed sucess');
      this.props.navigation.dispatch(NavigationActions.navigate({routeName: "login"}));
     }
   });   
}

sendLocation(){
 if(Object.keys(this.props.region).length > 0){
    console.log('sending location...');
    var region ={
      lat: this.props.region.region.coords.latitude,
      lng: this.props.region.region.coords.longitude,
      username: this.props.userData.data.username,
      age: this.props.userData.data.age,
      gender: this.props.userData.data.gender

    };
    console.log('data sent', region);
    fetch('http://210.19.254.111/Project/notification.php', {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },

      body: JSON.stringify(region)
    })
    .then((response) =>response.json())
    .then((responseJson)=>{ 
       console.log('respose', responseJson);
        for (var i = responseJson.length - 1; i >= 0; i--) { 
          if(responseJson[i] === "Found Circle" || responseJson[i] === "Found Polygon"){
               Alert.alert(
              'I Geofence',
              'You entered a Geofence',
              [
                {text: 'OK', onPress: () => console.log('Enter alert...', responseJson[i])},
              ],
              { cancelable: false }
            );
          } else if(responseJson[i] === "Exit Circle" || responseJson[i] === "Exit Polygon"){
              Alert.alert(
              'E Geofence',
              'You exited a Geofence',
              [
                {text: 'OK', onPress: () => console.log('Exit alert...', responseJson[i])},
              ],
              { cancelable: false }
            );
          } else{
            console.log('no alert', responseJson[i]);
          }
      }

      })
    .catch((error)=> {
      console.log('error', error);
    });
   }
}


  render() {
    const { userData, region } = this.props;
    //console.log('location', region);
    return (
      <View style={styles.container}>
          <Text>welcome</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});


function mapStateToProps(state) {
  return {
    userData: state.UserData,
    region: state.region
  }
}
 

export default connect(mapStateToProps)(Home) 