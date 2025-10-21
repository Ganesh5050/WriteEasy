import React from 'react';
import { useTheme } from 'next-themes';

const ThemeToggle3D: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-[120px] h-[60px] bg-muted rounded-[30px] animate-pulse" />
    );
  }

  const isDark = theme === 'dark';

  return (
    <div className="container">
      <input 
        type="checkbox" 
        name="checkbox" 
        id="checkbox" 
        checked={isDark}
        onChange={() => setTheme(isDark ? 'light' : 'dark')}
      />
      <label htmlFor="checkbox" className="label">
        <span className="sr-only">Toggle theme</span>
      </label>
      
      <style>{`
        .container {
          display: flex;
          align-items: center;
        }

        .label {
          height: 30px;
          width: 60px;
          background-color: #2a2a2a;
          border-radius: 15px;
          box-shadow: 
            inset 0 0 5px 4px rgba(255, 255, 255, 0.1),
            inset 0 0 20px 1px rgba(0, 0, 0, 0.8), 
            10px 20px 30px rgba(0, 0, 0, 0.3),
            inset 0 0 0 3px rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          cursor: pointer;
          position: relative;
          transition: transform 0.4s;
        }

        /* Dark theme styling */
        .dark .label {
          background-color: #2a2a2a;
          box-shadow: 
            inset 0 0 5px 4px rgba(255, 255, 255, 0.1),
            inset 0 0 20px 1px rgba(0, 0, 0, 0.8), 
            10px 20px 30px rgba(0, 0, 0, 0.3),
            inset 0 0 0 3px rgba(255, 255, 255, 0.1);
        }

        .label:hover {
          transform: perspective(100px) rotateX(5deg) rotateY(-5deg);
        }

        #checkbox:checked ~ .label:hover {
          transform: perspective(100px) rotateX(-5deg) rotateY(5deg);
        }

        #checkbox {
          display: none;
        }

        #checkbox:checked ~ .label {
          background-color: #ffffff;
          box-shadow: 
            inset 0 0 5px 4px rgba(0, 0, 0, 0.1),
            inset 0 0 20px 1px rgba(0, 0, 0, 0.2), 
            10px 20px 30px rgba(0, 0, 0, 0.1),
            inset 0 0 0 3px rgba(0, 0, 0, 0.1);
        }

        #checkbox:checked ~ .label::before {
          left: 35px;
          background-color: #000000;
          background-image: linear-gradient(315deg, #000000 0%, #333333 70%);
          transition: 0.4s;
        }

        .label::before {
          position: absolute;
          content: "";
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background-color: #ffffff;
          background-image: linear-gradient(
            130deg,
            #e0e0e0 10%,
            #ffffff 11%,
            #c0c0c0 62%
          );
          left: 5px;
          box-shadow: 
            0 2px 1px rgba(0, 0, 0, 0.3),
            10px 10px 10px rgba(0, 0, 0, 0.3);
          transition: 0.4s;
        }

        /* Dark theme - unchecked state (light switcher) */
        .dark .label::before {
          background-color: #ffffff;
          background-image: linear-gradient(
            130deg,
            #e0e0e0 10%,
            #ffffff 11%,
            #c0c0c0 62%
          );
        }

        /* Dark mode adjustments */
        @media (prefers-color-scheme: dark) {
          .label {
            background-color: #2a2a2a;
            box-shadow: 
              inset 0 0 5px 4px rgba(255, 255, 255, 0.1),
              inset 0 0 20px 1px rgba(0, 0, 0, 0.8), 
              10px 20px 30px rgba(0, 0, 0, 0.3),
              inset 0 0 0 3px rgba(255, 255, 255, 0.1);
          }
        }

        /* Theme-aware styling */
        .dark .label {
          background-color: #2a2a2a;
          box-shadow: 
            inset 0 0 5px 4px rgba(255, 255, 255, 0.1),
            inset 0 0 20px 1px rgba(0, 0, 0, 0.8), 
            10px 20px 30px rgba(0, 0, 0, 0.3),
            inset 0 0 0 3px rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
};

export default ThemeToggle3D;