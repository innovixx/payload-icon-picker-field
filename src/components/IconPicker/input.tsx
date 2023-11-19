import type { ChangeEvent } from 'react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import DefaultError from 'payload/dist/admin/components/forms/Error'
import { fieldBaseClass } from 'payload/dist/admin/components/forms/field-types/shared'
import FieldDescription from 'payload/dist/admin/components/forms/FieldDescription'
import { Description } from 'payload/dist/admin/components/forms/FieldDescription/types'
import DefaultLabel from 'payload/dist/admin/components/forms/Label'
import type { TextField } from 'payload/dist/fields/config/types'
import { getTranslation } from 'payload/dist/utilities/getTranslation'

import './index.scss'

const baseClass = 'icon'

export type IconInputProps = Omit<TextField, 'type'> & {
  Error?: React.ComponentType<any>
  Label?: React.ComponentType<any>
  afterInput?: React.ComponentType<any>[]
  beforeInput?: React.ComponentType<any>[]
  className?: string
  description?: Description
  errorMessage?: string
  inputRef?: React.MutableRefObject<HTMLInputElement>
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
  path: string
  placeholder?: Record<string, string> | string
  readOnly?: boolean
  required?: boolean
  rtl?: boolean
  showError?: boolean
  style?: React.CSSProperties
  value?: string
  width?: string
}

const IconInput: React.FC<IconInputProps> = props => {
  const {
    Error,
    Label,
    afterInput,
    beforeInput,
    className,
    description,
    errorMessage,
    inputRef,
    label,
    onChange,
    onKeyDown,
    path,
    placeholder,
    readOnly,
    required,
    rtl,
    showError,
    style,
    value,
    width,
  } = props

  const { i18n } = useTranslation()

  const ErrorComp = Error || DefaultError
  const LabelComp = Label || DefaultLabel

  return (
    <div
      className={[fieldBaseClass, 'text', className, showError && 'error', readOnly && 'read-only']
        .filter(Boolean)
        .join(' ')}
      style={{
        ...style,
        width,
      }}
    >
      <ErrorComp message={errorMessage as string} showError={showError} />
      <LabelComp htmlFor={`field-${path.replace(/\./g, '__')}`} label={label} required={required} />
      <div className="input-wrapper">
        {Array.isArray(beforeInput) && beforeInput.map((Component, i) => <Component key={i} />)}
        <input
          data-rtl={rtl}
          disabled={readOnly}
          id={`field-${path.replace(/\./g, '__')}`}
          name={path}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={getTranslation(placeholder as string, i18n)}
          ref={inputRef}
          type="text"
          value={value || ''}
        />
        {Array.isArray(afterInput) && afterInput.map((Component, i) => <Component key={i} />)}
      </div>
      <FieldDescription
        className={`field-description-${path.replace(/\./g, '__')}`}
        description={description}
        value={value}
      />
    </div>
  )
}

export default IconInput
