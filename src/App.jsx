import React, { useState } from 'react'
import InputGroup from './components/shared/forms/inputGroup';
import TextInput from './components/inputs/TextInputs';

const init ={
  title:'',
  bio:'',
  skills:'',
}

const App = () => {
  const [formState,setFormState] = useState({...init});



 const handleChange = (e) =>{
  setFormState(prev =>({
    ...prev,
      [e.target.name]:e.target.value
  }))
 } 


 const handleSubmit = e =>{
    e.preventDefault()
    console.log(formState);

 }

  return (
    <div>

      <form onSubmit={handleSubmit}>
        <InputGroup 
          value={formState.title}
          label={'Title'}
          name={'title'}
          placeholder={'enter your title'}
          onChange={handleChange}
        />

        <InputGroup 
          value={formState.bio}
          label={'Bio'}
          name={'bio'}
          placeholder={'enter your bio'}
          onChange={handleChange}
        />

        <InputGroup 
          value={formState.skills}
          label={'Skills'}
          name={'skills'}
          placeholder={'React,javascript,css'}
          onChange={handleChange}
        />  

        <button type='submit' >submit</button>
      </form>
    </div>
  )
}

export default App