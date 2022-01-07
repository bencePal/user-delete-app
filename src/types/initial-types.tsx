type DefaultStatus = {
  text: string,
  visible: boolean
}

type InitialState = {
  email: string,
  placeholder: string,
  statusOne: DefaultStatus,
  statusTwo: DefaultStatus,
  statusThree: DefaultStatus,
  progressSuccessful: boolean,
}

export type { DefaultStatus, InitialState }