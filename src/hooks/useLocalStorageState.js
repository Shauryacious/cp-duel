// src/hooks/useLocalStorageState.js

import { useState, useEffect } from "react";

/**
 * Persisted state using localStorage.
 * @param {string} key - localStorage key.
 * @param {any} defaultValue - Value if nothing in storage.
 * @returns {[any, function]} state and setter.
 */
export default function useLocalStorageState(key, defaultValue) {
    const [state, setState] = useState(() => {
        try {
            const value = window.localStorage.getItem(key);
            return value ? JSON.parse(value) : defaultValue;
        } catch {
            return defaultValue;
        }
    });

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
}
