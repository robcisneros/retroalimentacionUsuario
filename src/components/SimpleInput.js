import useInput from "./hooks/use-input";

const SimpleInput = (props) => {
  
  const { 
    value: enteredName, 
    valueIsValid: enteredNameIsValid, 
    hasError: nameInputHasError, 
    valueChangeHandler: nameInputChangeHandler,
    inputBlurChangeHandler: onBlurNameInputChangeHandler,
    reset: resetNameInput,
  } = useInput(value  => value.trim() !== '');

  const { 
    value: enteredEmail, 
    valueIsValid: enteredEmailIsValid, 
    hasError: emailInputHasError, 
    valueChangeHandler: emailInputChangeHandler,
    inputBlurChangeHandler: onBlurEmailInputChangeHandler,
    reset: resetEmailInput,
  } = useInput(value  => value.includes("@"));

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    console.log(enteredName);
    resetNameInput();
    resetEmailInput();
  };

  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";
  const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          value={enteredName}
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={onBlurNameInputChangeHandler}
        />
        {nameInputHasError && (
          <p className={"error-text"}>Name must not be empty</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your e-mail</label>
        <input
          value={enteredEmail}
          type="email"
          id="email"
          onChange={emailInputChangeHandler}
          onBlur={onBlurEmailInputChangeHandler}
        />
        {emailInputHasError && (
          <p className={"error-text"}>Enter a valid email</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
