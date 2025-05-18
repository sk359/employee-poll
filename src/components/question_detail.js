import {useEffect } from 'react';
import { Link } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from "react-router";
import { selectUser, logout } from '../reducers/login';
import { _getQuestions } from '../_DATA';
import { MenuBar } from './menu-bar';


export function QuestionDetail() {
    const { question_id } = useParams();
    let question = null;

    async function getQuestion() {
      const questions = await _getQuestions();        
      return questions[question_id];
    }

    useEffect( () => {
      question = getQuestion();
    }, [])

    return (
        <div>
          <MenuBar />
          <div>Question {question_id}</div>
        </div>
    ) 

}