import InquiryList from './components/InquiryList'
import Container from '@mui/material/Container'
import QuestionList from './components/QuestionList'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {

  return (
    <>
      <Router>
        <Container>
          <Routes>
           <Route path="/questions" element={<QuestionList />} />
           <Route path="/" element={<InquiryList />} />
          </Routes>
        </Container>
      </Router>
    </>
  )
}

export default App
