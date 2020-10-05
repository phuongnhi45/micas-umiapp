import React, { ReactElement, useEffect } from 'react'
import { useParams, connect, CompanyState, Loading, Dispatch } from 'umi'

import appIcon from '@/config/icons';
import { Spin, Row, Col, Breadcrumb } from 'antd'
import styles from '../../../index.less'

interface PageProps {
  dispatch: Dispatch
  Company: CompanyState
  loading: boolean
}

interface IParam {
  id: string
}

function DetailService(props: PageProps): ReactElement {
  const { dispatch, Company: { service }, loading } = props
  const params = useParams<IParam>()

  useEffect(() => {
    getServiceDetail(params.id)
  }, [])

  const getServiceDetail = (id: string) => {
    dispatch({
      type: 'Company/getServiceDetail',
      id,
    })
  }

  if (!service) return <Spin />
  return (
    <>
      <Row className={styles.row}>
        <Breadcrumb className={styles.breadcrumb}>
          <appIcon.ShopOutlined style={{ color: '#1890ff' }} />
          { service ? ` ${service.name}` : '' }
        </Breadcrumb>
      </Row>
      <Row>
        <Col span={6}>
          aaaaa
        </Col>
      </Row>
    </>
  )
}

export default connect(
  ({ Company, loading }: { Company: CompanyState; loading: Loading }) => ({
    Company,
    loading: loading.models.Company,
  }),
)(DetailService);
