import sendicon from '../../assets/icon/sendicon.svg';

const TextInputGPT = () => {
  return (
    <div className="border border-secondary border-opacity-30 rounded-xl overflow-hidden flex items-center grow">
      <input
        type="text"
        placeholder="Задайте вопрос нейросети"
        className="px-4 py-3 leading-snug focus:outline-none grow font-semibold"
      />
      {/* <input type="file" /> */}
      <button className="bg-seagreen py-3 px-3">
        <img src={sendicon} />
      </button>
    </div>
  );
};

export default TextInputGPT;
