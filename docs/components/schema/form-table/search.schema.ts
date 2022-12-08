import { SchemaProps } from 'react-core-form';

export default {
  column: 4,
  schema: [
    {
      type: 'Select',
      name: 'level',
      label: '级别',
      props: {
        options: [
          {
            label: '级别1',
            value: 0,
          },
          {
            label: '级别2',
            value: 1,
          },
        ],
      },
    },
    {
      type: 'DatePicker',
      name: 'date',
      label: '入职日期',
    },
    {
      type: 'InputNumber',
      name: 'age',
      label: '年纪',
      expand: true,
      transform({ age }) {
        return {
          userAge: age,
        };
      },
    },
    {
      type: 'Input',
      name: 'address',
      label: '地址',
      expand: true,
    },
  ] as SchemaProps,
};
