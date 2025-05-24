import { useEffect } from 'react';
import { orderBy } from 'lodash';
import { Link } from "react-router";
import { MenuBar } from './menu-bar';
import { useSelector, useDispatch } from 'react-redux';
import { questionsSelector, loadQuestionsAsync } from '../reducers/poll';
import { selectUser } from '../reducers/login';


function QuestionTable({questionList, showOwnAnswer, authUser} ) {  
  
  function fullQuestion(question) {
    return `Would you rather ${question.optionOne.text} or ${question.optionTwo.text}?`;
  }

  function getAnswerForQuestion(question) {
    if (!authUser) {
      return "";
    }
    const option = authUser.answers[question.id];
    if (option === 'optionOne') {
      return question.optionOne.text;
    }
    return question.optionTwo.text;
  }

  function timestampToTime(ts) {
    let date = new Date(ts); 
    return date.toLocaleString("en-US");
  }

  return (
    <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Question</th>
            <th scope="col">Created by</th>
            <th scope="col">Created at</th>
            {showOwnAnswer ? <th scope="col">My answer</th> : null}
          </tr>
        </thead>
        <tbody>
          {
            questionList.map( (q, index) => {
              return <tr key={q.id}>
                <td>{index+1}</td>
                <td style={{textAlign: 'left'}}><Link to={"/question/" + q.id}>{fullQuestion(q)}</Link></td>
                <td>{q.author}</td>
                <td>{timestampToTime(q.timestamp)}</td>
                {showOwnAnswer ? <td>{getAnswerForQuestion(q)}</td> : null}
              </tr>
            })
          }
        </tbody>
      </table>
)
}

let openQuestions = [];
let answeredQuestions = [];

export default function Dashboard() {
  const questions = useSelector(questionsSelector);
  const authenticatedUser = useSelector(selectUser);
  const dispatch = useDispatch();   

  useEffect( () => {     
    dispatch(loadQuestionsAsync());
  }, []) // [] = only on initial rendering

  useEffect( () => {
    // Re-filter lists of answered and open questions when the list is reloaded:
    if (!authenticatedUser) {
      return;
    }    
    const answers = Object.keys(authenticatedUser.answers);    
    openQuestions = orderBy(questions.filter( (question) => !answers.includes(question.id)), ['timestamp'], ['desc']);
    answeredQuestions = orderBy(questions.filter( (question) => answers.includes(question.id)), ['timestamp'], ['desc']);
  }, [questions, authenticatedUser])  

  return (
      <div>
        <MenuBar />
        <div className="main-content">
          <h3 style={{textAlign: 'center', padding: '5px'}}>Dashboard</h3>
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#open-questions-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Open Questions</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#leaderboard-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Answered Questions</button>
            </li>
          </ul>

          <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="open-questions-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
              <QuestionTable questionList={openQuestions} showOwnAnswer={false} authUser={authenticatedUser}/>          
            </div>
            <div className="tab-pane fade" id="leaderboard-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
              <QuestionTable questionList={answeredQuestions} showOwnAnswer={true} authUser={authenticatedUser}/>
            </div>          
          </div>
        </div>

      </div>
    ) 

}