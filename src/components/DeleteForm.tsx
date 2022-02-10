import { ChangeEvent, useEffect, useRef, useState } from "react";
import { initialState } from "../states/initialState";
import { StageItem } from "./StageItem";
import { requestData } from "../config";
import { handleAxios } from "../utils/axiosHandler";

const DeleteForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [{email, placeholder, numberOfRequests, formSubmitted, progressEnded, stageList}, setState] = useState(initialState);
  const firstUpdate = useRef<boolean>(true);
  const completeEmail = useRef<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const email = event.target.value;
    setState((prevState) => ({ ...prevState, email }));
  };

  const handleReset = (): void => {
    setState({ ...initialState });
    firstUpdate.current = true;
    completeEmail.current = '';
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    completeEmail.current = email;
    setState((prevState) => ({ ...prevState, formSubmitted: true }));
  };

  useEffect(() => {
    if (firstUpdate.current || !formSubmitted) {
      firstUpdate.current = false;
      return;
    }
    if (numberOfRequests < requestData.length) {
      (async () => {
        try {
          setLoading(true);
          const response = await handleAxios(requestData[numberOfRequests].url, requestData[numberOfRequests].method, completeEmail.current);
          console.log(response)
          setState((prevState) => ({
            ...prevState,
            numberOfRequests: numberOfRequests + 1,
            stageList: [...prevState.stageList, <StageItem key={numberOfRequests} type={'success'} statusNumber={numberOfRequests} />]
          }));
        } catch (error) {
          setLoading(false);
          console.log(error)
          setState((prevState) => ({
            ...prevState, 
            progressEnded: true,
            stageList: [...prevState.stageList, <StageItem key={numberOfRequests} type={'danger'} statusNumber={numberOfRequests} />]
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