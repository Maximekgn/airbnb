import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

// ID de production fourni par l'utilisateur
const PRODUCTION_AD_UNIT_ID = 'ca-app-pub-8406987689145531/5426403564';

// Utiliser l'ID de test en développement, l'ID de production en production
// __DEV__ est une variable globale qui est true en développement et false en production
const adUnitId = __DEV__ ? TestIds.BANNER : PRODUCTION_AD_UNIT_ID;

const AdBanner = () => {
  const [adError, setAdError] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);

  // AdMob n'est pas supporté sur le web
  if (Platform.OS === 'web') {
    return (
      <View style={styles.webPlaceholder}>
        <Text style={styles.placeholderText}>Publicité (non disponible sur le web)</Text>
      </View>
    );
  }

  // Afficher un placeholder si l'annonce n'a pas pu se charger
  if (adError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.placeholderText}>Publicité temporairement indisponible</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!adLoaded && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Chargement de la publicité...</Text>
        </View>
      )}
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdLoaded={() => {
          console.log('Bannière publicitaire chargée avec succès');
          setAdLoaded(true);
        }}
        onAdFailedToLoad={(error) => {
          console.error('Erreur de chargement de la bannière:', error);
          setAdError(true);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    overflow: 'hidden',
    borderRadius: 8,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    zIndex: -1,
  },
  loadingText: {
    color: '#999',
    fontSize: 12,
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
  },
  webPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  placeholderText: {
    color: '#888',
    fontSize: 12,
  },
  expoGoPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    padding: 20,
    backgroundColor: '#f0f4ff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d0d8f0',
  },
  expoGoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4a5568',
    marginBottom: 4,
  },
  expoGoText: {
    color: '#718096',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default AdBanner;