import React, { createContext, useState } from 'react';

export const AuthContext = createContext({
    token: null,
    userId: null,
    isAdmin: false,
    login: (token, userId, isAdmin) => { },
    logout: () => { },
});

