export class ApiSettings {
  public readonly REACT_APP_BACKEND_URL: string;
  public readonly REACT_APP_CHAT_SOCKET_URL: string;
  public readonly REACT_APP_SOCKET_URL: string;

  constructor(envVariables: EnvironmentVariable) {
    this.REACT_APP_BACKEND_URL = envVariables.REACT_APP_BACKEND_URL as string;
    this.REACT_APP_CHAT_SOCKET_URL = envVariables.REACT_APP_CHAT_SOCKET_URL as string;
    this.REACT_APP_SOCKET_URL = envVariables.REACT_APP_SOCKET_URL as string;
  }
}