import React, { useEffect, useState } from 'react';
import { SectionList, Text, View, StyleSheet, TextInput, TouchableOpacity, Pressable } from 'react-native';
import * as Contacts from 'expo-contacts';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import reusableStyle from '@/constants/ReusableStyles'
import { PrimaryFontText } from './PrimaryFontText';
import { PrimaryFontMedium } from './PrimaryFontMedium';
import { useRouter } from 'expo-router';

type Contact = {
    name: string;
    phoneNumbers?: { label: string; number: string | undefined }[]; 
};

type ContactSection = {
    title: string;
    data: { name: string; phoneNumber: string }[];
};

export default function ContactsList() {
    const [sections, setSections] = useState<ContactSection[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredSections, setFilteredSections] = useState<ContactSection[]>([]);
    const route = useRouter()

    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.PhoneNumbers],
                });

                if (data.length > 0) {
                    const processedContacts = processContacts(data);
                    setSections(processedContacts);
                    setFilteredSections(processedContacts);
                } else {
                    alert('No contacts found');
                }
            } else {
                alert('Permission denied');
            }
        })();
    }, []);
    

    const processContacts = (contacts: Contacts.Contact[]): ContactSection[] => {
        const groupedContacts: { [key: string]: { name: string; phoneNumber: string }[] } = {};
    
        contacts.forEach((contact) => {
            if (!contact.name) return; // Skip contacts without a name
    
            const firstLetter = contact.name.charAt(0).toUpperCase();
            if (!groupedContacts[firstLetter]) {
                groupedContacts[firstLetter] = [];
            }
    
            const phoneNumber = contact.phoneNumbers && contact.phoneNumbers.length > 0 && contact.phoneNumbers[0].number
                ? contact.phoneNumbers[0].number
                : 'No number';
    
            groupedContacts[firstLetter].push({ name: contact.name, phoneNumber });
        });
    
        const sortedSections = Object.keys(groupedContacts)
            .sort()
            .map((letter) => ({
                title: letter,
                data: groupedContacts[letter].sort((a, b) => a.name.localeCompare(b.name)),
            }));
    
        return sortedSections;
    };
    
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query) {
            const lowerCaseQuery = query.toLowerCase();
            const filtered = sections.map(section => ({
                ...section,
                data: section.data.filter(contact =>
                    contact.name.toLowerCase().includes(lowerCaseQuery)
                ),
            })).filter(section => section.data.length > 0);

            setFilteredSections(filtered);
        } else {
            setFilteredSections(sections);
        }
    };

    const handlePhoneNumberCleanup = (phoneNumber: string) => {
        // Remove all whitespaces from the phone number
        const cleanedNumber = phoneNumber.replace(/\s+/g, '');
        return cleanedNumber;
    };

    const handlePhoneNumberPrefix = (phoneNumber: string) => {
        // Check if the number starts with '07' and replace '0' with '+254'
        if (phoneNumber.startsWith('07')) {
            return phoneNumber.replace(/^0/, '+254');
        }
        
        // If the number starts with '01', return it as it is
        if (phoneNumber.startsWith('01')) {
            return phoneNumber;
        }

        // If the number starts with '+254', return it as it is
        if (phoneNumber.startsWith('+254')) {
            return phoneNumber;
        }

        // If the number starts with '254', add a +
        if (phoneNumber.startsWith('254')) {
            phoneNumber = "+" + phoneNumber
            return phoneNumber;
        }
    
        return phoneNumber;
    };

    const handleSelectContact = ({ name, phoneNumber }: { name: string, phoneNumber: string }) => {
        const formattedNumber = handlePhoneNumberCleanup(phoneNumber)
        const cleanNumber = handlePhoneNumberPrefix(formattedNumber)
        route.push({
            pathname: '/keyboard',
            params: {
                name,
                phoneNumber: cleanNumber,
                source: 'contacts'
            }
        });
    }

    return (
        <View style={[styles.container, reusableStyle.paddingContainer]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color="#DADADA" style={styles.searchIcon} />
                    <TextInput
                        style={[styles.input, { fontFamily: 'DMSansRegular' }]}
                        placeholder="Name or phone"
                        placeholderTextColor="#79828E"
                        value={searchQuery}
                        onChangeText={handleSearch}
                    />

                </View>
                <TouchableOpacity style={styles.qrButton} onPress={() => alert('QR Code Pressed')}>
                    <MaterialCommunityIcons name="qrcode-scan" size={20} color="white" />
                </TouchableOpacity>
            </View>

            <PrimaryFontMedium style={styles.chooseText}>Choose from your contacts</PrimaryFontMedium>

            <SectionList
                sections={filteredSections}
                initialNumToRender={20}
                maxToRenderPerBatch={10}
                style={{ backgroundColor: 'white' }}
                keyExtractor={(item, index) => item.name + index}
                renderItem={({ item }) => (
                    <Pressable style={styles.item} onPress={() => handleSelectContact(item)}>
                        <PrimaryFontText style={styles.name}>{item.name}</PrimaryFontText>
                        <PrimaryFontText style={styles.phoneNumber}>{item.phoneNumber}</PrimaryFontText>
                    </Pressable>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <View style={styles.sectionHeader}>
                        <PrimaryFontMedium style={styles.sectionHeaderText}>{title}</PrimaryFontMedium>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F5F9',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 6,
        position: 'relative',
        width: '83%'
    },
    searchIcon: {
        marginRight: 10,
        position: 'absolute',
        left: 15,
        zIndex: 1,
    },
    input: {
        flex: 1,
        height: 40,
        paddingLeft: 40,
        paddingRight: 10,
        fontSize: 17,
        color: '#000',
    },
    qrButton: {
        width: 50,
        height: 50,
        marginLeft: 10,
        backgroundColor: '#00C48F',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    chooseText: {
        paddingVertical: 10,
        fontSize: 20,
        color: '#052330',
        marginTop: 10
    },
    sectionHeader: {
        padding: 10,
        backgroundColor: 'white'
    },
    sectionHeaderText: {
        fontSize: 20,
        color: '#79828E'
    },
    item: {
        padding: 10,
        paddingVertical: 18
    },
    name: {
        fontSize: 18,
        color: 'black'
    },
    phoneNumber: {
        color: '#79828E',
        marginTop: 9,
        fontSize: 15
    },
});
