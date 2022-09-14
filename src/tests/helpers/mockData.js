const mockData = {
  response_code: 0,
  results: [
    {
      category: 'Art',
      type: 'boolean',
      difficulty: 'medium',
      question: 'Vincent van Gogh cut off one of his ears.',
      correct_answer: 'True',
      incorrect_answers: [
        'False',
      ],
    },
    {
      category: 'History',
      type: 'multiple',
      difficulty: 'hard',
      question: 'What was found in 1946 by two young shepards near a cave?',
      correct_answer: 'Dead Sea Scrolls',
      incorrect_answers: [
        'The Blackbeard Chest',
        'Sheep',
        'The First Oaxaca Cave Sleeper',
      ],
    },
    {
      category: 'Geography',
      type: 'boolean',
      difficulty: 'easy',
      question: 'Greenland is almost as big as Africa.',
      correct_answer: 'False',
      incorrect_answers: [
        'True',
      ],
    },
    {
      category: 'Entertainment: Books',
      type: 'multiple',
      difficulty: 'hard',
      question: 'In Margaret Atwood&#039;s &quot;The Handmaid&#039;s Tale&quot;, what is Offred&#039;s real name is implied to be?',
      correct_answer: 'June',
      incorrect_answers: [
        'August',
        'April',
        'May',
      ],
    },
    {
      category: 'General Knowledge',
      type: 'boolean',
      difficulty: 'medium',
      question: 'Instant mashed potatoes were invented by Canadian Edward Asselbergs in 1962.',
      correct_answer: 'True',
      incorrect_answers: [
        'False',
      ],
    },
  ],
};

export default mockData;
