
// import React from 'react';
import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableHighlight,
  Icon,
  AsyncStorage,
  DatePickerAndroid
} from 'react-native';

import { 
  Button,
} from 'native-base';

import { NavigationActions } from "react-navigation";
import { GiftedForm, GiftedFormModal, GiftedFormManager } from 'react-native-gifted-form'
//import {connect} from 'react-redux'
//import {getCurrentLocation} from './actions'


class SignUp extends Component {

static navigationOptions = {
    title: 'SignUp'
  };  

  
state={
  dateOfBirth: 'MM/DD/YYYY',
  modalVisible: false,
  modalContent: <Text>Foo</Text>
}

componentDidMount() {
   this.removeUserData();  
   
}

removeUserData(){
    AsyncStorage.removeItem('user', (error)=>{
    if(error){
    console.log('fail to remove', error);
     } else {
      console.log('removed sucess');
     }
   }); 
}

navigate = () => {
    console.log('navigating');
    const redirectToLogin = NavigationActions.navigate({
      title: null,
      routeName: "login"
    });
    this.props.navigation.dispatch(redirectToLogin);
  };

display(){

console.log('hello');
}


  setModalVisible(visible, params = null) {
    this.setState({
      modalVisible: visible, 
      modalContent: params !== null ? params.renderScene(null) : <Text>No content</Text> ,
      modalRight: params !== null ? params.renderRightButton(null) : <Text>No content</Text> ,
      modalTitle: <Text>{params !== null ? params.getTitle() : 'No title'}</Text>
    })
    
  }

  onModalClose() {
    console.log('modal close')
  }

  
  render() {  
    // console.log(this.props);
    return (
    <View style={{flex:1, flexDirection: 'column'}}>

      <GiftedForm
        formName='signupForm' // GiftedForm instances that use the same name will also share the same states

        openModal={(params) => {
          this.setModalVisible(true, params)
        }}

        closeModal={() => { this.setModalVisible(false) }}

        clearOnClose={false} // delete the values of the form when unmounted

        defaults={{
          
          // username: 'Barry',
          // 'gender{M}': true,
          // password: 'abcdefg',
          // birthday: new Date(((new Date()).getFullYear() - 18)+''),
          
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
          emailAddress: {
            title: 'Email address',
            validate: [{
              validator: 'isLength',
              arguments: [6, 255],
            },{
              validator: 'isEmail',
            }]
          },
          gender: {
                title: 'Gender',
                validate: [{
                  validator: (...args) => {
                    if (args[0] === undefined) {
                      return false;
                    }
                    return true;
                  },
                  message: '{TITLE} is required',
                }]
              },
          dateOfBirth: {
            title: 'dateOfBirth',
            validate: [{
              validator:(...args) => {
                if (args[0] == 'MM/DD/YYYY') {
                  return false;
                }
                //console.log(args);
                return true;
              },
              message: '{TITLE} is required',
            }]
            //    validate: [{
            //   validator: 'isBefore',
            //   arguments: [this.state.dateOfBirth.utc().subtract(18, 'years').format('MM-DD-YYYY')],
            //   message: 'You must be at least 18 years old'
            // }, {
            //   validator: 'isAfter',
            //   arguments: [this.state.dateOfBirth.utc().subtract(100, 'years').format('MM-DD-YYYY')],
            //   message: '{TITLE} is not valid'
            // }]
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
              let fullName = GiftedFormManager.getValue('signupForm', 'fullName');
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

        <GiftedForm.TextInputWidget
          name='emailAddress' // mandatory
          title='Email address'
          placeholder='example@nomads.ly'

          keyboardType='email-address'

          clearButtonMode='while-editing'

          image={require('./icons/color/email.png')}
        />

        <GiftedForm.SeparatorWidget />

        <GiftedForm.ModalWidget
          title='Gender'
          defaulValue='gender'
          image={require('./icons/color/gender.png')}
        >
          <GiftedForm.SeparatorWidget />

          <GiftedForm.SelectWidget name='gender' title='Gender' multiple={false}>
            <GiftedForm.OptionWidget image={require('./icons/color/female.png')} title='Female' value='F'
            />
            <GiftedForm.OptionWidget image={require('./icons/color/male.png')} title='Male' value='M'
            />
          </GiftedForm.SelectWidget>
        </GiftedForm.ModalWidget>

        <GiftedForm.RowValueWidget
          title='Date of birth'
          name='dateOfBirth' // mandatory
          displayValue='MM/DD/YYYY'
          image={require('./icons/color/birthday.png')}
          value={this.state.dateOfBirth}
          onPress={() => {
            DatePickerAndroid.open({
              date: (this.state.dateOfBirth)? Date.parse(this.state.dateOfBirth): new Date(),
              maxDate: new Date(),
              mode: 'spinner',
            }).then((r)=>{
              if (r.action !== DatePickerAndroid.dismissedAction) {
                              // Selected year, month (0-11), day
              this.setState({dateOfBirth:`${r.month}/${r.day}/${r.year}`});
            }
            }).catch((code,message)=>console.warn('Cannot open date picker', message));
          }}
        />
        
        <GiftedForm.ErrorsWidget/>
        
        <GiftedForm.SubmitWidget
          title='Sign up'
          widgetStyles={{
            submitButton: {
              backgroundColor: '#2196F3',
            }
          }}
          onSubmit={(isValid, values, validationResults, postSubmit = null, modalNavigator = null) => {
            if (isValid === true) {
              // prepare object
              values.gender = values.gender[0];
              console.log(values);
              fetch('http://210.19.254.111/Project/deviceUsersReg.php', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },

                body: JSON.stringify(values)
              })
              .then((response) => response.text()) //JSON.stringify(response.json()))
              .then((responseJson)=> {
                 console.log(responseJson);
                 if(responseJson === "Username exists!"){
                    postSubmit(responseJson);
                    //GiftedFormManager.reset('signupForm');
                    setTimeout(()=>{
                        //postSubmit(["you're being directed to login page"]);
                        this.navigate();
                    },1000);
                 }
                  else {
                    postSubmit(responseJson);
                    setTimeout(()=>{
                        //postSubmit(["you're being directed to login page"]);
                        this.navigate();
                    },1000);
                  }
              })
              .catch((error)=> {console.log(error)});
              

              /* Implement the request to your server using values variable
              ** then you can do:
              ** postSubmit(['An error occurred, please try again']); // disable the loader and display an error message
              ** postSubmit(['Username already taken', 'Email already taken']); // disable the loader and display an error message
              ** GiftedFormManager.reset('signupForm'); // clear the states of the form manually. 'signupForm' is the formName used
              */
              
            }
          }}

        />

        <GiftedForm.NoticeWidget 
          title='By signing up, you agree to the Terms of Service and Privacy Policity.'
        />

        <GiftedForm.HiddenWidget name='tos' value={true} />

      </GiftedForm>
          <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-start'}}
          >
         <View style={{marginTop: 22, height: 40, backgroundColor: '#ccc', flexDirection:'row', justifyContent: 'space-between', alignItems: 'center'}}>
           <View>
            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>
           </View>
           <Text>
            {this.state.modalTitle}
           </Text>
           <View>
            {this.state.modalRight}
           </View>
           </View>
          <View style={{flex: 1}}>
            {this.state.modalContent}
          </View>
        </Modal>
      </View>
    )
  }
}

export default SignUp

