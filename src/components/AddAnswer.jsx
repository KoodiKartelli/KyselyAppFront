import { useState } from "react"
import { Button, Input, Radio, RadioGroup, FormControlLabel } from "@mui/material"; //muokattu

export default function AddAnswer (props){

    console.log("Options:", props.options)

    const [answer, setAnswer] = useState({answer: ''});
    const [option, setOption] = useState({option: ''});
    const [selectedOption, setSelectedOption] = useState(null);

    const handleInputChange = (event) => {
        setAnswer({ answer: event.target.value });
    }
    
    const handleOptionChange = (event) => { //uusi
        setSelectedOption(event.target.value);
    }

   /* return(
        <div>
        <Input
            type="text"
            placeholder="Type your answer"
            value={answer.answer}
            onChange={handleInputChange}
        />
        <Button onClick={handleSave}>Save answer</Button>
        </div> 
    ) */

    const renderAnswerInput = () => {
        if (props.options && props.options.length > 0) {
          return (
            <RadioGroup value={selectedOption} onChange={handleOptionChange}>
              {props.options.map((option) => (
                <FormControlLabel
                  key={option.optionId}
                  value={option.optionText}
                  control={<Radio />}
                  label={option.optionText}
                />
              ))}
            </RadioGroup>
          );
        } else {
          return (
            <Input
              type="text"
              placeholder="Type your answer"
              value={answer.answer}
              onChange={handleInputChange}
            />
          );
        }
      };

    /* const handleSave = () => {
        props.addAnswer({ questionId: props.questionId, answer: answer.answer });
        console.log("Saving answer:", answer);
    } */

    const handleSave = () => {
        const selectedAnswer = selectedOption !== null ? selectedOption : answer.answer;
        props.addAnswer({ questionId: props.questionId, answer: selectedAnswer });
        console.log("Saving answer:", selectedAnswer);
      };
    
      return (
        <div>
          {renderAnswerInput()}
          <Button onClick={handleSave}>Save answer</Button>
        </div>
      );
}