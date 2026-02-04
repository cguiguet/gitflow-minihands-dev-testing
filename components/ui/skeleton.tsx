import { useEffect } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export function Skeleton({ width = '100%', height = 20, borderRadius = 8, style }: SkeletonProps) {
  const colorScheme = useColorScheme();
  const shimmerTranslate = useSharedValue(-1);

  useEffect(() => {
    shimmerTranslate.value = withRepeat(withTiming(1, { duration: 1500 }), -1, false);
  }, [shimmerTranslate]);

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(shimmerTranslate.value, [-1, 1], [-300, 300]);
    return {
      transform: [{ translateX }],
    };
  });

  const backgroundColor = colorScheme === 'dark' ? '#2A2A2A' : '#E5E5E5';
  const shimmerColor = colorScheme === 'dark' ? '#3A3A3A' : '#F5F5F5';

  return (
    <View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
          backgroundColor,
        },
        style,
      ]}>
      <Animated.View
        style={[
          styles.shimmer,
          {
            backgroundColor: shimmerColor,
          },
          animatedStyle,
        ]}
      />
    </View>
  );
}

export function DestinationCardSkeleton() {
  return (
    <View style={styles.destinationCard}>
      <Skeleton width={280} height={200} borderRadius={16} />
      <View style={styles.destinationInfo}>
        <Skeleton width={150} height={20} />
        <Skeleton width={100} height={16} style={{ marginTop: 8 }} />
        <Skeleton width={80} height={18} style={{ marginTop: 8 }} />
      </View>
    </View>
  );
}

export function DealCardSkeleton() {
  return (
    <View style={styles.dealCard}>
      <Skeleton width="100%" height={160} borderRadius={12} />
      <View style={styles.dealInfo}>
        <Skeleton width="70%" height={18} />
        <Skeleton width="50%" height={16} style={{ marginTop: 8 }} />
        <Skeleton width="40%" height={20} style={{ marginTop: 8 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    overflow: 'hidden',
  },
  shimmer: {
    width: '100%',
    height: '100%',
    opacity: 0.5,
  },
  destinationCard: {
    width: 280,
    marginRight: 16,
  },
  destinationInfo: {
    marginTop: 12,
  },
  dealCard: {
    width: 300,
    marginRight: 16,
  },
  dealInfo: {
    marginTop: 12,
  },
});
