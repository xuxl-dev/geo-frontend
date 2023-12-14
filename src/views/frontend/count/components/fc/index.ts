import { withInstall } from '@/utils';
import type { ExtractPropTypes } from 'vue';
import fc from './fc.vue';
import { dict } from '@fast-crud/fast-crud';

export const replaceDictValues = (inputObject: any): any => {
    const columns = inputObject;

    Object.keys(columns).forEach((key) => {
        const column = columns[key];
        if (column.dict) {
            column.dict = dict(column.dict);
        }
    });

    return inputObject;
};

export const fcProps = {}

export const Fc = withInstall(fc);

export declare type FcProps = Partial<ExtractPropTypes<typeof fcProps>>;