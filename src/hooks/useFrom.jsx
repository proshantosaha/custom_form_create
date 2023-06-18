import {useState} from 'react'
import {isObjEmpty,deepClone} from '../utility/object-utilites'


const useFrom = ({init, validate}) => {
  const [state,setState] = useState(mapValuesToState(init));

  const handleChange = (e) =>{
    const {name:key,value} = e.target;
    const oldState =  deepClone(state)
    oldState[key].value = value;

    const {errors}= getErrors();
    if(oldState[key].touched && errors[key]){
      oldState[key].error = errors[key];
    }
    else{
      oldState[key].error = '';
    }
    setState(oldState);
    } ;







  const handleFocus = (e) =>{
      const {name} = e.target;
      const oldState = deepClone(state);
      oldState[name].focused = true;
    
      if(!oldState[name].touched){
        oldState[name].touched = true
    
      }
      setState(oldState);
    
    
  };





 const handleBlur = (e) =>{
      const key = e.target.name;
      const {errors}= getErrors()
   
      
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
    


  const handleSubmit = (e,cb) =>{
    e.preventDefault();
    const {hasError,errors,values}=getErrors();
    cb({
      hasError,
      errors,
      values,
      touched :mapStateTokeys(state,'touched'),
      focused:mapStateTokeys(state,'focused'),
      
    });

  };


  const clear = () =>{
    const newState = mapValuesToState(init,true)
    setState(newState);
  
  }


  const getErrors = () =>{
    let hasError = null,
    errors = null;
  
    const values = mapStateTokeys(state,'value');
  
  
   if(typeof validate === 'boolean'){
     hasError = validate
     errors = mapStateTokeys(state,'error');
   }else if(typeof validate === 'function'){
     const errorsFromCB = validate(values);

     hasError = !isObjEmpty(errorsFromCB)  
     errors = errorsFromCB
   }else{
     throw new Error('Validate the new error');
    }
  
    return {
      values,
      errors,
      hasError,
    };
  };

  return {
    formState:state,
    handleChange,
    handleFocus,
    handleBlur,
    handleSubmit,
    clear,
  };
};




export default useFrom




const mapValuesToState =(values,shouldClear=false) =>{
  return Object.keys(values).reduce((acc,key)=>{
    acc[key] = {
      value:shouldClear ? '':values[key],
      error : '',
      focused : false,
      touched : false,
    };
    return acc;

  },{});

}





const mapStateTokeys =(state, key)=>{
  return Object.keys(state).reduce((acc,cur)=>{

    acc[cur] = state[cur][key];
    return acc;
  },{});
};






