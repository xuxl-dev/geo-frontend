import { withInstall } from '@/utils';
import type { ExtractPropTypes } from 'vue';
import fc from './fc.vue';

export const fcProps = {}

export const Fc = withInstall(fc);

export declare type FcProps = Partial<ExtractPropTypes<typeof fcProps>>;