import Client from './lib/Client';
import ClientError from './lib/ClientError';
import BasicAuth from './lib/auth/BasicAuth';
import JwtAuth from './lib/auth/JwtAuth';
import AnonymousAuth from './lib/auth/AnonymousAuth';
declare const _default: {
    Client: typeof Client;
    BasicAuth: typeof BasicAuth;
    JwtAuth: typeof JwtAuth;
    AnonymousAuth: typeof AnonymousAuth;
    ClientError: typeof ClientError;
};
export default _default;
