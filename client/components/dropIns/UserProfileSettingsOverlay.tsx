import React, { useState, useEffect } from 'react';
import { Button, Overlay, SearchBar, Text } from 'react-native-elements';
import { View, StyleSheet, AsyncStorage, Switch } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import UserSettings from '../screens/settings';

const UserProfileSettingsOverlay = () => {
  const [pushNotifications, setPushNotifications] = useState(false);
  const [visible, setVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [googleUserId, setGoogleUserId] = useState(0);
  const [date, setDate] = useState(new Date(1598051730000)); // lunch start new Date(1598051730000)
  const [time, setTime] = useState(new Date(1598051730000)); // lunch end
  const [lunchStart, setLunchStart] = useState(true);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    lunchStart ? setDate(currentDate) : setTime(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    // lunch break start
    setLunchStart(true);
    showMode('time');
  };

  const showTimepicker = () => {
    // lunch break end
    setLunchStart(false);
    showMode('time');
  };
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const toggleSwitch = () =>
    setPushNotifications((previousState) => !previousState);

  const updateUsername = (username: string) => {
    setUsername(username);
  };

  const onSubmit = () => {
    toggleOverlay();
  };

  useEffect(() => {
    const retrieveCurrentUserId = async () => {
      try {
        let value = await AsyncStorage.getItem('userData');
        if (value !== null) {
          value = JSON.parse(value);
          setGoogleUserId(value.user.id);
        } else {
          console.log('user id not found');
        }
      } catch (error) {
        console.error(error);
      }
    };
    retrieveCurrentUserId();
  }, []);

  useEffect(() => {
    const getUserIdWithGoogleUserId = async () => {
      axios
        .get(`${process.env.EXPO_LocalLan}/user/googleId/${googleUserId}`)
        .then((response) => {
          if (response.data[0] !== undefined) {
            setUserId(response.data[0].id);
          }
        })
        .catch((err) => console.error(err));
    };
    getUserIdWithGoogleUserId();
  }, [googleUserId]);

  return (
    <View>
      <Button
        title="Edit User Settings"
        onPress={toggleOverlay}
        buttonStyle={styles.button}
      />
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        fullScreen={false}
      >
        <View style={styles.container}>
          <View style={styles.userSettings}>
            <UserSettings onSettings={true} />
          </View>
          <View style={styles.gap}>
            <SearchBar
              placeholder="Change Name"
              lightTheme
              searchIcon={false}
              onChangeText={updateUsername}
              value={username}
            />
          </View>
          <View style={styles.verticalPadding}>
            <View style={styles.row}>
              <Switch
                trackColor={{ false: '#767577', true: '#3cb37' }}
                thumbColor={pushNotifications ? '#FFFFFF' : '#FFFFFF'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={pushNotifications}
              />
              <Text h4> Push Notifications</Text>
            </View>
          </View>
          <View>
            <View style={styles.slightVerticalPadding}>
              <Button onPress={showDatepicker} title="Lunch Break Start" />
            </View>
            <View style={styles.slightVerticalPadding}>
              <Button onPress={showTimepicker} title="Lunch Break End" />
            </View>
            </View>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={lunchStart ? date : time}
                mode={mode}
                is24Hour
                display="default"
                onChange={onChange}
              />
            )}
          <View style={styles.verticalPadding}>
            <Button
              style={styles.slightVerticalPadding}
              title="✏️ Apply Changes"
              onPress={onSubmit}
            />
            <Button title="❌ Close" onPress={toggleOverlay} />
          </View>
        </View>
      </Overlay>
    </View>
  );
};

export default UserProfileSettingsOverlay;

const styles = StyleSheet.create({
  verticalPadding: {
    paddingVertical: 10,
  },
  slightVerticalPadding: {
    paddingVertical: 2,
  },
  gap: {
    marginTop: -150,
  },
  container: {flex: 1, justifyContent: 'space-around', flexDirection: 'column'},
  button: {
    borderRadius: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
