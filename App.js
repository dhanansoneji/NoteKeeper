/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  FlatList,
  Button,
  TouchableOpacity,
  Keyboard,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {SearchBar} from 'react-native-elements';

export default class Notepad extends Component {
  constructor(props) {
    super(props);

    (this.array = []),
      (this.state = {
        arrayHolder: [],
        filterArrayHolder: [],
        updateNote_Index: '',
        textInput_Holder: '',
        search: '',
        isUpdateEnable: true,
        isSaveNoteEnable: false,
        noData: true,
      });
  }

  searchText = e => {
    let text = e.toLowerCase();
    let trucks = this.array;
    let filteredName = trucks.filter(item => {
      return item.title.toLowerCase().match(text);
    });
    if (!text || text === '') {
      this.setState({
        noData: true,
        search: e,
      });
    } else if (
      (!Array.isArray(filteredName) && !filteredName.length) ||
      filteredName.length == 0
    ) {
      // set no data flag to true so as to render flatlist conditionally
      this.setState({
        search: e,
        noData: true,
      });
    } else if (Array.isArray(filteredName)) {
      this.setState({
        search: e,
        noData: false,
        filterArrayHolder: filteredName,
      });
    }
  };

  componentDidMount() {
    this.setState({arrayHolder: [...this.array]});
  }

  joinData = () => {
    if (this.state.textInput_Holder === '') {
      return;
    }
    Keyboard.dismiss();
    this.array.push({title: this.state.textInput_Holder});
    this.setState({
      arrayHolder: [...this.array],
      textInput_Holder: '',
    });
  };

  updateData = () => {
    if (this.state.textInput_Holder === '') {
      return;
    }
    Keyboard.dismiss();
    this.array[this.state.updateNote_Index] = {
      title: this.state.textInput_Holder,
    };
    this.setState({
      arrayHolder: [...this.array],
      updateNote_Index: '',
      textInput_Holder: '',
      isUpdateEnable: true,
      isSaveNoteEnable: false,
    });
  };

  textInputHandler = data => {
    this.setState({textInput_Holder: data});
  };

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#607D8B',
        }}
      />
    );
  };

  GetItem(item, index) {
    Alert.alert(index + ' ' + item.title);
  }

  EditItem(item, index) {
    // Alert.alert(item.title + ' ' + index);
    this.setState({
      textInput_Holder: item.title,
      updateNote_Index: index,
      isUpdateEnable: false,
      isSaveNoteEnable: true,
    });
  }

  DeleteItem(item, index) {
    // Alert.alert(item.title + ' ' + index);
    this.array.splice(index, 1);
    this.setState({arrayHolder: [...this.array]});
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {/* <Text>Search Here</Text> */}
        <SearchBar
          placeholder="Type Here..."
          ref="search"
          textInputRef="searchText"
          value={this.state.search}
          onChangeText={this.searchText.bind(this)}
        />

        {/* <Text>Write Here</Text> */}
        <TextInput
          value={this.state.textInput_Holder}
          placeholder="Enter note here"
          multiline={true}
          onChangeText={this.textInputHandler}
          style={styles.input_note}></TextInput>
        <View style={styles.button_group}>
          <View style={styles.button}>
            <Button
              title="Update"
              color="black"
              disabled={this.state.isUpdateEnable}
              onPress={this.updateData}></Button>
          </View>
          <View style={styles.button}>
            <Button
              title="Save Note"
              color="black"
              disabled={this.state.isSaveNoteEnable}
              onPress={this.joinData}></Button>
          </View>
        </View>
        <Text style={styles.save_note_title}>Saved Notes</Text>
        <FlatList
          style={{flex: 0.5}}
          data={this.state.arrayHolder}
          width="100%"
          extraData={this.state.arrayHolder}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={({item, index}) => (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={styles.item}
                onPress={this.GetItem.bind(this, item.title)}>
                {'(' + (index + 1) + ') ' + item.title}
              </Text>
              <View style={{flex: 0.5}}>
                <Icon
                  size={24}
                  color="black"
                  name={Platform.OS === 'ios' ? 'edit' : 'edit'}
                  onPress={() => this.EditItem(item, index)}
                />
              </View>
              <View style={{flex: 0.5}}>
                <Icon
                  size={24}
                  color="black"
                  name={Platform.OS === 'ios' ? 'delete' : 'delete'}
                  onPress={() => this.DeleteItem(item, index)}
                />
              </View>
            </View>
          )}
        />

        <Text style={styles.search_note_title}>Searched Notes</Text>
        {this.state.noData ? (
          <Text style={styles.no_notes_found}>Notes Not Found</Text>
        ) : (
          <FlatList
            style={{flex: 0.5}}
            data={this.state.filterArrayHolder}
            width="100%"
            extraData={this.state.filterArrayHolder}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            renderItem={({item, index}) => (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={styles.item}
                  onPress={this.GetItem.bind(this, item.title)}>
                  {'(' + (index + 1) + ') ' + item.title}
                </Text>
                <View style={{flex: 0.5}}>
                  <Icon
                    size={24}
                    color="black"
                    name={Platform.OS === 'ios' ? 'edit' : 'edit'}
                    onPress={() => this.EditItem(item, index)}
                  />
                </View>
                <View style={{flex: 0.5}}>
                  <Icon
                    size={24}
                    color="black"
                    name={Platform.OS === 'ios' ? 'delete' : 'delete'}
                    onPress={() => this.DeleteItem(item, index)}
                  />
                </View>
              </View>
            )}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input_search: {
    borderRadius: 30,
    minHeight: 40,
    maxHeight: 200,
    margin: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
  },
  input_note: {
    minHeight: 40,
    maxHeight: 200,
    margin: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
  },
  save_note_title: {
    fontSize: 30,
    textAlign: 'center',
    color: 'white',
    marginTop: 20,
    backgroundColor: 'black',
  },
  search_note_title: {
    fontSize: 30,
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'black',
  },
  no_notes_found: {
    flex: 0.8,
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  item: {
    flex: 4,
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  button_group: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '50%',
    paddingHorizontal: 30,
  },
});
