import { Box, Button, Checkbox, CheckboxGroup, Container, FormControl, FormLabel, Heading, Input, Stack, Text, VStack, Textarea, List, ListItem, ListIcon, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogBody, useToast } from "@chakra-ui/react";
import { FaPlus, FaPencilAlt, FaTrash, FaShare, FaRegCheckCircle } from "react-icons/fa";
import { useState, useRef } from "react";

const Index = () => {
  const [trips, setTrips] = useState([]);
  const [currentTrip, setCurrentTrip] = useState(null);
  const [editingTripId, setEditingTripId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [checklistItems, setChecklistItems] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const toast = useToast();

  const handleAddTrip = () => {
    const newTrip = {
      id: Date.now(),
      destination: "",
      startDate: new Date(),
      endDate: new Date(),
      activities: "",
      checklist: [],
      languagePhrases: "",
      emergencyContacts: "",
    };
    setCurrentTrip(newTrip);
    onOpen();
  };

  const handleEditTrip = (trip) => {
    setCurrentTrip(trip);
    setEditingTripId(trip.id);
    onOpen();
  };

  const handleDeleteTrip = (tripId) => {
    setIsDeleting(true);
    setEditingTripId(tripId);
  };

  const confirmDeleteTrip = () => {
    setTrips(trips.filter((trip) => trip.id !== editingTripId));
    setIsDeleting(false);
    setEditingTripId(null);
    toast({
      title: "Trip Deleted",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const cancelDeleteTrip = () => {
    setIsDeleting(false);
    setEditingTripId(null);
  };

  const handleSaveTrip = () => {
    if (editingTripId) {
      setTrips(trips.map((trip) => (trip.id === editingTripId ? currentTrip : trip)));
    } else {
      setTrips([...trips, currentTrip]);
    }
    setCurrentTrip(null);
    onClose();
    toast({
      title: `Trip ${editingTripId ? "Updated" : "Added"}`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleShareItinerary = () => {
    // Code to share itinerary
    toast({
      title: "Itinerary Shared",
      description: "The itinerary has been shared successfully!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleChecklistChange = (items) => {
    setChecklistItems(items);
  };

  return (
    <Container maxW="container.xl">
      <VStack spacing={4} align="stretch" mt={10}>
        <Heading as="h1" size="xl" textAlign="center">
          Travel Companion App
        </Heading>
        <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={handleAddTrip}>
          Plan a Trip
        </Button>
        <Stack spacing={4}>
          {trips.map((trip) => (
            <Box p={5} shadow="md" borderWidth="1px" key={trip.id}>
              <Heading fontSize="xl">{trip.destination}</Heading>
              <Text mt={4}>Start Date: {trip.startDate.toDateString()}</Text>
              <Text>End Date: {trip.endDate.toDateString()}</Text>
              <Text>Activities: {trip.activities}</Text>
              <CheckboxGroup colorScheme="green" defaultValue={checklistItems} onChange={handleChecklistChange}>
                <List spacing={2}>
                  {trip.checklist.map((item, index) => (
                    <ListItem key={index}>
                      <Checkbox value={item}>{item}</Checkbox>
                    </ListItem>
                  ))}
                </List>
              </CheckboxGroup>
              <Text mt={4}>Language Phrases: {trip.languagePhrases}</Text>
              <Text>Emergency Contacts: {trip.emergencyContacts}</Text>
              <Stack direction="row" spacing={4} align="center" mt={4}>
                <IconButton icon={<FaPencilAlt />} onClick={() => handleEditTrip(trip)} aria-label="Edit trip" />
                <IconButton icon={<FaTrash />} onClick={() => handleDeleteTrip(trip.id)} aria-label="Delete trip" />
                <IconButton icon={<FaShare />} onClick={handleShareItinerary} aria-label="Share itinerary" />
              </Stack>
            </Box>
          ))}
        </Stack>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editingTripId ? "Edit Trip" : "Add a New Trip"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="destination">
              <FormLabel>Destination</FormLabel>
              <Input placeholder="Enter destination" value={currentTrip?.destination} onChange={(e) => setCurrentTrip({ ...currentTrip, destination: e.target.value })} />
            </FormControl>
            <FormControl id="startDate">
              <FormLabel>Start Date</FormLabel>
              <Input type="date" value={currentTrip?.startDate} onChange={(e) => setCurrentTrip({ ...currentTrip, startDate: new Date(e.target.value) })} />
            </FormControl>
            <FormControl id="endDate">
              <FormLabel>End Date</FormLabel>
              <Input type="date" value={currentTrip?.endDate} onChange={(e) => setCurrentTrip({ ...currentTrip, endDate: new Date(e.target.value) })} />
            </FormControl>
            <FormControl id="activities">
              <FormLabel>Activities</FormLabel>
              <Textarea placeholder="List your activities or places" value={currentTrip?.activities} onChange={(e) => setCurrentTrip({ ...currentTrip, activities: e.target.value })} />
            </FormControl>
            <FormControl id="checklist">
              <FormLabel>Checklist</FormLabel>
              <Input placeholder="Add items to your checklist" value={(currentTrip?.checklist || []).join(", ")} onChange={(e) => setCurrentTrip({ ...currentTrip, checklist: e.target.value.split(",").map((item) => item.trim()) })} />
            </FormControl>
            <FormControl id="languagePhrases">
              <FormLabel>Language Phrases</FormLabel>
              <Textarea placeholder="Enter common phrases" value={currentTrip?.languagePhrases} onChange={(e) => setCurrentTrip({ ...currentTrip, languagePhrases: e.target.value })} />
            </FormControl>
            <FormControl id="emergencyContacts">
              <FormLabel>Emergency Contacts</FormLabel>
              <Textarea placeholder="Enter emergency contacts" value={currentTrip?.emergencyContacts} onChange={(e) => setCurrentTrip({ ...currentTrip, emergencyContacts: e.target.value })} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSaveTrip}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <AlertDialog isOpen={isDeleting} leastDestructiveRef={cancelRef} onClose={cancelDeleteTrip}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Trip
            </AlertDialogHeader>
            <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={cancelDeleteTrip}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={confirmDeleteTrip} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
};

export default Index;
