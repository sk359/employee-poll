import { useState, useEffect } from 'react';
import { orderBy } from 'lodash';
import { MenuBar } from './menu-bar';
import { useSelector, useDispatch } from 'react-redux';
import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from '../_DATA';
import { load, questionsSelector } from '../reducers/poll';
import { selectUser, selectUserList } from '../reducers/login';

class LeaderboardUser {
    constructor(user) {
      this.user = user;
      this.numberOfAnswers = Object.keys(user.answers).length;
      this.score = this.numberOfAnswers + user.questions.length;
    }
}


export function Leaderboard() {
  const userListState = useSelector(selectUserList);
  const [userList, setUserList] = useState([]);

  useEffect( () => {
    // reset data:
    const users = userListState.map( (user) => new LeaderboardUser(user));
    setUserList(orderBy(users, ['score'], ['desc']));
    console.log("leaderboard", users);
  }, [userListState])

  return (
    <div>
        <MenuBar />
        <h3 style={{textAlign: 'center', padding: '15px'}}>Leaderboard</h3>
        <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col"></th>
            <th scope="col">Name</th>
            <th scope="col">Questions asked</th>
            <th scope="col">Questions answered</th>
            <th scope="col">Score</th>
          </tr>
        </thead>
        <tbody>
          {
            userList.map( (user, index) => {
              return <tr key={user.user.id}>
                <td>{index+1}</td>
                <td><img src={user.user.avatarURL}/></td>
                <td>{user.user.name}</td>
                <td>{user.user.questions.length}</td>
                <td>{user.numberOfAnswers}</td>
                <td>{user.score}</td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  )

}