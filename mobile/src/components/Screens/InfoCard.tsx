import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

let SCREEN_WIDTH = Dimensions.get('window').width;
let SCREEN_HEIGHT = Dimensions.get('window').height;

type ImageObject = {
  id: number,
  src: any
}

const images: ImageObject[] = [
  { id: 1, src: require('../../assets/images/abstract-architectural-design-architecture-2439595.jpg') },
  { id: 2, src: require('../../assets/images/action-action-energy-athlete-2479184.jpg') },
  { id: 3, src: require('../../assets/images/agriculture-bright-countryside-2440296.jpg') },
  { id: 4, src: require('../../assets/images/animal-animal-photography-avian-2474014.jpg') },
]

const InfoCard = () => {
  const [state, setState] = useState({
    activeImage: {
      id: 0,
      src: null
    }
  })

  type ImagePosition  = {
    x: number,
    y: number,
    height: number,
    width: number
  }

  // const allImages = [];
  const oldPosition: ImagePosition = {
    x: 0,
    y: 0,
    height: 0,
    width: 0
  };
  const position = new Animated.ValueXY();
  const dimensions = new Animated.ValueXY();
  useEffect(() => {

  }, [])

  const allImages = useRef([])

  const openImage = (index) => {
    allImages[index].measure((x,y,width,height,pageX,pageY) => {
      oldPosition.x = pageX;
      oldPosition.y = pageY;
      oldPosition.height = height;
      oldPosition.width = width;

      position.setValue({
        x: pageX,
        y: pageY
      })

      dimensions.setValue({
        x: width,
        y: height
      })

      setState({
        activeImage: images[index]
      })
    })
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        {images.map((image, index) => {
          return (
            <TouchableWithoutFeedback onPress={() => openImage(index)} key={image.id}>
              <Animated.View style={{ height: SCREEN_HEIGHT - 150, width: SCREEN_WIDTH, padding: 15 }}>
                <Image ref={allImages.current.[index] = image.id} style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }} source={image.src} />
              </Animated.View>
            </TouchableWithoutFeedback>
          )
        })}
      </ScrollView>
      <View style={StyleSheet.absoluteFill}pointerEvents={state.activeImage ? "auto" : "none"}>

      </View>
    </SafeAreaView>
  )
}
export default InfoCard
