import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';
import { useTranslation, Trans } from 'react-i18next';

import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

export default function TabTwoScreen() {
  const { t } = useTranslation();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          {t('explore.title')}
        </ThemedText>
      </ThemedView>
      <ThemedText>{t('explore.subtitle')}</ThemedText>
      <Collapsible title={t('explore.fileBasedRouting.title')}>
        <ThemedText>
          <Trans
            i18nKey="explore.fileBasedRouting.description1"
            components={{ bold: <ThemedText type="defaultSemiBold" /> }}
          />
        </ThemedText>
        <ThemedText>
          <Trans
            i18nKey="explore.fileBasedRouting.description2"
            components={{ bold: <ThemedText type="defaultSemiBold" /> }}
          />
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">{t('explore.fileBasedRouting.learnMore')}</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title={t('explore.platformSupport.title')}>
        <ThemedText>
          <Trans
            i18nKey="explore.platformSupport.description"
            components={{ bold: <ThemedText type="defaultSemiBold" /> }}
          />
        </ThemedText>
      </Collapsible>
      <Collapsible title={t('explore.images.title')}>
        <ThemedText>
          <Trans
            i18nKey="explore.images.description"
            components={{ bold: <ThemedText type="defaultSemiBold" /> }}
          />
        </ThemedText>
        <Image
          source={require('@/assets/images/react-logo.png')}
          style={{ width: 100, height: 100, alignSelf: 'center' }}
        />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">{t('explore.images.learnMore')}</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title={t('explore.theming.title')}>
        <ThemedText>
          <Trans
            i18nKey="explore.theming.description"
            components={{ bold: <ThemedText type="defaultSemiBold" /> }}
          />
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link">{t('explore.theming.learnMore')}</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title={t('explore.animations.title')}>
        <ThemedText>
          <Trans
            i18nKey="explore.animations.description"
            components={{
              bold: <ThemedText type="defaultSemiBold" />,
              mono: <ThemedText type="defaultSemiBold" style={{ fontFamily: Fonts.mono }} />,
            }}
          />
        </ThemedText>
        {Platform.select({
          ios: (
            <ThemedText>
              <Trans
                i18nKey="explore.animations.iosDescription"
                components={{ bold: <ThemedText type="defaultSemiBold" /> }}
              />
            </ThemedText>
          ),
        })}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
