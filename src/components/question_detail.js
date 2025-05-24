import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from "react-router";
import { selectUser, selectUserList, login, loadUsersFromFile } from '../reducers/login';
import { MenuBar } from './menu-bar';
import { questionsSelector, saveAnswerAsync } from '../reducers/poll';


class Statistics {
  constructor(countOne, countTwo) {
    this.countOne = countOne;
    this.countTwo = countTwo;
    this.percentageOne = "0%"; 
    this.percentageTwo = "0%"
    const totalCount = countOne + countTwo;
    if (totalCount > 0) {
      const pctOne = countOne*100/totalCount;
      const pctTwo = countTwo*100/totalCount;
      this.percentageOne = `${pctOne.toFixed(1)}%`; 
      this.percentageTwo = `${pctTwo.toFixed(1)}%`; 
    }
  }
}

let answerData = {
  authedUser: null, 
  qid: null, 
  answer: null
}

let statistics = new Statistics(0,0);

let user = null;

export function QuestionDetail() {
    const { question_id } = useParams();
    const userList = useSelector(selectUserList);
    const authenticatedUser = useSelector(selectUser);
    const [showAnswer, setShowAnswer] = useState(false);
    const [question, setQuestion] = useState(null);    
    const [answerByUser, setAnswerByUser] = useState(null);
    const questions = useSelector(questionsSelector);
    const dispatch = useDispatch();   
    const navigate = useNavigate();
   

    async function _loadUsersFromFile() {
      // Reload user data after the answer was saved:
      dispatch(loadUsersFromFile());      
    }

    useEffect( () => {
      // Update auth user:
      const user = userList.filter( u => u.id === authenticatedUser.id)[0];
      dispatch(login(user));
    }, [userList])

    async function getQuestion() {
      //const questions = await _getQuestions();        
      const questionTemp = questions.filter( q => q.id === question_id)[0];
      if (!questionTemp) {
        navigate("/page-not-found");
        return;
      }
      for (const u of userList) {
        if (u.id === questionTemp.author) {
          user = u;
          break;
        }
      }
      setQuestion(questionTemp);
      statistics = new Statistics(questionTemp.optionOne.votes.length, questionTemp.optionTwo.votes.length);      
      if (authenticatedUser.answers[questionTemp.id]) {
        setAnswerByUser(authenticatedUser.answers[questionTemp.id]);        
      }
    }    

    useEffect( () => {
      getQuestion();
    }, [])

    async function _saveAnswer() {
      dispatch(saveAnswerAsync(answerData));
      setShowAnswer(true);
      // update anwer list of user:      
      await _loadUsersFromFile();      
    }

    async function voteAnswer1(event) {      
      answerData.authedUser = authenticatedUser.id;
      answerData.qid = question.id;
      answerData.answer = 'optionOne';
      await _saveAnswer();
    }

    async function voteAnswer2(event) {      
      answerData.authedUser = authenticatedUser.id;
      answerData.qid = question.id;
      answerData.answer = 'optionTwo';
      await _saveAnswer();
    }

    function displayAnswer() {
      let display = "";
      if (answerData.answer === 'optionOne') {
        display = question.optionOne.text;
      } else {
        display = question.optionTwo.text;
      }
      return <div style={{marginTop: '30px'}}><div class="alert alert-success" role="alert">you answered: <strong>{display}</strong></div></div>
    }

    function votingDisabled() {
      return (answerByUser !== null) || showAnswer; 
    }

    function showOptionOneConfirmed() {      
      return answerByUser === 'optionOne'; 
    }

    function showOptionTwoConfirmed() {
      return answerByUser === 'optionTwo'; 
    }

    return (
        <div>
          <MenuBar />
          <div style={{textAlign: 'center', width: '60%', marginLeft: '20%'}}>
            <h4>Poll by {user?.id}</h4>
            <img src={user?.avatarURL}/>
            <h4 class="mb-5">Would you rather</h4>
            <div id="vote-area">
              <div>
                <div class="container text-center">
                  <div class="row align-items-start">
                    <div class="col">
                      <div class="fs-3">{question?.optionOne.text}</div>
                      <button type="button" disabled={votingDisabled()} class="btn btn-primary" onClick={voteAnswer1}>Vote</button>
                      {showOptionOneConfirmed() ? <div class="alert alert-success" role="alert">Your Vote</div> : null}
                      <div>Votes: {statistics.countOne} ({statistics.percentageOne})</div>
                    </div>       
                    <div class="col fs-1">OR</div>             
                    <div class="col">
                      <div class="fs-3">{question?.optionTwo.text}</div>
                      <button type="button" disabled={votingDisabled()} class="btn btn-primary" onClick={voteAnswer2}>Vote</button>
                      {showOptionTwoConfirmed() ? <div class="alert alert-success" role="alert">Your Vote</div> : null}
                      <div>Votes: {statistics.countTwo} ({statistics.percentageTwo})</div>
                    </div>
                  </div>
                </div>
                
              </div>

            </div>

            {showAnswer && displayAnswer()}
            
          </div>)
           
        </div>
    ) 

}