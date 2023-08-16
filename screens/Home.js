import React, { useState,useEffect} from 'react'
import { View,Text,StyleSheet,Dimensions,FlatList, ScrollView, ActivityIndicator} from 'react-native'
import { getPopularMovies,getUpcomingMovies,getPopularTv, getFamilyMovies, getDocumentaryMovies,getActionMovies,getAdventureMovies } from '../services/services'
import axios from 'axios'
import { SliderBox } from "react-native-image-slider-box";
import List from '../components/List';
import Error from '../components/Error';

const dimensions = Dimensions.get('screen')

const Home = ({ navigation }) => {
    const [moviesImages,setMoviesImages] = useState('')
    const [popularMovies,setPopularMovies] = useState('')
    const [popularTv,setPopularTv] = useState()
    const [familyMovies,setFamilyMovies] = useState('')
    const [documentaryMovies,setDocumentaryMovies] = useState('')
    const [actionMovies,setActionMovies] = useState('')
    const [adventureMovies,setAdventureMovies] = useState('')
    const [error,setError] = useState(false)
    const [loaded,setLoaded] = useState(false)

    const getData = () => {
        return Promise.all([
            getUpcomingMovies(),
            getPopularMovies(),
            getPopularTv(),
            getFamilyMovies(),
            getDocumentaryMovies(),
            getActionMovies(),
            getAdventureMovies(),
            setLoaded(true)
        ])
    }

    useEffect(() => {
        getData().then(([upcomingMoviesData,popularMoviesData,popularTvData,familyMoviesData,documentaryMoviesData,actionMoviesData,adventureMoviesData]) => {
            const moviesImagesArray = []
            upcomingMoviesData.forEach(movie => {
                moviesImagesArray.push('https://image.tmdb.org/t/p/w500' + movie.poster_path)
            })
            setMoviesImages(moviesImagesArray)
            setPopularMovies(popularMoviesData)
            setPopularTv(popularTvData)
            setFamilyMovies(familyMoviesData)
            setDocumentaryMovies(documentaryMoviesData)
            setActionMovies(actionMoviesData)
            setAdventureMovies(adventureMoviesData)
        }).catch((err) => {
            setError(err)
        })
        .finally(() => {
            setLoaded(true)
        })
    },[])

    return (
        <>
            {loaded && !error && (
                <ScrollView>
                {moviesImages && (
                    <View style={styles.sliderContainer}>
                        <SliderBox 
                            images={moviesImages} 
                            autoplay={true} 
                            circleLoop={true}
                            sliderBoxHeight={dimensions.height / 1.5}
                            dotStyle={styles.sliderStyle}
                        />
                    </View>
                )}

                {popularMovies && (
                    <View style={styles.carousel}>
                        <List navigation={navigation} title="Popular Movies" content={popularMovies}/>
                    </View>
                )}

                {popularTv && (
                    <View style={styles.carousel}>
                        <List navigation={navigation} title="Popular TV Shows" content={popularTv}/>
                    </View>
                )}
                
                {familyMovies && (
                    <View style={styles.carousel}>
                        <List navigation={navigation} title="Family Movies" content={familyMovies}/>
                    </View>
                )}  
                
                {documentaryMovies && (
                    <View style={styles.carousel}>
                        <List navigation={navigation} title="Documentary Movies" content={documentaryMovies}/>
                    </View>
                )}

                {actionMovies && (
                    <View style={styles.carousel}>
                        <List navigation={navigation} title="Action Movies" content={actionMovies}/>
                    </View>
                )}
                
                {adventureMovies && (
                    <View style={styles.carousel}>
                        <List navigation={navigation} title="Adventure Movies" content={adventureMovies}/>
                    </View>
                )}
                
            </ScrollView>
            )}

            {!loaded && <ActivityIndicator size="large" />}
            {error && <Error />}
        </>
    );
}

const styles = StyleSheet.create({
    sliderContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    sliderStyle: {
        height: 0
    },
    carousel: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
})

export default Home;