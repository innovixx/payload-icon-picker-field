import type { ChangeEvent } from 'react'
import React, { useState } from 'react'
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
  icons?: Record<string, string>
  renderSvg?: boolean
}

const IconInput: React.FC<IconInputProps> = ({
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
  icons,
  renderSvg,
}) => {
  const [filteredIcons, setFilteredIcons] = useState(icons)
  const [hoveredIcon, setHoveredIcon] = useState<null | string>(null)
  const [fieldIsFocused, setFieldIsFocused] = useState(false)

  const { i18n } = useTranslation()

  const ErrorComp = Error || DefaultError
  const LabelComp = Label || DefaultLabel

  const searchIcons = (e: any) => {
    if (!icons) return

    const value = e.target.value
    if (value == '') {
      setFilteredIcons(icons)
    } else {
      const foundIcons: any = {}
      Object.keys(icons).forEach(icon => {
        if (icon.includes(value)) {
          foundIcons[icon] = icons[icon]
        }
      })
      setFilteredIcons(foundIcons)
    }
  }

  return (
    <div
      className={[fieldBaseClass, 'icon', className, showError && 'error', readOnly && 'read-only']
        .filter(Boolean)
        .join(' ')}
      style={{
        ...style,
        width,
      }}
    >
      <ErrorComp message={errorMessage as string} showError={showError} />
      <LabelComp htmlFor={`field-${path.replace(/\./g, '__')}`} label={label} required={required} />
      <div
        className={`${baseClass}__input-container`}
        onFocus={() => setFieldIsFocused(true)}
        onBlur={e => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            setTimeout(() => setFieldIsFocused(false), 200)
          }
        }}
      >
        {Array.isArray(beforeInput) && beforeInput.map((Component, i) => <Component key={i} />)}
        {!rtl && (
          <div className={`${baseClass}__icon-preview`} onClick={() => setFieldIsFocused(true)}>
            {renderSvg ? (
              <span dangerouslySetInnerHTML={{ __html: (value && icons && icons[value]) || '' }} />
            ) : (
              value && icons && icons[value]
            )}
          </div>
        )}
        <input
          data-rtl={rtl}
          disabled={readOnly}
          id={`field-${path.replace(/\./g, '__')}`}
          name={path}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={
            placeholder
              ? getTranslation(placeholder as string, i18n)
              : getTranslation('Select an icon', i18n)
          }
          ref={inputRef}
          type="text"
          value={value || ''}
          spellCheck={false}
        />
        {rtl && (
          <div className={`${baseClass}__icon-preview`} onClick={() => setFieldIsFocused(true)}>
            {renderSvg ? (
              <span dangerouslySetInnerHTML={{ __html: (value && icons && icons[value]) || '' }} />
            ) : (
              value && icons && icons[value]
            )}
          </div>
        )}
        {fieldIsFocused && filteredIcons && (
          <div
            className={`${baseClass}__icon-picker-modal ${
              rtl ? `${baseClass}__icon-picker-modal--rtl` : ''
            }`}
          >
            <div className={`${baseClass}__icon-picker-modal__icon-container`}>
              {Object.keys(filteredIcons as Record<string, string>).map((icon, index) => (
                <div
                  onClick={() => {
                    onChange?.({
                      target: {
                        name: path,
                        value: icon,
                      },
                    } as ChangeEvent<HTMLInputElement>)
                    setFieldIsFocused(false)
                    setFilteredIcons(icons)
                  }}
                  onMouseOver={() => setHoveredIcon(icon)}
                  className={`${baseClass}__icon-picker-modal__icon-option ${
                    value == icon ? `${baseClass}__icon-picker-modal__icon-option-active` : ''
                  }`}
                  key={index}
                >
                  {renderSvg ? (
                    <span
                      dangerouslySetInnerHTML={{ __html: (value && icons && icons[icon]) || '' }}
                    />
                  ) : (
                    value && icons && icons[icon]
                  )}
                </div>
              ))}
              {Object.keys(filteredIcons as Record<string, string>).length == 0 && (
                <span>No icons found</span>
              )}
            </div>
            <div className={`${baseClass}__icon-picker-modal__icon-search`}>
              <input
                type="search"
                className="search_field"
                onChange={searchIcons}
                placeholder={hoveredIcon || 'Search icons...'}
                data-rtl={rtl}
              />
            </div>
          </div>
        )}
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
