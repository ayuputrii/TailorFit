import React, {useState, useEffect} from 'react';
import {
  useWindowDimensions,
  ActivityIndicator,
  View,
  StyleSheet,
} from 'react-native';
import {TabView, TabBar, TabBarProps, Route} from 'react-native-tab-view';
import {moderateScale} from '../../utils/scale';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

interface TabViewsProps {
  renderScene: any;
  length: any;
}

const TabViews = ({renderScene, length}: TabViewsProps) => {
  const totalReview = length;

  const layout = useWindowDimensions();

  const [showLoader, setShowLoader] = useState(true);

  const [index, setIndex] = useState(0);
  const [routes] = useState(() => [
    {key: 'detail', title: 'Detail Produk'},
    {key: 'review', title: 'Ulasan', totalReview: totalReview},
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (showLoader) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator color={'#F2796B'} size="large" />
      </View>
    );
  }

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width, height: layout.height}}
      renderTabBar={props => <CustomTabBar {...props} />}
    />
  );
};

const CustomTabBar = (props: TabBarProps<Route>) => {
  return (
    <TabBar
      {...props}
      pressOpacity={0}
      pressColor="transparent"
      indicatorStyle={{
        backgroundColor: colors.orange,
        borderRadius: moderateScale(22),
        height: moderateScale(50),
      }}
      style={styles.contentTabBar}
      inactiveColor={colors.white}
      activeColor={colors.white}
      labelStyle={styles.labelTab}
      tabStyle={styles.tabStyle}
      indicatorContainerStyle={styles.indicatorContainer}
      getLabelText={({route}: {route: any}) => {
        return `${
          route.title +
            (route?.title === 'Review'
              ? route?.totalReview >= 99
                ? ' (99+)'
                : route?.totalReview === 0
                ? ''
                : ` (${route?.totalReview})`
              : '') || ''
        } `;
      }}
    />
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: moderateScale(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentTabBar: {
    backgroundColor: 'transparent',
    elevation: moderateScale(0),
    borderRadius: moderateScale(22),
    marginVertical: moderateScale(8),
  },
  labelTab: {
    color: colors.white,
    fontFamily: fonts.PoppinsBold,
    fontSize: moderateScale(12),
    textTransform: 'capitalize',
  },
  tabStyle: {
    borderRadius: moderateScale(22),
  },
  indicatorContainer: {
    backgroundColor: colors.orange,
    opacity: moderateScale(0.6),
    borderRadius: moderateScale(22),
  },
});

export default TabViews;
