import React, { useState } from 'react'
import InputGroup from './components/shared/forms/inputGroup';
import TextInput from './components/inputs/TextInputs';
import { deepClone } from './utility/object-utilites'
const init ={
  title:{
    value:'',
    error:'',
    skills:'',
  },
  bio:{
    value:'',
    error:'',
    skills:'',
  },
  skills:{
    value:'',
    error:'',
    skills:'',
  },
}
 

const App = () => {
 
  const [state,setState] = useState({...init});
  const [hasError, setHasError] = useState(false)

  const mapStateToValues =(state)=>{
    return Object.keys(state).reduce((acc,cur)=>{

      acc[cur] = state[cur].value;
      return acc;
    },{});
  };


  // const [values,setValues] = useState({...init});
  // const [errors,setErros] = useState({...init});
  // const [focuses,setFocuses]= useState({
  //   title: false,
  //   bio:false,
  //   skills:false,
  // })

 const handleChange = (e) =>{
  const {name:key,value} = e.target;
  const oldState =  deepClone(state)
  const values =  mapStateToValues(oldState);
  oldState[key].value = value;
  const {errors} = checkValidity(values);
  

    if(oldState[key].focus && errors[key]){
      oldState[key].error = errors[key];
  
    }
    else{
      oldState[key].error = '';
   
    }
    setState(oldState);
 } ;


 const handleSubmit = (e) =>{
    e.preventDefault();
   const values = mapStateToValues(state);
  const {isvalid,errors} = checkValidity (values);

  if(isvalid){
    console.log(state);
   
  }else{
     const oldState = deepClone(state)
     Object.keys(errors).forEach(key=>{
      oldState[key].error = errors[key ];
     });
     setState(oldState)
  }
 };



 const checkValidity = (values) =>{
       const errors = {}
       const {title,bio,skills} = values;

       if(!title){
        errors.title = "invalid Tilte";
       }
       if(!bio){
        errors.bio= "invalid Bio";
       }
       if(!skills){
        errors.skills= "invalid Skills";
       }

       return{
        errors,
        isvalid: Object.keys(errors).length === 0,
       };

 };

  return (
    <div>

      <form onSubmit={handleSubmit}>
        <InputGroup 
          value={state.title.value}
          label={'Title'}
          name={'title'}
          placeholder={'enter your title'}
          onChange={handleChange}
          error={state.title.error}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        <InputGroup 
          value={state.bio.value}
          label={'Bio'}
          name={'bio'}
          placeholder={'enter your bio'}
          onChange={handleChange}
          error={state.bio.error}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        <InputGroup 
          value={state.skills.value}
          label={'Skills'}
          name={'skills'}
          placeholder={'React,javascript,css'}
          onChange={handleChange}
          error={state.skills.error}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />  

        <button disabled={hasError} type='submit' >submit</button>
      </form>
    </div>
  )
}

export default App