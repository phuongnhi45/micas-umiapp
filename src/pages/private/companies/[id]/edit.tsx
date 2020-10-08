import { ReactElement, useEffect } from 'react'
import React from 'react'
import { useParams, connect, CompanyState, Loading, Dispatch } from 'umi'
import FormCompany from '../components/update-form'
import { Spin } from 'antd'

interface PageProps {
  dispatch: Dispatch
  Company: CompanyState
  loading: boolean
}

interface IParam {
  id: string
}

function CompanyEdit(props: PageProps): ReactElement {
  const { dispatch, Company: { company }, loading } = props
  const params = useParams<IParam>()

  useEffect(() => {
    getCompanyDetail(params.id)
  }, [])

  const getCompanyDetail = (id: string) => {
    // Goi api company detail , kết quả lưu vào state model
    dispatch({
      type: 'Company/getCompanyDetail',
      id,
    })
  }

  if (!company) return <Spin />
  return (
    <FormCompany
      company={company}
      dispatch={dispatch}
      loading={loading}
    />
  )
}

export default connect(
  ({ Company, loading }: { Company: CompanyState; loading: Loading }) => ({
    Company,
    loading: loading.models.Company,
  }),
)(CompanyEdit);
