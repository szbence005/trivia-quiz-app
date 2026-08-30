async function getQuestions() {
    const response = await fetch(
        "https://opentdb.com/api.php?amount=10&type=multiple"
    );

    const data = await response.json();

    return data;
}

export { getQuestions };
