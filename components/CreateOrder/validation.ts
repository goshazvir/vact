import { IsValidFormProps } from '../../types'

export const isValidForm = ({
    name,
    description,
    price,
    currency
}: IsValidFormProps): boolean => !!name && !!description && !!price && !!currency ? true : false