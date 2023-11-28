import type { Store } from '@react-pdf-viewer/core';
import { MinimalButton, PrimaryButton } from '@react-pdf-viewer/core';
import { Modal as AntModal } from 'antd';
import * as React from 'react';

import StoreProps from './store-props';

const ConfirmationModal: React.FC<{
  store: Store<StoreProps>;
}> = ({ store }) => {
  const [target, setTarget] = React.useState('');

  const handleTargetClicked = (clickedTarget: string) => {
    setTarget(clickedTarget);
  };

  const handleCancel = () => {
    setTarget('');
  };

  const handleConfirm = () => {
    setTarget('');
    window.open(target, '_blank');
  };

  const renderContent = () => (
    <div style={{ padding: '0.5rem' }}>
      <div
        style={{
          borderBottom: '1px solid rgba(0, 0, 0, .1)',
          paddingBottom: '0.5rem',
          marginBottom: '0.5rem',
        }}
      >
        <div>Are you sure that you want to follow this link</div>
        <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>
          {target}
        </span>
        ?
      </div>
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'end',
        }}
      >
        <div style={{ marginRight: '0.25rem' }}>
          <MinimalButton onClick={handleCancel}>
            {store.get('cancelText') ?? 'No'}
          </MinimalButton>
        </div>
        <PrimaryButton onClick={handleConfirm}>
          {store.get('okText') ?? 'Yes'}
        </PrimaryButton>
      </div>
    </div>
  );

  React.useEffect(() => {
    store.subscribe('clickedTarget', handleTargetClicked);

    return () => {
      store.unsubscribe('clickedTarget', handleTargetClicked);
    };
  }, []);

  return (
    target && (
      <AntModal
        title={
          store.get('modalTitle') ??
          'Are you sure that you want to follow this link'
        }
        open={!!target}
        onOk={handleConfirm}
        onCancel={handleCancel}
        maskClosable={false}
        closeIcon={false}
        okText={store.get('okText') ?? 'OK'}
        cancelText={store.get('cancelText') ?? 'Cancel'}
      >
        <span style={{ textDecoration: 'underline' }}>{target}</span>
      </AntModal>

      // <Modal
      //   isOpened={true}
      //   closeOnClickOutside={false}
      //   closeOnEscape={false}
      //   content={renderContent}
      // />
    )
  );
};

export default ConfirmationModal;
