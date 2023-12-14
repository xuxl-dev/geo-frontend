import { UserPageQuery, UserPageRes } from '@fast-crud/fast-crud';
import { defHttp } from '/@/utils/http/axios';

enum countDataApi {
    add = '/count-data/addInformation',
    get = '/count-data/getInformation',
}

export const addCountData = (params: any) => defHttp.post({ url: countDataApi.add, params });

export const getCountData = async (params: any) => {
    return await defHttp.post({ url: countDataApi.get, params })
};
