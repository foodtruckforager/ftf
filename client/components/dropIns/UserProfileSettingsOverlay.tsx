import React, { useState, useEffect } from 'react';
import {
  Button, Overlay, SearchBar, Text,
} from 'react-native-elements';
import {
  View, StyleSheet, AsyncStorage, Switch,
} from 'react-native';
import { useTheme } from 'react-native-paper';
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

  const { colors } = useTheme();

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
  const toggleSwitch = () => setPushNotifications((previousState) => !previousState);

  const updateUsername = (username: string) => {
    setUsername(username);
  };

  const onSubmit = () => {
    toggleOverlay();
  };

  useEffect(() => {
    const retrieveCurrentUserId = async() => {
      try {
        let value = await AsyncStorage.getItem('userData');
        if (value !== null) {
          value = JSON.parse(value);
          setGoogleUserId(value.user.id);
        } else {
          console.log('user id not found');
        }
      } catch (error) {
        console.log(error);
      }
    };
    retrieveCurrentUserId();
  }, []);

  useEffect(() => {
    const getUserIdWithGoogleUserId = async() => {
      axios
        .get(`${process.env.EXPO_LocalLan}/user/googleId/${googleUserId}`)
        .then((response) => {
          if (response.data[0] !== undefined) {
            setUserId(response.data[0].id);
          }
        })
        .catch((err) => console.log(err));
    };
    getUserIdWithGoogleUserId();
  }, [googleUserId]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-around',
      flexDirection: 'column',
      backgroundColor: colors.background,
    },
    overlayStyle: {
      backgroundColor: colors.backgroundCard,
    },
    searchBarContainer: {
      backgroundColor: colors.backgroundCard,
      width: 230,
      alignSelf: 'center',
      borderRadius: 5,
    },
    nameInputContainerStyle: {
      backgroundColor: colors.backgroundCard,
      alignSelf: 'center',
    },
    verticalPadding: {
      paddingVertical: 10,
    },
    slightVerticalPadding: {
      paddingVertical: 2,
    },
    gap: {
      marginTop: -150,
    },
    button: {
      borderRadius: 15,
      backgroundColor: colors.button,
      width: 230,
      padding: 5,
      alignSelf: 'center',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
  });

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
        overlayStyle={styles.overlayStyle}
      >
        <View style={styles.container}>
          <View style={styles.userSettings}>
            <UserSettings onSettings />
          </View>
          <View style={styles.gap}>
            <SearchBar
              placeholder="Change Name"
              lightTheme
              searchIcon={false}
              onChangeText={updateUsername}
              value={username}
              containerStyle={styles.searchBarContainer}
              inputContainerStyle={styles.nameInputContainerStyle}
            />
          </View>
          <View style={styles.verticalPadding}>
            <View style={styles.row}>
              <Switch
                trackColor={{ false: '#767577', true: '#27AE5F' }}
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
              <Button
                onPress={showDatepicker}
                title="Lunch Break Start"
                buttonStyle={styles.button}
              />
            </View>
            <View style={styles.slightVerticalPadding}>
              <Button
                onPress={showTimepicker}
                title="Lunch Break End"
                buttonStyle={styles.button}
              />
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
              buttonStyle={styles.button}
            />
            <Button
              title="❌ Close"
              onPress={toggleOverlay}
              buttonStyle={styles.button}
            />
          </View>
        </View>
      </Overlay>
    </View>
  );
};

export default UserProfileSettingsOverlay;
