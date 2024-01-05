import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';

import { Participant } from '../../components/Participant';

import { styles } from './styles';

export default function Home(){

    const [participants, setParticipants] = useState<string[]>([]);

    const [participantName, setParticipantName] = useState('');

    function handleParticipantAdd() {
        if(participants.includes(participantName)) {
            console.log('Participante existe', '(handleParticipantAdd)');
            return Alert.alert('Participante existe','Ja existe um participante na lista com esse nome.');
        }
        setParticipants(prevState => [...prevState, participantName])
        setParticipantName('');
    }

    function handleParticipantRemove(name: string) {
    console.log('Nome do usuário >>',name);

        Alert.alert('Remover', `Remover o participante ${name}?`, [
            {
                text: 'Sim',
                onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
            },
            {
                text: 'Não',
                style: 'cancel',
            }
        ])
        console.log(`Você clicou em remover o participante ${name}`);
    }

    return(
    <View style={styles.container}>
        <Text style={styles.eventName}>
            Lista de Presença
            </Text>

        <Text style={styles.eventDate}>
            Sexta, 4 de novembro de 2022
            </Text>

        <View style={styles.form}>
            <TextInput 
            style={styles.input} 
            placeholder='Nome do participante'
            placeholderTextColor='#6B6B6B'
            onChangeText={setParticipantName}
            value={participantName}
            /> 
    
            <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
                <Text style={styles.buttonText}>
                    +
                </Text>
            </TouchableOpacity>
        </View>
        
        <FlatList
        showsVerticalScrollIndicator={false}
        data={participants}
        keyExtractor={item => item}
        renderItem={({ item }) => (
            <Participant
            key={item}
            name={item} 
            onRemove={() => handleParticipantRemove(item)}/>
        )}
        ListEmptyComponent={() => (
            <Text style={styles.listEmptyText}>
                Ninguém chegou ao evento ainda? Adicione participantes a sua lista de presença.
            </Text>
        )}
        />
        
    </View>
    )
}