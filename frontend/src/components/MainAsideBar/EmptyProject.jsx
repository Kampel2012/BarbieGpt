import { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import { getDictionary } from '../../utils/dictionary';


const EmptyProject = () => {
  const { language } = useContext(LanguageContext);
  const dictionary = getDictionary();

  return (
    <div className="mt-6 mb-3">
      <p className="text-primary text-sm mt-2">
        {dictionary.emptyProjectTxt[language]}
      </p>
    </div>
  );
};

export default EmptyProject;
