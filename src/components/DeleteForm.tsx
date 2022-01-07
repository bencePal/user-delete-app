import React, { useState } from "react";
import axios from "axios";

const defaultStatus = {
  text: "",
  visible: false,
};

const initialState = {
  email: "",
  placeholder: "Email address",
  statusOne: defaultStatus,
  statusTwo: defaultStatus,
  statusThree: defaultStatus,
  progressSuccessful: true,
};

const DeleteForm = () => {
  const [loading, setLoading] = useState(false);
  const [progressEnded, setProgressEnded] = useState(false);
  const [
    {
      email,
      placeholder,
      statusOne,
      statusTwo,
      statusThree,
      progressSuccessful,
    },
    setState,
  ] = useState(initialState);

  const handleChange = (event: any) => {
    const email = event.target.value;
    setState((prevState) => ({
      ...prevState,
      email,
    }));
  };

  const handleReset = () => {
    setState({ ...initialState });
    setProgressEnded(!progressEnded);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const user = {
      name: "random",
      email: email,
    };
    (async () => {
      await handleStage(stageOne(user), "One");
      if (progressSuccessful) await handleStage(stageTwo(), "Two");
      if (progressSuccessful) await handleStage(stageThree(), "Three");
      setLoading(false);
      setProgressEnded(true);
    })();
  };

  const handleStage = async (stage: any, statusNumber: any) => {
    try {
      console.log(await stage);
      setState((prevState) => ({
        ...prevState,
        [`status${statusNumber}`]: {
          visible: true,
          text: (
            <div className={"stage text-success clearfix"}>
              <span className={"stage__text"}>Stage {statusNumber}</span>
              <span className={"success-icon"} />
            </div>
          ),
        },
      }));
    } catch (e) {
      console.log(e);
      setState((prevState) => ({
        ...prevState,
        [`status${statusNumber}`]: {
          visible: true,
          text: (
            <div className={"stage text-danger clearfix"}>
              <span className={"stage__text"}>Stage {statusNumber}</span>
              <span className={"danger-icon"} />
            </div>
          ),
        },
        progressSuccessful: false,
      }));
    }
  };

  const stageOne = async (user: any): Promise<any> => {
    setLoading(true);
    return await axios.post(`https://jsonplaceholder.typicode.com/users`, {
      user,
    });
  };

  const stageTwo = async () => {
    setLoading(true);
    return await axios.get(
      `https://deelay.me/2000/https://jsonplaceholder.typicode.com/users`
    );
  };

  const stageThree = async () => {
    setLoading(true);
    return await axios.get(
      `https://deelay.me/3000/https://jsonplaceholder.typicode.com/users2`
    );
  };

  return (
    <div className={"form-container"}>
      <div className={"header clearfix"}>
        <h3 className={"mb-4 header__title"}>Delete User</h3>
        {progressEnded ? (
          <span
            className={"header__reset-button text-secondary mt-2"}
            onClick={handleReset}
          >
            Reset
          </span>
        ) : (
          ""
        )}
      </div>
      <form onSubmit={handleSubmit} className={"form form-inline"}>
        <div className={"form-group"}>
          <input
            type={"email"}
            className={"form-control mr-3"}
            placeholder={placeholder}
            value={email}
            name={"email"}
            onChange={handleChange}
          />
        </div>
        <input
          disabled={!email}
          type="submit"
          value="Submit"
          className={"btn btn-primary"}
        />
      </form>
      <div className={"footer clearfix"}>
        {loading ? <div className={"loader"} /> : ""}
        <div className={"footer__stage-container"}>
          {statusOne.visible ? statusOne.text : ""}
          {statusTwo.visible ? statusTwo.text : ""}
          {statusThree.visible ? statusThree.text : ""}
        </div>
      </div>
    </div>
  );
};

export default DeleteForm;