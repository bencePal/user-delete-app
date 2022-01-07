import { DefaultStatus, InitialState } from "../types/initial-types";

const defaultStatus: DefaultStatus = {
  text: "",
  visible: false,
};

const initialState: InitialState = {
  email: "",
  placeholder: "Email address",
  statusOne: defaultStatus,
  statusTwo: defaultStatus,
  statusThree: defaultStatus,
  progressSuccessful: true,
};

export default initialState;