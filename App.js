import { StatusBar } from 'expo-status-bar';
import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';

export default function App() {
  const INSTAGRAM = 'https://www.instagram.com/';
  const webViewRef = useRef(null);

  const script = `
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        const reelLinks = document.querySelectorAll('a[href="/reels/"]');
        if (reelLinks) {
          reelLinks.forEach(function(link) {
            const parentDiv = link.closest('div');
            if (parentDiv) {
              parentDiv.style.display = 'none';
            }
          });
        }

        const exploreLinks = document.querySelectorAll('a[href="/explore/"]');
        if (exploreLinks) {
          exploreLinks.forEach(function(link) {
            const parentDiv = link.closest('div');
            if (parentDiv) {
              parentDiv.style.display = 'none';
            }
          });
        }
      });
    });

    observer.observe(document, { childList: true, subtree: true });
  `;

  return (
    <View style={styles.container}>
      <View style={{ width: '100%', height: '100%' }}>
        <WebView
          source={{ uri: INSTAGRAM }}
          ref={webViewRef}
          javaScriptEnabled={true}
          injectedJavaScript={script}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
