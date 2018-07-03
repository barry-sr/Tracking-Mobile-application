import React, {Component} from 'react';
import {Platform, StyleSheet, AsyncStorage, ActivityIndicator, FlatList, View, Alert, } from 'react-native';
import {Container, Header,Text, Button, Left, Right, Body, CheckBox, Title, ListItem, List, Content } from 'native-base';
import {connect} from 'react-redux'
import { NavigationActions } from "react-navigation";

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
          isLoading: true,
          selectedCategories: [],
          isSubmitting: false
        };
    }

static navigationOptions = {
    title:'Profile',
    headerStyle: {
      backgroundColor: '#6200ee',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }; 

componentDidMount() {
      fetch('http://210.19.254.111/project/CategoriesForProfile.php')
      .then((response) => response.json())
      .then((responseJson) => {
          this.setState({
            isLoading: false,
            dataSource:responseJson,
          });
      })
      .catch((error) => {
        console.error(error);
      });
}


navigate = () => {
    const redirectToLogin = NavigationActions.navigate({
      title: 'Login',
      routeName: "login"
    });
    this.props.navigation.dispatch(redirectToLogin);
  };

onCheckBoxPress(id){
  let tmp = this.state.selectedCategories;

    if ( tmp.includes( id ) ) {
      tmp.splice( tmp.indexOf(id), 1 );
    } else {
      tmp.push( id );
    }

    this.setState({
      selectedCategories: tmp
    });
}

onCreateProfile(){
    if(0 < this.state.selectedCategories.length){             
        var data= this.props.signUp_Data;
        var categories = this.state.selectedCategories.toString();
        this.setState({isSubmitting: true});
        fetch('http://210.19.254.111/Project/deviceUsersReg.php', {
          method: 'POST',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            username: data.data.values.username,
            password: data.data.values.password,
            emailAddress: data.data.values.emailAddress,
            gender: data.data.values.gender,
            dateOfBirth: data.data.values.dateOfBirth,
            categories: categories
          })
        })
        .then((response) => response.json()) //JSON.stringify(response.json()))
        .then((responseJson)=>{
          if(responseJson === "User created!") {
           this.navigate();
          }
        })
        .catch((error)=> {console.log('error',error)});

    } else {
          Alert.alert(
            'Alert',
            'Please select one of the option',
          );
    }
}



    render(){
        let contentToLoad;
        if(this.state.isLoading){
          contentToLoad = (
            <Container style={{backgroundColor: 'black', justifyContent: 'center'}}>
              <ActivityIndicator size="large" color="green"/>
            </Container>
          )
        }else{
            contentToLoad = (
                <Content style={{backgroundColor: 'white'}}>
                 <FlatList 
                     extraData={this.state}
                     data={this.state.dataSource} 
                     keyExtractor={(item, index) => item.id}
                     renderItem={({item}) =>
                            <ListItem  onPress={()=>this.onCheckBoxPress(item.id)}>
                                 <CheckBox
                                  checked={this.state.selectedCategories.includes(item.id) ? true : false}
                                  onPress={()=>this.onCheckBoxPress(item.id)}
                                />
                                <Body>
                                    <Text>{item.category}</Text>
                                </Body>
                            </ListItem>
                    }
                   />
                   <Text></Text>
                  <Button  block onPress={()=>this.onCreateProfile()}>
                      {
                        this.state.isSubmitting ? <ActivityIndicator size="large" color="green"/> :<Text>Submit</Text>  
                      }

                  </Button>
                  <Text> Please choose category you want to recieve notification from and press Submit</Text>
                </Content>
            )
        }

        return (
             <Container style={styles.container}>
              { contentToLoad }
            </Container>
        ); 
    }
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
  }
});


function mapStateToProps(state) {
  return {
    signUp_Data: state.SignUpData
  }
}

export default connect(mapStateToProps)(Profile) 
