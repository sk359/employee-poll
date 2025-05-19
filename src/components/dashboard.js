import { useState, useEffect } from 'react';
import { Link } from "react-router";
import { MenuBar } from './menu-bar';
import { useSelector, useDispatch } from 'react-redux';
import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from '../_DATA';
import { load, questionsSelector } from '../reducers/poll';
import { selectUser } from '../reducers/login';


function QuestionTable({questionList, showOwnAnswer} ) {
  
  function fullQuestion(question) {
    return `Would you rather ${question.optionOne.text} or ${question.optionTwo.text}?`;
  }

  return (
    <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Question</th>
            <th scope="col">Created by</th>
            <th scope="col">Time</th>
            {showOwnAnswer ?? <th scope="col">My answer</th>}
          </tr>
        </thead>
        <tbody>
          {
            questionList.map( (q, index) => {
              return <tr key={q.id}>
                <td>{index+1}</td>
                <td><Link to={"/question/" + q.id}>{fullQuestion(q)}</Link></td>
                <td>{q.author}</td>
                <td>{q.timestamp}</td>
                {showOwnAnswer ?? <td>{q.answer}</td>}
              </tr>
            })
          }
        </tbody>
      </table>
)
}

let openQuestions = [];
let answeredQuestions = [];

export function Dashboard() {
  const questions = useSelector(questionsSelector);
  const authenticatedUser = useSelector(selectUser);
  const dispatch = useDispatch();

  const [showOpenQuestions, setShowOpenQuestions] = useState(true);

  async function loadQuestions() {
    const response = await _getQuestions();
    dispatch(load(response));
  }

  useEffect( () => {
    loadQuestions();
  }, []) // [] = only on initial rendering

  useEffect( () => {
    // Re-filter lists of answered and open questions when the list is reloaded:
    const answers = Object.keys(authenticatedUser.answers)
    console.log("answers", answers);
    openQuestions = questions.filter( (question) => !answers.includes(question.id));
    answeredQuestions = questions.filter( (question) => answers.includes(question.id));
  }, [questions])

  

  return (
      <div>
        <MenuBar />
        <h3 style={{textAlign: 'center', padding: '5px'}}>Dashboard</h3>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#questions-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Open Questions</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#leaderboard-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Answered Questions</button>
          </li>
        </ul>

        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="questions-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
            <QuestionTable questionList={openQuestions} showOwnAnswer={false}/>          
          </div>
          <div class="tab-pane fade" id="leaderboard-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
             <QuestionTable questionList={answeredQuestions} showOwnAnswer={true}/>
          </div>          
        </div>

      </div>
    ) 

}