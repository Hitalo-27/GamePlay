import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {AppRoutes} from './app.routes';
import { useAuth } from '../hooks/auth';
import { SignIn } from '../screens/SignIn';

export function Routes(){
    const {user} = useAuth();
    return(
        <NavigationContainer>
            {user.id ? <AppRoutes /> : <SignIn/>}
        </NavigationContainer>
    )
}