import ReactDOM from 'react-dom';
import ModalForm from '@/form-submit/modal-form';
import { useEffect, useState } from 'react';
import { ModalFormProps } from '../index';
import { uuid } from '@/util';

const $: any = document.querySelector.bind(document);

export interface CreateModalFormProps extends ModalFormProps {
  getPopupContainer?: () => HTMLElement | null;
  containId?: string;
}

const close = (containId) => {
  setTimeout(() => {
    $(`#${containId}`)?.remove();
  }, 500);
};

const ModalFormWapper = ({ containId, tag, ...props }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(true);
    window.addEventListener('popstate', () => {
      $('.core-form-create-modal-wapper')?.remove();
    });
  }, []);
  return (
    <ModalForm
      {...props}
      visible={visible}
      onClose={() => {
        props.onClose?.();
        setVisible(false);
        close(containId);
      }}
      modalProps={{
        ...(props.modalProps || {}),
        getContainer: () => tag,
      }}
    />
  );
};

const CreateModalForm = (props) => {
  const tag = document.createElement('div');
  tag.setAttribute('id', props.containId);
  tag.setAttribute('class', 'core-form-create-modal-wapper');
  const target = props.getPopupContainer?.() || $('body');
  target.appendChild(tag);
  ReactDOM.render(<ModalFormWapper {...props} tag={tag} />, tag);
  return null;
};

const ModalFormPopUp = (options: CreateModalFormProps) => {
  const containId = options.containId || `modalId_${uuid(6)}`;
  return {
    open: async (config?: CreateModalFormProps) => {
      const props: any = {
        ...options,
        ...config,
      };
      CreateModalForm({
        ...props,
        containId,
        onSubmit: async (data) => {
          await props.onSubmit?.(data);
          close(containId); // 关闭
        },
      });
    },
  };
};

ModalFormPopUp.close = (containId: string) => {
  close(containId); // 关闭
};

export default ModalFormPopUp;
