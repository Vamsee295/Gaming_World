/**
 * API client for personalized game recommendations
 * Connects frontend to Spring Boot backend recommendation endpoints
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

/**
 * Get JWT token from storage/context
 * TODO: Integrate with your existing auth context
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
        throw new Error(`API error: ${response.statusText}`);
    }

    return response.json();
};

export interface GameDTO {
    id: number;
    title: string;
    description?: string;
    price: number;
    discount?: number;
    effectivePrice: number;
    genre: string;
    publisher?: string;
    releaseDate?: string;
    imageUrl?: string;
    trailerLink?: string;
    rating: number;
    reviewCount?: number;
    isFreeToPlay: boolean;
    featured?: boolean;
    editorPick?: boolean;
    lastPlayedTime?: string; // For "Continue Playing" section
    downloads?: number;
}

/**
 * Recommendation API Client
 */
export const recommendationApi = {
    /**
     * Get personalized recommendations based on user preferences
     * Requires authentication
     */
    getRecommendedGames: async (): Promise<GameDTO[]> => {
        try {
            return await fetchWithAuth(`${API_BASE}/api/recommendations/for-you`);
        } catch (error) {
            console.error('Error fetching recommended games:', error);
            return [];
        }
    },

    /**
     * Get "Continue Where You Left Off" recommendations
     * Requires authentication
     */
    getContinuePlaying: async (): Promise<GameDTO[]> => {
        try {
            return await fetchWithAuth(`${API_BASE}/api/recommendations/continue-playing`);
        } catch (error) {
            console.error('Error fetching continue playing games:', error);
            return [];
        }
    },

    /**
     * Get contextual recommendations based on a viewed game
     */
    getBecauseYouViewed: async (gameId: number): Promise<GameDTO[]> => {
        try {
            return await fetchWithAuth(`${API_BASE}/api/recommendations/because-you-viewed/${gameId}`);
        } catch (error) {
            console.error('Error fetching because-you-viewed games:', error);
            return [];
        }
    },

    /**
     * Get personalized deals based on user preferences
     * Requires authentication
     */
    getPersonalizedDeals: async (): Promise<GameDTO[]> => {
        try {
            return await fetchWithAuth(`${API_BASE}/api/recommendations/personalized-deals`);
        } catch (error) {
            console.error('Error fetching personalized deals:', error);
            return [];
        }
    },

    /**
     * Get trending games (public endpoint)
     */
    getTrendingGames: async (): Promise<GameDTO[]> => {
        try {
            const response = await fetch(`${API_BASE}/api/recommendations/trending`);
            if (!response.ok) throw new Error('Failed to fetch trending games');
            return response.json();
        } catch (error) {
            console.error('Error fetching trending games:', error);
            return [];
        }
    },

    /**
     * Get editor's choice games (public endpoint)
     */
    getEditorChoice: async (): Promise<GameDTO[]> => {
        try {
            const response = await fetch(`${API_BASE}/api/recommendations/editor-choice`);
            if (!response.ok) throw new Error('Failed to fetch editor choice games');
            return response.json();
        } catch (error) {
            console.error('Error fetching editor choice games:', error);
            return [];
        }
    },

    /**
     * Get recently released games (public endpoint)
     */
    getRecentlyReleased: async (): Promise<GameDTO[]> => {
        try {
            const response = await fetch(`${API_BASE}/api/recommendations/recently-released`);
            if (!response.ok) throw new Error('Failed to fetch recently released games');
            return response.json();
        } catch (error) {
            console.error('Error fetching recently released games:', error);
            return [];
        }
    },

    /**
     * Get budget-friendly games (public endpoint)
     */
    getBudgetGames: async (): Promise<GameDTO[]> => {
        try {
            const response = await fetch(`${API_BASE}/api/recommendations/budget-games`);
            if (!response.ok) throw new Error('Failed to fetch budget games');
            return response.json();
        } catch (error) {
            console.error('Error fetching budget games:', error);
            return [];
        }
    },

    /**
     * Track user activity (VIEW, CLICK, PURCHASE, WISHLIST)
     * Requires authentication
     */
    trackActivity: async (gameId: number, activityType: 'VIEW' | 'CLICK' | 'PURCHASE' | 'WISHLIST'): Promise<void> => {
        const token = getToken();
        if (!token) {
            console.debug('Activity tracking skipped - user not authenticated');
            return;
        }

        try {
            await fetch(`${API_BASE}/api/activity/track`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ gameId, activityType }),
            });
        } catch (error) {
            console.error('Error tracking activity:', error);
            // Fail silently - don't break user experience
        }
    },
};

export default recommendationApi;
