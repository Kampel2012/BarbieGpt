import plus from '../../assets/icon/plus.svg';

const EmptyProject = () => {
  return (
    <div className="mt-6">
      <button
        type="button"
        className="flex bg-seagreen text-lg w-full py-3 rounded-xl leading-tight gap-2 border border-secondary border-opacity-30 font-semibold items-center justify-center"
      >
        <img src={plus} className="" />
        <p>Создать проект</p>
      </button>
      <p className="text-primary text-sm mt-2">
        У вас пока не создано ни одного проекта. Нажмите создать проект чтобы
        приступить к работе
      </p>
    </div>
  );
};

export default EmptyProject;
