/**
 * Format a number as Nigerian Naira
 * e.g. 15000 → ₦15,000
 */
export const formatPrice = (amount) => {
  if (amount === null || amount === undefined) return '₦0';
  return `₦${Number(amount).toLocaleString('en-NG')}`;
};

/**
 * Calculate discount percentage
 * e.g. (20000, 15000) → 25
 */
export const discountPercent = (original, sale) => {
  if (!original || !sale || sale >= original) return 0;
  return Math.round(((original - sale) / original) * 100);
};
