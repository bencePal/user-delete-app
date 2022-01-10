import { InitialState } from "../types/initial-types";

const initialState: InitialState = {
  email: '',
  placeholder: 'Email address',
  numberOfRequests: 0,
  progressEnded: false,
  formSubmitted: false,
  stageList: []
};

export default initialState;