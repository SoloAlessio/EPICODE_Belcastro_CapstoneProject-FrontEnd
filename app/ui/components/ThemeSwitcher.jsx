import { useState } from 'react';
import { Button } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { FaMoon, FaSun } from 'react-icons/fa6';

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState('dark');
  const { setTheme: setNextUITheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setNextUITheme(newTheme);
  };

  return (
    <Button variant='shadow' onClick={toggleTheme} isIconOnly>
      {theme === 'light' ? <FaMoon /> : <FaSun />}
    </Button>
  );
};

export default ThemeSwitcher;
