const getTokenAPI = async () => {
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    return data.token;
  } catch (error) {
    console.log(`Ocorreu um erro: ${error}`);
  }
};

export default getTokenAPI;
