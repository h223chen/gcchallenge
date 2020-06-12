import base from './base';

// development values for quick testing
const config = Object.assign(base, {
	// dev specific overrides here
	businesses: [
		{
			id: 0,
			name: 'lemonade',
			cost: 1,
			costMult: 2,
			time: 1,
			imageUrl: '',
			managerCost: 5,
			revenue: 1,
			revenueMult: 2
		},
		{
			id: 1,
			name: 'newspapers',
			cost: 10,
			costMult: 2,
			time: 3,
			imageUrl: '',
			managerCost: 25,
			revenue: 4,
			revenueMult: 2
		},
		{
			id: 2,
			name: 'carwash',
			cost: 25,
			costMult: 2,
			time: 7,
			imageUrl: '',
			managerCost: 75,
			revenue: 10,
			revenueMult: 2
		},
		{
			id: 3,
			name: 'pizza',
			cost: 100,
			costMult: 3,
			time: 10,
			imageUrl: '',
			managerCost: 250,
			revenue: 20,
			revenueMult: 2
		},
		{
			id: 4,
			name: 'donut',
			cost: 300,
			costMult: 3,
			time: 15,
			imageUrl: '',
			managerCost: 500,
			revenue: 50,
			revenueMult: 2
		}
	],
	loadFromStorage: true,
	resetButton: true
});


export default config;