import Form from "./Form";
import {useState} from 'react';

const Dashboard = () => {

    const [expressway, setExpressway] = useState("Ayer Rajah Expressway")

    const handleSubmit = (e) => {
        console.log(e.target.innerText)
        setExpressway(e.target.innerText)
    }

    return ( 
        <div style={{margin:'auto', width: "90%"}}>
            <Form handleSubmit={handleSubmit}/>
        </div>
     );
}
 
export default Dashboard;
