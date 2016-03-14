'use strict';

import React, {
  Component,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  ListView,
  Image,
  StyleSheet,
  ActivityIndicatorIOS
} from 'react-native';

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.result.items)
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.ds.cloneWithRows(nextProps.result.items)
    });
  }

  renderRow(rowData) {
    return (
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.rowButton}
          activeOpacity={(this.props.isViewingVideo) ? 1 : 0.2}>
          <View style={styles.rowWrapper}>
            <Image
              style={styles.thumbnail}
              source={{uri: rowData.snippet.thumbnail.default.url}} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  handleMore() {
    this.props.moreVideos(this.props.keyword, this.props.results.nextPageToken);
  }

  render() {
    let footer = null;
    const isLoading = this.props.isSearching || this.props.isViewingVideo;
    if (isLoading) {
      footer = (
        <View style={styles.footer}>
          <ActivityIndicatorIOS
            animating={isLoading}
            color='#FFFFFF'
            size='small' />
        </View>
      );
    } else {
      footer = (
        <TouchableHighlight
          style={styles.footer}
          underlayColor='#FFFFFF'
          onPress={this.handleMore.bind(this)}>
          <Text style={styles.moreButtonText}>Show More</Text>
        </TouchableHighlight>
      );
    }

    return (
      <View style={styles.container}>
        <ListView
          style={styles.items}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)} />
        {this.props.result.nextPageToken ? footer : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  items: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    padding: 10
  },
  footer: {
    padding: 15,
    flexDirection: 'row',
    backgroundColor: '#E62117',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  moreButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold'
  },
  row: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    marginBottom: 10
  },
  rowWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  rowButton: {
    padding: 10
  },
  title: {
    flex: 1,
    marginLeft: 10,
    color: '#4078C0',
    fontWeight: 'bold'
  },
  thumbnail: {
    width: 120,
    height: 90
  }
});

export default SearchResult;
