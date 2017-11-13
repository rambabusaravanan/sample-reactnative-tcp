import React, { Component } from 'react';
import { Text, View, ListView, ActivityIndicator } from 'react-native';
import { H1 } from 'native-base'

export default class HomeScreen extends Component {

  ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

  constructor(props) {
    super(props);
    this.state = {
      dataSource: this.ds.cloneWithRows([]),
      isLoading: true
    }
  }

  componentDidMount() {
    this.getData().then(data => {
      this.setState({
        isLoading: false,
        dataSource: this.ds.cloneWithRows(data)
      })
    })
  }


  getData() {
    console.log('request hit ..')
    return fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('response received ..')
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }


  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{ flex: 1, paddingTop: 2 }}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData, i) => <ItemView data={rowData} />}
        />
      </View>
    );
  }
}


const ItemView = ({ data }) => (
  <View style={{ backgroundColor: 'white', margin: 2, padding: 4 }}>
    <Text style={{ fontWeight: 'bold' }}>{data.name}</Text>
    <Text>{data.email}</Text>
    <Text>{data.phone}</Text>
  </View>
)