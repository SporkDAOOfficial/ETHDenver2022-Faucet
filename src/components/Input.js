import React, { useState } from 'react'
import { motion } from 'framer-motion'

import { keyBlock } from '../lib/utils'

export const CodeInput = ({ innerRef, disabled }) => {
  return (
    <motion.input
      defaultValue=''
      disabled={disabled}
      initial={false}
      // min='0'
      onKeyPress={keyBlock}
      placeholder='Enter Registration Code'
      required
      // step="0.000001"
      // type="number"
      ref={innerRef}
    />
  )
}