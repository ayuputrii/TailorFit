import React, {ReactNode} from 'react';
import {StyleSheet} from 'react-native';
import {colors} from '../../utils/colors';
import {Card} from 'react-native-paper';

interface CardCommonsProps {
  backgroundColor?: string;
  title: string;
  subTitle: string;
  titleStyle: any;
  subTitleStyle: any;
  children: ReactNode;
  style: any;
  onPress: any;
}

const CardCommons = ({
  backgroundColor = colors.white,
  title,
  subTitle,
  titleStyle,
  subTitleStyle,
  children,
  style,
  onPress,
}: CardCommonsProps) => {
  return (
    <Card
      elevation={0}
      style={[styles.container, {backgroundColor}]}
      onPress={onPress ? onPress : null}
      theme={{
        colors: {
          outline: 'transparent',
        },
      }}>
      {(title || subTitle) && (
        <Card.Title
          title={title}
          subtitle={subTitle}
          titleStyle={titleStyle}
          subtitleStyle={subTitleStyle}
        />
      )}
      {children && <Card.Content style={style}>{children}</Card.Content>}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default CardCommons;
