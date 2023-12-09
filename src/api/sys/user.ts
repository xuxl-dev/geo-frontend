import { defHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';



enum Api {
  Login = '/auth/login/account',
  Logout = '/auth/logout',
  GetUserInfo = '/user/current',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry',
  UpdateUserInfo = '/user/updateUser',
}

export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  // defHttp.get({ url:'/'})

  return defHttp.post(
    {
      url: Api.Login,
      params: {
          username: params.username,
          password: params.password,
      }
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.post<GetUserInfoModel>({ url: Api.GetUserInfo });
}

export function updateUserInfo() {
  return defHttp.post<GetUserInfoModel>({ url: Api.GetUserInfo });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}



export function doLogout() {
  return defHttp.post({ url: Api.Logout });
}

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}
