export function getModsGpt() {
  return [
    {
      id: 1,
      title: {
        RU: 'Стандартный',
        EN: 'Standard',
      },
      description: {
        RU: 'Задавай вопросы боту и получай ответы',
        EN: 'Ask questions to the bot and get answers',
      },

      request: {
        RU: '',
        EN: '',
      }
    },
    {
      id: 2,
      title: {
        RU: 'Мастер слова',
        EN: 'Master of the Word',
      },

      description: {
        RU: 'Нейросеть уберет все повторяющиеся слова, заменит их на синонимы и поможет сделать текст богаче и ярче',
        EN: 'The neural network will remove all repetitive words, replace them with synonyms and help make the text richer and brighter',
      },

      request: {
        RU: 'Убери повторы слов, если они повторяются в 3х предложениях подряд и замени повторы на синонимы, за исключением имен собственных. Исправь неверный синтаксис в тексте. Исправь орфографические и пунктуационные ошибки. Убери из текста междометия и слова-паразиты. Замени часто повторяющиеся вводные части речи на синонимы. В этом тексте: ',
        EN: 'Remove repetitions of words if they are repeated in 3 consecutive sentences and replace repetitions with synonyms, except for proper names. Correct the incorrect syntax in the text. Correct spelling and punctuation errors. Remove interjections and parasitic words from the text. Replace the frequently repeated introductory parts of speech with synonyms. In this text: ',
      },
    },
    {
      id: 3,
      title: {
        RU: 'Звезда интернета',
        EN: 'Internet Star',
      },
      description: {
        RU: 'Дайте тему нейросети и она напишет текст для блога или видео на основе самых популярных источников и проверит информацию на достоверность',
        EN: 'Give a neural network topic and it will write a text for a blog or video based on the most popular sources and check the information for authenticity',
      },
      request: {
        RU: 'На основе предложенной темы собери информацию только из первичных источников. Проверь информацию на достоверность, сравни ее с похожими статьями и напиши текст для формата блога. Текст должен быть краткий и емкий. Вот тема: ',
        EN: "On the basis of the proposed topic, collect information only from primary sources. Check the information for authenticity, compare it with similar articles and write a text for the blog format. The text should be short and succinct. Here's the topic: ",
      },
    },
    {
      id: 4,
      title: {
        RU: 'Сценарист Голливуда',
        EN: 'Hollywood Screenwriter',
      },
      description: {
        RU: 'Нейросеть поможет написать сценарий для видео, пьесы или фильма. Просто расскажите о ваших идеях или напишите текст, а нейросеть подхватит',
        EN: 'The neural network will help you write a script for a video, play or movie. Just tell us about your ideas or write a text, and the neural network will pick up',
      },
      request: {
        RU: 'На основе предложенной темы напиши текст в виде сценария от лица действующих лиц. Минимум 2 действующих лица говорят реплики на заданную тему. Вот тема:',
        EN: 'Based on the proposed topic, write a text in the form of a script on behalf of the actors. At least 2 actors say replicas on a given topic. Here is the topic:',
      },
    },
    {
      id: 5,
      title: {
        RU: 'Детский психолог',
        EN: 'Child psychologist',
      },

      description: {
        RU: 'Расскажите нейросети о том, что хотите сказать ребенку, но не можете подобрать слова и она напишет для вас текст на основе советов психологов',
        EN: "Tell the neural network about what you want to say to the child, but you can't find the words and she will write a text for you based on the advice of psychologists",
      },
      request: {
        RU: 'На основе запроса предложи одну из популярных методологий воспитания ребенка и объяснения ему информации простым языком. В тексте должны отсутствовать упоминания насилия, смерти и секса. Вот запрос: ',
        EN: 'Based on the request, suggest one of the popular methodologies for raising a child and explaining information to him in simple language. There should be no mention of violence, death, or sex in the text. Here is the request: ',
      },
    },
    {
      id: 6,
      title: {
        RU: 'Директор предприятия',
        EN: 'Director of the enterprise',
      },
      description: {
        RU: 'Пишите рабочие письма и ведите рабочую переписку с помощью нейросети. Достаточно нескольких фраз, чтобы она написала грамотный и серьезный текст',
        EN: 'Write work letters and conduct work correspondence using a neural network. A few phrases are enough for her to write a competent and serious text',
      },
      request: {
        RU: 'Напиши письмо или текст в официально-деловом стиле. Из текста должны быть исключены орфографические, пунктуационные и синтаксические ошибки. При написании документа ты должно опираться на законодательство РФ. Вот запрос: ',
        EN: 'Write a letter or text in an official business style. Spelling, punctuation and syntax errors should be excluded from the text. When writing a document, you must rely on the legislation of the Russian Federation. Here is the request: ',
      },
    },
  ];
}
