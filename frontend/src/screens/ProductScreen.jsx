import React from 'react'
import { useParams } from 'react-router-dom'

function ProductScreen() {
    const params = useParams();
    const {slug} = params;
  return (
    <div>
        <h2>{slug}</h2>
    </div>
  )
}

export default ProductScreen