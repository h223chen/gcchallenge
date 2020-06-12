import AsyncStorage from '@react-native-community/async-storage';

/**
 * Singleton class that handles persisting game data to local storage
 */
class StorageManager {
	static instance = null;
	__blob = {};

	keys = {
		BLOB: '@blob',
		BUSINESSES: '@businesses',
		MANAGERS: '@managers',
		MONEY: '@money',
		TIMESTAMP: '@timestamp',
		FINANCIALS: '@financials'
	}

	constructor() {
		this.__initBlob();
	}

	/**
	 * @returns {StorageManager} - singleton instance
	 */
	static getInstance() {
		if (StorageManager.instance == null) {
			this.instance = new StorageManager();
		}

		return this.instance;
	}

	__initBlob() {
		this.__blob = {
			'@businesses': [global.config.businesses[0].name],
			'@managers': [],
			'@money': 0,
			'@timestamp': Date.now(),
			'@financials': {}
		};

		// keep track of cost and revenue, these values will change 
		// upon upgrading business and so need to be persisted
		global.config.businesses.map((business) => {
			this.__blob[this.keys.FINANCIALS][business.name] = {
				cost: business.cost,
				revenue: business.revenue
			}
		});
	}

	/**
	 * clears user blob.
	 * NOTE: this is a debug function, only if config is
	 * set to development.js
	 */
	__resetBlob() {
		localStorage.removeItem(this.keys.BLOB);
	}

	getItem(key) {
		if (this.__blob) {
			return this.__blob[key];
		}
	}

	setItem(key, value) {
		if (!this.__blob) {
			this.__blob = {};
		}

		this.__blob[key] = value;
		this.__blob[this.keys.TIMESTAMP] = Date.now();
		this.saveBlob();
	}

	//convenience getters
	getBusinesses() {
		return this.getItem(this.keys.BUSINESSES);
	}

	getManagers() {
		return this.getItem(this.keys.MANAGERS);
	}

	getMoney() {
		return this.getItem(this.keys.MONEY);
	}

	getTimestamp() {
		return this.getItem(this.keys.TIMESTAMP);
	}

	getFinancials() {
		return this.getItem(this.keys.FINANCIALS);
	}

	// convenience setters

	setBusinesses(businesses) {
		this.setItem(this.keys.BUSINESSES, businesses);
	}

	setManagers(managers) {
		this.setItem(this.keys.MANAGERS, managers);
	}

	setMoney(money) {
		this.setItem(this.keys.MONEY, money);
	}

	setFinancials(financials) {
		this.setItem(this.keys.FINANCIALS, financials);
	}

	// async functions for saving and loading to local storage
	async saveBlob() {
		try {
			const jsonBlob = JSON.stringify(this.__blob);
			AsyncStorage.setItem(this.keys.BLOB, jsonBlob);
		} catch (e) {
			console.error(e);
		}
	}

	async loadBlob() {
		try {
			const jsonBlob = await AsyncStorage.getItem(this.keys.BLOB);
			this.__blob = jsonBlob != null ? JSON.parse(jsonBlob) : this.__blob;

			return this.__blob;
		} catch (e) {
			console.error(e);
		}
	}
}

export default StorageManager;
