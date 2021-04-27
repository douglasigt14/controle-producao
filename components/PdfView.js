import React, { useState, useEffect, forceUpdate } from "react";
import { View } from 'react-native'
import PDFReader from 'rn-pdf-reader-js'

export default (props) => {
    let [url, setUrl] = useState(props.url);
    return (
      <PDFReader
        source={{
          uri: url,
        }}
      />
    )
}