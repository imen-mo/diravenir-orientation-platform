import { useTheme } from '../contexts/ThemeContext';

export const useTranslations = () => {
  const { getText } = useTheme();
  
  return {
    t: getText
  };
};