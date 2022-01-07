import { ChangeEvent, useState } from "react";
import axios from "axios";
import initialState from "../states/initial-state";
import LoaderItem from "./LoaderItem";

const DeleteForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [progressEnded, setProgressEnded] = useState<boolean>(false);
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const email = event.target.value;
    setState((prevState) => ({
      ...prevState,
      email,
    }));
  };

  const handleReset = (): void => {
    setState({ ...initialState });
    setProgressEnded(!progressEnded);
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    const user = {
      name: "random",
      email: email,
    };
    (async () => {
      await handleStage(handleAxios('https://jsonplaceholder.typicode.com/users', 'POST', user), "One");
      if (progressSuccessful) {
        await handleStage(handleAxios('https://deelay.me/2000/https://jsonplaceholder.typicode.com/users', 'GET'), "Two");
      }
      if (progressSuccessful) {
        await handleStage(handleAxios('https://deelay.me/2000/https://jsonplaceholder.typicode.com/usersbad', 'GET'), "Three");
      }
      setLoading(false);
      setProgressEnded(true);
    })();
  };

  const handleStage = async (stage: Promise<void>, statusNumber: string): Promise<void> => {
    try {
      console.log(await stage);
      setState((prevState) => ({
        ...prevState,
        [`status${statusNumber}`]: {
          visible: true,
          text: <LoaderItem type={'success'} statusNumber={statusNumber} />
        },
      }));
    } catch (e) {
      console.log(e);
      setState((prevState) => ({
        ...prevState,
        [`status${statusNumber}`]: {
          visible: true,
          text: <LoaderItem type={'danger'} statusNumber={statusNumber} />
        },
        progressSuccessful: false,
      }));
    }
  };

  const handleAxios = async (url: string, type: string, user?: any): Promise<any> =>{
    setLoading(true);
    if (type === 'POST') {
      return await axios.post(url, {
        user,
      });
    } else {
      return await axios.get(
        url
      );
    }
  }

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
          {statusOne.visible ? statusOne.component : ""}
          {statusTwo.visible ? statusTwo.component : ""}
          {statusThree.visible ? statusThree.component : ""}
        </div>
      </div>
    </div>
  );
};

export default DeleteForm;