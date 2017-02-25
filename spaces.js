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

export class Space extends Component {
   constructor(props) {
     super(props)
     this.state = {owner: null}
   }
   componentDidMount() {
     this.getUser()
   }
    getUser() {
        fetch(this.props.user, {
              method: 'GET',
              headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
             },
           }).then((response) => response.json())
             .then((responseData) => {
               this.setState({owner: responseData.username})
           }).done();
      }
   unmountSpace() {
     this.props.navigator.push({id: 'SharedItem', 'space_pk': this.props.pk})
   }
   render() {
     return (
       <TouchableOpacity onPress={() => this.unmountSpace()}>
          <View style={styles.space}>
            <Text style={styles.spacetext}>{this.props.title}</Text>
            <Text>Owned by: <ShareUser username={this.state.owner} /></Text>
          </View>
      </TouchableOpacity>
    )
   }
 }

 export class  ShareUser extends Component {
   render() {
      return (
        <Text>{this.props.username}</Text>
      )
   }
 }

 export class  SharedItemList extends Component {
   constructor(props) {
     super(props)
     this.state = {dataSource: new ListView.DataSource({
       rowHasChanged: (row1, row2) => row1 !== row2,
     }),
     loaded: false,
    };
   }
  getSharedItems() {
    url = 'http://localhost:8000/api/shared-items/'+this.props.space_pk
     fetch(url, {
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
    this.getSharedItems()
  }
   render() {
       return (
         <ListView
            style={styles.container}
            dataSource={this.state.dataSource}
            renderRow={(rowData, rowID, sectionID) =>
                        <SharedItemListItem
                          title={rowData.text}
                          shared_at={rowData.shared_at}
                          shared_by={rowData.shared_by.user}
                          url={rowData.url}
                          navigator={this.props.navigator} />
                        }
            navigator={this.props.navigator}
          />
       )
   }
 }

 export class SharedItemListItem extends Component {
   loadWebView() {
       this.props.navigator.push({id: 'SharedItemWebView', 'uri': this.props.url})
   }
   render() {
     return (
          <View style={styles.space}>
            <Text style={styles.spacetext}>{this.props.title}</Text>
            <TouchableOpacity onPress={() => this.loadWebView()}>
              <Text>Link: {this.props.url}</Text>
            </TouchableOpacity>
            <Text>Posted by: {this.props.shared_by}</Text>
            <Text>Posted at: {this.props.shared_at}</Text>
            <Text style={{marginTop: 20}}>Leave a Comment</Text>
          </View>
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
     backgroundColor: 'pink',
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
