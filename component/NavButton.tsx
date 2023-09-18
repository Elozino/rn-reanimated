import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

interface IProps {
  title: string;
  path: string;
  style?: {}
}

const NavButton = ({ title, path, style }: IProps) => {
  return (
    <Link href={path}
      style={[styles.container, style]}
    >
      <Text
        style={[styles.text]}
      >
        {title}
      </Text>
    </Link>
  )
}

export default NavButton

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: 'green',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 22,
    color: '#fff'
  }
})