import useFrom from './hooks/useFrom'
import InputGroup from './components/shared/forms/inputGroup'
import Task from './components/task/Task';

const init = {
    firstName : '',
    lastName : '',
    email:'',
    password:'',
}

    const validate =(values) =>{
    const errors = {};
    if (!values.firstName){
        errors.firstName = 'firstName is required'  
    }
     if (!values.lastName){
        errors.lastName = 'lastName is required'
    }
      if (!values.email){
        errors.email = 'email is required'
    }
     if (!values.password){
        errors.password = 'password is required'
    }else if(values.password.length <6){
        errors.password = 'password length must be 6 character'
    }


    return errors 

    }

const App = () =>{

    const {
        formState:state,
        handleChange,
        handleBlur,
        handleFocus,
        handleSubmit,
        clear
    } = useFrom({init,validate});

   const cb = ({hasError,values,errors}) =>{
        if(hasError){
            alert("[ERROR]" + JSON.stringify(errors))
        }else{
            alert("[SUCCES]" + JSON.stringify(values))
        }
   }
    return (
        <div>
            <form onSubmit={(e)=>handleSubmit(e,cb)}>
            <h1>my custom hooks from</h1>
        <InputGroup 
          value={state.firstName.value}
          label={'FirstName:'}
          name={'firstName'}
          placeholder={'name'}
          onChange={handleChange}
          error={state.firstName.error}
          onFocus={handleFocus}
          onBlur={handleBlur}
          />


          <InputGroup 
          value={state.lastName.value}
          label={'LastName:'}
          name={'lastName'}
          placeholder={'lastName'}
          onChange={handleChange}
          error={state.lastName.error}
          onFocus={handleFocus}
          onBlur={handleBlur}
          />


          <InputGroup 
          value={state.email.value}
          label={'Email:'}
          name={'email'}
          placeholder={'text@gmail.com'}
          onChange={handleChange}
          error={state.email.error}
          onFocus={handleFocus}
          onBlur={handleBlur}
          />

        <InputGroup 
          value={state.password.value}
          label={'Password:'}
          name={'password'}
          placeholder={'**************'}
          onChange={handleChange}
          error={state.password.error}
          onFocus={handleFocus}
          onBlur={handleBlur}
          />     

          <div>
            <button type= 'submit' >submit</button>
            <button type='reset' onClick={clear} >clear</button>

          </div>
          </form>      

          <hr/> 

          <Task/>
        </div>
    )


}



export default App