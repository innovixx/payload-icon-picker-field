'use client'

import { useConfig, useField, useLocale, withCondition } from '@payloadcms/ui'
import React, { useCallback, useMemo } from 'react'

import type { IconPickerFieldClientComponent } from './types.js'

import './index.scss'
import { isFieldRTL } from '../../utils/isFIeldRTL'
import { mergeFieldStyles } from '../../utils/mergeFieldStyles'

import { IconPickerInput } from './Input'

const IconPickerField: IconPickerFieldClientComponent = (props) => {
  const {
    icons,
    field,
    field: {
      admin: { className, description, placeholder, rtl } = {},
      label,
      localized,
      maxLength,
      minLength,
      required,
    },
    inputRef,
    path,
    readOnly,
    validate,
  } = props

  const locale = useLocale()

  const {
    config: {
      localization
    }
  } = useConfig()

  const memoizedValidate = useCallback(
    (value, options) => {
      if (typeof validate === 'function') {
        return validate(value, { ...options, maxLength, minLength, required }) || true
      }
      return true
    },
    [validate, minLength, maxLength, required],
  )

  const {
    customComponents: { AfterInput, BeforeInput, Description, Error, Label } = {},
    setValue,
    showError,
    value,
  } = useField({
    path,
    validate: memoizedValidate,
  })

  const renderRTL = isFieldRTL({
    fieldLocalized: Boolean(localized),
    fieldRTL: Boolean(rtl),
    locale,
    localizationConfig: localization || undefined,
  })

  const styles = useMemo(() => mergeFieldStyles(field), [field])

  return (
    <IconPickerInput
      AfterInput={AfterInput}
      BeforeInput={BeforeInput}
      className={className}
      Description={Description}
      description={description}
      Error={Error}
      inputRef={inputRef}
      Label={Label}
      label={label}
      localized={localized}
      onChange={(e) => {
        setValue(e.target.value)
      }}
      path={path}
      readOnly={readOnly}
      required={required}
      rtl={renderRTL}
      showError={showError}
      style={styles}
      value={(value as string) || ''}
      icons={icons}
      placeholder={placeholder}
    />
  )
}

export const IconPickerFieldComponent: IconPickerFieldClientComponent = withCondition(IconPickerField)
