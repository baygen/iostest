import React, { PureComponent } from "react";
import { View, Text, Image,  StyleSheet, ActivityIndicatorIOS, ImageBackground } from "react-native";
import { Icon } from 'react-native-elements';


export default class ItemPure extends PureComponent {

  render() {
    const imgUrl = this.props.uri.replace('https','http')

    return (
      <View style={styles.view}>

        <Image style={styles.image} source={{ uri: imgUrl }} />

        <View style={styles.container}>
          <View style={styles.description}>
            <View style={{flexDirection: 'column', flex: 0.4}}>

              <Text style={styles.price}>${this.props.rent}</Text>
              <Text style={styles.descriptionText}>{this.props.text}</Text>
            </View>

            <View style={{ flex:0.2}}/>
            
            <View style={{ flex:0.4, alignItems:'flex-end',}}>
              <Icon reverse
                  size={26}
                  raised
                  name='map-marker'
                  type='font-awesome'
                  color='#c8e1ffa6'
                  TouchableHighlight
                  onPress={()=>this.props.buttonClick(this.props.text)}/>
            </View>
          </View>

          <View style={styles.descriptionBottom}>
            {/* <Text style={styles.price}>${this.props.rent}</Text> */}
          </View>
        </View>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  view: {
    height: 310,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
  description: {
    flexDirection: 'row',
    height: '20%',
    width: '100%'
  },
  descriptionBottom: {
    flexDirection: 'row',
    height: '15%',
    width: '100%'
  },
  descriptionText: {
    color: 'white',
    flex: 0.5,
    paddingLeft: 10,
    fontSize: 14
  },
  price: {
    color: 'white',
    flex: 0.42,
    paddingLeft: 10,
    fontSize: 26,
    fontWeight: '700',
    justifyContent: 'flex-end'
  },
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  }
});
