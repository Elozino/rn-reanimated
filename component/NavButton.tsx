import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

interface IProps {
  title: string;
  path: string;
  style?: {}
}

const NavButton = ({ title, path, style }: IProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
    >
      <Link href={path}
        style={[styles.text]}
      >
        {title}
      </Link>
    </TouchableOpacity>
  )
}

export default NavButton

const styles = StyleSheet.create({
  container: {
    width: '50%',
    paddingVertical: 10,
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