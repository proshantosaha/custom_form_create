import React, { useState } from 'react'
import InputGroup from './components/shared/forms/inputGroup';
import TextInput from './components/inputs/TextInputs';

const init ={
  title:'',
  bio:'',
  skills:'',
}

const App = () => {
  const [values,setValues] = useState({...init});
  const [errors,setErros] = useState({...init});
  const [focuses,setFocuses]= useState({
    title: false,
    bio:false,
    skills:false,
  })



 const handleChange = (e) =>{
  setValues(prev =>({
    ...prev,
      [e.target.name]:e.target.value
  }))
 } 


 const handleSubmit = e =>{
    e.preventDefault()
  const {isvalid,errors} = checkValidity (values)
  if(isvalid){
    console.log(values);
    setErros({...errors})
  }else{
    setErros({...errors})
  }
 }


 const handleFocus = (e) =>{
  setFocuses((prev) => ({
    ...prev,
    [e.target.name]:true
  })   )
 }

 const handleBlur = (e) =>{
   const key = e.target.name
    const {errors} = checkValidity(values)
    if(errors[key] && focuses[key] === true){
      setErros((prev) => ({
        ...prev,
        [key]:errors[key],
      }));
    }
    else{
      setErros((prev) => ({
        ...prev,
        [key]:'',
      }));

    }
      
 }

 const checkValidity = () =>{
       const errors = {}

       const {title,bio,skills} = values
       if(!title){
        errors.title = "invalid Tilte"
       }
       if(!bio){
        errors.bio= "invalid Bio"
       }
       if(!skills){
        errors.skills= "invalid Skills"
       }

       return{
        errors,
        isvalid: Object.keys(errors).length === 0,
       }

 }

  return (
    <div>

      <form onSubmit={handleSubmit}>
        <InputGroup 
          value={setValues.title}
          label={'Title'}
          name={'title'}
          placeholder={'enter your title'}
          onChange={handleChange}
          error={errors.title}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        <InputGroup 
          value={setValues.bio}
          label={'Bio'}
          name={'bio'}
          placeholder={'enter your bio'}
          onChange={handleChange}
          error={errors.bio}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        <InputGroup 
          value={setValues.skills}
          label={'Skills'}
          name={'skills'}
          placeholder={'React,javascript,css'}
          onChange={handleChange}
          error={errors.skills}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />  

        <button type='submit' >submit</button>
      </form>
    </div>
  )
}

export default App