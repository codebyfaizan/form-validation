import React from "react";

function SimpleInput(props) {
  const [enteredName, setEnteredName] = React.useState(""); // State for checking input for every keystroke
  const [enteredNameIsTouched, setEnteredNameIsTouched] = React.useState(false); // State for checking if user has touched the field or not or not

  const [enteredEmail, setEnteredEmail] = React.useState("");
  const [enteredEmailIsTouched, setEnteredEmailIsTouched] = React.useState(false);

  const enteredNameIsValid = enteredName.trim() !== ""; //Saving the value as a boolean to check if the entered value is empty or not
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameIsTouched; //Saving the validity of Input value as a boolean and true iff the value is not empty and the user has touched the input field

  const enteredEmailIsValid = enteredEmail.includes("@"); //Checking for @ symbol in email
  const enteredEmailIsInvalid = !enteredEmailIsValid && enteredEmailIsTouched; //form is invalid if email does not include @ and onblur is enabled

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    //if both name and email fields are valid then only entire form is valid
    formIsValid = true;
  }

  function nameInputChangeHandler(event) {
    setEnteredName(event.target.value);
  }

  function emailInputChangeHandler(event) {
    setEnteredEmail(event.target.value);
  }

  function nameInputBlurHandler() {
    setEnteredNameIsTouched(true);
  }

  function emailInputBlurHandler() {
    setEnteredEmailIsTouched(true);
  }

  function formSubmissionHandler(event) {
    event.preventDefault();

    setEnteredNameIsTouched(true);
    if (!enteredNameIsValid) {
      return;
    }

    setEnteredName("");
    setEnteredNameIsTouched(false);
    setEnteredEmail("");
    setEnteredEmailIsTouched(false);
  }

  const nameInputClasses = nameInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = enteredEmailIsInvalid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onBlur={nameInputBlurHandler}
          onChange={nameInputChangeHandler}
          value={enteredName}
        />
        {nameInputIsInvalid && (
          <p className="error-text">Name can not be empty!</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          onBlur={emailInputBlurHandler}
          onChange={emailInputChangeHandler}
          value={enteredEmail}
        />
        {enteredEmailIsInvalid && (
          <p className="error-text">Please Enter Valid Email</p>
        )}
      </div>
      <div className="form-actions">
        <button type="submit" disabled={!formIsValid}>
          Submit
        </button>
      </div>
    </form>
  );
}

export default SimpleInput;
