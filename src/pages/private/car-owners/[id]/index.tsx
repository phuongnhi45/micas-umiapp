import { ReactElement, useEffect } from 'react'
import React from 'react'
import { useParams, connect, CustomerState, Loading, Dispatch } from 'umi'
import { Spin, Breadcrumb , Row, Col, Tabs,Select} from 'antd'
import appIcon from '../../../../config/icons';
import ListBooking from '../components/table/list-booking'
import ListCar from '../components/table/list-car'
import './index.less'


const { TabPane } = Tabs;
const { Option } = Select;
interface PageProps {
  dispatch: Dispatch
  Customer:CustomerState
  loading: boolean
}

interface IParam {
  id: string
}

function ServicePlaceEdit(props: PageProps): ReactElement {
  const { dispatch, Customer: { customer }, loading } = props
  const params = useParams<IParam>()

  useEffect(() => {
    getCustomerDetail(params.id)
  }, [])

  const getCustomerDetail = (id: string) => {
    // Goi api company detail , kết quả lưu vào state model
    dispatch({
      type: 'Customer/getCustomerDetail',
      id,
    })
  }

  if (!customer) return <Spin />
  return (
  <>
    <Breadcrumb style={{ margin: '20px 40px 40px 0px' }}>
      <appIcon.ShopOutlined style={{ color: '#1890ff' }} />
      CAR-OWNERS/  {customer ? `${customer.name}` : 'NEW'}
    </Breadcrumb>
    <Row justify="space-between">
      <Col span={6} style={{backgroundColor:"white",paddingTop:'40px', margin:'0 10px 24px 10px', textAlign:'center',  border: '1px solid #e8e8e8'}} className='part-infor-cus' >
        <div ><img src="http://t1.gstatic.com/images?q=tbn:ANd9GcQMEl5NG_dB4rJTA2I2GWv6pjqW8LIXv5ZzJISfF7zdloY54sZ2cj5qxIT0FC5RrM20xSRgNickxvMk0Rno4h4" width='55%' style={{borderRadius:'50%'}} /></div>
          <h2 className='name'>{customer.name}</h2>

        <div className='info-cus'>
          <h4>Phone:</h4>
          <p>0968 609 858</p>
        </div>
        <div className='info-cus'>
          <h4>City:</h4>
          <p>Đà Nẵng</p>
        </div>
        <div  className='info-cus'>
        <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.2771920086598!2d107.5865213149806!3d16.46149613317805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3141a138544240a5%3A0x882ddf04d7146c9f!2zOSBOZ8O0IFF1eeG7gW4sIFbEqW5oIE5pbmgsIFRow6BuaCBwaOG7kSBIdeG6vywgVGjhu6thIFRoacOqbiBIdeG6vywgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1585213273943!5m2!1svi!2s"
              width={'100%'}
              height={424}
              frameBorder={0}
              style={{ border: 0 }}
              allowFullScreen
              aria-hidden="false"
              tabIndex={0}
            />
        </div>
      </Col>
      <Col span={17}  style={{margin:'0 10px'}}>
        <div className="card-container" >
          <Tabs type="card">
            <TabPane tab="Car" key="1">
              <ListCar/>
            </TabPane>
            <TabPane tab="Booking" key="2">
              <h4>Status</h4>
              <Select defaultValue="All" style={{ width: 220 }} >
                <Option value="Pending">Pending</Option>
                <Option value="Confirmed">Confirmed</Option>
                <Option value="Canceled">Canceled</Option>
                <Option value="Completed">Completed</Option>
                <Option value="All">All</Option>                
              </Select>              
              <ListBooking/>
            </TabPane>
            <TabPane tab="Booking histories" key="3">
              <h4> Chọn xe</h4>
              <Select defaultValue="lucy" style={{ width: 220 }} allowClear>
                <Option value="lucy">Lucy</Option>
              </Select>
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
