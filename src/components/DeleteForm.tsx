import { ChangeEvent, useEffect, useRef, useState } from "react";
import axios from "axios";
import initialState from "../states/initial-state";
import StageItem from "./StageItem";
import requestData from "../config";

const DeleteForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [{email, placeholder, numberOfRequests, formSubmitted, progressEnded, stageList}, setState] = useState(initialState);
  const firstUpdate = useRef<boolean>(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const email = event.target.value;
    setState((prevState) => ({ ...prevState, email }));
  };

  const handleReset = (): void => {
    setState({ ...initialState });
    firstUpdate.current = true
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    setState((prevState) => ({ ...prevState, formSubmitted: true }));
  };

  const handleAxios = async (url: string, type: string): Promise<any> =>{
    setLoading(true);
    if (type === 'POST') {
      return await axios.post(url, {email});
    } else {
      return await axios.get(url);
    }
  }

  useEffect(() => {
    if (firstUpdate.current || !email) {
      firstUpdate.current = false;
      return;
    }
    if (numberOfRequests < requestData.length) {
      (async () => {
        try {
          const response = await handleAxios(requestData[numberOfRequests].url, requestData[numberOfRequests].method);
          console.log(response)
          setState((prevState) => ({
            ...prevState,
            numberOfRequests: numberOfRequests + 1,
            stageList: [...stageList, <StageItem key={numberOfRequests} type={'success'} statusNumber={numberOfRequests} />]
          }));
        } catch (error) {
          console.log(error)
          setLoading(false);
          setState((prevState) => ({
            ...prevState, 
            progressEnded: true,
            stageList: [...stageList, <StageItem key={numberOfRequests} type={'danger'} statusNumber={numberOfRequests} />]
          }));
        }

        if (numberOfRequests === requestData.length - 1) {
          setLoading(false);
          setState((prevState) => ({...prevState, progressEnded: true}));
        }
      })();
    }
  }, [numberOfRequests, formSubmitted])

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
            disabled= {loading || progressEnded ? true : false}
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
          {stageList.map((element: JSX.Element) => (
            element
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeleteForm;