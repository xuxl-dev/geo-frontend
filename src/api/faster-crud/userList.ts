import { UserPageQuery } from '@fast-crud/fast-crud';
import { defHttp } from '/@/utils/http/axios';

enum UserListApi {
    dict = '/user/dict',
    create = '/user/create',
    read = '/user/read',
    update = '/user/update',
    delete = '/user/delete',
}

export const getCrudUserListDict = () => defHttp.get({ url: UserListApi.dict });

export const createCrudUserList = (params: any) => defHttp.post({ url: UserListApi.create, params });

export const readCrudUserList = async (query: UserPageQuery): Promise<any[]> => {
    // console.log('pageRequest', query);
    return defHttp.post({ url: UserListApi.read, params: query });
}

export const updateCrudUserList = (params: any) => defHttp.post({ url: UserListApi.update, params });

export const deleteCrudUserList = (params: any) => defHttp.post({ url: UserListApi.delete, params });