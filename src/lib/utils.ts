
import { EntityError } from '@/lib/http'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import jwt from 'jsonwebtoken'
import { DishStatus, TableStatus } from '@/constants/type'
import envConfig from '@/config'
import { UseFormSetError } from 'react-hook-form'
import { addToast } from '@heroui/react'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}


/**
 * Xóa đi ký tự `/` đầu tiên của path
 */
export const handleErrorApi = ({
    error,
    setError,
    duration
}: {
    error: any
    setError?: UseFormSetError<any>
    duration?: number
}) => {
    if (error instanceof EntityError && setError) {
        error.payload.errors.forEach((item) => {
            setError(item.field, {
                type: 'server',
                message: item.message
            })
        })
    } else {
        addToast({
            title: 'Lỗi',
            description: error?.payload?.message ?? 'Lỗi không xác định',
            timeout: duration ?? 5000
        })
    }
}
export const normalizePath = (path: string) => {
    return path.startsWith('/') ? path.slice(1) : path
}

export const decodeJWT = <Payload = any>(token: string) => {
    return jwt.decode(token) as Payload
}

export const formatCurrency = (number: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)
}

export const getVietnameseDishStatus = (status: (typeof DishStatus)[keyof typeof DishStatus]) => {
    switch (status) {
        case DishStatus.Available:
            return 'Có sẵn'
        case DishStatus.Unavailable:
            return 'Không có sẵn'
        default:
            return 'Ẩn'
    }
}

export const getVietnameseTableStatus = (status: (typeof TableStatus)[keyof typeof TableStatus]) => {
    switch (status) {
        case TableStatus.Available:
            return 'Có sẵn'
        case TableStatus.Reserved:
            return 'Đã đặt'
        default:
            return 'Ẩn'
    }
}


