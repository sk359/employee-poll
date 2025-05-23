import '@testing-library/jest-dom';
import { _saveQuestion, _getQuestions, _saveQuestionAnswer, _getUsers } from './_DATA';


test('Number of questions should have been increased by one', async () => {
    const questions = await _getQuestions();
    const numberOfQuestionsBefore = Object.keys(questions).length;
    const newQuestion = {optionOneText: "One", optionTwoText: "Two", author: "johndoe"};
    const savedQuestion = await _saveQuestion(newQuestion);
    const questionsReloaded = await _getQuestions();
    const numberOfQuestionsAfter = Object.keys(questionsReloaded).length;
    expect(numberOfQuestionsAfter).toBe(numberOfQuestionsBefore+1);
})

test('Error when trying to store invalid question', async () => {    
    const newQuestion = {optionOneText: "One", optionTwoText: "Two"};
    await expect(_saveQuestion(newQuestion)).rejects.toEqual( new TypeError("Cannot read properties of undefined (reading 'questions')"));  
});


describe("Test _saveQuestionAnswer", () => {

    test("Correct object", async () => {
      const answer = { authedUser: "johndoe", qid: "loxhs1bqm25b708cmbf3g", answer: "optionOne" };
      await _saveQuestionAnswer(answer);
      const questions = await _getQuestions();
      const question = questions[answer.qid];      
      expect(question.optionOne.votes.length).toBe(1);
      expect(question.optionOne.votes[0]).toBe(answer.authedUser);
    })

    test("Error on incorrect object", async () => {
      const answer = { authedUser: "johndoe", qid: "loxhs1bqm25b708cmbf3g", answer: "optionThree" };
      await expect(_saveQuestionAnswer(answer)).rejects.toEqual( new TypeError("Cannot read properties of undefined (reading 'votes')"));       
    })

});

describe("Test _getUsers", () => {

  test("Returns list of users", async () => {
    const users = await _getUsers();
    const userList = Object.keys(users);
    expect(userList.length).toBe(3);
  });

});