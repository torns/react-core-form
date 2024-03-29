import Form from '@/form';
import { StepProps, Steps } from 'antd';
import { ReactNode } from 'react';
import { ActionProps } from '../type.action';
import { CoreFormProps } from '../../form/type.form';
import { SchemaProps } from '../../form/type.item';
import Footer from '../footer';
import './index.less';

/** 分步提交表单 */
export interface StepFormProps extends CoreFormProps {
  /** 当前步骤 */
  current?: number;
  /** 手动切换步骤 */
  onStepsClick?: (current) => void;
  /** 步骤属性 */
  stepProps?: StepProps;
  /** 配置每一步的表单项和操作按钮 */
  steps: {
    title: ReactNode;
    description?: ReactNode;
    column?: number;
    schema: SchemaProps[];
    actions: ActionProps[];
  }[];
}

export default ({
  current = 0,
  onStepsClick = () => {},
  form = Form.useForm()[0],
  stepProps = {},
  steps,
  ...rest
}: StepFormProps) => {
  /** validatorForm */
  const validatorForm = async () => {
    try {
      const datas = await form.submit(); // 提交数据验证
      return datas;
    } catch (errorInfo) {
      console.error('validatorForm fail ->', errorInfo);
      throw errorInfo;
    }
  };
  /** actionClick */
  const actionClick = async (action) => {
    if (typeof action.onClick === 'function') {
      let data = form.getValues();
      if (action.validator) {
        data = await validatorForm();
      }
      await action.onClick(data);
    }
  };
  return (
    <div className={`core-form-step-form`}>
      <div className="core-form-step-form-header">
        <Steps {...stepProps} current={current} onChange={onStepsClick}>
          {steps?.map((step) => {
            return (
              <Steps.Step title={step.title} description={step.description} />
            );
          })}
        </Steps>
      </div>
      <div className="core-form-step-form-body">
        <Form
          {...rest}
          schema={steps
            .map((step, index) => {
              return step.schema.map((field) => {
                return {
                  ...field,
                  hidden: index !== current ? true : field.hidden, // 其他步骤不展示
                  required: index !== current ? false : field.required, // 其他步骤不校验
                  rules: index !== current ? [] : field.rules, // 其他步骤不校验
                  // type: index !== current ? () => null : field.type, // 其他步骤组件不渲染
                };
              });
            })
            .flat()}
          form={form}
          column={steps[current].column}
        />
      </div>
      <div className="core-form-step-form-footer">
        <Footer
          actions={steps[current].actions}
          actionClick={actionClick}
          validatorForm={validatorForm}
          form={form}
        />
      </div>
    </div>
  );
};
