import { Modal } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import house_location from '../images/house_location.png';

const HouseLocationModal = ({}, ref) => {
  const [visible, setVisible] = useState(false);
  useImperativeHandle(
    ref,
    () => ({
      open,
    }),
    [],
  );

  const open = (record) => {
    setVisible(true);
  };

  const onOk = () => {
    onCancel();
  };

  const onCancel = () => {
    setVisible(false);
  };
  return (
    <Modal title="房源落位图" width={'70vw'} open={visible} onOk={onOk} onCancel={onCancel}>
      <div>
        <img src={house_location} alt="" width={'100%'} />
      </div>
    </Modal>
  );
};

export default forwardRef(HouseLocationModal);
