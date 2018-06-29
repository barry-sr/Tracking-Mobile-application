import React, {Component} from 'react';

import {Platform, StyleSheet, AsyncStorage, ActivityIndicator, FlatList } from 'react-native';

import {Container, Header,Text, Button, Left, Right, Body, CheckBox, Title, ListItem, List, Content } from 'native-base';

export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
          isLoading: true,
          selectedCategories: [],
        };
    }

// static navigationOptions = {
//     header:'Profile'
//   }; 


componentDidMount() {
      fetch('http://210.19.254.111/project/CategoriesForProfile.php')
      .then((response) => response.json())
      .then((responseJson) => {
          this.setState({
            isLoading: false,
            dataSource:responseJson,
          });
          console.log('response in jason',responseJson);
          console.log('dataSource', this.state.dataSource);
      })
      .catch((error) => {
        console.error(error);
      });
}

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
    console.log('selected: ', this.state.selectedCategories)
}

    render(){
        let contentToLoad;
        if(this.state.isLoading){
          contentToLoad = (
            <Container style={{flex: 1, backgroundColor: 'black', justifyContent: 'center'}}>
              <ActivityIndicator size="large" color="green"/>
            </Container>
          )
        }else{
            contentToLoad = (
                <Content>
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
                </Content>
            )
        }

        return (
             <Container>
              { contentToLoad }
            </Container>
        ); 
    }
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  }
});

