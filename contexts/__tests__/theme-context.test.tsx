import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react-native';
import { ThemeProvider, useTheme } from '../theme-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@/lib/supabase/client';

// Mock dependencies
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

jest.mock('@/lib/supabase/client', () => ({
  supabase: {
    from: jest.fn(),
  },
}));

jest.mock('react-native', () => ({
  useColorScheme: jest.fn(() => 'light'),
}));

describe('ThemeContext', () => {
  const mockSupabaseFrom = supabase.from as jest.Mock;
  const mockAsyncStorageGetItem = AsyncStorage.getItem as jest.Mock;
  const mockAsyncStorageSetItem = AsyncStorage.setItem as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockAsyncStorageGetItem.mockResolvedValue(null);
    mockAsyncStorageSetItem.mockResolvedValue(undefined);
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider>{children}</ThemeProvider>
  );

  describe('Initialization', () => {
    it('should initialize with auto theme mode', async () => {
      mockSupabaseFrom.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ data: null, error: { code: 'PGRST116' } }),
          }),
        }),
      });

      const { result } = renderHook(() => useTheme(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.themeMode).toBe('auto');
      expect(result.current.colorScheme).toBe('light');
    });

    it('should load theme preference from Supabase', async () => {
      mockSupabaseFrom.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ 
              data: { theme_mode: 'dark' }, 
              error: null 
            }),
          }),
        }),
      });

      const { result } = renderHook(() => useTheme(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.themeMode).toBe('dark');
      expect(result.current.colorScheme).toBe('dark');
    });

    it('should fallback to AsyncStorage if Supabase fails', async () => {
      mockSupabaseFrom.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockRejectedValue(new Error('Network error')),
          }),
        }),
      });

      mockAsyncStorageGetItem.mockResolvedValue('light');

      const { result } = renderHook(() => useTheme(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.themeMode).toBe('light');
      expect(result.current.colorScheme).toBe('light');
    });
  });

  describe('Theme Mode Changes', () => {
    it('should update theme mode to dark', async () => {
      mockSupabaseFrom.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ data: null, error: { code: 'PGRST116' } }),
          }),
        }),
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockResolvedValue({ data: null, error: null }),
        }),
        insert: jest.fn().mockResolvedValue({ data: null, error: null }),
      });

      const { result } = renderHook(() => useTheme(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await act(async () => {
        await result.current.setThemeMode('dark');
      });

      expect(result.current.themeMode).toBe('dark');
      expect(result.current.colorScheme).toBe('dark');
      expect(mockAsyncStorageSetItem).toHaveBeenCalledWith('@theme_mode', 'dark');
    });

    it('should update theme mode to light', async () => {
      mockSupabaseFrom.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ data: null, error: { code: 'PGRST116' } }),
          }),
        }),
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockResolvedValue({ data: null, error: null }),
        }),
        insert: jest.fn().mockResolvedValue({ data: null, error: null }),
      });

      const { result } = renderHook(() => useTheme(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await act(async () => {
        await result.current.setThemeMode('light');
      });

      expect(result.current.themeMode).toBe('light');
      expect(result.current.colorScheme).toBe('light');
      expect(mockAsyncStorageSetItem).toHaveBeenCalledWith('@theme_mode', 'light');
    });

    it('should update theme mode to auto', async () => {
      mockSupabaseFrom.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ data: null, error: { code: 'PGRST116' } }),
          }),
        }),
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockResolvedValue({ data: null, error: null }),
        }),
        insert: jest.fn().mockResolvedValue({ data: null, error: null }),
      });

      const { result } = renderHook(() => useTheme(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await act(async () => {
        await result.current.setThemeMode('auto');
      });

      expect(result.current.themeMode).toBe('auto');
      expect(result.current.colorScheme).toBe('light'); // System default
      expect(mockAsyncStorageSetItem).toHaveBeenCalledWith('@theme_mode', 'auto');
    });
  });

  describe('Supabase Persistence', () => {
    it('should insert new preference if none exists', async () => {
      const mockInsert = jest.fn().mockResolvedValue({ data: null, error: null });
      
      mockSupabaseFrom.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ data: null, error: null }),
          }),
        }),
        insert: mockInsert,
      });

      const { result } = renderHook(() => useTheme(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await act(async () => {
        await result.current.setThemeMode('dark');
      });

      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({
          theme_mode: 'dark',
        })
      );
    });

    it('should update existing preference', async () => {
      const mockUpdate = jest.fn().mockReturnValue({
        eq: jest.fn().mockResolvedValue({ data: null, error: null }),
      });

      mockSupabaseFrom.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ 
              data: { id: 'existing-id' }, 
              error: null 
            }),
          }),
        }),
        update: mockUpdate,
      });

      const { result } = renderHook(() => useTheme(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await act(async () => {
        await result.current.setThemeMode('light');
      });

      expect(mockUpdate).toHaveBeenCalledWith({ theme_mode: 'light' });
    });

    it('should handle Supabase errors gracefully', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      mockSupabaseFrom.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockRejectedValue(new Error('Database error')),
          }),
        }),
      });

      const { result } = renderHook(() => useTheme(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await act(async () => {
        await result.current.setThemeMode('dark');
      });

      // Should still update local state even if Supabase fails
      expect(result.current.themeMode).toBe('dark');
      expect(mockAsyncStorageSetItem).toHaveBeenCalledWith('@theme_mode', 'dark');

      consoleErrorSpy.mockRestore();
    });
  });

  describe('User ID Generation', () => {
    it('should generate and persist user ID if none exists', async () => {
      mockAsyncStorageGetItem.mockImplementation((key) => {
        if (key === '@user_id') return Promise.resolve(null);
        return Promise.resolve(null);
      });

      mockSupabaseFrom.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ data: null, error: { code: 'PGRST116' } }),
          }),
        }),
      });

      const { result } = renderHook(() => useTheme(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(mockAsyncStorageSetItem).toHaveBeenCalledWith(
        '@user_id',
        expect.stringMatching(/^user_\d+_[a-z0-9]+$/)
      );
    });

    it('should reuse existing user ID', async () => {
      const existingUserId = 'user_123_abc';
      mockAsyncStorageGetItem.mockImplementation((key) => {
        if (key === '@user_id') return Promise.resolve(existingUserId);
        return Promise.resolve(null);
      });

      mockSupabaseFrom.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ data: null, error: { code: 'PGRST116' } }),
          }),
        }),
      });

      const { result } = renderHook(() => useTheme(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Should not create a new user ID
      const setItemCalls = (mockAsyncStorageSetItem as jest.Mock).mock.calls;
      const userIdCalls = setItemCalls.filter(call => call[0] === '@user_id');
      expect(userIdCalls.length).toBe(0);
    });
  });

  describe('Error Handling', () => {
    it('should throw error when useTheme is used outside ThemeProvider', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      
      expect(() => {
        renderHook(() => useTheme());
      }).toThrow('useTheme must be used within a ThemeProvider');

      consoleErrorSpy.mockRestore();
    });
  });

  describe('Color Scheme Resolution', () => {
    it('should use system color scheme when mode is auto', async () => {
      const { useColorScheme } = require('react-native');
      useColorScheme.mockReturnValue('dark');

      mockSupabaseFrom.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ data: null, error: { code: 'PGRST116' } }),
          }),
        }),
      });

      const { result } = renderHook(() => useTheme(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.themeMode).toBe('auto');
      expect(result.current.colorScheme).toBe('dark');
    });

    it('should override system color scheme when mode is explicit', async () => {
      const { useColorScheme } = require('react-native');
      useColorScheme.mockReturnValue('dark');

      mockSupabaseFrom.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ 
              data: { theme_mode: 'light' }, 
              error: null 
            }),
          }),
        }),
      });

      const { result } = renderHook(() => useTheme(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.themeMode).toBe('light');
      expect(result.current.colorScheme).toBe('light'); // Overrides system dark
    });
  });
});
