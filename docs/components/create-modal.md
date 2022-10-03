---
order: 4.1
title: CreateModal 弹出层提交表单
toc: menu
---

## 基本使用

```tsx
import React from 'react';
import { CreateModal } from 'react-core-form';
import schema from './schema/form-submit/schema';
import { Button, message, Switch } from 'antd';

const delay = (ms) => new Promise((res) => setTimeout(res, ms, true));
export default (props) => {
  const onSubmit = async (values) => {
    console.log('onSubmit ->', values);
    const res = await delay(1000);
    if (res) {
      message.success('保存成功');
    }
  };
  return (
    <Button
      type="primary"
      onClick={() => {
        CreateModal({
          title: '新增用户',
          width: 1000,
          modalProps: {
            bodyStyle: {
              height: 500,
              overflow: 'auto',
            },
          },
          onSubmit,
          schema,
          column: 2,
        }).open();
      }}
    >
      打开一个Modal
    </Button>
  );
};
```

## CreateModal 自定义渲染

```tsx
import React from 'react';
import { CreateModal } from 'react-core-form';
import { Button, message, Switch } from 'antd';

export default (props) => {
  return (
    <Button
      type="primary"
      onClick={() => {
        CreateModal({
          title: '自定义渲染',
          confirmText: '确认',
          onSubmit() {
            message.success('确认完毕');
          },
        }).open({
          render: ({ value }) => {
            return <h4>这个是详情页面可用自定义渲染</h4>;
          },
        });
      }}
    >
      自定义渲染Modal
    </Button>
  );
};
```

## CreateModal 扩展属性

<API src="../../src/form-submit/modal-form/index.tsx" hideTitle></API>