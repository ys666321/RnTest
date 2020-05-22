import React, {Component} from 'react';
import {Text,View,Button,TouchableOpacity,ScrollView,Image,Modal,
} from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {songList: [], modalVisible: false, info: {}};
  }

  componentDidMount() {
    fetch('http://www.cjlly.com:3041/record')
      .then(res => res.json())
      .then(res => {
        this.setState({
          songList: res,
        });
      });
  }

  renderList = ({item, index}) => {
    return (
      <View
        key={index}
        style={{
          height: 125,
          backgroundColor: '#fff',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            marginRight: 5,
          }}>
          {index + 1}
        </Text>
        <Image
          source={{uri: item.img}}
          style={{
            height: 88,
            width: 125,
            resizeMode: 'stretch',
            borderRadius: 5,
          }}
        />

        <Text
          style={{
            fontSize: 16,
            flex: 1,
            textAlign: 'center',
            color: '#4183c4',
          }}>
          {item.name}
        </Text>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              width: 50,
              height: 80,
              backgroundColor: '#fff',
              justifyContent: 'center',
              marginRight: 10,
            }}>
            <Button
              title="删除"
              color="rgba(255, 120, 0, 1)"
              onPress={() => {
                var res = JSON.parse(JSON.stringify(this.state.songList));
                for (let i = 0; i < this.state.songList.length; i++) {
                  if (item.id === this.state.songList[i].id) {
                    res.splice(i, 1);
                  }
                }
                this.setState({
                  songList: res,
                });
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    return (
      <ScrollView style={{backgroundColor: '#fff'}}>
        <Text
          style={{
            fontSize: 20,
            lineHeight: 25,
            paddingTop: 10,
            paddingLeft: 10,
          }}>
          歌曲列表
        </Text>
        {this.state.songList.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                this.setState({
                  modalVisible: true,
                  info: item,
                });
              }}>
              {this.renderList({item, index})}
            </TouchableOpacity>
          );
        })}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({
              modalVisible: false,
            });
          }}>
          <View style={{marginTop: 22}}>
            <Image
              source={{uri: this.state.info.img}}
              style={{
                height: 88,
                width: '100%',
              }}
            />
          </View>
        </Modal>
      </ScrollView>
    );
  }
}
module.exports = App;
