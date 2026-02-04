import { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Flight } from '@/data/mockFlights';
import { useThemeColor } from '@/hooks/use-theme-color';

interface FlightCardProps {
  flight: Flight;
  onSelect?: (flight: Flight) => void;
}

export function FlightCard({ flight, onSelect }: FlightCardProps) {
  const [expanded, setExpanded] = useState(false);
  const textColor = useThemeColor({}, 'text');
  const cardBackground = useThemeColor({ light: '#FFFFFF', dark: '#1C1C1E' }, 'background');

  const handleExpand = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setExpanded(!expanded);
  };

  const handleSelect = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onSelect?.(flight);
  };

  return (
    <View style={[styles.container, { backgroundColor: cardBackground }]}>
      <View style={styles.header}>
        <View style={styles.airlineInfo}>
          <Text style={styles.airlineLogo}>{flight.airlineLogo}</Text>
          <Text style={[styles.airlineName, { color: textColor }]}>{flight.airline}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={[styles.price, { color: textColor }]}>
            ${flight.price}
          </Text>
          <Text style={styles.priceLabel}>per person</Text>
        </View>
      </View>

      <View style={styles.flightInfo}>
        <View style={styles.timeInfo}>
          <Text style={[styles.time, { color: textColor }]}>{flight.departureTime}</Text>
          <Text style={styles.airport}>{flight.departureAirport}</Text>
        </View>

        <View style={styles.durationContainer}>
          <Text style={styles.duration}>{flight.duration}</Text>
          <View style={styles.flightLine}>
            <View style={styles.dot} />
            <View style={styles.line} />
            {flight.stops > 0 && <View style={styles.stopDot} />}
            <View style={styles.line} />
            <View style={styles.dot} />
          </View>
          <Text style={styles.stops}>
            {flight.stops === 0 ? 'Nonstop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
          </Text>
        </View>

        <View style={styles.timeInfo}>
          <Text style={[styles.time, { color: textColor }]}>{flight.arrivalTime}</Text>
          <Text style={styles.airport}>{flight.arrivalAirport}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.cabinInfo}>
          <Text style={styles.cabinClass}>{flight.cabinClass}</Text>
          <Text style={styles.seats}>
            {flight.availableSeats} seat{flight.availableSeats !== 1 ? 's' : ''} left
          </Text>
        </View>

        <View style={styles.actions}>
          {flight.stops > 0 && (
            <Pressable onPress={handleExpand} style={styles.detailsButton}>
              <Text style={styles.detailsText}>
                {expanded ? 'Hide' : 'View'} details
              </Text>
            </Pressable>
          )}
          <Pressable onPress={handleSelect} style={styles.selectButton}>
            <Text style={styles.selectText}>Select</Text>
          </Pressable>
        </View>
      </View>

      {expanded && flight.stopDetails && (
        <View style={styles.stopDetails}>
          <Text style={[styles.stopTitle, { color: textColor }]}>Layover Information</Text>
          {flight.stopDetails.map((stop, index) => (
            <View key={index} style={styles.stopItem}>
              <Text style={styles.stopIcon}>✈️</Text>
              <View style={styles.stopInfo}>
                <Text style={[styles.stopAirport, { color: textColor }]}>{stop.airport}</Text>
                <Text style={styles.stopDuration}>{stop.duration} layover</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  airlineInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  airlineLogo: {
    fontSize: 24,
  },
  airlineName: {
    fontSize: 16,
    fontWeight: '600',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
  },
  priceLabel: {
    fontSize: 12,
    color: '#8E8E93',
  },
  flightInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  timeInfo: {
    alignItems: 'center',
  },
  time: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  airport: {
    fontSize: 14,
    color: '#8E8E93',
  },
  durationContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  duration: {
    fontSize: 13,
    color: '#8E8E93',
    marginBottom: 8,
  },
  flightLine: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#007AFF',
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: '#E5E5EA',
  },
  stopDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF9500',
  },
  stops: {
    fontSize: 12,
    color: '#8E8E93',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cabinInfo: {
    gap: 4,
  },
  cabinClass: {
    fontSize: 14,
    fontWeight: '500',
    color: '#007AFF',
  },
  seats: {
    fontSize: 12,
    color: '#8E8E93',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  detailsButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F2F2F7',
  },
  detailsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  selectButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#007AFF',
  },
  selectText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  stopDetails: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  stopTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
  },
  stopItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  stopIcon: {
    fontSize: 20,
  },
  stopInfo: {
    flex: 1,
  },
  stopAirport: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 2,
  },
  stopDuration: {
    fontSize: 13,
    color: '#8E8E93',
  },
});
