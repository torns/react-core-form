import mapping from './mapping';
import { CSSProperties } from 'react';
import classNames from 'classnames';
import './index.less';

export interface IconProps {
  type:
    | 'react'
    | 'drag'
    | 'drag3'
    | 'delete'
    | 'copy'
    | 'add'
    | 'fullScreen'
    | 'fullScreenExit'
    | 'arrow'
    | 'loading'
    | 'close'
    | 'expand'
    | 'setting'
    | 'more'
    | 'run'
    | 'drag2'
    | 'refresh'
    | 'size'
    | 'question';
  /**
   * 大小设置
   * @default 16
   */
  size?: number;
  /**
   * 颜色定义
   * @default #888
   */
  color?: string;
  /** 点击事件 */
  onClick?: any;
  /** 标题 */
  title?: string;
  /** 样式 */
  style?: CSSProperties;
  /**
   * 使用主题色
   * @default false
   */
  primary?: boolean;
  /**
   * hover 动画
   * @default false
   */
  hover?: boolean;
  /**
   * spin 动画
   * @default false
   */
  spin?: boolean;
}

const Icon = ({
  type,
  size = 16,
  color = '#888',
  onClick = () => {},
  title = '',
  style = {},
  hover = false,
  spin = false,
  primary,
}: IconProps) => {
  if (primary) {
    color = 'var(--antd-wave-shadow-color)';
  }
  return (
    <span
      className={classNames(`rcf-icon rcf-icon-${type}`, {
        'rcf-icon-hover': hover,
        'rcf-icon-spin': spin,
      })}
      onClick={onClick}
      title={title}
      style={style}
    >
      {mapping[type]?.({
        size,
        color,
      })}
    </span>
  );
};

Icon.getIcons = () => Object.keys(mapping);

export default Icon;
