import { useState } from "react"
import { Button, Input, Radio, RadioGroup, FormControlLabel } from "@mui/material"; //muokattu

export default function AddAnswer(props) {

  const [answer, setAnswer] = useState({ answer: '' });
  const [selectedOption, setSelectedOption] = useState(null);

  const handleInputChange = (event) => {
    setAnswer({ answer: event.target.value });
  }

  const handleOptionChange = (event) => { //uusi
    setSelectedOption(event.target.value);
  }

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

  const handleSave = () => {
    const selectedAnswer = selectedOption !== null ? selectedOption : answer.answer;
    props.addAnswer({ questionId: props.questionId, answer: selectedAnswer });
  };

  return (
    <div>
      {renderAnswerInput()}
      <Button onClick={handleSave}>Save answer</Button>
    </div>
  );
}