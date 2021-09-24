import React, { useState } from 'react'
import { StyleSheet, View, Image, ScrollView } from 'react-native'
import { Searchbar, Surface, Paragraph, Title, Subheading, Card, Divider, Caption } from 'react-native-paper'

//this function displays the weather and other information to the user based on the city
export default Weather = () => {
  const [search, setSearch] = useState('')
  const [weather, setWeather] = useState({})

  //this function converts military time to standard time
  const parseTime = (time) => {
    let meridiem = ''
    let hours = parseInt(time.substr(11, 2))
    let minutes = time.substr(14, 2)

    if (hours > 24) {
      hours -= 24
    }

    if(hours >= 12){
      hours -= 12
      meridiem = 'PM'
    }else{
      meridiem = 'AM'
    }

    if (hours == 0) {
      hours += 12
    }
    return `${hours}:${minutes} ${meridiem}`
  }

  //this function is asynchronous and calls the weather api
  //based on what the user typed in search it will return a json with all the data from that city
  const getWeather = async () => {
    try {
      const response = await fetch (
        `http://api.weatherapi.com/v1/forecast.json?key=d04bc160b94d46bb92e34432212309&q=${search}&days=1&aqi=yes&alerts=no`
      )
      const json = await response.json()
      json.forecast.forecastday[0].hour.map((hour, index) => {
        hour.id = index
      })
      setWeather(json)
    } catch (error) {
      console.log("ERROR\n", error)
    }
  }

  return (
    
    <View style={styles.container}>
      <Surface style={styles.search}>
        <Searchbar 
          placeholder="Enter a City"
          onChangeText={(city) => setSearch(city)}
          value={search}
          onIconPress={()=>{
            getWeather()
          }}
        />
      </Surface>
      <ScrollView>
        <Surface>
          {
            (Object.keys(weather).length === 0) ? <Subheading style={styles.error}>No location entered</Subheading> 
            : (weather.error) ? <Subheading style={styles.error}>{weather.error.message}</Subheading> : 
            <Surface style={styles.weather}>
              <Card style={styles.main}>
                <Card.Content>
                  <Title style={{textAlign: "center", fontSize: 30}}>{Math.round(weather.current.temp_f) + "°"} </Title>
                  <Paragraph style={{textAlign: "center"}}>{weather.current.condition.text}</Paragraph>
                  <Paragraph style={{textAlign: "center"}}>{"H: " + weather.forecast.forecastday[0].day.maxtemp_f + " - L: " + weather.forecast.forecastday[0].day.mintemp_f}</Paragraph>
                </Card.Content>
                <Card.Cover style={styles.icon} source={{uri: "https:"+weather.current.condition.icon}} />
              </Card>
              <Card style={styles.data}>
                <Card.Content>
                  <Title style={styles.title}>{weather.location.name + ', ' + weather.location.region}</Title>
                  <Divider />
                  
                  <ScrollView
                    horizontal={true}
                  >
                    {weather.forecast.forecastday[0].hour.map(hour => {
                      return (
                        <Surface key={hour.id} style={styles.temps}>
                          <Paragraph>{parseTime(hour.time)}</Paragraph>
                          <Image style={{width: 32, height: 32}} source={{uri: "https:"+hour.condition.icon}} resizeMode={'contain'}/>
                          <Paragraph>{hour.temp_f + "°"}</Paragraph>
                        </Surface>
                      )
                    })}
                  </ScrollView>
                  {/* ------------------------------- */}
                  <Divider />
                  <Surface style={styles.module}>
                    <Surface style={styles.mod1}>
                      <Caption>SUNRISE</Caption>
                      <Title>{weather.forecast.forecastday[0].astro.sunrise.substr(1, 7)}</Title>
                    </Surface>
                    <Surface style={styles.mod2}>
                      <Caption>SUNSET</Caption>
                      <Title>{weather.forecast.forecastday[0].astro.sunset.substr(1, 7)}</Title>
                    </Surface>
                  </Surface>
                  {/* ------------------------------- */}
                  <Divider />
                  <Surface style={styles.module}>
                    <Surface style={styles.mod1}>
                      <Caption>CHANCE OF RAIN</Caption>
                      <Title>{weather.forecast.forecastday[0].day.daily_chance_of_rain + "%"}</Title>
                    </Surface>
                    <Surface style={styles.mod2}>
                      <Caption>HUMIDITY</Caption>
                      <Title>{weather.current.humidity + "%"}</Title>
                    </Surface>
                  </Surface>
                  {/* ------------------------------- */}
                  <Divider />
                  <Surface style={styles.module}>
                    <Surface style={styles.mod1}>
                      <Caption>WIND</Caption>
                      <Title>
                        {
                          weather.current.wind_dir + " " + 
                          weather.current.wind_mph + " mph"
                        }
                      </Title>
                    </Surface>
                    <Surface style={styles.mod2}>
                      <Caption>FEELS LIKE</Caption>
                      <Title>{weather.current.feelslike_f + "°"}</Title>
                    </Surface>
                  </Surface>
                  {/* ------------------------------- */}
                  <Divider />
                  <Surface style={styles.module}>
                    <Surface style={styles.mod1}>
                      <Caption>PRECIPITATION</Caption>
                      <Title>
                        {weather.current.precip_in + " in"}
                      </Title>
                    </Surface>
                    <Surface style={styles.mod2}>
                      <Caption>PRESSURE</Caption>
                      <Title>{weather.current.pressure_in + " inHg"}</Title>
                    </Surface>
                  </Surface>
                  {/* ------------------------------- */}
                  <Divider />
                  <Surface style={styles.module}>
                    <Surface style={styles.mod1}>
                      <Caption>VISIBILITY</Caption>
                      <Title>
                        {weather.current.vis_miles + " miles"}
                      </Title>
                    </Surface>
                    <Surface style={styles.mod2}>
                      <Caption>UV INDEX</Caption>
                      <Title>{weather.current.uv}</Title>
                    </Surface>
                  </Surface>
                </Card.Content>
              </Card>
            </Surface>
          }
        </Surface>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    elevation: 5
  }, 
  search: {
    marginVertical: 20,
  },
  error: {
    alignSelf: "center"
  },
  weather: {
  }, 
  main: {
    alignItems: "center",
    margin: 20,
    elevation: 5
  },
  icon: {
    width: 128,
    height: 128
  }, 
  data: {
    elevation: 5,
    margin: 20,
  },
  title: {
    textAlign: "center",
    margin: 10,
  }, 
  temps: {
    margin: 20,
    alignItems: "center"
  },
  module: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  mod1: {},
  mod2: {},
})