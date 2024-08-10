import React from 'react'
import NotEligibleForm from './NotEligibleForm'
import Nav from '../Nav'

export default function NotEligiblePage({formData}) {
 
  return (
    <>
    <Nav/>
    <NotEligibleForm formData={formData}/>
    </>
  )
}
