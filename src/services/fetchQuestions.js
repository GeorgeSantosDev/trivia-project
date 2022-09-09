const defaultQuestionsNumber = 5;

const getQuestions = async (token, number = defaultQuestionsNumber) => {
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=${number}&token=${token}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Ocorreu um erro: ${error}`);
  }
};

export default getQuestions;
