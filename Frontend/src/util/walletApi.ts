/**
 * API client for wallet operations
 * Connects frontend to Spring Boot backend wallet endpoints
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081';

/**
 * Get JWT token from storage
 */
const getToken = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('authToken');
    }
    return null;
};

/**
 * Helper to make authenticated requests
 */
const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const token = getToken();
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `API error: ${response.statusText}`);
    }

    return response.json();
};

export interface WalletBalance {
    id: number;
    userId: number;
    balance: number;
    currency: string;
    createdAt: string;
    lastUpdated: string;
}

export interface WalletTransaction {
    id: number;
    type: 'CREDIT' | 'DEBIT' | 'PURCHASE' | 'REFUND' | 'REWARD';
    amount: number;
    description: string;
    balanceAfter: number;
    createdAt: string;
    referenceId?: string;
}

export interface AddFundsRequest {
    amount: number;
    description?: string;
    paymentMethod?: string;
    referenceId?: string;
}

/**
 * Wallet API Client
 */
export const walletApi = {
    /**
     * Get current wallet balance
     */
    getBalance: async (): Promise<WalletBalance> => {
        return await fetchWithAuth(`${API_BASE}/api/wallet/balance`);
    },

    /**
     * Add funds to wallet
     */
    addFunds: async (request: AddFundsRequest): Promise<WalletBalance> => {
        return await fetchWithAuth(`${API_BASE}/api/wallet/add-funds`, {
            method: 'POST',
            body: JSON.stringify(request),
        });
    },

    /**
     * Get transaction history
     */
    getTransactions: async (): Promise<WalletTransaction[]> => {
        return await fetchWithAuth(`${API_BASE}/api/wallet/transactions`);
    },

    /**
     * Deduct funds from wallet (for purchases)
     */
    deductFunds: async (amount: number, description?: string): Promise<WalletBalance> => {
        const params = new URLSearchParams({
            amount: amount.toString(),
            ...(description && { description }),
        });
        return await fetchWithAuth(`${API_BASE}/api/wallet/deduct-funds?${params}`, {
            method: 'POST',
        });
    },
};

export default walletApi;
