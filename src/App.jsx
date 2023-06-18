import useFrom from './hooks/useFrom'
import InputGroup from './components/shared/forms/inputGroup'

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

   
    return (
        <div>
            <form>
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
          placeholder={'email'}
          onChange={handleChange}
          error={state.email.error}
          onFocus={handleFocus}
          onBlur={handleBlur}
          />

        <InputGroup 
          value={state.password.value}
          label={'Password:'}
          name={'password'}
          placeholder={'password'}
          onChange={handleChange}
          error={state.password.error}
          onFocus={handleFocus}
          onBlur={handleBlur}
          />     
          </form>       
        </div>
    )


}



export default App