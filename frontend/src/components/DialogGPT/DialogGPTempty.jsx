import { useContext } from 'react';
import styles from './DialogGPT.module.css';
import { LanguageContext } from '../../context/LanguageContext';
import { getDictionary } from '../../utils/dictionary';
import EmptyProjectMessage from './EmptyProjectMessage';

const DialogGPTempty = () => {
  const { language } = useContext(LanguageContext);
  const dictionary = getDictionary();
  const scrollStyle = styles.scrollbar;

  return (
    <div className="flex-grow bg-white py-6 px-8 ">
      <div className="border-b border-secondary border-opacity-30 flex justify-between px-6 py-4">
        <h2 className="text-2xl font-semibold">
          {dictionary.dialogTitle[language]}
        </h2>
      </div>

      <div
        className={`pt-6 mb-4 h-[calc(100vh-120px-68px)] overflow-y-auto ${scrollStyle}`}
      >
        <div className="h-full">
          <EmptyProjectMessage />
        </div>
      </div>
    </div>
  );
};

export default DialogGPTempty;
