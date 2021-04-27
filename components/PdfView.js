import React, { useState, useEffect, forceUpdate } from "react";
import { View } from 'react-native'
import PDFReader from 'rn-pdf-reader-js'

export default (props) => {
    let [url, setUrl] = useState(props.url);
    return (
      <PDFReader
      withPinchZoom={true}
      style={{marginTop: 50}}
      customStyle={{
    //     readerContainer: {padding: 0,margin: 0},
    //     readerContainerDocument: {margin: 10,padding: 0},
    //     readerContainerNumbers: {margin: 0,display: 'none'},
    //     readerContainerNumbersContent: {display: 'none'},
           readerContainerZoomContainerButton: {display: 'none'}
    //     readerContainerZoomContainer: {display: 'none'},
    //     readerContainerNavigate: {display: 'none'}
      }}
        source={{
          uri: url,
        }}
      />
    )
}