import React, { ReactElement, useEffect } from 'react'
import { useParams, connect, CompanyState, Loading, Dispatch } from 'umi'

import { Card, Row, Col, Breadcrumb, Typography } from 'antd';
import appIcon from '@/config/icons';
import styles from '../../index.less'

import ListService from './list-service';

interface PageProps {
  dispatch: Dispatch
  Company: CompanyState
  loading: boolean
}

interface IParam {
  id: string
}

function CompanyDetail(props: PageProps): ReactElement {
  const { dispatch, Company: { company, services }, loading } = props
  const params = useParams<IParam>()

  useEffect(() => {
    getCompanyDetail(params.id);
    getServiceByCompany(params.id)
  }, [])

  const getCompanyDetail = (id: string) => {
    dispatch({
      type: 'Company/getCompanyDetail',
      id,
    })
  }

  const getServiceByCompany = (id: string) => {
    dispatch({
      type: 'Company/getServiceByCompany',
      id,
    })
  }

  const onDelete = (_id: string) => {
    const id = company._id
    dispatch({
      type: 'Company/getRemoveService',
      payload: { _id, id},
    })
  }

  const onChangeStatusService = (_id: string, e: any) => {
    const active = e.target.checked
    const id = company._id
    dispatch({
      type: 'Company/changeStatusService',
      payload: { _id, active, id},
    });
  };

  const { Text, Title } = Typography;

  return (
    <>
      <Row className={styles.row}>
        <Breadcrumb className={styles.breadcrumb}>
          <appIcon.ShopOutlined style={{ color: '#1890ff' }} /> SERVICE
          COMPANIES/ {(company) && company.name}
        </Breadcrumb>
      </Row>

      <Card>
        <Title level={4}>{(company) && company.name}</Title> 
        <Row>
          <Col md={{ span: 5 }} lg={{ span: 6}}>
            <Text className={styles.title}>Phone:</Text>
            <Text className={styles.content} type="secondary">{(company) && company.phone}</Text>
          </Col>
          <Col md={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
            <Text className={styles.title}>Email:</Text>
            <Text className={styles.content} type="secondary">{(company) && company.email}</Text>
          </Col>
          <Col md={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
            <Text className={styles.title}>Address:</Text>
            <Text className={styles.content} type="secondary">{(company) && company.address}</Text>
          </Col>
        </Row>
      </Card>

      <Row className={styles.row} style={{backgroundColor: "white"}}>
        {
          (services) && 
            <ListService
              onDelete={onDelete}
              onChangeStatusService={onChangeStatusService}
              services={services}
              company={company}
            />
        }
      </Row>
    </>
  )
}

export default connect(
  ({ Company, loading }: { Company: CompanyState; loading: Loading }) => ({
    Company,
    loading: loading.models.Company,
  }),
)(CompanyDetail);