import PropTypes from 'prop-types';
import { getModsGpt } from '../../utils/workingMods';

const ModsPopup = ({ isOpen, onClose, onSubmit, selectedModeId }) => {
  const handleModeSelect = (modeId) => {
    onSubmit(modeId);
  };

  const modesData = getModsGpt();

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      <div className="bg-black bg-opacity-50 fixed inset-0 flex flex-col justify-center items-center">
        <div className="bg-white rounded-xl p-6 max-w-4xl">
          <h2 className="font-extrabold text-3xl mb-6 mt-2">
            Режим обработки проекта
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {modesData.map((mode) => (
              <div
                key={mode.id}
                className={`p-3 cursor-pointer rounded-xl broder border border-secondary border-opacity-30 min-h-[184px] hover:bg-activeBlue ${
                  selectedModeId === mode.id &&
                  'border-seagreen border-opacity-100'
                }`}
                onClick={() => handleModeSelect(mode.id)}
              >
                <h3 className="font-bold pb-2">{mode.title}</h3>
                <p className="text-secondary text-sm">{mode.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-2">
            <button
              onClick={onClose}
              className="mt-4 px-20 py-3 mr-3 font-semibold border border-secondary border-opacity-30 rounded-xl hover:bg-activeBlue"
            >
              Закрыть
            </button>
            <button
              onClick={() => handleModeSelect(null)}
              className="mt-4 px-20 py-3 bg-seagreen font-semibold border border-secondary border-opacity-30 rounded-xl hover:bg-activeBlue"
            >
              Создать
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ModsPopup.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  selectedModeId: PropTypes.number,
};

export default ModsPopup;
