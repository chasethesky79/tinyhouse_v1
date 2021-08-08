export interface Body<TVariables> {
    query: string,
    variables?: TVariables
}

export const server = {
    fetch: async <T = any, TVariables = any>(body: Body<TVariables>) => {
        const res = await fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        return res.json() as Promise<{ data: T }>;
    }
}