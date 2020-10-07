import React, { ReactElement, useEffect } from 'react'
import { useParams, connect, CompanyState, Loading, Dispatch } from 'umi'
import { Spin, Row, Col, Breadcrumb, Tabs, Descriptions, Button } from 'antd'
import ListBooking from './list-booking';

import appIcon from '@/config/icons';
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
  const { dispatch, Company: { service, bookings }, loading } = props
  const params = useParams<IParam>()
  const { TabPane } = Tabs;

  useEffect(() => {
    getServiceDetail(params.id)
    getBookingByService(params.id)
  }, [])

  const getServiceDetail = (id: string) => {
    dispatch({
      type: 'Company/getServiceDetail',
      id,
    })
  }
  
  const removeService = (id: string) => {
    dispatch({
      type: 'aa',
      id,
    })
    console.log(id)
  }

  const editService = (id: string) => {
    dispatch({
      type: 'aa',
      id,
    })
    console.log(id)
  }

  if (bookings.length > 0 && service) {
    bookings.map((item,index)=>
      Object.assign(bookings[index], { phoneService: service.phone })
    )
  }

  const getBookingByService = (id: string) => {
    dispatch({
      type: 'Company/getBookingByService',
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
        <Col className={styles.service_detail} span={8}>
          <h2 className={styles.title_service}>{service && service.name}</h2>
          <Descriptions>
            <Descriptions.Item label="Address">{service && service.address}</Descriptions.Item>
          </Descriptions>
          <Descriptions>
            <Descriptions.Item label="Email">{service && service.email}</Descriptions.Item>
          </Descriptions>
          <Descriptions>
            <Descriptions.Item label="Phone">{service && service.phone}</Descriptions.Item>
          </Descriptions>
          <Descriptions>
            <Descriptions.Item label="Description">{service && service.description}</Descriptions.Item>
          </Descriptions>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.2771920086598!2d107.5865213149806!3d16.46149613317805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3141a138544240a5%3A0x882ddf04d7146c9f!2zOSBOZ8O0IFF1eeG7gW4sIFbEqW5oIE5pbmgsIFRow6BuaCBwaOG7kSBIdeG6vywgVGjhu6thIFRoacOqbiBIdeG6vywgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1585213273943!5m2!1svi!2s"
            width={'100%'}
            height={400}
            frameBorder={0}
            style={{ border: 0 }}
            allowFullScreen
            aria-hidden="false"
            tabIndex={0}
          />
        </Col>
        <Col className={styles.booking} span={16}>
          <Tabs type="card">
            <TabPane className={styles.tab_booking} tab="Booking" key="1">
              <Button type="primary" style={{marginBottom: '10px'}}>Add new</Button>
              <ListBooking
                bookings={bookings}
                loading={loading}
                onEdit={editService}
                onDelete={removeService}
              />
            </TabPane>
          </Tabs>
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
