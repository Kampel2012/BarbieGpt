import { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import { getDictionary } from '../../utils/dictionary';

const EmptyDialogMessage = () => {
  const { language } = useContext(LanguageContext);
  const dictionary = getDictionary();

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <h3 className="text-2xl font-semibold">
        {dictionary.emptyDialogTitle[language]}
      </h3>
      <p className="text-base font-semibold">
        {dictionary.emptyDialogSubitle[language]}
      </p>
    </div>
  );
};

export default EmptyDialogMessage;
