import AsyncStorage from '@react-native-community/async-storage';

class StorageManager {
    static instance = null;
    __blob = {
        '@businesses': [global.config.businesses[0].name],
        '@managers': [],
        '@money': 0,
        '@timestamp': Date.now()
    };
    
    /**
     * @returns {StorageManager}
     */
    static getInstance() {
        if (StorageManager.instance == null) {
            StorageManager.instance = new StorageManager();
        }

        return this.instance;
    }

    keys = {
        BUSINESSES: '@businesses',
        MANAGERS: '@managers',
        MONEY: '@money',
        TIMESTAMP: '@timestamp'
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
    
    async saveBlob() {
        try {
            const jsonBlob = JSON.stringify(this.__blob);
            AsyncStorage.setItem('@blob', jsonBlob);
        } catch (e) {
            console.error(e);
        }
    }
    
    async loadBlob() {
        try {
            const jsonBlob = await AsyncStorage.getItem('@blob');
            const blob = jsonBlob != null ? JSON.parse(jsonBlob) : null;
            this.__blob = blob;

            return this.__blob;         
        } catch (e) {
            console.error(e);
        }
    }
}
  
export default StorageManager;