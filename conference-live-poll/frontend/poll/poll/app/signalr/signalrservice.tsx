import * as signalR from '@microsoft/signalr';

class SignalRService {
  private connection: signalR.HubConnection;

  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("https://your-signalr-server-url/hub")
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.connection.start()
      .then(() => console.log('SignalR Connected'))
      .catch(err => console.error('SignalR Connection Error: ', err));
  }

  public on(event: string, callback: (...args: any[]) => void) {
    this.connection.on(event, callback);
  }

  public off(event: string, callback: (...args: any[]) => void) {
    this.connection.off(event, callback);
  }

  public send(event: string, ...args: any[]) {
    this.connection.send(event, ...args)
      .catch(err => console.error('SignalR Send Error: ', err));
  }
}

export default new SignalRService();