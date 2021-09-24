import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { Surface, Card, Paragraph } from 'react-native-paper'

//function that shows images of mars using NASA's api
export default Nasa = () => {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]
  const [nasaIOTD, setNasaIOTD] = useState({})
  const [roverImages, setRoverImages] = useState({})
  
  //runs everytime the screen is focused
  useEffect(() => {
    console.log("useEffect running . . .")
    getImage();
    getRoverImages()
  }, [])

  //asynchronous function that gets the image of the day
  //this shows on top and it uses the nasa APOD api
  const getImage = async () => {
    try {
      const response = await fetch (
        'https://api.nasa.gov/planetary/apod?api_key=haOIZkmB0Qds9PoU6P47V1lWp2mt5LsD9cKUbGAC'
      )
      const json = await response.json()
      console.log(json)
      setNasaIOTD(json)
    } catch(error) {
      console.log("ERROR\n", error)
    }
  }

  //another asynchronous function that gets the images from mars from a rover
  //this calls nasa's mars-photos api
  const getRoverImages = async () => {
    try {
      const response = await fetch (
        "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=2&page=2&api_key=haOIZkmB0Qds9PoU6P47V1lWp2mt5LsD9cKUbGAC"
      )
      const json = await response.json()
      setRoverImages(json)
    } catch (error) {
      console.log("ERROR\n", error)
    }
  }

  //this function converts the date format 00-00-0000 to month day, year
  const parseDate = (date) => {
    const parsedDate = new Date(date)
    const month = monthNames[parsedDate.getMonth()]
    let day = parsedDate.getDate()+1
    day = day + ( (day % 10 == 1) ? "st" : (day % 10 == 2) ? "nd" : (day % 10 == 3) ? "rd" : "th" )
    const year = parsedDate.getFullYear()
    const dateString = `${month} ${day}, ${year}`
    return dateString
  }

  return (
    <ScrollView>
      <Surface style={styles.container}>
        <Card style={styles.APOD}>
          <Card.Title title={nasaIOTD.title} subtitle={parseDate(nasaIOTD.date)}/>
          <Card.Cover source={{uri: nasaIOTD.url}}/>
          <Card.Content>
            <Paragraph>By: {nasaIOTD.copyright}</Paragraph>
            <Paragraph>{nasaIOTD.explanation}</Paragraph>
          </Card.Content>
        </Card>
        {roverImages.photos && roverImages.photos.map(img => {
          return (
            <Card key={img.id} style={styles.APOD}>
              <Card.Title title={img.rover.name + " Rover"} subtitle={img.camera.full_name} />
              <Card.Cover source={{uri: img.img_src}} />
              <Card.Content>
                <Paragraph>Taken on {parseDate(img.earth_date)}</Paragraph>
              </Card.Content>
            </Card>
          )
        })}
      </Surface>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, 
  APOD: {
    margin: 20,
    elevation: 5,
  },
})