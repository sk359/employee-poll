import {useEffect } from 'react';
import { Link } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from "react-router";
import { selectUser, logout, selectUserList } from '../reducers/login';
import { _getQuestions } from '../_DATA';
import { MenuBar } from './menu-bar';


let question = null;
let user = null;

export function QuestionDetail() {
    const { question_id } = useParams();
    const userList = useSelector(selectUserList);
    //let question = null;

    async function getQuestion() {
      const questions = await _getQuestions();        
      question = questions[question_id];
      for (const u of userList) {
        if (u.id === question.author) {
          user = u;
          break;
        }
      }
    }    

    useEffect( () => {
      getQuestion();
    }, [])

    return (
        <div>
          <MenuBar />
          <div>
            <h4>Poll by {user?.id}</h4>
            <img src={user?.avatarURL}/>
            <h4>Would you rather</h4>
          </div>
        </div>
    ) 

}