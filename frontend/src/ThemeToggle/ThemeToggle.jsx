import {FiMoon, FiSun} from 'react-icons/fi';
import './ThemeToggle.css';

function ThemeToggle({isDarkMode, toggleTheme}) {
  return (
    <div className="theme-toggle">
        {isDarkMode ? (
            <>
                <FiSun onClick={toggleTheme}/>
            </>
        ) : (
            <>
                <FiMoon onClick={toggleTheme}/>
            </>
        )}
    </div>
  );
}
export default ThemeToggle;