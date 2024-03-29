import { NOTICESELF } from '@/util';
import { Empty, Space } from 'antd';
import { useEffect, useState } from 'react';
import './index.less';

export default ({
  style = {},
  children = <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />,
  label = '',
  subTitle = '',
  event,
  effect,
  extra = [],
  fieldName,
  visible,
  form,
  initialValues,
}) => {
  const [reload, setReload] = useState(Math.random());
  useEffect(() => {
    let unsubscribe = () => {};
    // 订阅
    unsubscribe = event.subscribe(fieldName, ({ name }: any) => {
      if (name === NOTICESELF || effect?.includes(name)) {
        setReload(Math.random());
      }
    });
    return () => {
      unsubscribe(); //  取消订阅
    };
  }, []);
  const vNode = (
    <div style={style} className="core-form-fieldset" key={reload}>
      <div className="core-form-fieldset-title" id={fieldName}>
        <div className="core-form-fieldset-label">
          {label}
          {subTitle && (
            <span className="core-form-fieldset-label-subTitle">
              {subTitle}
            </span>
          )}
        </div>
        <div className="core-form-fieldset-extra">
          <Space>{extra?.map((dom) => dom)}</Space>
        </div>
      </div>
      <div className="core-form-fieldset-content">{children}</div>
    </div>
  );
  // 执行visible逻辑
  if (typeof visible === 'function') {
    return visible({
      ...initialValues,
      ...form.getFieldsValue(),
    })
      ? vNode
      : null;
  }
  return vNode;
};
