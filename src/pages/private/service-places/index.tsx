import React from 'react';
import { connect, Loading, ConnectProps, Dispatch } from 'umi';
import { CompanyState } from './model';
import ListCompanies from './components/list-company';
import SearchName from './components/search-company';

import { Row, Col, Breadcrumb, Button } from 'antd';
import appIcon from '@/config/icons';
import styles from '../index.less';

export interface PageProps extends ConnectProps {
  dispatch: Dispatch;
  loading: boolean;
  Company: CompanyState;
}

class ServicePlace extends React.Component<PageProps, any> {
  state = {
    company: null,
  };

  onSearch = (value: any) => {
    console.log('search:', value);
    this.props.dispatch({
      type: 'Company/searchCompanies',
      payload: value,
    });
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'Company/getCompanies',
    });
  }

  onChangeStatus = (active: boolean, _id: string) => {
    this.props.dispatch({
      type: 'Company/changeStatusCompany',
      payload: { active, _id },
    });
  };

  onToggleForm = () => {};

  render() {
    const { loading } = this.props;
    const { company } = this.state;
    return (
      <>
        <Row className={styles.row}>
          <Breadcrumb className={styles.breadcrumb}>
            <appIcon.ShopOutlined style={{ color: '#1890ff' }} /> CÔNG TY GARA,
            CỨU HỘ
          </Breadcrumb>
          <Button type="primary" onClick={() => this.onToggleForm}>
            New Company
          </Button>
        </Row>

        <Row>
          <Col span={4}>
            <SearchName onSearch={this.onSearch} />
          </Col>

          <Col className={styles.list_company} span={20}>
            <ListCompanies
              onUpdate={this.onToggleForm}
              companies={this.props.Company}
              loading={loading}
            />
          </Col>
        </Row>
      </>
    );
  }
}

export default connect(
  ({ Company, loading }: { Company: CompanyState; loading: Loading }) => ({
    Company,
    loading: loading.models.Company,
  }),
)(ServicePlace);
