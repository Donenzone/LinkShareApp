/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 /**
  * Sample React Native App
  * https://github.com/facebook/react-native
  */

 import React, { Component, } from 'react';
 import {
   AppRegistry,
   Image,
   ScrollView,
   StyleSheet,
   Text,
   View,
   ListView,
   TouchableOpacity,
   Navigator,
   Icon,
   TabBarIOS,
 } from 'react-native';
 import { Space, SharedItemList, ShareUser, SharedItem } from './spaces.js'
 import { SharedItemWebView } from './webview'

 const HOME_ROUTE = { id: 'Space' };
 const SHARED_ITEM_ROUTE = { id: 'Shared Items'};

 var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

export default class Nav extends Component {
  render() {
    return (
      <Navigator
        initialRoute={HOME_ROUTE}
        renderScene={(route, navigator) => {return this.renderScene(route, navigator)}}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={{
              LeftButton: (route, navigator, index, navState) =>
               { },
              RightButton: (route, navigator, index, navState) =>
                {  },
              Title: (route, navigator, index, navState) =>
                { return (<Text style={styles.spacetext}>Spaces</Text>); },
            }}
            style={{backgroundColor: 'lightblue'}}
          />
       }
      />
    )
  }
  renderScene(route, navigator) {
    switch(route.id) {
      case "Space":
       return <MainView navigator={navigator} />
      case "SharedItem":
       return <SharedItemList navigator={navigator} space_pk={route.space_pk} />
      case "SharedItemWebView":
       return <SharedItemWebView navigator={navigator} uri={route.uri} />
    }
  }
}

 class LinkShareiOS extends Component {
   constructor(props) {
     super(props)
     this.state = {dataSource: new ListView.DataSource({
       rowHasChanged: (row1, row2) => row1 !== row2,
     }),
     loaded: false,
    };
   }
  getSpaces() {
     fetch('http://localhost:8000/api/spaces/', {
       method: 'GET',
       headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
    .then((responseData) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData)
      });
    }).done();
   }
   componentDidMount() {
     this.getSpaces()
   }
   render() {
     return (
       <ListView
          style={styles.container}
          dataSource={this.state.dataSource}
          renderRow={(rowData, rowID, sectionID) =>
                        <Space
                          title={rowData.name}
                          user={rowData.owner.user}
                          navigator={this.props.navigator}
                          pk={rowData.pk} /> }
          navigator={this.props.navigator}
        />
     )
   }
 }

 class MainView extends Component {
   render() {
     return (
       <TabBarIOS>
          <TabBarIOS.Item
            selected
            systemIcon="most-viewed"
            title='Spaces'>
            <LinkShareiOS navigator={this.props.navigator} />
          </TabBarIOS.Item>
           <TabBarIOS.Item
              systemIcon="contacts"
             title='Profile'>
             <LinkShareiOS navigator={this.props.navigator} />
           </TabBarIOS.Item>
      </TabBarIOS>
     )
   }
 }

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#F5FCFF',
     paddingVertical: 60,
   },
   space: {
     borderStyle: 'solid',
     borderColor: '#d5d5d5',
     backgroundColor: '#eee',
     borderWidth: 1,
     borderRadius: 3,
     padding: 3,
     paddingLeft: 5,
     paddingRight: 5,
     margin: 10,
   },
   spacetext: {
     fontSize: 20,
     textAlign: 'center',
     margin: 10,
   }
 })

AppRegistry.registerComponent('LinkShareiOS', () => Nav);
