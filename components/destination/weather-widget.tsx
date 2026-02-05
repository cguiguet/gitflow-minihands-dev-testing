import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { WeatherForecast } from '@/data/mockWeather';
import { useThemeColor } from '@/hooks/use-theme-color';

interface WeatherWidgetProps {
  weather: WeatherForecast;
}

export function WeatherWidget({ weather }: WeatherWidgetProps) {
  const textColor = useThemeColor({}, 'text');
  const cardBackground = useThemeColor({ light: '#FFFFFF', dark: '#1C1C1E' }, 'background');

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: textColor }]}>7-Day Weather Forecast</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.forecastContainer}>
        {weather.forecast.map((day, index) => (
          <View key={index} style={[styles.dayCard, { backgroundColor: cardBackground }]}>
            <Text style={styles.day}>{day.day}</Text>
            <Text style={styles.icon}>{day.icon}</Text>
            <Text style={[styles.high, { color: textColor }]}>{day.high}°</Text>
            <Text style={styles.low}>{day.low}°</Text>
            <Text style={styles.precipitation}>{day.precipitation}%</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.bestTimeCard}>
        <Text style={styles.bestTimeIcon}>🌤️</Text>
        <View style={styles.bestTimeContent}>
          <Text style={[styles.bestTimeTitle, { color: textColor }]}>Best Time to Visit</Text>
          <Text style={styles.bestTimeText}>{weather.bestTimeToVisit}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  forecastContainer: {
    gap: 12,
    paddingBottom: 16,
  },
  dayCard: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    minWidth: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  day: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8E8E93',
    marginBottom: 8,
  },
  icon: {
    fontSize: 32,
    marginBottom: 8,
  },
  high: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  low: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 8,
  },
  precipitation: {
    fontSize: 12,
    color: '#007AFF',
  },
  bestTimeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    padding: 16,
    borderRadius: 12,
    gap: 12,
    marginTop: 16,
  },
  bestTimeIcon: {
    fontSize: 32,
  },
  bestTimeContent: {
    flex: 1,
  },
  bestTimeTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  bestTimeText: {
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 20,
  },
});
