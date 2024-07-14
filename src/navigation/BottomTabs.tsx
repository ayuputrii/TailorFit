/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import IconIo from 'react-native-vector-icons/Ionicons';
import {ImageBackground, Platform, StyleSheet, View} from 'react-native';
import {moderateScale, verticalScale} from '../utils/scale';
import {colors} from '../utils/colors';
import {images} from '../assets';

const Tab = createBottomTabNavigator();

interface BottomTabsProps {
  Home: any;
  // Chat: any;
  Favorite: any;
  Cart: any;
  Settings: any;
}

const BottomTabs = ({
  Home,
  // Chat,
  Favorite,
  Cart,
  Settings,
}: BottomTabsProps) => {
  return (
    <Tab.Navigator
      initialRouteName="MainTabs"
      screenOptions={{
        unmountOnBlur: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.gray,
        headerShadowVisible: true,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: colors.black,
          paddingHorizontal: moderateScale(16),
          height: Platform.OS === 'ios' ? verticalScale(60) : verticalScale(50),
          elevation: moderateScale(Platform.OS === 'ios' ? 4 : 4),
          shadowOpacity: moderateScale(Platform.OS === 'ios' ? 0.2 : 0.8),
          shadowRadius: moderateScale(Platform.OS === 'ios' ? 6 : 3),
          shadowOffset: {
            width: moderateScale(0),
            height: verticalScale(Platform.OS === 'ios' ? -5 : -10),
          },
          shadowColor: colors.black,
          paddingBottom: moderateScale(4),
          marginBottom: moderateScale(20),
          borderRadius: moderateScale(22),
          marginHorizontal: moderateScale(16),
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused, color}) => {
            return (
              <React.Fragment>
                {focused ? (
                  <ImageBackground
                    source={images.imgRectangleMenu}
                    style={styles.focused}>
                    <View style={styles.viewIcon}>
                      <IconAwesome name="home" size={24} color={colors.cream} />
                    </View>
                  </ImageBackground>
                ) : (
                  <IconAwesome name="home" size={24} color={color} />
                )}
              </React.Fragment>
            );
          },
        }}
      />
      {/* <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({focused, color}) => {
            return (
              <React.Fragment>
                {focused ? (
                  <ImageBackground
                    source={images.imgRectangleMenu}
                    style={styles.focused}>
                    <View style={styles.viewIcon}>
                      <IconIo
                        name="chatbox-ellipses-outline"
                        size={24}
                        color={colors.cream}
                      />
                    </View>
                  </ImageBackground>
                ) : (
                  <IconIo
                    name="chatbox-ellipses-outline"
                    size={24}
                    color={color}
                  />
                )}
              </React.Fragment>
            );
          },
        }}
      /> */}
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({focused, color}) => {
            return (
              <React.Fragment>
                {focused ? (
                  <ImageBackground
                    source={images.imgRectangleMenu}
                    style={styles.focused}>
                    <View style={styles.viewIcon}>
                      <IconIo
                        name="cart-outline"
                        size={24}
                        color={colors.cream}
                      />
                    </View>
                  </ImageBackground>
                ) : (
                  <IconIo name="cart-outline" size={24} color={color} />
                )}
              </React.Fragment>
            );
          },
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          tabBarIcon: ({focused, color}) => {
            return (
              <React.Fragment>
                {focused ? (
                  <ImageBackground
                    source={images.imgRectangleMenu}
                    style={styles.focused}>
                    <View style={styles.viewIcon}>
                      <IconAwesome
                        name="heart-o"
                        size={24}
                        color={colors.cream}
                      />
                    </View>
                  </ImageBackground>
                ) : (
                  <IconAwesome name="heart-o" size={24} color={color} />
                )}
              </React.Fragment>
            );
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({focused, color}) => {
            return (
              <React.Fragment>
                {focused ? (
                  <ImageBackground
                    source={images.imgRectangleMenu}
                    style={styles.focused}>
                    <View style={styles.viewIcon}>
                      <IconIo
                        name="settings-outline"
                        size={24}
                        color={colors.cream}
                      />
                    </View>
                  </ImageBackground>
                ) : (
                  <IconIo name="settings-outline" size={24} color={color} />
                )}
              </React.Fragment>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  focused: {
    width: '100%',
    flex: 1,
    height: moderateScale(70),
    marginTop: moderateScale(-35),
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewIcon: {
    backgroundColor: colors.black,
    width: moderateScale(50),
    height: moderateScale(50),
    marginBottom: moderateScale(20),
    borderRadius: moderateScale(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomTabs;
