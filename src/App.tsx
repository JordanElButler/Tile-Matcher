import React, { useState } from 'react';
import CardGrid from './components/CardGrid';


export default function App() {
  
  
  const [key, setKey] = useState(0);
  
  const remountComponent = () => {
    setKey(prevKey => prevKey + 1); 
  }
  
  return (
      <CardGrid key={key} remount={() => remountComponent()} />
  )
}