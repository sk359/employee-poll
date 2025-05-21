import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MenuBar } from './menu-bar';
import { _saveQuestion } from '../_DATA';
import { selectUser } from '../reducers/login';
import { createQuestionsAsync } from '../reducers/poll';


let question = {
  author: null,
  optionOneText: "", 
  optionTwoText: ""
}


export function CreatePoll() {
  const [formData, setFormData] = useState({ optionOne: "", optionTwo: "" });
  const authenticatedUser = useSelector(selectUser);
  const dispatch = useDispatch();  
  
  async function handleSubmit(event) {
    event.preventDefault();
    question.optionOneText = formData.optionOne;
    question.optionTwoText = formData.optionTwo;
    question.author = authenticatedUser.id;    
    dispatch(createQuestionsAsync(question));   
  }

  function changeOptionOne(event) {
    setFormData({...formData, optionOne: event.target.value});
  }

  function changeOptionTwo(event) {
    setFormData({...formData, optionTwo: event.target.value});
  }
    
  return (
      <div>
        <MenuBar />
        <div class="main-content">
          <h3>Create new Poll</h3>
          <h4>Would you rather...</h4>
          <div>
            <form onSubmit={handleSubmit}>
              <div class="mb-3">
                  <label for="option-one" class="form-label">Option One</label>
                  <input type="text" class="form-control" id="option-one" onChange={changeOptionOne} value={formData.optionOne}/>    
              </div>
              <div class="mb-3">
                  <label for="option-two" class="form-label">Option Two</label>
                  <input type="text" class="form-control" onChange={changeOptionTwo} id="option-two" value={formData.optionTwo}/>
              </div>  
              <button type="submit" class="btn btn-primary">Save Question</button>
          </form>
          </div>
        </div>
      </div>
  ) 

}