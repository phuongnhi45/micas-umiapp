import React from 'react';
import { connect, Loading, ConnectProps, Dispatch, Link, Redirect } from 'umi';
import { CompanyState } from './model';
import ListCompanies from './components/list-company';
import SearchName from './components/search-company';

import { Row, Col, Breadcrumb, Button } from 'antd';
import appIcon from '@/config/icons';
import styles from '../index.less';

import lodash from 'lodash';

export interface PageProps extends ConnectProps {
  dispatch: Dispatch;
  loading: boolean;
  Company: CompanyState;
}

class ServicePlace extends React.Component<PageProps, any> {
  componentDidMount() {
    this.onFilterChange({});
  }

  onFilterChange = (newFilter = {}) => {
    const {
      Company: { filter },
    } = this.props;
    const filters = lodash.merge(filter, newFilter);
    const query = lodash.pick(filters, ['page', 'name', 'limit', 'active']);
    this.loadData(query);
  };

  loadData = (payload: any) => {
    this.props.dispatch({
      type: 'Company/getCompanies',
      payload,
    });
  };

  onChangeStatus = (active: boolean, _id: string) => {
    this.props.dispatch({
      type: 'Company/changeStatusCompany',
      payload: { _id, active },
    });
  };

  onToggleForm = (value: any) => {
    if (value) {
      //truyền value qa formCompany
      console.log(value);
      return <Redirect to="/new-company" />;
    }
  };

  onTableChange = (pagination: any) => {
    const { current } = pagination;
    this.onFilterChange({ page: current - 1 });
  };

  render() {
    const {
      Company: { companies, filter },
      loading,
    } = this.props;
    return (
      <>
        <Row className={styles.row}>
          <Breadcrumb className={styles.breadcrumb}>
            <appIcon.ShopOutlined style={{ color: '#1890ff' }} /> CÔNG TY GARA,
            CỨU HỘ
          </Breadcrumb>
          <Button type="primary">
            <Link to="/new-company">New Company</Link>
          </Button>
        </Row>

        <Row>
          <Col span={4}>
            <SearchName
              onSearch={(name: string) =>
                this.onFilterChange({ name, page: 0 })
              }
            />
          </Col>

          <Col className={styles.list_company} span={20}>
            <ListCompanies
              onChangeStatus={this.onChangeStatus}
              companies={companies}
              loading={loading}
              pageSize={filter.limit}
              total={filter.total}
              current={filter.page}
              onChange={this.onTableChange}
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
