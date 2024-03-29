/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import { downloadFile } from 'react-core-form-tools';
import { Upload, message, Button, Image, Spin, Progress } from 'antd';
import { OssFileUploadProps } from './type';
import { uuid } from '@/util';
import { createOssInstance, Icon } from '..';
import './index.less';

export default ({
  text = '上传文件',
  listType = 'text',
  accept = listType === 'picture-card'
    ? '.png,.jpg,.jpeg'
    : '.doc,.docx,.pdf,.xlsx,.xls,.txt,.png,.jpg,.jpeg',
  maxCount = 1, // 最多可以上传1份
  limitSize = 1 * 1024, // 默认最大1G
  value = [],
  readOnly = false,
  onChange,
  ...rest
}: OssFileUploadProps) => {
  // 加载中
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // 重制进度条
    if (loading === false) {
      setPercent(0);
    }
  }, [loading]);
  // 进度条
  const [percent, setPercent] = useState(0);
  // 上传前: 检查格式和大小
  const beforeUpload = (file: any) => {
    try {
      // TODO 这里暂时先这样写,不严谨,后面扩展
      // 判断下后缀名
      const ext: string = file.name.substring(file.name.lastIndexOf('.'));
      // 转小写再判断
      if (
        !accept
          .split(',')
          .map((item: string) => item.toLowerCase())
          .includes(ext.toLowerCase())
      ) {
        message.error(`${file.name} 文件格式不在${accept}中`);
        return Upload.LIST_IGNORE;
      }
      const { size } = file;
      const isLtSize = size / 1024 / 1024 <= limitSize;
      if (!isLtSize) {
        message.error(`文件大小不允许超过${limitSize}M`);
        return Upload.LIST_IGNORE;
      }
      return isLtSize;
    } catch (error) {
      console.log(error);
    }
    return null;
  };
  // 删除的钩子
  const onRemove = (file: any) => {
    // 同步表单数据
    onChange(value.filter(({ uid }: any) => uid !== file.uid));
  };
  // 自定义上传
  const multiPartUpload = async (options: any) => {
    const { file } = options;
    const ossClient = createOssInstance();
    try {
      setLoading(true);
      try {
        const {
          res: { requestUrls, status },
        } = await ossClient.multipartUpload(`assets/${file.name}`, file, {
          progress: (p: number) => {
            setPercent(parseInt(String(p * 100), 10));
          },
        });
        if (status === 200) {
          const url = requestUrls?.[0];
          // 同步表单数据
          onChange([
            {
              uid: uuid(10),
              name: file.name,
              url: url.includes('?')
                ? url.substring(0, url.lastIndexOf('?'))
                : url,
            },
            ...value,
          ]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  };
  // 文案
  const uploadButton =
    listType === 'picture-card' ? (
      <div className="react-core-form-oss-upload-button">
        <Spin spinning={loading}>
          <Icon type="add" />
          <div style={{ marginTop: 8 }}>{text}</div>
        </Spin>
        {loading && (
          <div className="react-core-form-oss-upload-button-percent">
            <Progress percent={percent} size="small" />
          </div>
        )}
      </div>
    ) : (
      <div>
        <Button loading={loading}>{text}</Button>
      </div>
    );
  return (
    <div className="react-core-form-oss-upload">
      <Upload
        maxCount={maxCount}
        accept={accept}
        listType={listType}
        fileList={value}
        beforeUpload={beforeUpload}
        customRequest={multiPartUpload}
        itemRender={(originNode, file: any) => {
          return (
            <RenderItemNode
              {...{
                onRemove,
                accept,
                listType,
                file,
                originNode,
                readOnly,
              }}
            />
          );
        }}
        {...rest}
      >
        {readOnly || value.length >= maxCount ? null : uploadButton}
      </Upload>
    </div>
  );
};

/** 自定义渲染 */
const RenderItemNode = ({
  onRemove,
  readOnly,
  accept,
  listType,
  file,
  originNode,
}: any) => {
  return file.status === 'uploading' ? (
    originNode
  ) : listType === 'picture-card' ? (
    <div className="picture-card-image">
      {accept?.includes('.mp4') ? (
        <video
          controls
          height={100}
          width={100}
          src={file.url}
          crossOrigin="anonymous"
        />
      ) : (
        <Image width={100} src={file.url} />
      )}
      {!readOnly && (
        <a
          className="oss-file-item-render-action"
          style={{
            position: 'absolute',
            top: 2,
            right: 4,
          }}
          onClick={() => {
            onRemove(file);
          }}
        >
          <Icon type="close" />
        </a>
      )}
    </div>
  ) : (
    <div className="oss-file-item-render">
      <div
        style={{ width: 'calc(100% - 60px)' }}
        title={file.name}
        onClick={() => {
          downloadFile(file.url, file.name);
        }}
      >
        {originNode}
      </div>
      <div>
        {!readOnly && (
          <a
            className="oss-file-item-render-action"
            onClick={() => {
              onRemove(file);
            }}
          >
            <Icon type="close" />
          </a>
        )}
      </div>
    </div>
  );
};
