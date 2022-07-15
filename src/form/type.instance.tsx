import { ActionProps } from '@/form-submit/type.action';
import { FormListOperation } from 'antd/lib/form/FormList';
import { SchemaProps } from './type.item';

export interface CoreFormInstance {
  /** getFieldsValue 基础上执行配置的 transform，返回数据 */
  getValues: () => any;
  /** setFieldsValue 基础上执行配置的 beforeReceive，设置数据 */
  setValues: (data) => void;
  /** 手动清空所有值，不会还原到默认值 */
  clearValues: (names?: string[]) => void;
  /** 更新指定表单项的配置，重新渲染该组件 */
  setSchemaByName: (names: string, newField: SchemaProps, customizer?) => void;
  /** 获取指定的field */
  getSchemaByName: (name: string) => any;
  /** 主动触发一批字段重新渲染，在一定程度上可以取代 effect */
  touchSchemaRender: (names: string[]) => void;
  /** 获取异步选择 options */
  getFieldOption: (fieldName: string) => Promise<any>;
  /** 手动暂存 options  */
  setFieldOption: (fieldName: string, options: any) => void;
  /** 作为 SearchForm 时候提供查询功能   */
  search: (value?: any) => void;
  /** 作为 SearchForm 时候提供刷新功能  */
  refresh: () => void;
  reset: () => void;
  /** 获取表单校验和 field 的 transform 之后的数据 */
  submit: () => any;
  /** 获取FormList api */
  formListInstance?: {
    [key: string]: FormListOperation;
  };
  /** 控制表单是否加载中 */
  setFormLoading: (state: boolean) => void;
  /** 控制提交表单操纵栏是否禁用 */
  setFooterDisabled: (state: boolean) => void;
  /** 控制提交表单操纵栏项 */
  setFooterActions: (actions: ActionProps[]) => void;
  // RcForm
  name?: string;
  initialValues?: any;
  setFieldsValue: (value: any) => void;
  getFieldValue: (name: string) => any;
  validateFields: (nameList?: []) => Promise<any>;
  getFieldsValue: (
    nameList?: string[] | true,
    filterFunc?: (meta: any) => boolean,
  ) => any;
  resetFields: (fields?: string[]) => void;
  getFieldError?: (name?: string) => string[];
  getFieldsError?: (nameList?: string[]) => any[];
  isFieldsTouched?: (allFieldsTouched?: boolean) => boolean;
  isFieldTouched?: (name?: string) => boolean;
  isFieldValidating?: (name?: string) => boolean;
  isFieldsValidating?: (nameList?: string[]) => boolean;
  setFields?: (fields?: any[]) => void;
}

const Hello: React.FC<CoreFormInstance> = () => null;

export default Hello;
