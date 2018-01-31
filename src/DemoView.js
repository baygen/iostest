import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import Item from './ItemPureComponent'
import axios from 'axios'

class FlatListDemo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 2,
      hasNext: true,
      error: null,
      refreshing: false,
      url: 'http://18.194.221.79:8080/properties'
    };
    this.makeRemoteRequest = this.makeRemoteRequest.bind(this)
    this.handleLoadMore = this.handleLoadMore.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
    this.renderItemInList = this.renderItemInList.bind(this)
    this.getItemLayout = this.getItemLayout.bind(this)
    this.handleRefresh = this.handleRefresh.bind(this)
    this.makeRefreshRequest = this.makeRefreshRequest.bind(this)
    this.getData = this.getData.bind(this)
  }

  componentDidMount() {
    console.log(`componentDidMount `)
    this.makeRemoteRequest();
  }

  makeRemoteRequest() {
    this.setState({ loading: true })

    this.getData()
      .then(res => {
        const { info, data} = res
        this.setState({
          data: [...this.state.data, ...data],
          loading: false,
          hasNext: info.hasNext
        });
      })

  };

  getData() {
    const { page } = this.state;
    console.log(page)
    return axios
      .get(this.state.url, {
        params: {
          page: page
        }
      })
      .then(res =>{ 
        console.log(`fetched ok`)
        if(!res.data) throw 'Err'
        return res.data
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  }

  makeRefreshRequest() {
    this
      .getData()
      .then(res => {
        const { info, data} = res

        console.log(`makeRefreshRequest ok`)
        this.setState({
          data: data,
          refreshing: false,
          hasNext: info.hasNext
        });
      })
  }

  handleRefresh() {
    console.log(`Handle refresh`)
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      },
      () => {
        this.makeRefreshRequest();
      }
    );
  };

  handleLoadMore() {
    console.log(`handleLoadMore `)
    if (!this.state.loading && this.state.hasNext)
      this.setState(
        {
          page: this.state.page + 1
        },
        () => {
          this.makeRemoteRequest();
        }
      );
  };

  buttonClick(name) {
    console.log(name)
  }

  getItemLayout(data, index) {
    return { length: 310, offset: 310 * (index - 1), index }
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 6,
          width: "100%",
          // backgroundColor: "#d7d7d7bd"
        }}>
      </View>
    );
  };

  renderItemInList({ item }) {
    let uri = item.listing.images[0].thumbUrl || item.listing.images[0].url
    return <Item  uri={uri} 
                  rent={item.listing.rent.monthlyPrice} 
                  text={`${item.displayedAddress}`} 
                  buttonClick={this.buttonClick} />
  }

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  };

  renderFooter() {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#ccc9c92b",
          backgroundColor: "#dbb3b32b"
        }}
      >
        <ActivityIndicator animating size="large" color="red" />
      </View>
    );
  };

  render() {
    return (
      <FlatList
        data={this.state.data}
        renderItem={this.renderItemInList}
        keyExtractor={item => item._id}
        ListHeaderComponent={this.renderHeader}
        ListFooterComponent={this.renderFooter}
        onRefresh={this.handleRefresh}
        refreshing={this.state.refreshing}
        onViewableItemsChanged={this.onViewableItemsChanged}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={1}
        getItemLayout={this.getItemLayout}
      />
    );
  }
}

export default FlatListDemo;
