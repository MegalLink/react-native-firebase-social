import React from 'react';
import { StyleSheet, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface AuthAvatarProps {
  showPlus?: boolean;
}

export function AuthAvatar({ showPlus = false }: AuthAvatarProps) {
  return (
    <View style={styles.avatarContainer}>
      <MaterialCommunityIcons 
        name="account-outline" 
        size={100} 
        color="#FFFFFF" 
      />
      {showPlus && (
        <MaterialCommunityIcons 
          name="plus" 
          size={32} 
          color="#FFFFFF" 
          style={styles.plusIcon}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 32,
    height: 120,
    justifyContent: 'center',
    position: 'relative',
  },
  plusIcon: {
    position: 'absolute',
    top: 0,
    left: -20,
  },
});
