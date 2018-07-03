
// import React from 'react';
import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Modal,
  TouchableHighlight,
  Icon,
  DatePickerAndroid,
  Dimensions
} from 'react-native';

import { 
  Header,
  Button,
  Left,
  Right,
  Body,
  Title
} from 'native-base';

import { GiftedForm, GiftedFormModal, GiftedFormManager } from 'react-native-gifted-form'
import {connect} from 'react-redux'
import { NavigationActions } from "react-navigation";

 var {height, width} = Dimensions.get('window');

class Login extends Component {
  
static navigationOptions = {
    header:null
  }; 

navigate = () => {
    const navigateToSignUp = NavigationActions.navigate({
      title:"signUp",
      routeName: "signUp"
    });
    this.props.navigation.dispatch(navigateToSignUp); 
  };

  render() {
    return (
      <View style={styles.container}>
         <Header>
          <Left>
          </Left>
          <Body>
            <Title>Login</Title>
          </Body>
          <Right>
          </Right>
        </Header>

         <GiftedForm style={{flex:1}}
        formName='LoginForm' // GiftedForm instances that use the same name will also share the same states

        //onValueChange={this.handleValueChange.bind(this)}

        clearOnClose={false} // delete the values of the form when unmounted

        defaults={{
          /*
          username: 'Farid',
          'gender{M}': true,
          password: 'abcdefg',
          country: 'FR',
          birthday: new Date(((new Date()).getFullYear() - 18)+''),
          */
        }}

        validators={{
          username: {
            title: 'Username',
            validate: [{
              validator: 'isLength',
              arguments: [3, 10],
              message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
            },{
              validator: 'matches',
              arguments: /^[a-zA-Z0-9]*$/,
              message: '{TITLE} can contains only alphanumeric characters'
            }]
          },
          password: {
            title: 'Password',
            validate: [{
              validator: 'isLength',
              arguments: [5, 16],
              message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
            }]
          },
        }}
      >

        <GiftedForm.SeparatorWidget />

        <GiftedForm.TextInputWidget
          name='username'
          title='Username'
          image={require('./icons/color/contact_card.png')}

          placeholder='MarcoPolo'
          clearButtonMode='while-editing'

          onTextInputFocus={(currentText = '') => {
            if (!currentText) {
              let fullName = GiftedFormManager.getValue('LoginForm', 'fullName');
              if (fullName) {
                return fullName.replace(/[^a-zA-Z0-9-_]/g, '');
              }
            }
            return currentText;
          }}
        />

        <GiftedForm.TextInputWidget
          name='password' // mandatory
          title='Password'
          placeholder='******'
          clearButtonMode='while-editing'
          secureTextEntry={true}
          image={require('./icons/color/lock.png')}
        />

        <GiftedForm.ErrorsWidget/>

        <GiftedForm.SubmitWidget
          title='Login'
          widgetStyles={{
            submitButton: {
              backgroundColor: '#2196F3',
            }
          }}
          onSubmit={(isValid, values, validationResults, postSubmit = null, modalNavigator = null) => {
            if (isValid === true) {

                      fetch('http://210.19.254.111/Project/deviceUsersAuthentication.php', {
                      method: 'POST',
                      headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                      },

                      body: JSON.stringify({
                        username: values.username,
                        password: values.password
                      })
                    })
                    .then((response) => response.json()) //JSON.stringify(response.json()))
                    .then((responseJson)=>{
                      console.log('response',responseJson);
                      if(responseJson === "Username or Password is invalid") {
                       postSubmit(responseJson);
                      } else{
                           AsyncStorage.setItem('user', JSON.stringify(responseJson), (error)=> {
                                  if(error){
                                    postSubmit(['fail to strore in locastorage']);
                                    console.log('data failed', error);
                                  }
                                  else{
                                    console.log('strore');
                                  this.props.navigation.dispatch(NavigationActions.navigate({routeName: "home",}));
                                  }
                                
                              });
                        
                      }
                    })
                    .catch((error)=> { postSubmit(error); console.log('error',error)});
                        }
                      }}

                    />

        <View style={styles.signUpButton}>
         <Button full 
           style={{backgroundColor : '#841584'}}
           onPress={this.navigate}>
            <Text style={{color : 'white'}}>Sign Up</Text>
         </Button>
        </View>

        <GiftedForm.HiddenWidget name='tos' value={true} />
      </GiftedForm>
  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  signUpButton:{
    paddingLeft: 10,
    paddingRight: 10
  }
});


export default Login;

