import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  return (
    <header className="h-20 border-b-2 shadow-sm border-tertiary">
      <div className="container flex flex-wrap items-center px-20 justify-between h-full">
        <div className="bg-headerlogo w-[165px] h-10 bg-contain bg-no-repeat"></div>
        <div className="flex flex-wrap gap-6">
          <LanguageSwitcher />
          <button
            type="button"
            className="bg-btnIconUser w-14 h-12 bg-no-repeat px-4 py-3 bg-center border rounded-xl border-tertiary"
          ></button>
        </div>
      </div>
    </header>
  );
};

export default Header;
