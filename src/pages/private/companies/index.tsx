import React from 'react';
import { connect, Loading, ConnectProps, Dispatch, Link } from 'umi';
import { CompanyState } from './model';
import lodash from 'lodash';

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

  onChangeStatus = (active: any, _id: string) => {
    this.props.dispatch({
      type: 'Company/changeStatusCompany',
      payload: { _id, active },
    });
  };

  onTableChange = (pagination: any) => {
    const { current } = pagination;
    this.onFilterChange({ page: current - 1 });
  };

  onDelete = (_id: string) => {
    this.props.dispatch({
      type: 'Company/getRemoveCompany',
      payload: _id,
    });
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
            <Link to="/update-company">New Company</Link>
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
              onDelete={this.onDelete}
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
