import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@/lib/supabase/client';

type ThemeMode = 'light' | 'dark' | 'auto';
type ColorScheme = 'light' | 'dark';

interface ThemeContextType {
  themeMode: ThemeMode;
  colorScheme: ColorScheme;
  setThemeMode: (mode: ThemeMode) => Promise<void>;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@theme_mode';
const USER_ID_KEY = '@user_id';

async function getUserId(): Promise<string> {
  let userId = await AsyncStorage.getItem(USER_ID_KEY);
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    await AsyncStorage.setItem(USER_ID_KEY, userId);
  }
  return userId;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useSystemColorScheme() ?? 'light';
  const [themeMode, setThemeModeState] = useState<ThemeMode>('auto');
  const [isLoading, setIsLoading] = useState(true);

  const colorScheme: ColorScheme = themeMode === 'auto' ? systemColorScheme : themeMode;

  useEffect(() => {
    loadThemePreference();
  }, []);

  async function loadThemePreference() {
    try {
      const userId = await getUserId();
      
      const { data, error } = await supabase
        .from('user_preferences')
        .select('theme_mode')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading theme preference:', error);
      }

      if (data?.theme_mode) {
        setThemeModeState(data.theme_mode as ThemeMode);
        await AsyncStorage.setItem(THEME_STORAGE_KEY, data.theme_mode);
      } else {
        const localTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (localTheme) {
          setThemeModeState(localTheme as ThemeMode);
        }
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
      const localTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (localTheme) {
        setThemeModeState(localTheme as ThemeMode);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function setThemeMode(mode: ThemeMode) {
    try {
      setThemeModeState(mode);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);

      const userId = await getUserId();

      const { data: existing } = await supabase
        .from('user_preferences')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (existing) {
        await supabase
          .from('user_preferences')
          .update({ theme_mode: mode })
          .eq('user_id', userId);
      } else {
        await supabase
          .from('user_preferences')
          .insert({ user_id: userId, theme_mode: mode });
      }
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  }

  return (
    <ThemeContext.Provider value={{ themeMode, colorScheme, setThemeMode, isLoading }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
