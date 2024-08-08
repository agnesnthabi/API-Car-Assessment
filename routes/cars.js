const express = require('express');
const router = express.Router();

let cars = [
    { "color": "white", "make": "Volkswagen", "model": "Polo", "reg_number": "CL 61045" },
    { "color": "red", "make": "Toyota", "model": "Tazz", "reg_number": "CY 16875" },
    { "color": "orange", "make": "Nissan", "model": "Juke", "reg_number": "CK 32655" },
    { "color": "orange", "make": "Ford", "model": "EcoSport", "reg_number": "CL 11318" },
    { "color": "white", "make": "Nissan", "model": "Micra", "reg_number": "CJ 16103" },
    { "color": "orange", "make": "Nissan", "model": "Juke", "reg_number": "CL 42789" },
    { "color": "blue", "make": "Volkswagen", "model": "Jetta", "reg_number": "CA 46977" },
    { "color": "white", "make": "Volkswagen", "model": "Polo", "reg_number": "CY 25661" },
    { "color": "white", "make": "Nissan", "model": "Micra", "reg_number": "CY 35475" },
    { "color": "white", "make": "Toyota", "model": "Corolla", "reg_number": "CY 54886" },
    { "color": "white", "make": "Toyota", "model": "Hilux", "reg_number": "CJ 16455" },
    { "color": "orange", "make": "Toyota", "model": "Corolla", "reg_number": "CK 57166" },
    { "color": "orange", "make": "Ford", "model": "Fiesta", "reg_number": "CL 77790" },
    { "color": "blue", "make": "Nissan", "model": "Juke", "reg_number": "CY 98904" },
    { "color": "white", "make": "Ford", "model": "Ranger", "reg_number": "CF 75599" },
    { "color": "red", "make": "Toyota", "model": "Corolla", "reg_number": "CA 5510" },
    { "color": "blue", "make": "Ford", "model": "Focus", "reg_number": "CF 75586" },
    { "color": "orange", "make": "Toyota", "model": "Tazz", "reg_number": "CA 46137" },
    { "color": "orange", "make": "Ford", "model": "Ranger", "reg_number": "CK 22692" },
    { "color": "red", "make": "Toyota", "model": "Corolla", "reg_number": "CF 33543" },
    { "color": "red", "make": "Volkswagen", "model": "Touran", "reg_number": "CA 94890" },
    { "color": "orange", "make": "Toyota", "model": "Tazz", "reg_number": "CY 82252" },
    { "color": "blue", "make": "Toyota", "model": "Yaris", "reg_number": "CL 9538" },
    { "color": "white", "make": "Nissan", "model": "Juke", "reg_number": "CF 62002" },
    { "color": "orange", "make": "Ford", "model": "Fiesta", "reg_number": "CJ 67577" },
    { "color": "blue", "make": "Ford", "model": "Ranger", "reg_number": "CA 77852" },
    { "color": "orange", "make": "Toyota", "model": "Hilux", "reg_number": "CY 52435" },
    { "color": "blue", "make": "Toyota", "model": "Corolla", "reg_number": "CL 76173" },
    { "color": "red", "make": "Toyota", "model": "Tazz", "reg_number": "CL 38315" },
    { "color": "orange", "make": "Toyota", "model": "Corolla", "reg_number": "CK 41166" }
];

// Function to count Nissans from Malmesbury
function nissansFromCK(cars) {
    return cars.filter(car => car.make === 'Nissan' && car.reg_number.startsWith('CK')).length;
}

// Create
router.post('/', (req, res) => {
    const newCar = req.body;
    const carExists = cars.some(car => car.reg_number === newCar.reg_number);
    if (carExists) {
        res.status(400).json({ message: `Car with registration number ${newCar.reg_number} already exists.` });
    } else {
        cars.push(newCar);
        res.status(201).json({ message: 'New car added successfully.', car: newCar });
    }
});

// Read all cars
router.get('/', (req, res) => {
    res.json(cars);
});

// Update 
router.put('/:reg_number', (req, res) => {
    const { reg_number } = req.params;
    const updatedCar = req.body;
    let carFound = false;
    cars = cars.map(car => {
        if (car.reg_number === reg_number) {
            carFound = true;
            return updatedCar;
        }
        return car;
    });
    if (carFound) {
        res.json(updatedCar);
    } else {
        res.status(404).json({ message: "Car not found" });
    }
});

// Delete 
router.delete('/:reg_number', (req, res) => {
    const { reg_number } = req.params;
    const carIndex = cars.findIndex(car => car.reg_number === reg_number);
    if (carIndex !== -1) {
        cars.splice(carIndex, 1);
        res.status(200).json({ message: `Car with registration number ${reg_number} deleted successfully.` });
    } else {
        res.status(404).json({ message: `Car with registration number ${reg_number} not found.` });
    }
});

// Get Nissan count from Malmesbury
router.get('/nissans-from-malmesbury', (req, res) => {
    const nissansFromMalmesbury = cars.filter(car => car.make === 'Nissan' && car.reg_number.startsWith('CK'));
    const count = nissansFromMalmesbury.length;
    res.status(200).json({ count });
});

module.exports = router;
