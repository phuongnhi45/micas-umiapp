import React, { ReactElement, useEffect } from 'react'
import { connect, Loading, ConnectProps, Dispatch, Link } from 'umi';
import { CompanyState } from '../model';

import { Card, Row, Col, Breadcrumb, Button, Typography } from 'antd';
import appIcon from '@/config/icons';
import styles from '../../index.less';

export interface PageProps extends ConnectProps {
  dispatch: Dispatch;
  loading: boolean;
  Company: CompanyState;
}

interface IParam {
  id: string
}

const { Title } = Typography;

class DetailCompany extends React.Component<PageProps, any> {
  // componentDidMount() {
  //   this.props.dispatch({
  //     type: 'Company/getCompanies',
  //   });
  // }
  
  render() {
    return (
      <>
        <Row className={styles.row}>
          <Breadcrumb className={styles.breadcrumb}>
            <appIcon.ShopOutlined style={{ color: '#1890ff' }} /> SERVICE
            COMPANIES/ 
          </Breadcrumb>
        </Row>

        <Card>
          <Title level={4}>Ant Design</Title> 
          <p>Card content</p>
          <p>Card content</p>
        </Card>

        <Row className={styles.row} style={{backgroundColor: "white"}}>
          <Button>Create</Button>
        </Row>
      </>
    )
  }
}

export default connect(
  ({ Company, loading }: { Company: CompanyState; loading: Loading }) => ({
    Company,
    loading: loading.models.Company,
  }),
)(DetailCompany);