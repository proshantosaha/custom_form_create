import useForm from './hooks/useFrom'



const App = () =>{

    const {formState} = useFrom ({
        init : {
            name : 'hello ps',
            email : '',
            password :'',
        }
    })

    return (
        <div>
            <h1>App</h1>
        </div>
    )


}



export default App