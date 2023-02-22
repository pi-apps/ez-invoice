import { createAction } from '@reduxjs/toolkit'
import { PreviewType } from './type'

export const getDataPreview = createAction<PreviewType>('preview/getDataPreview')
export const getDataImages = createAction<{images: any}>('preview/getDataImages')