import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ScrollView, Image } from 'react-native'

//images function shows random images using picsum api
export default Images = () => {
  //saves list of images here
  const [images, setImages] = useState([]);

  //runs everytime the screen is focused
  useEffect(() => {
    console.log("useEffect running . . .")
    getImages();
  }, [])

  //function that runs asynchronously to get the list of images
  //uses the picsum api to get a list of images
  const getImages = async () => {
    try {
      const response = await fetch(
        'https://picsum.photos/v2/list?limit=10'
      )
      const json = await response.json()
      setImages(json)
      console.log("Images received!")
    } catch (error) {
      console.error(error)
    }    
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {images.map(img => {
          return (
            <Image 
              key={img.id}
              source={{ uri: img.download_url }} 
              style={{ width: 400, height: 300, }} 
              resizeMode="contain"
            />
          )
        })}
        
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: "center",
    alignItems: "center"
  }
})