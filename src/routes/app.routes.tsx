import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Home} from '../screens/Home';
import {SignIn} from '../screens/SignIn';
import {AppointmantDetails} from '../screens/AppointmantDetails';
import { AppointmantCreate } from '../screens/AppointmantCreate';

import { theme } from '../global/styles/theme';

const {Navigator, Screen} = createStackNavigator();

export function AppRoutes(){
    return(
        <Navigator
            headerMode="none"
            screenOptions={{
                cardStyle:{
                    backgroundColor:theme.colors.secondary100
                }
            }}
        >
            <Screen 
                name = "Home"
                component = {Home}
            />
            <Screen
                name = "AppointmantDetails"
                component = {AppointmantDetails}
            />
            <Screen
                name = "AppointmantCreate"
                component = {AppointmantCreate}
            />
        </Navigator>
    )
}