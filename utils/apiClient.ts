const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiClient = {
    newUser: async <T>(credentials: FormData): Promise<T> => {
        try {
            const response = await fetch(API_BASE_URL + 'api/users', {
                cache: 'no-store',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: credentials.get('Name'),
                    email: credentials.get('email'),
                    password: credentials.get('password'),
                }),
            });
            return await response.json();
        } catch (error) {
            console.error('GET request failed', error);
            throw error;
        }
    },
};

export default apiClient;
