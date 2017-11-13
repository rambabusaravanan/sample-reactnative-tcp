import React, { Component } from 'react';
import { Text, View, ListView, ActivityIndicator } from 'react-native';
import { H1 } from 'native-base'
// import { Socket } from 'react-native-tcp'
// var net = require('react-native-tcp')

export default class QuoteScreen extends Component {

  ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

  constructor(props) {
    super(props);
    this.state = {
      data: '',
      isLoading: true
    }
  }

  componentDidMount() {
    this.getData()
    this.openTcp()
  }

  openTcp() {
    // var server = net.createServer(function (socket) {
    //   socket.write('excellent!');
    // }).listen(12345);

    // var client = net.createConnection(12345);

    // client.on('error', function (error) {
    //   console.log(error)
    // });

    // client.on('data', function (data) {
    //   console.log('message was received', data)
    // });

    // var client = new Socket();
    // client.connect({
    //   host: '103.210.194.141',
    //   port: 8443
    // });

    // client.on('error', function(error) {
    //   console.log('client on error', error)
    // });

    // client.on('data', function(data) {
    //   console.log('client on data', data)
    // });
  }


  getData() {
    console.log('ws hit ..')

    const ws = new WebSocket('ws://demos.kaazing.com/echo');
    // const ws = new WebSocket('ws://test.mosquitto.org:8080/mqtt');
    // const ws = new WebSocket('ws://103.210.194.141:8443');
    // const ws = new WebSocket('wss://prod-ws.smartd.in:8444');

    ws.onopen = () => {
      console.log('ws opened'); // send a message
      this.setState({
        isLoading: false
      })

      ws.send('Hello 1 ..')
      ws.send('Hello Message ..')
      ws.send('Hello 2 ..')
      setTimeout(function () {
        ws.send('Hello Timed ..')
      }, 1000);

      setInterval(function () {
        ws.send("Hello " + Math.floor((Math.random() * 100) + 1) + " ..!");
      }, 100);

    };

    ws.onmessage = (e) => {
      console.log('ws message: ', e.data);
      this.setState({
        data: e.data
      })
    };

    ws.onerror = (e) => {
      console.log('ws error: ', e.message);
    };

    ws.onclose = (e) => {
      console.log('ws close: ', e.code, e.reason);
    };

    // ws.subscribe('/World', () => {
    //   console.log('ws subscribe: ', e);
    // });

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
        <Text>{this.state.data}</Text>
        {/* <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData, i) => <ItemView data={rowData} />}
        /> */}
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