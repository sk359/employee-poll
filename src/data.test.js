import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import { _saveQuestion, _getQuestions } from './_DATA';

test('Number of questions should have been increased by one', async () => {
    const questions = await _getQuestions();
    const numberOfQuestionsBefore = Object.keys(questions).length;
    const newQuestion = {optionOneText: "One", optionTwoText: "Two", author: "johndoe"};
    const savedQuestion = await _saveQuestion(newQuestion);
    const questionsReloaded = await _getQuestions();
    const numberOfQuestionsAfter = Object.keys(questionsReloaded).length;
    expect(numberOfQuestionsAfter).toBe(numberOfQuestionsBefore+1);
})