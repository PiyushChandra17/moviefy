import React, { useState, useEffect} from 'react'
import { View,Text,ScrollView,Image,StyleSheet,Dimensions,ActivityIndicator,Modal,Pressable } from 'react-native'
import { getMovie } from '../services/services'
import StarRating from 'react-native-star-rating';
import dateFormat from 'dateformat'
import PlayButton from '../components/PlayButton';
import Video from '../components/Video';

const placeholderImage = require('../assets/images/placeholder.png')

const height = Dimensions.get('screen').height

const Detail = ({ route, navigation }) => {
    const movieId = route.params.movieId
    const [movieDetail,setMovieDetail] = useState()
    const [loaded,setLoaded] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);

    
    useEffect(() => {
        getMovie(movieId).then(movieData => {
            setMovieDetail(movieData)
            setLoaded(true)
        }).catch(err => {
            console.log(err)
        })
    },[movieId])

    const videoShown = () => {
        setModalVisible(!modalVisible)
    }

    return ( 
        <>
            {loaded && (
                <View>
                    <ScrollView>
                        <Image 
                            resizeMode='cover'
                            style={styles.image}
                            source={movieDetail.poster_path ? { uri: 'https://image.tmdb.org/t/p/w500' + movieDetail.poster_path } : placeholderImage}
                        />
                        <View style={styles.container}>
                            <View style={styles.playButton}>
                                <PlayButton handlePress={videoShown}/>
                            </View>
                            <Text style={styles.movieTitle}>{movieDetail.title}</Text>
                        
                            {movieDetail.genres && (
                                <View style={styles.genresContainer}>
                                    {movieDetail.genres.map(genre => {
                                        return <Text style={styles.genre} key={genre.id}>{genre.name}</Text>
                                    })}
                                </View>
                            )}
                            <StarRating 
                                maxStars={5}
                                rating={movieDetail.vote_average / 2}
                                disabled={true}
                                fullStarColor={'gold'}
                                starSize={30}
                            />
                            <Text style={styles.overview}>{movieDetail.overview}</Text>
                            <Text style={styles.release}>{'Release Date: ' + dateFormat(movieDetail.release_date, 'mmmm dd, yyyy')}</Text>
                        </View>
                    </ScrollView>
                    <Modal
                        animationType="slide"
                        visible={modalVisible}

                    >
                        <View style={styles.videoModal}>
                            <Pressable onPress={() => videoShown()}>
                                <Text>{'Hide Modal'}</Text>
                            </Pressable>
                        </View>
                    </Modal>
                </View>
            )}
            {!loaded && <ActivityIndicator size="large" />}
        </>
    );
}

const styles = StyleSheet.create({
    image: {
        height: height / 1.5
    },
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    movieTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10
    },
    genresContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    genre: {
        marginRight: 10,
        fontWeight: 'bold'
    },
    overview: {
        padding: 15
    },
    release: {
        fontWeight: 'bold'
    },
    playButton: {
        position: 'absolute',
        top: -25,
        right: 20
    },
    videoModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Detail;