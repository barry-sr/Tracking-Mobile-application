
// import React from 'react';
import React, {Component} from 'react';
import {Platform, StyleSheet, Alert, AsyncStorage, PermissionsAndroid} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import {connect} from 'react-redux'
import { getUserData, getCurrentLocation } from '../Actions/actions';
import { NavigationActions } from "react-navigation";
//import { getCurrentLocation } from '../Actions/actions';

class Home extends Component {
  


// async requestLocationPermission() {
//     const chckLocationPermission = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
//     if (chckLocationPermission === PermissionsAndroid.RESULTS.GRANTED) {
//         alert("You've access for the location");
//     } else {
//         try {
//             const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//                 {
//                     'title': 'Cool Location App required Location permission',
//                     'message': 'We required Location permission in order to get device location ' +
//                         'Please grant us.'
//                 }
//             )
//             if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//                 alert("You've access for the location");
//             } else {
//                 alert("You don't have access for the location");
//             }
//         } catch (err) {
//             alert(err)
//         }
//     }
// };



componentDidMount() {
    this.props.dispatch(getUserData());
    this.props.dispatch(getCurrentLocation());
    // this.requestLocationPermission();
    setTimeout(()=> {
     this.sendLocation()
    } , 3000);   
}


static navigationOptions = {
    header:null
  }; 

componentWillUnmount(){
  clearInterval(this.interval);
  this.logout();
}

UNSAFE_componentWillReceiveProps(nextProps){
  if(this.props.region && nextProps.region !== this.props.region){
    // console.log('next', nextProps.region);
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
  console.log(this.props.userData);
 if(Object.keys(this.props.region).length > 0){
    console.log('sending location...');
    var region ={
      lat: this.props.region.region.coords.latitude,
      lng: this.props.region.region.coords.longitude,
      username: this.props.userData.data.username,
      age: this.props.userData.data.age,
      gender: this.props.userData.data.gender,
      category: this.props.userData.data.category
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
    const { userData}= this.props;
    return (
         <Container>
                <Header>
                  <Left>
                    <Button transparent>
                      <Icon name='menu' />
                    </Button>
                  </Left>
                  <Body>
                    <Title>Home</Title>
                  </Body>
                  <Right />
                </Header>
                <Content contentContainerStyle={styles.content}>
                  <Text>Welcome {userData.data && userData.data.username}</Text>
                </Content>
                <Footer>
                  <FooterTab>
                  </FooterTab>
                </Footer>
              </Container>
    );
  }
}

const styles = StyleSheet.create({
  content:{
    flex:1,
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