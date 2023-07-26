const EmptyDialogMessage = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <h3 className="text-2xl font-semibold">
        У вас пока нет ни одного сообщения
      </h3>
      <p className="text-base font-semibold">
        Начните диалог с чат-ботом, запишите или загрузите аудио
      </p>
    </div>
  );
};

export default EmptyDialogMessage;
