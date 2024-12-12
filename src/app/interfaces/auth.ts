export interface RegisterPostData {
  name: string,
  email: String,
  password: String,
  score: number
}

export interface LoginPostData{
  email: string,
  password: string
}

export interface LoginResponseData {
  token: string,
  expiresIn: number
}
export interface LoginResponse {
  message: string,
  status: string,
  data: LoginResponseData
}

export interface LoanInput{
  amount: number
}

export interface LoanEligible {
  eligible: boolean
}
export interface LoanReponse {
  message: string,
  status: string,
  data: LoanEligible
}
