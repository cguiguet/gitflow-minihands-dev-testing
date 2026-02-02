import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';
import { useTranslation, Trans } from 'react-i18next';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const { t } = useTranslation();

  const shortcut = Platform.select({
    ios: 'cmd + d',
    android: 'cmd + m',
    web: 'F12',
  });

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{t('home.welcome')}</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">{t('home.step1.title')}</ThemedText>
        <ThemedText>
          <Trans
            i18nKey="home.step1.editFile"
            values={{ shortcut }}
            components={{ bold: <ThemedText type="defaultSemiBold" /> }}
          />
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Link href="/modal">
          <Link.Trigger>
            <ThemedText type="subtitle">{t('home.step2.title')}</ThemedText>
          </Link.Trigger>
          <Link.Preview />
          <Link.Menu>
            <Link.MenuAction
              title={t('home.actions.action')}
              icon="cube"
              onPress={() => alert(t('home.actions.actionPressed'))}
            />
            <Link.MenuAction
              title={t('home.actions.share')}
              icon="square.and.arrow.up"
              onPress={() => alert(t('home.actions.sharePressed'))}
            />
            <Link.Menu title="More" icon="ellipsis">
              <Link.MenuAction
                title={t('home.actions.delete')}
                icon="trash"
                destructive
                onPress={() => alert(t('home.actions.deletePressed'))}
              />
            </Link.Menu>
          </Link.Menu>
        </Link>

        <ThemedText>{t('home.step2.description')}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">{t('home.step3.title')}</ThemedText>
        <ThemedText>
          <Trans
            i18nKey="home.step3.description"
            components={{ bold: <ThemedText type="defaultSemiBold" /> }}
          />
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
