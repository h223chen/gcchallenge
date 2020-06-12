/**
 * Singleton class that handles the Idle aspect of the game
 * if a game session is picked up after inactivity, catch up
 * the game values to what they should be using data stored in
 * local storage
 */
class IdleManager {
	static instance = null;

	/**
	 * @returns {IdleManager} - singleton instance
	 */
	static getInstance() {
		if (IdleManager.instance == null) {
			this.instance = new IdleManager();
		}

		return this.instance;
	}

	/**
	 * helper function for catchUp(), handles individual businesses
	 * @param {*} business - business object
	 * @param {*} delta - time delta between now and last activity
	 */
	__catchUpBusiness(business, delta) {
		if (global.storageManager.getManagers().indexOf(business.name) >= 0) {
			const deltaSeconds = Math.floor(delta / 1000);
			const revenue = Math.floor(deltaSeconds / business.time) * business.revenue;

			global.storageManager.setMoney(global.storageManager.getMoney() + revenue);
		}

		global.config.businesses.map((business) => {
			const financials = global.storageManager.getFinancials();

			business.cost = financials[business.name].cost;
			business.revenue = financials[business.name].revenue;
		});

	}

	/**
	 * Use business configs and the last timestamp stored in 
	 * local storage to figure out how much money each business
	 * should during inactivity
	 */
	catchUp() {
		const lastSessionTs = global.storageManager.getTimestamp();
		const delta = Date.now() - lastSessionTs;
		var businesses = global.config.businesses;

		businesses.forEach((business) => {
			this.__catchUpBusiness(business, delta);
		})
	}
}

export default IdleManager;