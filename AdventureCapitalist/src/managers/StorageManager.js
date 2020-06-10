import AsyncStorage from '@react-native-community/async-storage';

class StorageManager {
    static instance = null;
    __blob = {};
    
    /**
     * @returns {StorageManager}
     */
    static getInstance() {
        if (StorageManager.instance == null) {
            StorageManager.instance = new StorageManager();
        }

        return this.instance;
    }

    setItem(key, value) {
        if (!this.__blob) {
            this.__blob = {};
        }
        
        this.__blob[key] = value;
        this.saveBlob();
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
        } catch (e) {
            console.error(e);
        }
    }
}
  
export default StorageManager;