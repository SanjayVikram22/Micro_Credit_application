import React from 'react'
import Nav from '../Nav'
import Form from '../Form'

export default function LoanForm({ formData, setFormData }) {
  
  return (
    <>
        <Nav/>
        <Form formData={formData} setFormData={setFormData} />
    </>
  )
}
