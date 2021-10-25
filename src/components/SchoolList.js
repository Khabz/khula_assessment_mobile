import React from 'react';
import { FlatList, View, Text, Image } from 'react-native';

const SchoolList = (schools) => {
    console.log(schools);
    return (
        <View>
            {schools.schools.map((school, index) => (
                <View key={index}>
                    <Text>{school.name}</Text>
                </View>
            ))}
        </View>
    )
}

export default SchoolList;