import { motion } from 'framer-motion'
import { keyBlock } from '../lib/utils'

export const CodeInput = ({ innerRef, disabled, inputPlaceholder }) => {
  return (
    <motion.input
      defaultValue=''
      disabled={disabled}
      initial={false}
      // min='0'
      onKeyPress={keyBlock}
      placeholder={inputPlaceholder}
      required
      // step="0.000001"
      // type="number"
      ref={innerRef}
    />
  )
}