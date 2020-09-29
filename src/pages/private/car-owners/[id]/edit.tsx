import { ReactElement, useEffect } from 'react'
import React from 'react'
import { useParams, connect, CustomerState, Loading, Dispatch } from 'umi'
import ModalForm from "../components/form/owner"
import { Spin } from 'antd'

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
    <ModalForm
      customer={customer}
      dispatch={dispatch}
      loading={loading}
    />
  )
}

export default connect(
  ({ Customer, loading }: { Customer:CustomerState; loading: Loading }) => ({
    Customer,
    loading: loading.models.Customer,
  }),
)(ServicePlaceEdit);
