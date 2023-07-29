import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import DropDownList from './Popups/DropDownList';

const Header = () => {
  const [showDropDownList, setShowDropDownList] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="h-20 border-b-2 shadow-sm border-tertiary">
      <div className="container flex flex-wrap items-center px-20 justify-between h-full hover:cursor-pointer">
        <div
          className="bg-headerlogo w-[165px] h-10 bg-contain bg-no-repeat"
          onClick={() => navigate('/')}
        ></div>
        <div className="flex flex-wrap gap-6">
          <LanguageSwitcher />
          <button
            type="button"
            className="bg-btnIconUser w-14 h-12 bg-no-repeat px-4 py-3 bg-center border rounded-xl border-tertiary"
            onClick={() => setShowDropDownList(!showDropDownList)}
          ></button>
        </div>
      </div>
      <DropDownList
        show={showDropDownList}
        onLogin={() => navigate('/sign-in')}
        onRegister={() => navigate('/sign-up')}
      />
    </header>
  );
};

export default Header;
