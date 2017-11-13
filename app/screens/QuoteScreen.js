import React, { Component } from 'react';
import { Text, View, ListView, FlatList, ActivityIndicator } from 'react-native';
import { H1 } from 'native-base'
// import { Socket } from 'react-native-tcp'
var net = require('react-native-tcp')

export default class QuoteScreen extends Component {

  ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

  constructor(props) {
    super(props);
    this.state = {
      data: [
        // { name: "HDFC", value: 2365 },
        // { name: "IDBI", value: 556 },
        // { name: "AXIS", value: 7932 },
        // { name: "IDEA", value: 4826 },
        // { name: "GENUS", value: 9864 },
        // { name: "JBL", value: 9865 },
        // { name: "AUTO", value: 5365 },
      ],
      isLoading: false
    }
  }

  componentDidMount() {
    // this.getData()
    this.openTcp()
  }

  openTcp() {

    var client = net.createConnection({
      // host: '103.210.194.141',
      // port: 8443,
      host: '192.168.7.159',
      port: 50007
    });
    //   client.write('{"request":{"data":{"symbols":[{"symbol":"209057_MFO"},{"symbol":"-21"},{"symbol":"-101"}]},"streaming_type":"quote","request_type":"subscribe","response_format":"json"},"echo":{"AppID":"5830cf9556f245ca41ed2b56fd6c763a"}}');

    client.on('connect', () => {
      this.setState({ isLoading: false })
      console.log('TCP :::: on connect')
    })

    client.on('error', function (error) {
      console.log('TCP :::: on error')
      console.log(error)
    });

    client.on('data', (data) => {
      data = JSON.parse(String.fromCharCode(...Object.values(data)))
      this.setState({ data })
      console.log('TCP :::: on data', data)
    });

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
      }, 1000);

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
        {/* <Text>{this.state.data}</Text> */}
        <FlatList
          data={this.state.data}
          renderItem={({ item }, i) => <ItemView key={i} data={item} />}
        />
      </View>
    );
  }
}


const ItemView = ({ data }) => (
  <View style={{ backgroundColor: 'white', margin: 2, padding: 4 }}>
    <Text style={{ fontWeight: 'bold' }}>{data.name}</Text>
    <Text>{data.value}</Text>
  </View>
)