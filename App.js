import {
  Button,
  FlatList,
  Image,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  const [Data, setData] = useState([]);
  const [search, setSearch] = useState([]);
  // useEffect(() => {
  //   PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  // }, []);

  const getData = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View>
      <TextInput
        style={{marginHorizontal: 35, borderColor:'grey', borderWidth:2, padding:4, borderRadius:4, margin:4}}
        placeholder="   🔍   Search for product"
        value={search}
        onChangeText={val => {
          setSearch(val);
          console.log(search);
        }}
      />
      <FlatList
        // horizontal={true}
        data={Data}
        numColumns={2}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                width: '47%',
                borderColor: 'black',
                borderWidth: 1,
                marginHorizontal: '1.5%',
                marginVertical: 30,
                padding: 10,
              }}>
              <Image
                style={{
                  width: 'auto',
                  height: 300,
                  resizeMode: 'contain',
                }}
                source={{uri: item.image}}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: 'red',
                }}>
                {item.title}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: 'grey',
                }}>
                {item.description?.substring(0, 100)}...
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: 'green',
                  textAlign: 'right',
                  margin: 2,
                }}>
                ₹{item.price}
              </Text>
              {/* <Text>{item.image}</Text> */}
              <Text
                style={{
                  fontSize: 12,
                  color: 'grey',
                }}>
                {item.category}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
