import React from 'react';
import { Button } from "@/components/ui/button";
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-reddit-gray-dark border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-reddit-orange">HN</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="/" className="text-gray-700 dark:text-gray-300 hover:text-reddit-orange">Top</a></li>
              <li><a href="/new" className="text-gray-700 dark:text-gray-300 hover:text-reddit-orange">New</a></li>
              <li><a href="/best" className="text-gray-700 dark:text-gray-300 hover:text-reddit-orange">Best</a></li>
            </ul>
          </nav>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="text-gray-700 dark:text-gray-300"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
    </header>
  );
};

export default Header;