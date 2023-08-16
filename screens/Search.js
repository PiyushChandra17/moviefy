import React, { useState } from 'react'
import { SafeAreaView,View,Text,TextInput,StyleSheet, TouchableOpacity,FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { searchMovieTv } from '../services/services';
import Card from '../components/Card';
import Error from '../components/Error';

const Search = ({ navigation }) => {
    const [text,onChangeText] = useState()
    const [searchResults,setSearchResults] = useState()
    const [error,setError] = useState(false)

    const onSubmit = (query) => {
        Promise.all([
            searchMovieTv(query,'movie'),
            searchMovieTv(query, 'tv')
        ])
            .then(([movies,tv]) => {
                const data = [...movies, ...tv]
                setSearchResults(data)
            })
            .catch(() => {
                setError(true)
            })
    }

    return (
        <React.Fragment>
            <SafeAreaView>
                <View style={styles.container}>
                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeText}
                            value={text}
                            placeholder={"Search Movie or TV Show"}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => {onSubmit(text)}}
                    >
                        <Icon name={"search-outline"} size={30} />
                    </TouchableOpacity>
                    
                </View>

                <View style={styles.searchItems}>
                    {searchResults && searchResults.length > 0 && (
                        <FlatList 
                            numColumns={3}
                            data={searchResults}
                            renderItem={({ item }) => <Card navigation={navigation} item={item}/>}
                            keyExtractor={item => item.id}
                        />
                    )}

                    {searchResults && searchResults.length === 0 && (
                        <View style={[styles.empty, { paddingTop: 20 }]}>
                            <Text>No results matching your criteria.</Text>
                            <Text>Try different keywords.</Text>
                        </View>
                    )}

                    {!searchResults && (
                        <View style={styles.empty}>
                            <Text>Type something to start searching</Text>
                        </View>
                    )}

                    {error && <Error />}

                </View>
            </SafeAreaView>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    input: {
      borderRadius: 15,
      borderWidth: 0.5,
      height: 50,
      padding: 8
    },
    container: {
        padding: 10,
        paddingTop: 60,
        flexDirection: 'row',
        alignItems: "center"
    },
    form: {
        flexBasis: 'auto',
        flexGrow: 1,
        paddingRight: 8
    }
  });

export default Search;