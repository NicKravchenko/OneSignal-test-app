import React, { Fragment } from "react";
// import PushController from "./PushController";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
} from "react-native";
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";
// Dummy data for list, we'll replace this with data received from push
import OneSignal from 'react-native-onesignal';
import axios from 'axios';

const API_KEY = process.env['API_KEY'];
const ONESIGNAL_APP_ID = process.env['ONESIGNAL_APP_ID'];
const BASE_URL = process.env['BASE_URL'];

OneSignal.setLogLevel(6, 0);
OneSignal.setAppId(ONESIGNAL_APP_ID);

OneSignal.promptForPushNotificationsWithUserResponse(response => {
  console.log("Prompt response:", response);
});

OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
  console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
  let notification = notificationReceivedEvent.getNotification();
  console.log("notification: ", notification);
  const data = notification.additionalData
  console.log("additionalData: ", data);
  // Complete with null means don't show a notification.
  notificationReceivedEvent.complete(notification);
});


let pushData = [
  {
    title: "First push",
    message: "First push message",
  },
  {
    title: "Second push",
    message: "Second push message",
  },
];

_renderItem = ({ item }) => (
  <View key={item.title}>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.message}>{item.message}</Text>
  </View>
);
const App = () => {
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
          <>
            <Header />
            <View style={styles.listHeader}>
              <Text>Push Notifications</Text>
            </View>
            <View style={styles.body}>
              <FlatList
                data={pushData}
                renderItem={(item) => this._renderItem(item)}
                keyExtractor={(item) => item.title}
              />
              {/* <LearnMoreLinks /> */}
            </View>
          </>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};
const styles = StyleSheet.create({
  scrollView: { backgroundColor: Colors.lighter },
  listHeader: {
    backgroundColor: "#eee",
    color: "#222",
    height: 44,
    padding: 12,
  },
  title: { fontSize: 18, fontWeight: "bold", paddingTop: 10 },
  message: {
    fontSize: 14,
    paddingBottom: 15,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  engine: { position: "absolute", right: 0 },
  body: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionContainer: { marginTop: 32, paddingHorizontal: 24 },
  sectionTitle: { fontSize: 24, fontWeight: "600", color: Colors.black },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: Colors.dark,
  },
  highlight: { fontWeight: "700" },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: "600",
    padding: 4,
    paddingRight: 12,
    textAlign: "right",
  },
});
export default App;


