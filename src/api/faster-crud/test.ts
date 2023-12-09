import { UserPageQuery, UserPageRes } from '@fast-crud/fast-crud';
import { defHttp } from '/@/utils/http/axios';

enum TestUserApi {
  dict = '/user/dict',
  create = '/user/create',
  read = '/user/read',
  update = '/user/update',
  delete = '/user/delete',
}

export const getCrudUserDict = () => defHttp.get({ url: TestUserApi.dict });

export const createCrudUser = (params: any) => defHttp.post({ url: TestUserApi.create, params });

export const readCrudUser = async (query: UserPageQuery): Promise<any[]> => {
  console.log('pageRequest', query);
  return defHttp.post({ url: TestUserApi.read, params: query });
}

export const updateCrudUser = (params: any) => defHttp.post({ url: TestUserApi.update, params });

export const deleteCrudUser = (params: any) => defHttp.post({ url: TestUserApi.delete, params });
