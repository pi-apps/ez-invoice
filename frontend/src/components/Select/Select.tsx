import { BoxProps, ChevronDownIcon, Text } from '@devfedeltalabs/pibridge_uikit'
import { useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'

const DropDownHeader = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 16px;
  transition: border-radius 0.15s;
  > svg {
    fill: #fff !important;
  }

  @media screen and (max-width: 600px) {
    padding: 0 10px;
  }
`

const DropDownListContainer = styled.div`
  width: 180px;
  height: 100%;
  max-height:250px;
  padding: 12px;
  position: absolute;
  overflow-y: hidden;
  overflow-x:hidden;
  z-index: ${({ theme }) => theme.zIndices.dropdown};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  transition: transform 0.15s, opacity 0.15s;
  transform: scaleY(0);
  transform-origin: top;
  opacity: 0;
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.input};
  color: ${({ theme }) => theme.colors.text};
  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 50px;
    width: 160px;
  }
`

const DropDownContainer = styled.div<{ isOpen: boolean; width: number; height: number }>`
  cursor: pointer;
  width: ${({ width }) => width}px;
  position: relative;
  width: 220px;
  height: 52px;
  border-radius: 10px;
  box-sizing: border-box;
  @media only screen and (max-width: 600px) {
    width: 160px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    // border-right: 0.15px solid rgba(151, 151, 151, 0.69);
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 100px;
    width: 100%;
  }

  ${(props) =>
    props.isOpen &&
    css`
      ${DropDownHeader} {
      }

      ${DropDownListContainer} {
        height: auto;
        transform: scaleY(1);
        opacity: 1;
        border-top-width: 0;
        width: 100%;
        background: #ffffff;
        top: 49px;
      }
    `}

  svg {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
  }
  @media only screen and (max-width: 600px) {
    width: 100%;
    /* margin-top:1rem; */
  }
`

const DropDownList = styled.ul`
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  z-index: ${({ theme }) => theme.zIndices.dropdown};
`

const ListItem = styled.li`
  list-style: none;
  padding: 8px 16px;
  border-radius:6px;
  &:hover {
    background: #F8F9FD;
    > div {
      color: #0F172A;
      /* color: #fff !important; */
    }
  }
`

export interface SelectProps extends BoxProps {
  options: OptionProps[]
  onOptionChange?: (option: OptionProps) => void
  placeHolderText?: string
  defaultOptionIndex?: number
}

export interface OptionProps {
  label: string
  value: any
}

const Select: React.FunctionComponent<React.PropsWithChildren<SelectProps>> = ({
  options,
  onOptionChange,
  defaultOptionIndex = 0,
  placeHolderText,
  ...props
}) => {
  const containerRef = useRef(null)
  const dropdownRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [optionSelected, setOptionSelected] = useState(false)
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(defaultOptionIndex)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const toggling = (event: React.MouseEvent<HTMLDivElement>) => {
    if ( options.length > 1 ){
      setIsOpen(!isOpen)
    }
    event.stopPropagation()
  }

  const onOptionClicked = (selectedIndex: number) => () => {
    setSelectedOptionIndex(selectedIndex)
    setIsOpen(false)
    setOptionSelected(true)

    if (onOptionChange) {
      onOptionChange(options[selectedIndex])
    }
  }

  useEffect(() => {
    setContainerSize({
      width: dropdownRef.current.offsetWidth, // Consider border
      height: dropdownRef.current.offsetHeight,
    })

    const handleClickOutside = () => {
      setIsOpen(false)
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (defaultOptionIndex) {
      setSelectedOptionIndex(defaultOptionIndex - 1)
      setOptionSelected(true)
    }
  }, [defaultOptionIndex])

  return (
    <DropDownContainer isOpen={isOpen} {...props} ref={containerRef} {...containerSize}>
      {containerSize.width !== 0 && (
        <DropDownHeader onClick={toggling}>
          <Text color={!optionSelected && placeHolderText ? 'text' : undefined}>
            {!optionSelected && placeHolderText ? placeHolderText : options[selectedOptionIndex].label}
          </Text>
        </DropDownHeader>
      )}
      <ChevronDownIcon onClick={toggling} />
      <DropDownListContainer>
        <DropDownList ref={dropdownRef}>
          {options.map((option, index) =>
            placeHolderText || index !== selectedOptionIndex ? (
              <CustomListItem onClick={onOptionClicked(index)} key={option.label}>
                <Text>{option.label}</Text>
              </CustomListItem>
            ) : null,
          )}
        </DropDownList>
      </DropDownListContainer>
    </DropDownContainer>
  )
}

export default Select

const CustomListItem = styled(ListItem)`
  @media screen and (max-width: 320px) {
    padding: 0px
  }
`