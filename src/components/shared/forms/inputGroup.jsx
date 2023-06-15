import React from 'react';
import styled from 'styled-components';
import TextInput from '../../inputs/TextInputs';
import Label from '../../inputs/Label';


const Container = styled.div`
  width:100%;
  padding:1rem;
  border:1px solid #e1e1e1;
  display:flex;
  flex-direction:column;
  gap:0.5rem;

`;

const ErrorMassage = styled.div`
  color:red;
  font-size:0.8ren;
`;

const InputGroup = ({label,name,value,placeholder,error,onChange,onFocus,onBlur}) => {
  return (
    <Container>
      <Label htmlFor={name}>{label}</Label>
      <TextInput  
      name={name} 
      value={value} 
      onChange={onChange} 
      onFocus={onFocus} 
      onBlur={onBlur}
       id={name} 
       placeholder={placeholder ?? ''}
       error={error}
       />
      {error && <ErrorMassage>{error}</ErrorMassage>}
    </Container>
  )
}

export default InputGroup