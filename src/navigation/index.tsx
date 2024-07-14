import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {
  ForgotPassword,
  Login,
  Register,
  SplashScreenPage,
  VerifyOTP,
  NewPassword,
  Home,
  Settings,
  HistoryTransaction,
  Rating,
  Cart,
  Checkout,
  Chat,
  Favorite,
  Address,
  Payment,
  Profile,
  ProductDetail,
  Review,
  ChangeEmail,
  NewEmail,
} from '../pages';
import BottomTabs from './BottomTabs';
import {colors} from '../utils/colors';

export type NavigationParam = {
  MainTabs: undefined;
  SplashScreenPage: undefined;
  ForgotPassword: undefined;
  Login: undefined;
  Register: undefined;
  VerifyOTP: undefined;
  NewPassword: undefined;
  ChangeEmail: undefined;
  NewEmail: undefined;
  Home: undefined;
  Settings: undefined;
  Profile: undefined;
  HistoryTransaction: undefined;
  Rating: undefined;
  Cart: undefined;
  Checkout: undefined;
  Chat: undefined;
  Favorite: undefined;
  Address: undefined;
  Payment: undefined;
  ProductDetail: undefined;
  Review: undefined;
};

type MainTabsNavigationProp = BottomTabNavigationProp<
  NavigationParam,
  'MainTabs'
>;
type MainTabsRouteProp = RouteProp<NavigationParam, 'MainTabs'>;
export type MainTabsProps = {
  navigation: MainTabsNavigationProp;
  route: MainTabsRouteProp;
};

type SplashScreenNavigationProp = StackNavigationProp<
  NavigationParam,
  'SplashScreenPage'
>;
type SplashScreenRouteProp = RouteProp<NavigationParam, 'SplashScreenPage'>;
export type SplashScreenProps = {
  navigation: SplashScreenNavigationProp;
  route: SplashScreenRouteProp;
};

type ForgotPasswordNavigationProp = StackNavigationProp<
  NavigationParam,
  'ForgotPassword'
>;
type ForgotPasswordRouteProp = RouteProp<NavigationParam, 'ForgotPassword'>;
export type ForgotPasswordProps = {
  navigation: ForgotPasswordNavigationProp;
  route: ForgotPasswordRouteProp;
};

type ChangeEmailNavigationProp = StackNavigationProp<
  NavigationParam,
  'ChangeEmail'
>;
type ChangeEmailRouteProp = RouteProp<NavigationParam, 'ChangeEmail'>;
export type ChangeEmailProps = {
  navigation: ChangeEmailNavigationProp;
  route: ChangeEmailRouteProp;
};

type NewEmailNavigationProp = StackNavigationProp<NavigationParam, 'NewEmail'>;
type NewEmailRouteProp = RouteProp<NavigationParam, 'NewEmail'>;
export type NewEmailProps = {
  navigation: NewEmailNavigationProp;
  route: NewEmailRouteProp;
};

type LoginNavigationProp = StackNavigationProp<NavigationParam, 'Login'>;
type LoginRouteProp = RouteProp<NavigationParam, 'Login'>;
export type LoginProps = {
  navigation: LoginNavigationProp;
  route: LoginRouteProp;
};

type RegisterNavigationProp = StackNavigationProp<NavigationParam, 'Register'>;
type RegisterRouteProp = RouteProp<NavigationParam, 'Register'>;
export type RegisterProps = {
  navigation: RegisterNavigationProp;
  route: RegisterRouteProp;
};

type SettingsNavigationProp = BottomTabNavigationProp<
  NavigationParam,
  'Settings'
>;
type SettingsRouteProp = RouteProp<NavigationParam, 'Settings'>;
export type SettingsProps = {
  navigation: SettingsNavigationProp;
  route: SettingsRouteProp;
};

type ProfileNavigationProp = BottomTabNavigationProp<
  NavigationParam,
  'Profile'
>;
type ProfileRouteProp = RouteProp<NavigationParam, 'Profile'>;
export type ProfileProps = {
  navigation: ProfileNavigationProp;
  route: ProfileRouteProp;
};

type NewPasswordNavigationProp = StackNavigationProp<
  NavigationParam,
  'NewPassword'
>;
type NewPasswordRouteProp = RouteProp<NavigationParam, 'NewPassword'>;
export type NewPasswordProps = {
  navigation: NewPasswordNavigationProp;
  route: NewPasswordRouteProp;
};

type HomeNavigationProp = BottomTabNavigationProp<NavigationParam, 'Home'>;
type HomeRouteProp = RouteProp<NavigationParam, 'Home'>;
export type HomeProps = {
  navigation: HomeNavigationProp;
  route: HomeRouteProp;
};

type ProductDetailNavigationProp = BottomTabNavigationProp<
  NavigationParam,
  'ProductDetail'
>;
type ProductDetailRouteProp = RouteProp<NavigationParam, 'ProductDetail'>;
export type ProductDetailProps = {
  navigation: ProductDetailNavigationProp;
  route: ProductDetailRouteProp;
};

type VerifyOTPNavigationProp = StackNavigationProp<
  NavigationParam,
  'VerifyOTP'
>;
type VerifyOTPRouteProp = RouteProp<NavigationParam, 'VerifyOTP'>;
export type VerifyOTPProps = {
  navigation: VerifyOTPNavigationProp;
  route: VerifyOTPRouteProp;
};

type HistoryTransactionNavigationProp = StackNavigationProp<
  NavigationParam,
  'HistoryTransaction'
>;
type HistoryTransactionRouteProp = RouteProp<
  NavigationParam,
  'HistoryTransaction'
>;
export type HistoryTransactionProps = {
  navigation: HistoryTransactionNavigationProp;
  route: HistoryTransactionRouteProp;
};

type RatingNavigationProp = StackNavigationProp<NavigationParam, 'Rating'>;
type RatingRouteProp = RouteProp<NavigationParam, 'Rating'>;
export type RatingProps = {
  navigation: RatingNavigationProp;
  route: RatingRouteProp;
};

type CartNavigationProp = BottomTabNavigationProp<NavigationParam, 'Cart'>;
type CartRouteProp = RouteProp<NavigationParam, 'Cart'>;
export type CartProps = {
  navigation: CartNavigationProp;
  route: CartRouteProp;
};

type CheckoutNavigationProp = StackNavigationProp<NavigationParam, 'Checkout'>;
type CheckoutRouteProp = RouteProp<NavigationParam, 'Checkout'>;
export type CheckoutProps = {
  navigation: CheckoutNavigationProp;
  route: CheckoutRouteProp;
};

type ChatNavigationProp = BottomTabNavigationProp<NavigationParam, 'Chat'>;
type ChatRouteProp = RouteProp<NavigationParam, 'Chat'>;
export type ChatProps = {
  navigation: ChatNavigationProp;
  route: ChatRouteProp;
};

type FavoriteNavigationProp = BottomTabNavigationProp<
  NavigationParam,
  'Favorite'
>;
type FavoriteRouteProp = RouteProp<NavigationParam, 'Favorite'>;
export type FavoriteProps = {
  navigation: FavoriteNavigationProp;
  route: FavoriteRouteProp;
};

type AddressNavigationProp = BottomTabNavigationProp<
  NavigationParam,
  'Address'
>;
type AddressRouteProp = RouteProp<NavigationParam, 'Address'>;
export type AddressProps = {
  navigation: AddressNavigationProp;
  route: AddressRouteProp;
};

type PaymentNavigationProp = BottomTabNavigationProp<
  NavigationParam,
  'Payment'
>;
type PaymentRouteProp = RouteProp<NavigationParam, 'Payment'>;
export type PaymentProps = {
  navigation: PaymentNavigationProp;
  route: PaymentRouteProp;
};

type ReviewNavigationProp = BottomTabNavigationProp<NavigationParam, 'Review'>;
type ReviewRouteProp = RouteProp<NavigationParam, 'Review'>;
export type ReviewProps = {
  navigation: ReviewNavigationProp;
  route: ReviewRouteProp;
};

const navigationRef = React.createRef();

export function navigate(name: string, params: string) {
  navigationRef.current?.navigate(name, params);
}

const RootStack = createStackNavigator<NavigationParam>();

const MainTabs = () => {
  return (
    <BottomTabs
      Home={Home}
      // Chat={Chat}
      Favorite={Favorite}
      Settings={Settings}
      Cart={Cart}
    />
  );
};

const RootStackScreen = () => (
  <RootStack.Navigator>
    <RootStack.Screen
      options={{
        headerShown: false,
        animationEnabled: false,
      }}
      name="SplashScreenPage"
      component={SplashScreenPage}
    />
    <RootStack.Screen
      options={{
        headerShown: false,
        animationEnabled: false,
      }}
      name="MainTabs"
      component={MainTabs}
    />
    <RootStack.Screen
      options={{
        headerShown: false,
        animationEnabled: false,
      }}
      name="Login"
      component={Login}
    />
    <RootStack.Screen
      options={{
        headerShown: false,
        animationEnabled: false,
      }}
      name="Register"
      component={Register}
    />
    <RootStack.Screen
      options={{
        headerShown: false,
        animationEnabled: false,
      }}
      name="ForgotPassword"
      component={ForgotPassword}
    />
    <RootStack.Screen
      options={{
        headerShown: false,
        animationEnabled: false,
      }}
      name="VerifyOTP"
      component={VerifyOTP}
    />
    <RootStack.Screen
      options={{
        headerShown: false,
        animationEnabled: false,
      }}
      name="NewPassword"
      component={NewPassword}
    />
    <RootStack.Screen
      options={{
        headerShown: false,
        animationEnabled: false,
      }}
      name="ChangeEmail"
      component={ChangeEmail}
    />
    <RootStack.Screen
      options={{
        headerShown: false,
        animationEnabled: false,
      }}
      name="NewEmail"
      component={NewEmail}
    />
    <RootStack.Screen
      options={{
        headerShown: false,
        animationEnabled: false,
      }}
      name="Chat"
      component={Chat}
    />
    <RootStack.Screen
      options={{
        headerShown: false,
        animationEnabled: false,
      }}
      name="ProductDetail"
      component={ProductDetail}
    />
    <RootStack.Screen
      options={{
        headerShown: false,
        animationEnabled: false,
      }}
      name="Cart"
      component={Cart}
    />
    <RootStack.Screen
      options={{
        headerShown: false,
        animationEnabled: false,
      }}
      name="Favorite"
      component={Favorite}
    />
    <RootStack.Screen
      options={{
        headerShown: false,
        animationEnabled: false,
      }}
      name="Checkout"
      component={Checkout}
    />
    <RootStack.Screen
      options={{
        headerShown: false,
        animationEnabled: false,
      }}
      name="Settings"
      component={Settings}
    />
    <RootStack.Screen
      options={{
        headerShown: false,
        animationEnabled: false,
      }}
      name="Profile"
      component={Profile}
    />
    <RootStack.Screen
      options={{
        headerShown: false,
        animationEnabled: false,
      }}
      name="HistoryTransaction"
      component={HistoryTransaction}
    />
    <RootStack.Screen
      options={{
        headerShown: false,
        animationEnabled: false,
      }}
      name="Rating"
      component={Rating}
    />
    <RootStack.Screen
      options={{
        headerShown: false,
        animationEnabled: false,
      }}
      name="Address"
      component={Address}
    />
    <RootStack.Screen
      options={{
        headerShown: false,
        animationEnabled: false,
      }}
      name="Payment"
      component={Payment}
    />
    <RootStack.Screen
      options={{
        headerShown: false,
        animationEnabled: false,
      }}
      name="Review"
      component={Review}
    />
  </RootStack.Navigator>
);

const AppNavigation = () => {
  return (
    <NavigationContainer independent={true} ref={navigationRef}>
      <StatusBar
        animated={false}
        backgroundColor={colors.white}
        barStyle="dark-content"
      />
      <RootStackScreen />
    </NavigationContainer>
  );
};

export default AppNavigation;
