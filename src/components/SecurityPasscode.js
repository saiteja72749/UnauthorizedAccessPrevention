import React, { useEffect, useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
import './Project.css';

function SecurityPasscode() {
  const [value, setValue] = useState('');
  const [input, setInput] = useState('password');
  const [auth, setAuth] = useState(false);
  const [passwordCorrect, setpasswordCorrect] = useState(true);
  const [attempts, setAttempts] = useState(0);

  const inputRef = useRef(null);
  const formRef = useRef(null);

  const Focus = () => {
    inputRef.current.focus();
  };

  const sendEmail = (e) => {
    const formElement = formRef.current;
    console.log({ input: value });
    emailjs.sendForm('service_4aoupwu', 'template_x1ciibj', formElement, 'JFEB9cka8w0T7GpPH')
        .then((result) => {
            console.log("Email sent", result.text)
        }, (error) => {
            console.log("Error in sending Email", error.text)
        })
}

  const showHide = () => {
    if (input === 'password') {
      setInput('text');
    } else {
      setInput('password');
    }
  };

  useEffect(()=>{
    Focus();
  },[])

  const handleInputChange = (event) => {
    setInput(event.target.value);
    setValue(event.target.value);
    setAuth(true);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (value === '72749') {
      setpasswordCorrect(true);
      alert('login successful');
    } else if (value === '') {
      setpasswordCorrect(false);
      alert('Please enter the passcode');
    }else {
      setpasswordCorrect(false);
      setValue('');
      setAttempts((prevAttempts) => {
        const newAttempts = prevAttempts + 1;
        if(newAttempts >=3){
          sendEmail();
          console.log("email sent");
          alert('You entered incorrect passcode for 3 times. A mail sent to the owner');  
        }
        return newAttempts;
      })
    }
  }

  return (
    <div>
      <center>
        <form className='security' ref={formRef}>
          <input
            type={input}
            value={value}
            onChange={handleInputChange}
            placeholder='Enter the Passcode'
            ref={inputRef}
            className='inputbox'
          />
          <button type='button' onClick={showHide} className='showHide'>
            {input === 'password' ? <BiSolidShow /> : <BiSolidHide />}
          </button>
          <br /> &nbsp; &nbsp;
          <p className='errormsg'>{!passwordCorrect && 'Your password is incorrect'}</p>
          <br />

          <div className='button-group'>
          <button type='button' onClick={() => setValue(value.slice(0, -1))} className='BackSpace'>
            Back Space
          </button>
          <br />

          <button type='button' onClick={() => setValue(value + '7')}>7</button>
          <button type='button' onClick={() => setValue(value + '8')}>8</button>
          <button type='button' onClick={() => setValue(value + '9')}>9</button>
          <br />

          <button type='button' onClick={() => setValue(value + '4')}>4</button>
          <button type='button' onClick={() => setValue(value + '5')}>5</button>
          <button type='button' onClick={() => setValue(value + '6')}>6</button>
          <br />

          <button type='button' onClick={() => setValue(value + '1')}>1</button>
          <button type='button' onClick={() => setValue(value + '2')}>2</button>
          <button type='button' onClick={() => setValue(value + '3')}>3</button>
          <br />

          <button type='button' onClick={() => setValue(value + '0')}>0</button>
          <button type='submit' onClick={handleClick} className='Enter'>Enter</button>
          <br />

          <button type='button' onClick={() => setValue('')} className='Clear'>Clear</button>
          </div>
        {/* </form> */}
        {/* <form> */}
          <input type='hidden' name='message' value={"Unauthorized access detected."}/>
        </form>
      </center>
    </div>
  );
}

export default SecurityPasscode;
