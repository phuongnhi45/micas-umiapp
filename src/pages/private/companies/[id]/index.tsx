import React, { ReactElement, useState } from 'react'

import { Card, Row, Col, Breadcrumb, Button, Typography } from 'antd';
import appIcon from '@/config/icons';
import styles from '../../index.less'

const { Title } = Typography;

interface PageProps { }

function ServicePlaceDetail(props: PageProps): ReactElement {
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
        <Row>
          <Col md={{ span: 5 }} lg={{ span: 6}}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil maxime eius ipsum quod distinctio ea nisi voluptates eveniet suscipit eligendi excepturi, labore similique atque officia asperiores culpa, optio mollitia temporibus!
          </Col>
          <Col md={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus nihil nesciunt quidem fuga vel aliquam inventore harum illum nulla commodi ex reiciendis blanditiis aspernatur, maxime quae laudantium vitae. Sint, deleniti.
          </Col>
          <Col md={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, omnis doloribus. Quo id nihil nemo voluptatum vitae modi quae est eius suscipit animi nesciunt blanditiis, tempore sed hic commodi autem.
          </Col>
        </Row>
      </Card>

      <Row className={styles.row} style={{backgroundColor: "white"}}>
        <Button type="primary">Create</Button>
      </Row>
    </>
  )
}

export default ServicePlaceDetail