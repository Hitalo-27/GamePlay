import React, { useState, useCallback } from 'react';
import {View, FlatList} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Appointmant, AppointmantProps } from '../../components/Appointmant';
import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { ListHeader } from '../../components/ListHeader';
import { Background } from '../../components/Background';
import { Profile } from '../../components/Profile';
import { ListDivider } from '../../components/ListDivider';

import { styles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLLECTION_APPOINTMENTS } from '../../Configs/database';
import { Load } from '../../components/Load';


export function Home(){
    const [category,setCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const [appointmants, setAppointmants] = useState<AppointmantProps[]>([]);
    const navigation = useNavigation();

    function handleCategorySelect(categoryId: string){
        categoryId === category ? setCategory('') : setCategory(categoryId);
    }

    function handleAppointmentDetails (guildSelected: AppointmantProps){
        navigation.navigate('AppointmantDetails', {guildSelected})
    }

    function handleAppointmentCreate (){
        navigation.navigate('AppointmantCreate')
    }

    async function loadAppointmants() {
        const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const storage: AppointmantProps[] = response? JSON.parse(response) : [];

        if(category){
            setAppointmants(storage.filter(item => item.category === category));
        }else{
            setAppointmants(storage);
        }

        setLoading(false);
    }

    useFocusEffect(useCallback(() => {
        loadAppointmants();
    },[category]));

    return(
        <Background>
            <View style={styles.header}>
                <Profile />
                <ButtonAdd onPress={handleAppointmentCreate}/>

            </View>
                <CategorySelect 
                    categorySelected={category}
                    setCategory={handleCategorySelect}
                    hasCheckBox={true}
                />
            {
                loading ? <Load /> 
                :
                <>
                    <ListHeader 
                        title="Partidas Agendadas"
                        subtitle={`Total ${appointmants.length}`}
                    />

                <FlatList 
                        data={appointmants}
                        keyExtractor={item => item.id}
                        renderItem={({item}) =>(
                            <Appointmant 
                                data={item}
                                onPress={() => handleAppointmentDetails(item)} 
                            />
                        )}
                        ItemSeparatorComponent={() => <ListDivider />}
                        contentContainerStyle={{paddingBottom:69}}
                        style={styles.matches}
                        showsVerticalScrollIndicator={false}
                    />
                </>
            }
        </Background>
    
    );
}