import {useState} from 'react'
import { deepClone,isObjEmty } from '../utility/object-utilites';


const params = {
  init:{},

}

const useFrom = ({init,validate}) => {

  const [state, setState] = useState (mapValuesToState(init));


  const handleChange = ()=>{
    const {name :key,value} = e.target

    const oldState = deepClone(state);
    oldState [key].value = value;

   const {errors} = getErrors()


    if (oldState[State].focus && errors[key]){
      oldState[key].error = errors[key];
    }else{
      oldState[key].error='';
    }
    setState(oldState);
  };

  const handleSubmit = (e, cb) =>{
    e.preventDefault();
   const {hasError,errors,values}= getErrors()
   cb({
    hasError,
    errors,
    values,
    touched : mapStateToKeys(state, 'touched'),
    focused:mapStateToKeys(state, 'focused'),
   });

  if(typeof validate === 'boolean'){
    if(validate){
      cb({
        values:mapStateToKeys(state,'value'),
        touched : mapStateToKeys(state, 'touched'),
        focused:mapStateToKeys(state, 'focused'),
        error:mapStateToKeys(state, 'error'),
        hasErrors : false,
      })
    }else{
      cb({
        errors:mapStateToKeys(state,'error'),
        hasErrors:true
      })
    }

    return;
  }

  if (typeof validate === 'function'){
    const values = mapStateToKeys(state, 'values ')
    const {errors} = validate(values)
    const hasErrors= !isObjEmty(errors)  

    if(hasErrors){
      cb({
        errors,
        hasErrors
      })
      
    }else{
      cb({
        values:mapStateToKeys(state,'value'),
        touched : mapStateToKeys(state, 'touched'),
        focused:mapStateToKeys(state, 'focused'),
        error:mapStateToKeys(state, 'error'),
        hasErrors,
      });
    }

  }

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



 const getErrors = () =>{
    let hasError = null,
     errors= null;

    const values = mapStateToKeys(state, 'values ')

    if(typeof validate === 'boolean'){
      hasError = validate
      errors = mapStateToKeys(state, 'error');

    }else if(typeof validate === 'function'){
      const {errors : errorsFromCB} = validate(values);
        hasError = !isObjEmty(errorsFromCB)  
        errors = errorsFromCB

    }else{
      throw new Error ('Validate the new error')
    }

    return {
      values,
      errors,
      hasError
    }
 }
  


 const handleFocus = (e) =>{
  const {name} = e.target;
  const oldState = deepClone(state);
  oldState[name].focused = true;

  if(!oldState[name].touched){
    oldState[name].touched = true

  }
  setState(oldState);


 }

 const handleBlur = (e) =>{
   const key = e.target.name;

   const {errors} = getErrors()
    const oldState = deepClone(state);
    
    if(oldState[key].touched && errors[key]){
      oldState[key].error = errors[key];
    }
    else{
      oldState[key].error = '';
    }  

    oldState[key].focused = false
    setState(oldState);
      
 };
 
  return {

    formState : state,
    handleChange,
    handleSubmit,
    handleBlur,
    handleFocus,
  
  }
    
  
}

export default useFrom


const mapValuesToState = () =>{
  return Object.keys(values).reduce((acc,key)=>{


    acc[key] = {
      value:values[key],
      error : '',
      focusd : false,
      touched : false,
    }


    return acc

  },{})
}


const mapStateToKeys =(state,key)=>{
  return Object.keys(state).reduce((acc,cur)=>{

    acc[cur] = state[cur][key].value;
    return acc;
  },{});

}


