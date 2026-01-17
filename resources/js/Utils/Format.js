/**
 * Format number without trailing zeros
 * 5.000 -> 5
 * 5.100 -> 5.1
 * 5.123 -> 5.123
 */
export function formatDecimal(value) {
    if (value === null || value === undefined || value === '') return ''
    const num = parseFloat(value)
    if (isNaN(num)) return value
    // Remove trailing zeros
    return num.toString()
}

/**
 * Parse decimal value for form input
 * Ensures the input value doesn't have trailing zeros
 */
export function parseDecimalInput(value) {
    if (value === null || value === undefined || value === '') return ''
    const num = parseFloat(value)
    if (isNaN(num)) return 0
    return num
}

/**
 * Format currency (Indonesian Rupiah)
 */
export function formatCurrency(value) {
    if (value === null || value === undefined) return 'Rp 0'
    const num = parseFloat(value)
    if (isNaN(num)) return 'Rp 0'
    return 'Rp ' + num.toLocaleString('id-ID')
}

/**
 * Format quantity with smart decimals
 * Shows decimals only if needed, max 3 decimal places
 */
export function formatQty(value, unit = '') {
    if (value === null || value === undefined) return '0'
    const num = parseFloat(value)
    if (isNaN(num)) return '0'
    
    // If whole number, show without decimals
    if (num % 1 === 0) {
        return unit ? `${num} ${unit}` : num.toString()
    }
    
    // Otherwise, show with minimal decimals (up to 3)
    const formatted = parseFloat(num.toFixed(3)).toString()
    return unit ? `${formatted} ${unit}` : formatted
}
