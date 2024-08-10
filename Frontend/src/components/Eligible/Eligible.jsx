import React from 'react'
import Nav from '../Nav'
import EligibleForm from './EligibleForm'

export default function Eligible({formData}) {
  return (
    <>
        <Nav/>
        <EligibleForm formData={formData}  />
    </>
  )
}
