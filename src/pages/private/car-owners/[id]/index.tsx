import React,{ useState, ReactElement, useEffect } from 'react'
import { useParams, connect, CustomerState, Loading, Dispatch } from 'umi'
import { Spin, Breadcrumb, Row, Col, Tabs, Select} from 'antd'
import ListBooking from '../components/table/list-booking';
import Avatar from '../components/avatar/index';

import './index.less';
import styles from '../../index.less'
import appIcon from '@/config/icons';

const { TabPane } = Tabs;
const { Option } = Select;
interface PageProps {
  dispatch: Dispatch
  Customer:CustomerState
  bookings: CustomerState
  loading: boolean
} 

interface IParam {
  id: string
}

function ServicePlaceEdit(props: PageProps): ReactElement {
  const { dispatch, Customer: { customer, bookings }, loading } = props
  const params = useParams<IParam>()
  useEffect(() => {
    getCustomerDetail(params.id);
    dispatch({
      type: 'Customer/getBookings',
      payload:params
    });
  }, [])
  const [isVisible, setIsVisible] = useState(false);
  const getCustomerDetail = (id: string) => {
    dispatch({
      type: 'Customer/getCustomerDetail',
      id,
    });
  }
  
  const onSubmit = (values: any) => {
    onToggleModal();
  };

 const  onToggleModal = () => {
  setIsVisible(!isVisible)
  };

  if (!customer) return <Spin/>
  return (
  <>
    <Row className={styles.row}>
      <Breadcrumb className={styles.breadcrumb}>
        <appIcon.ShopOutlined style={{ color: '#1890ff' }} /> CAR-OWNERS/  {customer ? `${customer.name}` : 'NEW'}
      </Breadcrumb>
    </Row>

    <Row>
      <Col span={6} className={styles.service_detail}>
        <div>
          <Avatar cus={customer}/>
        </div>
        <h2 className={styles.title_service}>{customer.name}</h2>
        <div className='info-cus'>
          <h4>Phone:</h4>
          <p>{customer.phone}</p>
        </div>
        <div className='info-cus'>
          <h4>City:</h4>
          <p>______</p>
        </div>
        <div className='info-cus'>
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
        </div>
      </Col>
      <Col span={18} className={styles.booking}>
        <div className="card-container" >
          <Tabs type="card">

            <TabPane tab="Booking" key="1">
              <ListBooking
                loading={loading}
                bookings={bookings}
              />           
            </TabPane>
          </Tabs>
        </div>
      </Col>
    </Row>
  </>
  )
}

export default connect(
  ({ Customer, loading }: { Customer:CustomerState; loading: Loading }) => ({
    Customer,
    loading: loading.models.Customer,
  }),
)(ServicePlaceEdit);
