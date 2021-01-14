import React from "react";
import { Layout, Tooltip } from 'antd';
import {
  FacebookOutlined,
  MailOutlined,
  PhoneOutlined,
} from '@ant-design/icons';


const anySpace = '\xa0\xa0\xa0\xa0\xa0'
const { Footer } = Layout;

const FoooterLinks = () => {
  return (
    <>
      <Footer style={{ textAlign: 'center' }}>

        <a rel="noopener noreferrer" target="_blank" href="https://www.facebook.com/BikemundoPh">
          <FacebookOutlined style={{ fontSize: '25px', color: '#08c' }} />
        </a>

        {anySpace}
        <Tooltip title="bikemundomail@gmail.com">
          <a rel="noopener noreferrer" target="_blank" href="mailto:bikemundomail@gmail.com">
            <MailOutlined style={{ fontSize: '25px', color: '#dc4141' }} />
          </a>
        </Tooltip>

        {anySpace}
        <Tooltip title="0916 387 0229">
          <span>
            <PhoneOutlined style={{ fontSize: '25px', color: '#4ed0ce' }} />
          </span>
        </Tooltip>
      </Footer>
    </>
  );
};

export default FoooterLinks;
