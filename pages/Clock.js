import React, { useState } from 'react'
import { Button,View,Text } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
export default Clock =  () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [datetouched,setDatetouched] = useState(false)
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

 
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  return (
    <View>
    <View>
      <Button onPress={showDatepicker} title="Show date picker!" />
    </View>
    <View>
      <Button onPress={showTimepicker} title="Show time picker!" />
    </View>
    <Text>selected: {datetouched ? date.toLocaleString() : "Please Select Date"}</Text>
    {show && (
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={mode}
        is24Hour={true}
        onChange={onChange}
        themeVariant="dark"
      />
    )}
  </View>
  )
}