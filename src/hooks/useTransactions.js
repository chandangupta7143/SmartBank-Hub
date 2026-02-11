// NOTE: This hook is deprecated and replaced by hooks/queries/useTransactionQueries.js
// Keeping for backward compatibility during transition
// TODO: Remove this file after all components are updated

import { useTransactions as useTransactionQueries } from './queries/useTransactionQueries';

/**
 * @deprecated Use hooks/queries/useTransactionQueries instead
 */
export const useTransactions = useTransactionQueries;
