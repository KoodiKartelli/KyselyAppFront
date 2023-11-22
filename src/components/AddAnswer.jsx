import { useState } from "react"
import { Button, Input } from "@mui/material";

export default function AddAnswer (props){

    const [answer, setAnswer] = useState({answer: ''});

    const handleInputChange = (event) => {
        setAnswer({ answer: event.target.value });
    }
    
    
    const handleSave = () => {
        props.addAnswer({ questionId: props.questionId, answer: answer.answer });
        console.log("Saving answer:", answer);
    }

    return(
        <div>
        <Input
            type="text"
            placeholder="Type your answer"
            value={answer.answer}
            onChange={handleInputChange}
        />
        <Button onClick={handleSave}>Save answer</Button>
        </div>
    )
}