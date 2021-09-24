import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ScrollView, Linking } from 'react-native'
import { Button, Card, Title, Paragraph } from 'react-native-paper'

//this function shows breaking news in the US
export default Home = () => {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]
  //this holds the json data
  const [news, setNews] = useState([])

  //runs everytime the screen is in focus
  useEffect(() => {
    console.log("useEffect running . . .")
    getNews();
    //console.log(news)
  }, [])

  //parseDate converts date string to month day, year and returns the formatted date
  const parseDate = (date) => {
    const parsedDate = new Date(date)
    const month = monthNames[parsedDate.getMonth()]
    let day = parsedDate.getDate()
    day = day + ( (day % 10 == 1) ? "st" : (day % 10 == 2) ? "nd" : (day % 10 == 3) ? "rd" : "th" )
    const year = parsedDate.getFullYear()
    const dateString = `${month} ${day}, ${year}`
    return dateString
  }

  //get news function runs asynchronously to get breaking news from an API
  //the API is called gnews and once it retrieves the json data, it saves it in the news hook
  const getNews = async () => {
    try {
      const response = await fetch(
        'https://gnews.io/api/v4/top-headlines?country=us&limit=10&token=98b7b18270c5f6eabe281be1bc10ddda'
      )
      let json = await response.json()
      json = json["articles"]
      json.forEach((article, index) => {
        article.id = index
      });
      setNews(json)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {news && news.map(article => {
          return (
            <Card key={article.id} style={styles.article}>
              <Card.Content>
                <Title>{article.title}</Title>
                <Paragraph>{article.description}</Paragraph>
              </Card.Content>
              <Card.Cover source={{ uri: article.image }} resizeMode={"cover"}/>
              <Card.Content>
                <Paragraph>Published by: {article.source.name}</Paragraph>
                <Paragraph>{parseDate(article.publishedAt)}</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button
                  onPress={ () => { Linking.openURL(article.url) } }
                  color="#008cff"
                >
                  Read Article
                </Button>
              </Card.Actions>
            </Card>
          )
        })}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, 
  article: {
    margin: 10,
    elevation: 5
  }
})