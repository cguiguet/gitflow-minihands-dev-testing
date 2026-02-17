import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { useTranslation } from 'react-i18next';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withRepeat,
  withSequence,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import { useThemeColor } from '@/hooks/use-theme-color';
import { mockDestinations, Destination } from '@/data/mockDestinations';

const { width, height } = Dimensions.get('window');
const GLOBE_SIZE = width * 0.6;
const DART_SIZE = 60;

export default function SurpriseScreen() {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');
  const cardBackground = useThemeColor({ light: '#F2F2F7', dark: '#2C2C2E' }, 'background');

  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const dartTranslateX = useSharedValue(0);
  const dartTranslateY = useSharedValue(0);
  const dartScale = useSharedValue(1);
  const dartRotation = useSharedValue(0);
  const globeRotation = useSharedValue(0);
  const globeScale = useSharedValue(1);
  const destinationOpacity = useSharedValue(0);
  const destinationScale = useSharedValue(0.5);

  useEffect(() => {
    globeRotation.value = withRepeat(
      withTiming(360, { duration: 20000, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  const selectRandomDestination = () => {
    const randomIndex = Math.floor(Math.random() * mockDestinations.length);
    setSelectedDestination(mockDestinations[randomIndex]);
  };

  const resetDart = () => {
    dartTranslateX.value = 0;
    dartTranslateY.value = 0;
    dartScale.value = 1;
    dartRotation.value = 0;
    destinationOpacity.value = 0;
    destinationScale.value = 0.5;
    setSelectedDestination(null);
    setIsAnimating(false);
  };

  const animateDartThrow = () => {
    setIsAnimating(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    globeRotation.value = withSequence(
      withTiming(globeRotation.value + 180, { duration: 1000, easing: Easing.out(Easing.cubic) }),
      withRepeat(
        withTiming(360, { duration: 20000, easing: Easing.linear }),
        -1,
        false
      )
    );

    globeScale.value = withSequence(
      withTiming(1.1, { duration: 500 }),
      withTiming(1, { duration: 500 })
    );

    dartTranslateX.value = withTiming(0, { duration: 800, easing: Easing.out(Easing.cubic) });
    dartTranslateY.value = withTiming(-height * 0.3, { duration: 800, easing: Easing.out(Easing.cubic) });
    dartScale.value = withTiming(0.7, { duration: 800 });
    dartRotation.value = withTiming(-720, { duration: 800 });

    setTimeout(() => {
      runOnJS(selectRandomDestination)();
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
      destinationOpacity.value = withTiming(1, { duration: 500 });
      destinationScale.value = withSpring(1, { damping: 10, stiffness: 100 });
    }, 800);
  };

  const panGesture = Gesture.Pan()
    .enabled(!isAnimating)
    .onStart(() => {
      runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light);
    })
    .onUpdate((event) => {
      dartTranslateX.value = event.translationX;
      dartTranslateY.value = event.translationY;
      dartRotation.value = event.translationY * 0.5;
    })
    .onEnd((event) => {
      const velocity = Math.sqrt(event.velocityX ** 2 + event.velocityY ** 2);
      
      if (velocity > 500) {
        runOnJS(animateDartThrow)();
      } else {
        dartTranslateX.value = withSpring(0);
        dartTranslateY.value = withSpring(0);
        dartRotation.value = withSpring(0);
      }
    });

  const dartAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: dartTranslateX.value },
      { translateY: dartTranslateY.value },
      { scale: dartScale.value },
      { rotate: `${dartRotation.value}deg` },
    ],
  }));

  const globeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${globeRotation.value}deg` },
      { scale: globeScale.value },
    ],
  }));

  const destinationAnimatedStyle = useAnimatedStyle(() => ({
    opacity: destinationOpacity.value,
    transform: [{ scale: destinationScale.value }],
  }));

  const handleViewDetails = () => {
    if (selectedDestination) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      router.push(`/destination/${selectedDestination.id}`);
    }
  };

  const handleTryAgain = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    resetDart();
  };

  return (
    <View style={[styles.container, { backgroundColor, paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: textColor }]}>{t('surprise.title')}</Text>
        <Text style={[styles.subtitle, { color: textColor, opacity: 0.6 }]}>
          {t('surprise.subtitle')}
        </Text>
      </View>

      <View style={styles.gameArea}>
        <Animated.View style={[styles.globeContainer, globeAnimatedStyle]}>
          <View style={[styles.globe, { backgroundColor: tintColor }]}>
            <Text style={styles.globeEmoji}>🌍</Text>
          </View>
        </Animated.View>

        {!selectedDestination && (
          <GestureDetector gesture={panGesture}>
            <Animated.View style={[styles.dartContainer, dartAnimatedStyle]}>
              <View style={styles.dart}>
                <Text style={styles.dartEmoji}>🎯</Text>
              </View>
            </Animated.View>
          </GestureDetector>
        )}

        {!selectedDestination && !isAnimating && (
          <View style={styles.instructionsContainer}>
            <Text style={[styles.instructions, { color: textColor, opacity: 0.7 }]}>
              {t('surprise.instructions')}
            </Text>
          </View>
        )}

        {selectedDestination && (
          <Animated.View style={[styles.resultContainer, destinationAnimatedStyle]}>
            <View style={[styles.resultCard, { backgroundColor: cardBackground }]}>
              <Text style={[styles.landingText, { color: textColor, opacity: 0.7 }]}>
                {t('surprise.landing')}
              </Text>
              
              <Image
                source={{ uri: selectedDestination.image }}
                style={styles.destinationImage}
              />
              
              <Text style={[styles.destinationName, { color: textColor }]}>
                {selectedDestination.name}
              </Text>
              <Text style={[styles.destinationCountry, { color: textColor, opacity: 0.6 }]}>
                {selectedDestination.country}
              </Text>
              
              <View style={styles.destinationInfo}>
                <View style={styles.infoItem}>
                  <Text style={[styles.infoLabel, { color: textColor, opacity: 0.6 }]}>
                    Price
                  </Text>
                  <Text style={[styles.infoValue, { color: tintColor }]}>
                    ${selectedDestination.price}
                  </Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={[styles.infoLabel, { color: textColor, opacity: 0.6 }]}>
                    Rating
                  </Text>
                  <Text style={[styles.infoValue, { color: tintColor }]}>
                    ⭐ {selectedDestination.rating}
                  </Text>
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <Pressable
                  style={[styles.button, styles.primaryButton, { backgroundColor: tintColor }]}
                  onPress={handleViewDetails}
                >
                  <Text style={styles.primaryButtonText}>{t('surprise.viewDetails')}</Text>
                </Pressable>
                
                <Pressable
                  style={[styles.button, styles.secondaryButton, { borderColor: tintColor }]}
                  onPress={handleTryAgain}
                >
                  <Text style={[styles.secondaryButtonText, { color: tintColor }]}>
                    {t('surprise.tryAgain')}
                  </Text>
                </Pressable>
              </View>
            </View>
          </Animated.View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  gameArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  globeContainer: {
    width: GLOBE_SIZE,
    height: GLOBE_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  globe: {
    width: GLOBE_SIZE,
    height: GLOBE_SIZE,
    borderRadius: GLOBE_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.2,
  },
  globeEmoji: {
    fontSize: GLOBE_SIZE * 0.8,
  },
  dartContainer: {
    position: 'absolute',
    bottom: 100,
    width: DART_SIZE,
    height: DART_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dart: {
    width: DART_SIZE,
    height: DART_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dartEmoji: {
    fontSize: DART_SIZE,
  },
  instructionsContainer: {
    position: 'absolute',
    bottom: 40,
    paddingHorizontal: 40,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
  },
  resultContainer: {
    position: 'absolute',
    width: width - 40,
    maxWidth: 400,
  },
  resultCard: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  landingText: {
    fontSize: 18,
    marginBottom: 16,
  },
  destinationImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  destinationName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  destinationCountry: {
    fontSize: 18,
    marginBottom: 16,
  },
  destinationInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 24,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    borderWidth: 2,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
