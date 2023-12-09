import { Socket, io } from 'socket.io-client';
import PQueue from 'p-queue';
import EventEmitter from 'eventemitter3';

export class SIO extends EventEmitter {
  token: string = '';
  user?: { [key: string]: any };

  constructor() {
    super();
  }

  _socket?: Socket;

  async connect(token: string) {
    this.token = token;
    this._socket = io('/', {
      extraHeaders: {
        authorization: this.token,
      },
      auth: {
        token: this.token,
      },
      autoConnect: false,
      // forceNew: true,
      transports: ['websocket'],
      path: '/socket.io/',
    });
    this._socket.connect();
    this._socket.once('connected', (o) => {
      this.user = o;
    });
    return new Promise<void>((resolve, reject) => {
      this._socket?.once('connect', () => {
        console.log('successfully connected to server!');
        this._socket?.off('connect_error');
        this.emit('connected');

        this._socket?.onAny((evt, msg) => {
          this.emit(evt, msg);          
        });

        resolve();
      });
      this._socket?.once('connect_error', (error) => {
        console.error('Connection error:', error.message);
        this._socket?.off('connect');
        reject(error);
      });
    });
  }

  async send(evt: string, msg: object) {
    this._socket?.emit(evt, msg);
  }

  public get socket(): Socket | undefined {
    return this._socket;
  }
}
