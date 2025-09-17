import React from 'react'
import { Suspense } from 'react'
import SelectRelish from './SelectRelish'

const page = () => {
  return (
    <Suspense>
      <SelectRelish/>
    </Suspense>
  )
}

export default page