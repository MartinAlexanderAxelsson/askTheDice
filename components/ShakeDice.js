import React, { useState, useEffect } from "react"
import { StatusBar } from "expo-status-bar"
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableWithoutFeedback,
} from "react-native"
import { Accelerometer } from "expo-sensors"

const ShakeDice = () => {
  const [diceImg, setDiceImg] = useState(require("../assets/endNrs_1.png"))
  const [backgroundColor, setBackgroundColor] = useState("#f3b158")
  const [subscription, setSubscription] = useState(null)
  const [diceResultNumber, setDiceResultNr] = useState()
  const [isSpinning, setIsSpinning] = useState(false)
  const diceSpin = require("../assets/diceSpin2.gif")

  const diceImages = [
    require("../assets/endNrs_1.png"),
    require("../assets/endNrs_2.png"),
    require("../assets/endNrs_3.png"),
    require("../assets/endNrs_4.png"),
    require("../assets/endNrs_5.png"),
    require("../assets/endNrs_6.png"),
  ]

  const backgroundColors = [
    "#f3b158",
    "#73c9e4",
    "#94CBA2",
    "#ED6967",
    "#FCF07E",
    "#C6C6C6",
  ]
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  })

  useEffect(() => {
    Accelerometer.setUpdateInterval(1000)
    subscribe()
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (isShakingEnough(data)) {
      rollDice()
    }
  }, [data])

  const subscribe = () => {
    setSubscription(
      Accelerometer.addListener((accelerometerData) => {
        setData(accelerometerData)
      })
    )
  }

  const unsubscribe = () => {
    subscription && subscription.remove()
    setSubscription(null)
  }

  const rollDice = () => {
    const randomNr = Math.floor(Math.random() * 6)
    setDiceImg(diceSpin)
    setIsSpinning(true)
    setBackgroundColor("#95B9FA")

    setTimeout(() => setBackgroundColor("#FA7244"), 100)
    setTimeout(() => setBackgroundColor("#95B9FA"), 700)
    setTimeout(() => setBackgroundColor("#FA7244"), 1400)
    setTimeout(() => setBackgroundColor("#95B9FA"), 2100)

    setTimeout(() => setIsSpinning(false), 3000)
    setTimeout(
      () => setDiceResultNr(`The Dice shows number ${randomNr + 1}`),
      3000
    )
    setTimeout(() => setDiceImg(diceImages[randomNr]), 3000)
    setTimeout(() => setBackgroundColor(backgroundColors[randomNr]), 3000)
  }

  const isShakingEnough = (data) => {
    const totalForce = Math.abs(data.x) + Math.abs(data.y) + Math.abs(data.z)
    return totalForce > 1.78
  }

  const { x, y, z } = data

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: backgroundColor,
      }}
    >
      <Text>ASK THE DICE</Text>
      <Text>Shake you phone or click on the dice to roll!</Text>
      <TouchableWithoutFeedback onPress={() => rollDice()}>
        <Image source={diceImg} />
      </TouchableWithoutFeedback>
      {!isSpinning && diceResultNumber && <Text>{diceResultNumber}</Text>}
      <StatusBar style="auto" />
    </View>
  )
}

export default ShakeDice
